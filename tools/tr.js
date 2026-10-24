
var VOW='aıoueiöü',BACK='aıou';
var EXC=['al','bil','bul','dur','gel','gör','kal','ol','öl','san','ver','var','vur'];
var SOFT={git:'gid',et:'ed',tat:'tad','güt':'güd'};
function lastV(w){for(var i=w.length-1;i>=0;i--)if(VOW.indexOf(w[i])>=0)return w[i];return 'e'}
function A2(v){return BACK.indexOf(v)>=0?'a':'e'}
function I4(v){return 'aı'.indexOf(v)>=0?'ı':'ei'.indexOf(v)>=0?'i':'ou'.indexOf(v)>=0?'u':'ü'}
function nsyl(w){var n=0;for(var i=0;i<w.length;i++)if(VOW.indexOf(w[i])>=0)n++;return n}
function sylls(w){var ch=w.split(''),vi=[];ch.forEach(function(c,i){if(VOW.indexOf(c)>=0)vi.push(i)});if(vi.length<2)return [w];var res=[],st=0;for(var k=0;k<vi.length-1;k++){var a=vi[k],b=vi[k+1],cut=(b-a-1)===0?a+1:b-1;res.push(ch.slice(st,cut).join(''));st=cut}res.push(ch.slice(st).join(''));return res}
function trLower(s){return s.replace(/I/g,'ı').replace(/İ/g,'i').toLowerCase()}
function aor(stem){
  var parts=stem.split(' '),core=parts.pop(),pre=parts.length?parts.join(' ')+' ':'';
  if(VOW.indexOf(core.slice(-1))>=0)return {b:pre+core,s:'r',t:'v',core:core};
  var n=nsyl(core),lv=lastV(core),b=pre+(SOFT[core]||core);
  if(n===1){if(EXC.indexOf(core)>=0)return {b:b,s:I4(lv)+'r',t:'x',core:core};return {b:b,s:A2(lv)+'r',t:'1',core:core}}
  return {b:b,s:I4(lv)+'r',t:'m',core:core};
}
function form(a){return a.b+a.s}
var PERS=['ben','sen','o','biz','siz','onlar'],PRU={ben:'я',sen:'ты',o:'он, она',biz:'мы',siz:'вы',onlar:'они'};
function tiles(stem,p,mode){
  var a=aor(stem),aff=form(a),v=lastV(aff),I=I4(v),T=[];
  var neg='m'+A2(lastV(a.core)),nI=I4(neg[1]),base=stem;
  if(mode==='a'){
    T.push([a.b,'st'],[a.s,'sf']);
    var e={ben:I+'m',sen:'s'+I+'n',o:'',biz:I+'z',siz:'s'+I+'n'+I+'z',onlar:'l'+A2(v)+'r'}[p];
    if(e)T.push([e,'en']);
  }else if(mode==='n'){
    T.push([base,'st'],[neg,'sf']);
    if(p==='ben')T.push(['z','gh'],['m','en']);
    else if(p==='biz')T.push(['z','gh'],['y'+nI+'z','en']);
    else{T.push(['z','z']);var e2={sen:'s'+nI+'n',o:'',siz:'s'+nI+'n'+nI+'z',onlar:'l'+neg[1]+'r'}[p];if(e2)T.push([e2,'en'])}
  }else{
    var w,ww;
    if(mode==='q'){T.push([a.b,'st'],[a.s,'sf']);w=aff}else{T.push([base,'st'],[neg,'sf'],['z','z']);w=base+neg+'z'}
    if(p==='onlar'){var pl='l'+A2(lastV(w))+'r';T.push([pl,'en']);ww=w+pl}else ww=w;
    var qi=I4(lastV(ww)),q={ben:'m'+qi+'y'+qi+'m',sen:'m'+qi+'s'+qi+'n',o:'m'+qi,biz:'m'+qi+'y'+qi+'z',siz:'m'+qi+'s'+qi+'n'+qi+'z',onlar:'m'+qi}[p];
    T.push([' ','sp'],[q,'q']);
  }
  return T;
}
function joinT(T,mode){var s=T.filter(function(t){return t[1]!=='gh'}).map(function(t){return t[0]}).join('');return mode==='q'||mode==='nq'?s+'?':s}

module.exports={aor,form,tiles,joinT,PERS};