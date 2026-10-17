"""Paul Nagel Logo (Nagel mit Gewinde). Erzeugt SVGs dunkel/hell: python3 bauen.py"""
F = 'font-family="Montserrat, sans-serif"'
PAL = {
 "dunkel": dict(bg="#1C1E21", ink="#B99B63", g=("#E6CD95", "#BD9F66", "#7A6036"), cut="#5E4A28"),
 "hell":   dict(bg="#F5F5F3", ink="#806433", g=("#C7A565", "#98783F", "#654C24"), cut="#4A3718"),
}
uid = [0]
def nail(x0, x1, y, h, p, flat=False):
    uid[0] += 1; i = uid[0]
    hw, hh = h*0.75, h*2.5
    neck = x0 + hw + h*1.6
    tl = h*2.3
    xt = x1 - tl
    thr_end = xt - h*1.2
    fill = p["ink"] if flat else f"url(#g{i})"
    defs = "" if flat else (f'<linearGradient id="g{i}" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{p["g"][0]}"/><stop offset=".45" stop-color="{p["g"][1]}"/><stop offset="1" stop-color="{p["g"][2]}"/></linearGradient>')
    defs += f'<clipPath id="c{i}"><rect x="{neck}" y="{y-h/2}" width="{thr_end-neck}" height="{h}"/></clipPath>'
    tip = (f'M{xt},{y-h/2} C{xt+h},{y-h/2} {x1-h*0.6},{y-h*0.26} {x1-h*0.22},{y-h*0.2} '
           f'Q{x1},{y} {x1-h*0.22},{y+h*0.2} C{x1-h*0.6},{y+h*0.26} {xt+h},{y+h/2} {xt},{y+h/2} Z')
    s = f'<defs>{defs}</defs>'
    s += f'<rect x="{x0}" y="{y-hh/2}" width="{hw}" height="{hh}" rx="{hw*0.45}" fill="{fill}"/>'
    s += f'<rect x="{x0+hw-0.5}" y="{y-h/2}" width="{xt-x0-hw+1}" height="{h}" fill="{fill}"/>'
    s += f'<path d="{tip}" fill="{fill}"/>'
    step = h*0.62
    cut = p["bg"] if flat else p["cut"]
    lines = "".join(f'<line x1="{neck+k*step}" y1="{y-h/2}" x2="{neck+k*step+h*0.55}" y2="{y+h/2}"/>' for k in range(-2, int((thr_end-neck)/step)+2))
    s += f'<g clip-path="url(#c{i})" stroke="{cut}" stroke-width="{h*0.17 if flat else h*0.13}" opacity="{1 if flat else .75}">{lines}</g>'
    return s

def quer(p, flat=False):
    return (f'<text x="302" y="130" {F} font-weight="500" font-size="64" letter-spacing="4" text-anchor="middle" fill="{p["ink"]}">PAUL NAGEL</text>'
            + nail(72, 528, 160, 12, p, flat) +
            f'<text x="303.75" y="208" {F} font-weight="500" font-size="18" letter-spacing="7.5" text-anchor="middle" fill="{p["ink"]}">GEBÄUDEDIENSTE</text>')

def gestapelt(p, flat=False):
    return (f'<text x="253" y="148" {F} font-weight="500" font-size="76" letter-spacing="6" text-anchor="middle" fill="{p["ink"]}">PAUL</text>'
            f'<text x="253" y="232" {F} font-weight="500" font-size="76" letter-spacing="6" text-anchor="middle" fill="{p["ink"]}">NAGEL</text>'
            + nail(106, 396, 272, 13, p, flat) +
            f'<text x="253.75" y="330" {F} font-weight="500" font-size="19" letter-spacing="7.5" text-anchor="middle" fill="{p["ink"]}">GEBÄUDEDIENSTE</text>')

def zeichen(p, flat=False):
    return f'<g transform="rotate(45 150 150)">{nail(46, 262, 150, 15, p, flat)}</g>'

OUT = {"1-quer-glanz": (quer, False, 600, 300), "2-quer-flach": (quer, True, 600, 300),
       "3-gestapelt": (gestapelt, False, 500, 420), "4-zeichen": (zeichen, False, 300, 300)}
if __name__ == "__main__":
    for name, (fn, flat, w, h) in OUT.items():
        for mode, p in PAL.items():
            uid[0] = 0
            open(f"paul-{name}-{mode}.svg", "w").write(
                f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w*2}" height="{h*2}"><rect width="{w}" height="{h}" fill="{p["bg"]}"/>{fn(p, flat)}</svg>')
