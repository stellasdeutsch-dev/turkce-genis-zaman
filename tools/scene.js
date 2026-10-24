var SC=0;
function cloud(x,y,s){return '<path d="M'+x+' '+y+'c'+(-4*s)+' '+(-26*s)+' '+(30*s)+' '+(-40*s)+' '+(50*s)+' '+(-24*s)+'c'+(10*s)+' '+(-30*s)+' '+(62*s)+' '+(-32*s)+' '+(74*s)+' '+(-2*s)+'c'+(26*s)+' '+(-10*s)+' '+(50*s)+' '+(8*s)+' '+(44*s)+' '+(26*s)+'z" fill="#fff" opacity=".92"/>'}
function tree(x,y,s,k){var P=k?['#2E7D3E','#4FA35A','#A6D86A']:['#1F6B3A','#2F8A45','#7CC35A'];return '<g><rect x="'+(x-3*s)+'" y="'+(y-12*s)+'" width="'+(6*s)+'" height="'+(26*s)+'" fill="#6B4E3A"/><circle cx="'+x+'" cy="'+(y-30*s)+'" r="'+(28*s)+'" fill="'+P[0]+'"/><circle cx="'+(x-21*s)+'" cy="'+(y-15*s)+'" r="'+(19*s)+'" fill="'+P[1]+'"/><circle cx="'+(x+21*s)+'" cy="'+(y-17*s)+'" r="'+(21*s)+'" fill="'+P[1]+'"/><circle cx="'+(x+5*s)+'" cy="'+(y-44*s)+'" r="'+(15*s)+'" fill="'+P[2]+'" opacity=".9"/><path d="M'+(x-14*s)+' '+(y-30*s)+'q'+(8*s)+' '+(-9*s)+' '+(16*s)+' 0M'+(x+8*s)+' '+(y-18*s)+'q'+(7*s)+' '+(-8*s)+' '+(14*s)+' 0" fill="none" stroke="'+P[2]+'" stroke-width="'+(2.2*s)+'" stroke-linecap="round"/></g>'}
function turbine(x,y,h,s){var cy=y-h,r='';[0,120,240].forEach(function(a){r+='<path transform="rotate('+a+' '+x+' '+cy+')" d="M'+x+' '+cy+'C'+(x+5*s)+' '+(cy-10*s)+' '+(x+5*s)+' '+(cy-40*s)+' '+x+' '+(cy-60*s)+'C'+(x-3*s)+' '+(cy-40*s)+' '+(x-3*s)+' '+(cy-10*s)+' '+x+' '+cy+'Z" fill="#fff"/>'});return '<g><path d="M'+(x-2.4*s)+' '+y+'L'+(x-.8*s)+' '+cy+'L'+(x+.8*s)+' '+cy+'L'+(x+2.4*s)+' '+y+'Z" fill="#F7FBFC"/><g class="rotor" data-o="'+x+' '+cy+'">'+r+'</g><circle cx="'+x+'" cy="'+cy+'" r="'+(3.6*s)+'" fill="#DCEAF0"/></g>'}
function leaf(x,y,r,s,c){return '<path transform="translate('+x+' '+y+') rotate('+r+') scale('+s+')" d="M0 0C20-30 60-40 92-30C62-8 30 10 0 0Z" fill="'+c+'"/><path transform="translate('+x+' '+y+') rotate('+r+') scale('+s+')" d="M4 -2C30-14 56-24 86-29" fill="none" stroke="#9BD06A" stroke-width="2" opacity=".7"/>'}
var TRK='M-60 704C180 650 360 612 540 602S900 566 1260 526';
function scene(vb){
  var id='s'+(SC++),s='';
  s+='<rect class="nosk" x="-300" y="-200" width="1800" height="1200" fill="url(#gSky)"/>';
  var rays='';for(var x=-400;x<=1600;x+=110){rays+='<line x1="600" y1="560" x2="'+x+'" y2="-200"/><line x1="600" y1="560" x2="'+x+'" y2="1000"/>'}
  s+='<g class="skonly">'+rays+'<line class="hz" x1="-300" y1="560" x2="1500" y2="560"/></g>';
  s+='<circle class="sun" cx="840" cy="190" r="74" fill="#fff" opacity=".8"/>';
  s+='<g class="clouds">'+cloud(110,180,1.3)+cloud(860,120,1)+cloud(990,300,.8)+cloud(430,130,.9)+'</g>';
  var F=[[30,44,150],[80,30,214],[116,52,120],[176,36,252],[220,48,170],[470,38,192],[516,56,140],[680,34,232],[720,50,160],[990,42,212],[1036,58,150],[1104,40,252],[1150,50,180]],f='';
  F.forEach(function(t,i){f+=i%3===1?'<path d="M'+t[0]+' 580V'+(580-t[2]+t[1]/2)+'A'+(t[1]/2)+' '+(t[1]/2)+' 0 0 1 '+(t[0]+t[1])+' '+(580-t[2]+t[1]/2)+'V580Z" fill="#B3DDF3"/>':'<rect x="'+t[0]+'" y="'+(580-t[2])+'" width="'+t[1]+'" height="'+t[2]+'" rx="4" fill="#B3DDF3"/>'});
  s+='<g class="far">'+f+'<rect x="616" y="232" width="8" height="350" fill="#A6D4EF"/><circle cx="620" cy="302" r="17" fill="#A6D4EF"/><rect x="618.5" y="172" width="3" height="62" fill="#A6D4EF"/></g>';
  s+='<path d="M-40 612C200 540 380 600 560 576C760 546 960 520 1240 560V900H-40Z" fill="#A8D56B"/>';
  s+=turbine(150,566,124,1)+turbine(1010,548,132,1.1)+turbine(1112,558,102,.9)+turbine(700,586,92,.8);
  var win='';for(var y=306;y<=586;y+=20)win+='<line x1="418" x2="476" y1="'+y+'" y2="'+y+'" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>';
  var win2='';for(var yy=380;yy<=590;yy+=22)win2+='<line x1="1046" x2="1104" y1="'+yy+'" y2="'+yy+'" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>';
  s+='<g class="mid"><path d="M170 610V336Q200 296 230 336V610Z" fill="url(#gT2)"/>'
   +'<path d="M292 610C282 440 312 300 348 166C372 300 396 450 390 610Z" fill="url(#gT1)"/><path d="M330 600C326 450 336 320 348 200C352 320 358 450 356 600Z" fill="#fff" opacity=".22"/>'
   +'<rect x="410" y="290" width="74" height="320" rx="6" fill="url(#gT2)"/>'+win
   +'<rect x="520" y="476" width="124" height="134" rx="8" fill="#7CC4EE"/><path d="M532 500h100M532 524h100M532 548h100M532 572h100" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>'
   +'<path d="M760 610V340A58 58 0 0 1 876 340V610Z" fill="url(#gT1)"/><path d="M782 610V352A36 36 0 0 1 854 352V610M818 316V610" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/>'
   +'<path d="M902 610C892 470 942 380 922 246C962 330 992 450 978 610Z" fill="url(#gT3)"/><path d="M930 600C928 480 950 400 940 300C960 380 966 480 958 600Z" fill="#fff" opacity=".2"/>'
   +'<rect x="1040" y="364" width="70" height="246" rx="6" fill="url(#gT1)"/>'+win2+'</g>';
  s+='<path d="M-40 690C240 628 420 696 640 664C860 632 1000 694 1240 652V900H-40Z" fill="#6DB547"/>';
  s+='<path d="M430 820C470 744 560 722 600 692C640 662 700 652 760 642L806 648C744 664 692 678 662 702C612 740 562 772 560 820Z" fill="url(#gRiver)"/><path d="M500 790C530 752 580 728 616 706M560 806C590 768 630 728 690 694" fill="none" stroke="#9ED8F4" stroke-width="3" stroke-dasharray="18 14" stroke-linecap="round"/>';
  s+='<path d="M830 820C806 744 744 704 700 672L734 668C792 702 874 744 980 820Z" fill="#EEF1A6"/>';
  s+='<g><polygon points="214,650 300,640 318,672 230,684" fill="#4C98E2"/><path d="M236 648l12 32M260 645l12 32M284 642l12 32M222 666h90" stroke="#fff" stroke-width="1.6" opacity=".8"/><polygon points="890,700 960,692 976,720 904,730" fill="#4C98E2"/><path d="M910 698l10 28M934 695l10 28M898 714h72" stroke="#fff" stroke-width="1.6" opacity=".8"/></g>';
  [[100,680],[300,632],[520,606],[720,592],[920,572],[1120,546]].forEach(function(p){s+='<rect x="'+(p[0]-5)+'" y="'+(p[1]+10)+'" width="10" height="140" fill="#DCEAF0"/>'});
  s+='<path d="'+TRK+'" fill="none" stroke="#8DBEDC" stroke-width="6" transform="translate(0 9)"/><path id="trk-'+id+'" class="trk" d="'+TRK+'" fill="none" stroke="#F6FBFD" stroke-width="15" stroke-linecap="round"/>';
  s+='<path d="M560 600Q620 512 690 592M600 600Q650 540 690 592" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>';
  s+='<g class="train" transform="translate(330 622) rotate(-7)"><path d="M-110 -12H40C70-12 92-4 100 6C92 14 70 18 40 18H-110Z" fill="#fff"/><path d="M-100 -6H42C58-6 72-2 80 4L-100 4Z" fill="#23313E"/><path d="M-60 -6l-16 10M-20 -6l-16 10M20 -6l-16 10" stroke="#5EB9EC" stroke-width="3" opacity=".7"/><rect x="-110" y="10" width="200" height="3" fill="#5EB9EC"/></g>';
  s+=tree(70,720,1.3,0)+tree(150,745,1,1)+tree(320,720,1.15,0)+tree(380,760,.9,1)+tree(690,700,1,1)+tree(740,740,1.25,0)+tree(860,690,1.1,0)+tree(560,770,.8,1);
  s+='<g class="house"><path d="M940 820V640C1010 618 1110 610 1240 618V820Z" fill="#F3F8FA"/><rect x="960" y="660" width="290" height="46" fill="#6CBFEE"/><path d="M928 642C1008 612 1110 602 1240 610V628C1110 620 1010 628 940 654Z" fill="#fff"/><rect x="960" y="726" width="290" height="40" fill="#5AAFE6"/><path d="M940 714C1010 702 1110 696 1240 700V716C1110 712 1010 716 940 726Z" fill="#fff"/><polygon points="996,606 1076,596 1090,618 1008,628" fill="#4C98E2"/><path d="M1016 602l8 24M1040 599l8 24M1060 597l8 24" stroke="#fff" stroke-width="1.6"/></g>';
  s+=tree(1180,650,1.2,1)+tree(1000,800,1.4,0)+tree(-10,820,1.8,1);
  s+=leaf(-20,790,-30,1.6,'#1F6B3A')+leaf(10,800,-60,1.3,'#2E8B46')+leaf(1230,800,210,1.6,'#1F6B3A')+leaf(1200,812,240,1.2,'#2E8B46');
  s+='<g class="fly">'+[[260,300,20],[700,250,-30],[980,420,40],[140,460,-10],[560,200,60],[1100,240,10]].map(function(l){return '<path class="fl" transform="translate('+l[0]+' '+l[1]+') rotate('+l[2]+')" d="M0 0C6-9 18-12 28-9C19-2 9 3 0 0Z" fill="#3C9A4E"/>'}).join('')+'</g>';
  return '<svg class="scene" viewBox="'+(vb||'0 0 1200 800')+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-id="'+id+'">'+s+'</svg>';
}
