// Prints every form the constructor, city builder and navigator demo can show (for audio generation).
const T = require('./tr.js'), fs = require('fs');
const p = __dirname + '/phrases.json', L = new Set(JSON.parse(fs.readFileSync(p, 'utf8')));
const verbs = ['yap','gel','oku','çalış','al','gör','git','iç'];
for (const v of verbs) for (const per of T.PERS) for (const m of ['a','n','q','nq']) {
  const w = T.joinT(T.tiles(v, per, m), m); L.add(w); L.add(w.charAt(0).toUpperCase() + w.slice(1));
}
for (const v of ['bekle','yap','çalış','gel','git','otur','al','iç','oku','hazırla','ye','yaz','bak','düşün','araştır','değiştir','gör','bil']) L.add(T.form(T.aor(v)));
fs.writeFileSync(p, JSON.stringify([...L].sort(), null, 0));
console.log(L.size, T.joinT(T.tiles('yap','ben','n'),'n'), T.joinT(T.tiles('gel','biz','n'),'n'), T.joinT(T.tiles('yap','ben','nq'),'nq'), T.joinT(T.tiles('gör','onlar','q'),'q'), T.joinT(T.tiles('git','siz','a'),'a'), T.joinT(T.tiles('oku','sen','q'),'q'));
