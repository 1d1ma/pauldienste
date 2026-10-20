<?php
/**
 * anfrage-senden.php – nimmt das mehrstufige Anfrageformular entgegen und
 * schickt eine Mail an den Betrieb. Reines PHP, kein Framework, lauffähig auf
 * Shared Hosting (z. B. All-Inkl, IONOS, Strato).
 *
 * KOPIEREN nach `public/anfrage-senden.php`. Nur die beiden Konstanten unten
 * anpassen. Der Formular-`action` zeigt auf `/anfrage-senden.php`.
 *
 * Spamschutz OHNE reCAPTCHA (DSGVO-freundlich): ein Honeypot-Feld, das für
 * Menschen unsichtbar ist, plus eine Zeitprüfung. Beides zusammen hält den
 * Großteil der Bots ab, ganz ohne Drittanbieter.
 *
 * Antwortet auf AJAX-Anfragen mit JSON, sonst per Redirect auf die
 * Formularseite mit ?erfolg=1 – so funktioniert das Formular auch ohne JS.
 */

// --- ANPASSEN ---------------------------------------------------------------
$EMPFAENGER    = 'info@TODO-marke.de';                 // wohin die Anfrage geht
$ABSENDER      = 'noreply@TODO-marke.de';              // MUSS eine Adresse der eigenen Domain sein (Deliverability)
$FORMULAR_PFAD = '/anfrage/';                          // Seite mit dem Formular (für den No-JS-Redirect)
// ----------------------------------------------------------------------------

$istAjax = (
  isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'
);

function antwort($ok, $fehler, $istAjax, $formularPfad) {
  if ($istAjax) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $ok, 'error' => $fehler]);
  } else {
    header('Location: ' . $formularPfad . ($ok ? '?erfolg=1' : '?fehler=1'));
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  antwort(false, 'method', $istAjax, $FORMULAR_PFAD);
}

// Honeypot: Das Feld "website" ist im Formular versteckt und muss leer bleiben.
// Füllt ein Bot es aus, tun wir so, als sei alles gut – und senden nichts.
if (!empty($_POST['website'])) {
  antwort(true, '', $istAjax, $FORMULAR_PFAD);
}

// Zeitprüfung: Ein Mensch braucht länger als drei Sekunden. "ts" ist der
// Zeitpunkt (ms) beim Laden des Formulars, vom Browser gesetzt.
$ts = isset($_POST['ts']) ? (int) $_POST['ts'] : 0;
if ($ts > 0) {
  $delta = (int) round(microtime(true) * 1000) - $ts;
  if ($delta > 0 && $delta < 3000) {
    antwort(true, '', $istAjax, $FORMULAR_PFAD);
  }
}

function sauber($v) {
  if (is_array($v)) {
    return implode(', ', array_map('sauber', $v));
  }
  return trim(str_replace(["\r", "\n"], ' ', (string) $v));
}

$name    = sauber($_POST['name'] ?? '');
$email   = sauber($_POST['email'] ?? '');
$telefon = sauber($_POST['telefon'] ?? '');

// Pflichtfelder. Telefon hier Pflicht – wer es optional will, die Zeile kürzen.
// Die DSGVO-Einwilligung wird auch serverseitig geprüft (nicht per Request
// oder ohne JavaScript umgehbar).
$einwilligung = ($_POST['einwilligung'] ?? '') === 'ja';
if ($name === '' || $telefon === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$einwilligung) {
  http_response_code(422);
  antwort(false, 'validation', $istAjax, $FORMULAR_PFAD);
}

// Alle übrigen Felder als „Antworten" – ohne Technik- und Kontaktfelder.
$technisch = ['website', 'ts', 'name', 'email', 'telefon', 'einwilligung'];
$antworten = [];
foreach ($_POST as $key => $wert) {
  if (in_array($key, $technisch, true)) continue;
  $antworten[$key] = sauber($wert);
}

$betreff = 'Neue Anfrage – ' . $name;

$body  = "=== NEUE ANFRAGE ===\n\n";
$body .= str_pad('Name:', 12) . $name . "\n";
$body .= str_pad('Telefon:', 12) . $telefon . "\n";
$body .= str_pad('E-Mail:', 12) . $email . "\n\n";
$body .= "--- Antworten ---\n";
foreach ($antworten as $label => $wert) {
  $body .= ' ' . ucfirst($label) . ': ' . ($wert !== '' ? $wert : '—') . "\n";
}
$body .= "\n";
$body .= str_pad('Quelle:', 12) . sauber($_SERVER['HTTP_REFERER'] ?? $FORMULAR_PFAD) . "\n";

// Zeitstempel ISO-8601 mit Millisekunden (UTC).
$jetzt = microtime(true);
$body .= 'Zeitstempel: ' . gmdate('Y-m-d\TH:i:s', (int) $jetzt)
       . sprintf('.%03dZ', (int) round(($jetzt - floor($jetzt)) * 1000)) . "\n";

// From MUSS die eigene Domain sein; Reply-To ist der Interessent.
$headers   = [];
$headers[] = 'From: Anfrageformular <' . $ABSENDER . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';

$betreffMime = '=?UTF-8?B?' . base64_encode($betreff) . '?=';

$ok = @mail($EMPFAENGER, $betreffMime, $body, implode("\r\n", $headers));

antwort((bool) $ok, $ok ? '' : 'mail', $istAjax, $FORMULAR_PFAD);
