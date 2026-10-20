#!/usr/bin/env bash
#
# Sichert alle Bilder der Live-WordPress-Seite, BEVOR das Deployment den
# Webroot überschreibt. Holt bewusst die Originaldateien (WordPress liefert im
# Markup meist verkleinerte Varianten wie bild-300x200.jpg).
#
#   bash scripts/fetch-images.sh
#
# Ergebnis:
#   src/assets/images/              – die Originalbilder
#   content/research/bilder-manifest.tsv – welche Seite nutzt welches Bild + Alt-Text
#
set -uo pipefail

BASE="${BASE:-https://www.TODO-marke.de}"
OUT="src/assets/images"
MANIFEST="content/research/bilder-manifest.tsv"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT" "$(dirname "$MANIFEST")"
printf 'seite\tbild_url\talt_text\n' > "$MANIFEST"

PAGES=(
  # TODO: alle bestehenden URLs der Live-Seite eintragen.
  # Am schnellsten aus der sitemap.xml der alten Seite ziehen.
  "/" "/leistungen/" "/preise/" "/kontakt/" "/impressum/" "/datenschutz/"
)

URLS="$TMP/urls.txt"
: > "$URLS"

echo "→ Seiten abrufen …"
for p in "${PAGES[@]}"; do
  safe="$(printf '%s' "$p" | tr '/' '_')"
  html="$TMP/page${safe}.html"

  if ! curl -fsSL --max-time 45 -A "Mozilla/5.0 (Bildsicherung Migration)" "$BASE$p" -o "$html"; then
    echo "   ! $p nicht abrufbar – übersprungen"
    continue
  fi

  # Alle Uploads-URLs einsammeln (src, data-src, srcset, CSS-Backgrounds …)
  grep -oE 'https?://[^"'"'"' )]*wp-content/uploads/[^"'"'"' )]*\.(jpg|jpeg|png|webp|gif|svg)' "$html" \
    >> "$URLS" 2>/dev/null

  # Alt-Texte je <img> für das Manifest
  grep -oE '<img[^>]*>' "$html" 2>/dev/null | while IFS= read -r tag; do
    src="$(printf '%s' "$tag" | grep -oE '(data-src|data-lazy-src|src)="[^"]*"' | head -1 | cut -d'"' -f2)"
    case "$src" in *wp-content/uploads*) ;; *) continue ;; esac
    alt="$(printf '%s' "$tag" | grep -oE 'alt="[^"]*"' | head -1 | cut -d'"' -f2)"
    printf '%s\t%s\t%s\n' "$p" "$src" "${alt:-（kein Alt-Text）}" >> "$MANIFEST"
  done

  echo "   ✓ $p"
done

# Verkleinerte Varianten auf das Original zurückführen: -1024x768 vor der Endung entfernen
echo "→ Originalgrößen ermitteln …"
ORIGINALS="$TMP/originals.txt"
sed -E 's/-[0-9]+x[0-9]+(\.[a-zA-Z]+)$/\1/' "$URLS" | sort -u > "$ORIGINALS"

total=$(wc -l < "$ORIGINALS" | tr -d ' ')
echo "→ $total eindeutige Bilder gefunden. Lade herunter …"

ok=0; fail=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  fname="$(basename "$url")"
  if [ -f "$OUT/$fname" ]; then ok=$((ok+1)); continue; fi

  if curl -fsSL --max-time 60 "$url" -o "$OUT/$fname"; then
    ok=$((ok+1))
  else
    # Original existiert nicht → verkleinerte Variante als Rückfallebene
    variant="$(grep -F "$fname" "$URLS" | head -1)"
    if [ -n "$variant" ] && curl -fsSL --max-time 60 "$variant" -o "$OUT/$fname"; then
      ok=$((ok+1))
    else
      rm -f "$OUT/$fname"
      echo "   ! Fehlgeschlagen: $url"
      fail=$((fail+1))
    fi
  fi
done < "$ORIGINALS"

echo ""
echo "Fertig: $ok geladen, $fail fehlgeschlagen."
echo "Bilder:   $OUT"
echo "Manifest: $MANIFEST"
du -sh "$OUT" 2>/dev/null
