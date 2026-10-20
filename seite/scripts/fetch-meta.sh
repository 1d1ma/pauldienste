#!/usr/bin/env bash
#
# Liest die ECHTEN SEO-Metadaten der Live-Seite aus (Title, Meta-Description,
# Canonical, H1) – direkt aus dem HTML-Head, nicht aus konvertiertem Markdown.
# Diese Werte sind über Jahre optimiert und die Grundlage für die Migration.
#
#   bash scripts/fetch-meta.sh
#
# Ergebnis: content/research/live-meta.tsv  (url · title · description · h1)
#
set -uo pipefail

BASE="${BASE:-https://www.TODO-marke.de}"
OUT="content/research/live-meta.tsv"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$(dirname "$OUT")"
printf 'url\ttitle\tdescription\th1\n' > "$OUT"

PAGES=(
  # TODO: alle bestehenden URLs der Live-Seite eintragen.
  # Am schnellsten aus der sitemap.xml der alten Seite ziehen.
  "/" "/leistungen/" "/preise/" "/kontakt/" "/impressum/" "/datenschutz/"
)

# HTML-Entities dekodieren und Zeilenumbrüche entfernen
clean() {
  tr '\n' ' ' \
  | sed -e 's/&amp;/\&/g' -e 's/&quot;/"/g' -e 's/&#0*39;/'"'"'/g' \
        -e 's/&#8211;/–/g' -e 's/&#8212;/—/g' -e 's/&ndash;/–/g' \
        -e 's/&auml;/ä/g' -e 's/&ouml;/ö/g' -e 's/&uuml;/ü/g' \
        -e 's/&Auml;/Ä/g' -e 's/&Ouml;/Ö/g' -e 's/&Uuml;/Ü/g' -e 's/&szlig;/ß/g' \
        -e 's/&nbsp;/ /g' -e 's/&#8222;/„/g' -e 's/&#8220;/“/g' \
        -e 's/  */ /g' -e 's/^ //' -e 's/ $//'
}

for p in "${PAGES[@]}"; do
  html="$TMP/p.html"
  if ! curl -fsSL --max-time 45 -A "Mozilla/5.0 (Metadaten-Sicherung Migration)" "$BASE$p" -o "$html"; then
    printf '%s\tFEHLER: nicht abrufbar\t\t\n' "$p" >> "$OUT"
    echo "   ! $p nicht abrufbar"
    continue
  fi

  title="$(grep -oE '<title>[^<]*</title>' "$html" | head -1 | sed -e 's/<title>//' -e 's|</title>||' | clean)"

  desc="$(grep -oiE '<meta[^>]*name="description"[^>]*>' "$html" | head -1 \
        | grep -oE 'content="[^"]*"' | head -1 | cut -d'"' -f2 | clean)"

  h1="$(grep -oE '<h1[^>]*>.*?</h1>' "$html" | head -1 \
      | sed -e 's/<[^>]*>//g' | clean)"

  printf '%s\t%s\t%s\t%s\n' "$p" "${title:-—}" "${desc:-FEHLT}" "${h1:-—}" >> "$OUT"
  echo "   ✓ $p"
done

echo ""
echo "Gespeichert: $OUT"
