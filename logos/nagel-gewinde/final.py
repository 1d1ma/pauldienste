"""Paul Nagel Logo, finales Paket. Schrift als Pfade (Montserrat), dunkel/hell, Slogan kurz/lang.

Aufruf (braucht fonttools + uharfbuzz):
  <venv>/bin/python final.py
Ergebnis in final/: svg/ (mit Hintergrund + transparent), png/, favicon/, dazu uebersicht.
"""
import os, subprocess
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONTS = {
    "medium": os.path.expanduser("~/Library/Fonts/Montserrat-Medium.otf"),
    "regular": os.path.expanduser("~/Library/Fonts/Montserrat-Regular.ttf"),
}
_cache = {}

def _font(name):
    if name not in _cache:
        path = FONTS[name]
        blob = hb.Blob.from_file_path(path)
        _cache[name] = (hb.Font(hb.Face(blob)), TTFont(path))
    return _cache[name]

def text_path(txt, size, spacing=0.0, weight="medium"):
    """Liefert (svg-path-d, breite) mit Grundlinie y=0, links x=0. Kerning via harfbuzz."""
    hbfont, tt = _font(weight)
    upem = tt["head"].unitsPerEm
    buf = hb.Buffer(); buf.add_str(txt); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"liga": False})
    gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    sc = size / upem
    x = 0.0; d = []
    n = len(buf.glyph_infos)
    for k, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (sc, 0, 0, -sc, x + pos.x_offset * sc, -pos.y_offset * sc))
        gs[order[info.codepoint]].draw(tp)
        d.append(pen.getCommands())
        x += pos.x_advance * sc + (spacing if k < n - 1 else 0)
    return " ".join(d), x

def spacing_for(txt, size, width, weight="medium"):
    _, w0 = text_path(txt, size, 0, weight)
    return (width - w0) / (len(txt) - 1)

PAL = {
    "dunkel": dict(bg="#1C1E21", ink="#B99B63", rod=("#E6CD95", "#BD9F66", "#7A6036"), cut="#5E4A28",
                   sheen=("#8C6E3E", "#E9D29C", "#B99B63", "#E2C78E", "#8C6E3E")),
    "hell":   dict(bg="#F5F5F3", ink="#806433", rod=("#C7A565", "#98783F", "#654C24"), cut="#4A3718",
                   sheen=("#5E4520", "#A8864A", "#7A5E30", "#A07F44", "#5E4520")),
}
SLOGAN = {"kurz": "GEBÄUDEDIENSTE", "lang": "Gebäudedienste und Innenausstattung"}

def defs(p, W):
    s = p["sheen"]
    return ('<defs>'
            f'<linearGradient id="rod" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{p["rod"][0]}"/>'
            f'<stop offset=".45" stop-color="{p["rod"][1]}"/><stop offset="1" stop-color="{p["rod"][2]}"/></linearGradient>'
            f'<linearGradient id="sheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="{W}" y2="{W*0.18}">'
            + "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in zip((0, .3, .55, .78, 1), s)) +
            '</linearGradient></defs>')

def nail(x0, x1, y, h, p, mode, cid):
    """mode: flach | glanz | verlauf"""
    hw, hh = h * 0.75, h * 2.5
    neck = x0 + hw + h * 1.6
    xt = x1 - h * 2.3
    thr_end = xt - h * 1.2
    fill = {"flach": p["ink"], "glanz": "url(#rod)", "verlauf": "url(#rod)"}[mode]
    tip = (f'M{xt:.2f},{y-h/2:.2f} C{xt+h:.2f},{y-h/2:.2f} {x1-h*0.6:.2f},{y-h*0.26:.2f} {x1-h*0.22:.2f},{y-h*0.2:.2f} '
           f'Q{x1:.2f},{y:.2f} {x1-h*0.22:.2f},{y+h*0.2:.2f} C{x1-h*0.6:.2f},{y+h*0.26:.2f} {xt+h:.2f},{y+h/2:.2f} {xt:.2f},{y+h/2:.2f} Z')
    s = f'<clipPath id="{cid}"><rect x="{neck:.2f}" y="{y-h/2:.2f}" width="{thr_end-neck:.2f}" height="{h}"/></clipPath>'
    s += f'<rect x="{x0:.2f}" y="{y-hh/2:.2f}" width="{hw:.2f}" height="{hh:.2f}" rx="{hw*0.45:.2f}" fill="{fill}"/>'
    s += f'<rect x="{x0+hw-0.5:.2f}" y="{y-h/2:.2f}" width="{xt-x0-hw+1:.2f}" height="{h}" fill="{fill}"/>'
    s += f'<path d="{tip}" fill="{fill}"/>'
    step = h * 0.62
    lines = "".join(f'<line x1="{neck+k*step:.2f}" y1="{y-h/2:.2f}" x2="{neck+k*step+h*0.55:.2f}" y2="{y+h/2:.2f}"/>'
                    for k in range(-2, int((thr_end - neck) / step) + 2))
    if mode == "flach":
        # Rillen als echte Aussparung (Maske), damit es auch transparent sauber ist
        s = s.replace(f'<rect x="{x0+hw-0.5:.2f}"', f'<rect mask="url(#m{cid})" x="{x0+hw-0.5:.2f}"', 1)
        s = (f'<mask id="m{cid}" maskUnits="userSpaceOnUse" x="0" y="0" width="10000" height="10000">'
             f'<rect width="10000" height="10000" fill="#fff"/>'
             f'<g clip-path="url(#{cid})" stroke="#000" stroke-width="{h*0.17:.2f}">{lines}</g></mask>') + s
    else:
        s += (f'<g clip-path="url(#{cid})" stroke="{p["cut"]}" stroke-width="{h*0.13:.2f}" opacity=".75">{lines}</g>')
    return s

def put(d, x, y, fill):
    return f'<path transform="translate({x:.2f} {y:.2f})" d="{d}" fill="{fill}"/>'

def quer(p, mode, slogan):
    W, H = 600, 300
    tfill = "url(#sheen)" if mode == "verlauf" else p["ink"]
    d, tw = text_path("PAUL NAGEL", 64, 4)
    x0 = (W - tw) / 2
    body = put(d, x0, 130, tfill)
    body += nail(x0 + 1, x0 + tw, 160, 12, p, mode, "c1")
    if slogan == "kurz":
        sd, sw = text_path(SLOGAN["kurz"], 18, 7.5)
    else:
        sd, sw = text_path(SLOGAN["lang"], 22.5, 0.4, "regular")
    body += put(sd, (W - sw) / 2, 208, tfill)
    return W, H, body

def gestapelt(p, mode, slogan):
    W, H = 500, 420 if slogan == "kurz" else 440
    tfill = "url(#sheen)" if mode == "verlauf" else p["ink"]
    d2, w2 = text_path("NAGEL", 76, 6)
    d1, w1 = text_path("PAUL", 76, 6)
    xl = (W - w2) / 2
    body = put(d1, (W - w1) / 2, 148, tfill) + put(d2, xl, 232, tfill)
    body += nail(xl + 1, xl + w2, 272, 13, p, mode, "c1")
    if slogan == "kurz":
        sd, sw = text_path(SLOGAN["kurz"], 19, spacing_for(SLOGAN["kurz"], 19, w2))
        body += put(sd, xl, 330, tfill)
    else:
        for i, line in enumerate(("Gebäudedienste und", "Innenausstattung")):
            sd, sw = text_path(line, 25, 0.4, "regular")
            body += put(sd, (W - sw) / 2, 328 + i * 32, tfill)
    return W, H, body

def zeichen(p, mode, slogan=None):
    W = H = 300
    return W, H, f'<g transform="rotate(45 150 150)">{nail(46, 262, 150, 15, p, mode, "c1")}</g>'

def svg(W, H, body, p, bg=True):
    rect = f'<rect width="{W}" height="{H}" fill="{p["bg"]}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'{defs(p, W)}{rect}{body}</svg>')

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def png(svg_path, png_path, W, H, scale, transparent):
    html = svg_path.replace(".svg", f".tmp.html")
    with open(html, "w") as f:
        f.write(f'<!doctype html><style>html,body{{margin:0;background:transparent}}img{{display:block;width:{W*scale}px;height:{H*scale}px}}</style>'
                f'<img src="{os.path.basename(svg_path)}">')
    args = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={W*scale},{H*scale}",
            f"--screenshot={os.path.abspath(png_path)}", "file://" + os.path.abspath(html)]
    if transparent:
        args.insert(4, "--default-background-color=00000000")
    subprocess.run(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    os.remove(html)

if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(here, "final")
    for sub in ("svg", "png", "favicon"):
        os.makedirs(os.path.join(out, sub), exist_ok=True)
    jobs = []
    for sl in ("kurz", "lang"):
        for form, fn in (("quer", quer), ("gestapelt", gestapelt)):
            for mode in ("verlauf", "glanz", "flach"):
                if form == "gestapelt" and mode == "glanz":
                    continue
                jobs.append((f"paul-nagel-{form}-{mode}-slogan-{sl}", fn, mode, sl))
    for mode in ("glanz", "flach"):
        jobs.append((f"paul-nagel-zeichen-{mode}", zeichen, mode, None))
    import sys
    nur = sys.argv[1] if len(sys.argv) > 1 else ""
    for name, fn, mode, sl in jobs:
        if nur not in name:
            continue
        for pal, p in PAL.items():
            W, H, body = fn(p, mode, sl)
            for bg in (True, False):
                suffix = "" if bg else "-transparent"
                sp = os.path.join(out, "svg", f"{name}-{pal}{suffix}.svg")
                with open(sp, "w") as f:
                    f.write(svg(W, H, body, p, bg))
                png(sp, os.path.join(out, "png", f"{name}-{pal}{suffix}.png"), W, H, 4, not bg)
    # Favicons aus dem Zeichen (dunkel, mit Hintergrund)
    p = PAL["dunkel"]
    W, H, body = zeichen(p, "glanz")
    sp = os.path.join(out, "favicon", "favicon.svg")
    with open(sp, "w") as f:
        f.write(svg(W, H, body, p, True))
    big = os.path.join(out, "favicon", "icon-1200.png")
    png(sp, big, W, H, 4, False)
    for px, fn_ in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"), (512, "icon-512.png")):
        subprocess.run(["sips", "-z", str(px), str(px), big, "--out", os.path.join(out, "favicon", fn_)],
                       stdout=subprocess.DEVNULL, check=True)
    os.remove(big)
    print(len(jobs) * 4, "Dateien je Format erzeugt")
