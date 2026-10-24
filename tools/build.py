#!/usr/bin/env python3
"""Build index.html (with ad) and lesson/index.html (no ad) from src.html.
Usage: python3 tools/build.py   (run from anywhere)"""
import os, re, json, html
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(R, 'src.html'), encoding='utf-8').read()
src = src.replace('<!--FONTS-->', open(os.path.join(R, 'assets/fonts/fonts.css'), encoding='utf-8').read())
src = src.replace('<!--ICONS-->', open(os.path.join(R, 'tools/icons.svg'), encoding='utf-8').read())

def slug(t):
    m = {'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u','â':'a','î':'i','û':'u'}
    t = ''.join(m.get(c, c) for c in t.lower())
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:60]

aud = sorted(f[:-4] for f in os.listdir(os.path.join(R, 'assets/audio')) if f.endswith('.mp3'))
src = src.replace('var AUD=/*AUDIO*/[];', 'var AUD=' + json.dumps(aud) + ';')
# helper JS for tools (scene + Turkish morphology)
open(os.path.join(R, 'tools/scene.js'), 'w').write(re.search(r'/\*SCENE\*/(.*?)/\*/SCENE\*/', src, re.S).group(1))
open(os.path.join(R, 'tools/tr.js'), 'w').write(re.search(r'/\*TR\*/(.*?)/\*/TR\*/', src, re.S).group(1) + '\nmodule.exports={aor,form,tiles,joinT,PERS};')

def variant(h, ad):
    keep, drop = ('AD', 'NOAD') if ad else ('NOAD', 'AD')
    h = re.sub(r'<!--%s-->.*?<!--/%s-->' % (drop, drop), '', h, flags=re.S)
    return h.replace('<!--%s-->' % keep, '').replace('<!--/%s-->' % keep, '')

TITLE = 'Широкое время в турецком: правила и 13 исключений'
DESC = 'Geniş zaman без таблиц: истории, город глаголов, 13 исключений, конструктор, квиз и озвучка. Timur Turkish.'
URL = 'https://stellasdeutsch-dev.github.io/turkce-genis-zaman/'
FAV = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230F4C7E'/%3E%3Cpath d='M14 40C22 22 40 14 52 16C46 32 30 44 14 40Z' fill='%238ED15C'/%3E%3C/svg%3E"

def page(body, pre):
    head, rest = body.split('<!--HEAD-END-->', 1)
    if pre:
        fix = lambda t: re.sub(r'((?:src|href|poster|data-src)=")assets/', r'\1' + pre + 'assets/', t).replace('url(assets/', 'url(' + pre + 'assets/')
        head, rest = fix(head), fix(rest)
    meta = ('<!doctype html>\n<html lang="ru"%s>\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<meta name="description" content="%s">\n<meta name="theme-color" content="#E6F3F2">\n'
            '<meta property="og:type" content="website">\n<meta property="og:title" content="%s">\n'
            '<meta property="og:description" content="%s">\n<meta property="og:image" content="%sassets/media/cover.jpg">\n'
            '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
            '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="%sassets/media/cover.jpg">\n'
            '<link rel="icon" href="%s">\n<script defer src="%sassets/gsap-bundle.min.js"></script>\n'
            % (' data-base="%s"' % pre if pre else '', DESC, TITLE, DESC, URL, URL, FAV, pre))
    return meta + head + '\n</head>\n<body>\n' + rest + '\n</body>\n</html>\n'

os.makedirs(os.path.join(R, 'lesson'), exist_ok=True)
open(os.path.join(R, 'index.html'), 'w', encoding='utf-8').write(page(variant(src, True), ''))
open(os.path.join(R, 'lesson/index.html'), 'w', encoding='utf-8').write(page(variant(src, False), '../'))

# phrases for audio
says = set(html.unescape(x) for x in re.findall(r'data-say="([^"]+)"', src))
D = json.loads(re.search(r'<script type="application/json" id="DATA">(.*?)</script>', src, re.S).group(1))
def walk(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in ('say', 'tr') and isinstance(v, str): says.add(v)
            else: walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
walk(D)
for q in D['quiz']: says.add(q['o'][q['a']])
says |= set('yapar anlatır kırar çalışır sorar olur duyar oturur gezer öğretir içer getirir döner görür düşer düşünür'.split())
says = {s for s in says if re.search(r'[a-zçğıöşü]', s)}
json.dump(sorted(says), open(os.path.join(R, 'tools/phrases.json'), 'w'), ensure_ascii=False, indent=0)
print('built index.html + lesson/index.html; audio files:', len(aud), '; phrases:', len(says))
import subprocess
subprocess.run(['node', os.path.join(R, 'tools/forms.js')], check=False)
