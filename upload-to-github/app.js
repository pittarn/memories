(function(){
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);
const rnd=(a,b)=>a+Math.random()*(b-a);

/* ---------------- rose sprites (drawn in SVG, rasterised) ---------------- */
const petal=(l,w)=>`M0,0 C${-w*1.15},${-l*.18} ${-w},${-l*1.06} 0,${-l} C${w},${-l*1.06} ${w*1.15},${-l*.18} 0,0Z`;
const PAL={
  red:{o:["#3a030b","#9c0f22","#e3304a"],i:["#24020a","#b5142a"],e:"#4d0510",c:"#2a030a"},
  white:{o:["#a89a88","#e9e2d6","#ffffff"],i:["#cdb48a","#fbf5ea"],e:"#9d8e7a",c:"#c9b07f"}
};
function roseSVG(kind,leaves){
  const p=PAL[kind]; let s="";
  const layers=[[7,50,32],[6,41,27],[6,32,21],[5,23,15],[4,14,10]];
  s+=`<defs><linearGradient id="o" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${p.o[0]}"/><stop offset=".55" stop-color="${p.o[1]}"/><stop offset="1" stop-color="${p.o[2]}"/></linearGradient>
  <linearGradient id="i" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${p.i[0]}"/><stop offset="1" stop-color="${p.i[1]}"/></linearGradient>
  <radialGradient id="sh"><stop offset=".25" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <linearGradient id="lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f4a1d"/><stop offset="1" stop-color="#5f9442"/></linearGradient></defs>`;
  if(leaves){ [[-150+rnd(-15,15)],[-30+rnd(-15,15)],[100+rnd(-20,20)]].forEach(([a])=>{
    s+=`<path transform="rotate(${a}) translate(34,0)" d="M0,0 C10,-14 34,-14 46,0 C34,14 10,14 0,0Z" fill="url(#lf)"/><path transform="rotate(${a}) translate(34,0)" d="M2,0 L44,0" stroke="#173a16" stroke-width="1"/>`;}); }
  layers.forEach(([n,l,w],k)=>{
    const off=rnd(0,360), fill=k<3?"url(#o)":"url(#i)";
    for(let j=0;j<n;j++){
      const a=off+j*360/n+rnd(-8,8), ll=l*rnd(.92,1.06);
      s+=`<path d="${petal(ll,w*rnd(.9,1.08))}" fill="${fill}" stroke="${p.e}" stroke-width=".7" stroke-opacity=".55" transform="rotate(${a.toFixed(1)})"/>`;
    }
    if(k<4) s+=`<circle r="${l*.55}" fill="url(#sh)"/>`;
  });
  s+=`<path d="M0,0 m-1,0 a2,2 0 1,1 3,1 a4.5,4.5 0 1,1 -7,-2 a7,7 0 1,1 11,4.5" fill="none" stroke="${p.c}" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>`;
  [145,180,215].forEach(a=>s+=`<path d="${petal(28,19)}" fill="url(#o)" stroke="${p.e}" stroke-width=".7" stroke-opacity=".5" transform="rotate(${a+rnd(-6,6)}) translate(0,-5)"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-90 -90 180 180" width="360" height="360">${s}</svg>`;
}
const svgURL=s=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s);
function loadImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(i);i.src=src})}
const ROSE_RED="rose-red.webp";
const ROSE_WHITE="rose-white.webp";
let SPRITES=[];
const spritesReady=Promise.all([loadImg(ROSE_RED),loadImg(ROSE_WHITE)]).then(([r,w])=>SPRITES=[r,r,r,r,w,w,w,w]);

/* ---------------- placeholder memory art ---------------- */
const ARTPAL=[["#1b1033","#6a1b3a","#f7c6a0"],["#0b0f2a","#2b2f6b","#e8e8ff"],["#fbe4e4","#f2b6be","#c4142c"],["#3a2a24","#8a5a44","#f3d9b1"],
  ["#2a0c22","#d4553f","#ffd39a"],["#f6efe6","#e3cdbb","#9c0f22"],["#0c2a2a","#2d6b62","#e9f5ee"],["#22071a","#7a1238","#ffb3c4"]];
async function makeArt(i){
  await spritesReady;
  const c=document.createElement("canvas");c.width=300;c.height=360;const x=c.getContext("2d");
  const [a,b,acc]=ARTPAL[i%ARTPAL.length];
  const g=x.createLinearGradient(0,0,0,360);g.addColorStop(0,a);g.addColorStop(1,b);x.fillStyle=g;x.fillRect(0,0,300,360);
  x.fillStyle=acc;x.globalAlpha=.9;
  for(let k=0;k<40;k++){x.globalAlpha=Math.random()*.7;x.beginPath();x.arc(Math.random()*300,Math.random()*200,Math.random()*1.4+.3,0,7);x.fill()}
  x.globalAlpha=.95;x.beginPath();x.arc(80+((i*53)%150),90,28,0,7);x.fill();
  x.globalAlpha=1;
  const sp=SPRITES[(i*3)%SPRITES.length];x.drawImage(sp,150-110,200,220,220);
  const sp2=SPRITES[(i*5+4)%SPRITES.length];x.drawImage(sp2,-30,250,150,150);x.drawImage(sp2,190,260,140,140);
  return c.toDataURL("image/jpeg",.85);
}

/* ---------------- bouquet image for the gifts panel ---------------- */
async function makeBouquet(){
  await spritesReady;
  const c=document.createElement("canvas");c.width=400;c.height=440;const x=c.getContext("2d");
  x.fillStyle="#f4ede3";x.fillRect(0,0,400,440);
  // kraft wrap back
  x.fillStyle="#c9a77c";x.beginPath();x.moveTo(70,150);x.lineTo(330,150);x.lineTo(215,430);x.lineTo(185,430);x.closePath();x.fill();
  const pos=[[200,120,150,0],[130,140,120,4],[270,140,125,5],[160,80,115,6],[245,85,118,2],[100,195,105,1],[300,195,105,7],[200,190,120,4]];
  pos.forEach(([px,py,s,k])=>x.drawImage(SPRITES[k],px-s,py-s,s*2,s*2));
  // kraft wrap front
  const g=x.createLinearGradient(80,0,320,0);g.addColorStop(0,"#b98f5f");g.addColorStop(.5,"#d9bb90");g.addColorStop(1,"#b08655");
  x.fillStyle=g;x.beginPath();x.moveTo(95,230);x.quadraticCurveTo(200,270,305,230);x.lineTo(215,430);x.lineTo(185,430);x.closePath();x.fill();
  x.fillStyle="#c4142c";x.beginPath();x.ellipse(200,330,26,9,0,0,7);x.fill();
  return c.toDataURL("image/jpeg",.9);
}

/* ---------------- sky (stars + nebula + particle heart) ---------------- */
const sky=$("sky"),sx=sky.getContext("2d");
let W=0,H=0,DPR=Math.min(devicePixelRatio||1,2);
const STARS=[];for(let i=0;i<340;i++)STARS.push({x:Math.random(),y:Math.random(),r:Math.random()*1.2+.2,t:Math.random()*6.28,s:rnd(.5,2)});
const HEART=[];for(let i=0;i<260;i++){const t=Math.random()*6.28,k=Math.sqrt(Math.random());
  HEART.push({x:16*Math.pow(Math.sin(t),3)*k,y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*k,ph:Math.random()*6.28,r:rnd(.4,1.6)})}
function resize(){W=innerWidth;H=innerHeight;[sky,burst].forEach(c=>{c.width=W*DPR;c.height=H*DPR;c.getContext("2d").setTransform(DPR,0,0,DPR,0,0)})}

/* ---------------- 3D ring ---------------- */
const stage=$("stage"),galaxy=$("galaxy");
const N_CARDS=Math.max(16,CONFIG.memories.length);
const cards=[],words=[];
const view={yaw:0,yawV:.0025,pitch:-1.05,pitchT:-1.05,zoom:.5,zoomT:.5,cy:.55,cyT:.55};
let memArt=[];
async function buildStage(){
  memArt=await Promise.all(CONFIG.memories.map((m,i)=>m.photo?Promise.resolve(m.photo):makeArt(i)));
  for(let i=0;i<N_CARDS;i++){
    const m=i%CONFIG.memories.length;
    const b=document.createElement("button");b.className="card";b.type="button";b.setAttribute("aria-label",CONFIG.memories[m].title);
    const im=document.createElement("img");im.src=memArt[m];im.alt="";b.appendChild(im);
    b.addEventListener("click",e=>{if(dragMoved)return;openMemory(m)});
    stage.appendChild(b);
    const a=i/N_CARDS*Math.PI*2;
    cards.push({el:b,a,r:1+rnd(-.12,.12),y:rnd(-.12,.12)});
  }
  CONFIG.words.forEach((w,i)=>{
    const s=document.createElement("span");s.className="word";s.textContent=w;s.style.opacity=0;stage.appendChild(s);
    words.push({el:s,a:i/CONFIG.words.length*Math.PI*2+.3,r:rnd(.35,.7),y:rnd(-.25,.25)});
  });
}
let showWords=false;
function project(x,y,z,R){
  const cy=Math.cos(view.yaw),sy=Math.sin(view.yaw);
  let X=x*cy-z*sy, Z=x*sy+z*cy;
  const cp=Math.cos(view.pitch),sp=Math.sin(view.pitch);
  let Y=y*cp-Z*sp; Z=y*sp+Z*cp;
  const F=R*3.2, s=F/(F+Z);
  return {X:W/2+X*s,Y:H*view.cy+Y*s,s,Z};
}
function renderStage(){
  const R=Math.min(W,H*1.3)*.42*view.zoom;
  for(const c of cards){
    const p=project(Math.cos(c.a)*R*c.r,c.y*R,Math.sin(c.a)*R*c.r,R);
    const k=Math.max(.35,Math.min(1.35,p.s*view.zoom*.85));
    c.el.style.transform=`translate(${p.X-29}px,${p.Y-35}px) scale(${k})`;
    c.el.style.zIndex=Math.round(1000-p.Z);
    c.el.style.opacity=Math.max(.25,Math.min(1,.55+(-p.Z/R)*.45)).toFixed(2);
  }
  for(const w of words){
    const p=project(Math.cos(w.a)*R*w.r,w.y*R,Math.sin(w.a)*R*w.r,R);
    w.el.style.transform=`translate(${p.X}px,${p.Y}px) translate(-50%,-50%) scale(${Math.max(.6,p.s).toFixed(2)})`;
    w.el.style.zIndex=Math.round(1000-p.Z);
    w.el.style.opacity=showWords?Math.max(.35,Math.min(1,.7-(p.Z/R)*.4)).toFixed(2):0;
  }
}
let t0=performance.now();
function drawSky(t){
  sx.clearRect(0,0,W,H);
  sx.fillStyle="#07040a";sx.fillRect(0,0,W,H);
  const cx=W/2,cy=H*view.cy,neb=Math.min(W,H)*.55*Math.max(.7,view.zoom);
  let g=sx.createRadialGradient(cx,cy,0,cx,cy,neb);
  g.addColorStop(0,"rgba(140,20,60,.55)");g.addColorStop(.45,"rgba(91,15,42,.25)");g.addColorStop(1,"rgba(7,4,10,0)");
  sx.fillStyle=g;sx.fillRect(0,0,W,H);
  for(const s of STARS){
    const tw=.5+.5*Math.sin(t*.001*s.s+s.t);
    sx.globalAlpha=.25+tw*.75;sx.fillStyle="#fff";
    sx.beginPath();sx.arc(((s.x*W+view.yaw*12*s.r)%W+W)%W,s.y*H,s.r,0,7);sx.fill();
  }
  const hs=Math.min(W,H)*.0042*Math.max(.7,view.zoom)*(1+.04*Math.sin(t*.003));
  for(const p of HEART){
    sx.globalAlpha=.4+.6*Math.abs(Math.sin(t*.0015+p.ph));
    sx.fillStyle=p.r>1.2?"#ffd0da":"#ff6b8a";
    sx.beginPath();sx.arc(cx+p.x*hs,cy+p.y*hs,p.r,0,7);sx.fill();
  }
  sx.globalAlpha=1;
}
function loop(t){
  const dt=Math.min(50,t-t0);t0=t;
  if(!dragging) view.yaw+=view.yawV*(reduce?.3:1)*dt/16;
  view.yawV+=(.0022-view.yawV)*.02;
  view.pitch+=(view.pitchT-view.pitch)*.04;
  view.zoom+=(view.zoomT-view.zoom)*.04;
  view.cy+=(view.cyT-view.cy)*.04;
  drawSky(t);renderStage();
  requestAnimationFrame(loop);
}

/* drag / zoom */
let dragging=false,dragMoved=false,lastX=0,pts=new Map(),pinch0=0,zoom0=1;
galaxy.addEventListener("pointerdown",e=>{
  if(!galaxy.classList.contains("explore")||e.target.closest(".veil,#gifts,.btn"))return;
  pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pts.size===2){const [a,b]=[...pts.values()];pinch0=Math.hypot(a.x-b.x,a.y-b.y);zoom0=view.zoomT}
  dragging=true;dragMoved=false;lastX=e.clientX;
});
addEventListener("pointermove",e=>{
  if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pts.size===2){const [a,b]=[...pts.values()];view.zoomT=Math.max(.6,Math.min(2.2,zoom0*Math.hypot(a.x-b.x,a.y-b.y)/pinch0));dragMoved=true;return}
  const dx=e.clientX-lastX;lastX=e.clientX;if(Math.abs(dx)>1)dragMoved=true;
  view.yaw+=dx*.006;view.yawV=dx*.0015;
});
const up=e=>{pts.delete(e.pointerId);if(!pts.size){dragging=false;setTimeout(()=>dragMoved=false,30)}};
addEventListener("pointerup",up);addEventListener("pointercancel",up);
galaxy.addEventListener("wheel",e=>{if(!galaxy.classList.contains("explore"))return;e.preventDefault();
  view.zoomT=Math.max(.6,Math.min(2.2,view.zoomT*(e.deltaY>0?.92:1.08)))},{passive:false});

/* ---------------- story steps ---------------- */
const STEPS=[
  {pitch:-1.12,zoom:.5,cy:.55,btn:"Start"},
  {pitch:-.6,zoom:1,cy:.56,btn:"Continue"},
  {pitch:-.45,zoom:1.15,cy:.58,btn:"Continue",words:true},
];
let step=0;
function setTitle(txt){const h=$("title");h.classList.add("swap");setTimeout(()=>{h.textContent=txt;h.classList.remove("swap")},450)}
function goStep(i){
  step=i;const s=STEPS[i];
  view.pitchT=s.pitch;view.zoomT=s.zoom;view.cyT=s.cy;showWords=!!s.words;
  setTitle(CONFIG.steps[i]);$("next").textContent=s.btn;
  [...$("dots").children].forEach((d,k)=>d.classList.toggle("on",k===i));
}
$("next").addEventListener("click",()=>{
  if(galaxy.classList.contains("explore")){$("finale").classList.add("show");return}
  if(step<STEPS.length-1)goStep(step+1);
  else{[...$("dots").children].forEach((d,k)=>d.classList.toggle("on",k===3));$("lastThing").classList.add("show")}
});
$("explore").addEventListener("click",()=>{
  $("lastThing").classList.remove("show");
  galaxy.classList.add("explore");showWords=true;
  view.pitchT=-.32;view.zoomT=1.25;view.cyT=.54;
  $("pill").textContent="Galaxy of My Love · drag to rotate · scroll to zoom";$("eyebrow").style.display="none";
  $("next").textContent="Finished";$("dots").style.visibility="hidden";
  if(innerWidth>720)$("gifts").classList.add("open");
  setTimeout(openVideo,900);
});
$("giftsToggle").addEventListener("click",()=>$("gifts").classList.toggle("open"));
function openMemory(m){
  const d=CONFIG.memories[m];$("memImg").src=memArt[m];$("memPlace").textContent=d.place;$("memTitle").textContent=d.title;$("memDate").textContent=d.date;
  $("memVeil").classList.add("show");$("memClose").focus();
}
$("memClose").addEventListener("click",()=>$("memVeil").classList.remove("show"));
$("memVeil").addEventListener("click",e=>{if(e.target.id==="memVeil")$("memVeil").classList.remove("show")});
addEventListener("keydown",e=>{if(e.key==="Escape"){$("memVeil").classList.remove("show");$("vidVeil").classList.remove("show")}});

/* ---------------- intro → burst ---------------- */
const burst=$("burst"),bx=burst.getContext("2d");
let opened=false;
async function openGift(){
  if(opened)return;opened=true;
  $("gift").classList.add("open");document.querySelector(".hint").style.display="none";
  await spritesReady;
  if(reduce){$("intro").classList.add("gone");startGalaxy();return}
  const gb=$("gift").getBoundingClientRect(),ox=gb.left+gb.width/2,oy=gb.top+gb.height*.45;
  const N=Math.round(Math.min(150,Math.max(70,W*H/9000)));
  const cell=Math.sqrt(W*H/N);
  const R=[];
  const cols=Math.ceil(W/cell)+1,rows=Math.ceil(H/cell)+1;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    R.push({tx:c*cell+rnd(-.4,.4)*cell,ty:r*cell+rnd(-.4,.4)*cell,size:cell*rnd(1.25,1.9),sp:SPRITES[(Math.random()*SPRITES.length)|0],
      d:rnd(0,1100),rot0:rnd(-2,2),rot:rnd(-.5,.5),fall:rnd(0,1400),vy:0,g:rnd(.00045,.0009),spin:rnd(-.002,.002)});
  }
  R.sort((a,b)=>a.size-b.size);
  const T0=performance.now(),COVER=2300,FALL=COVER+400;
  let galaxyStarted=false;
  function frame(now){
    const t=now-T0;bx.clearRect(0,0,W,H);let alive=0;
    for(const p of R){
      let k=Math.max(0,Math.min(1,(t-p.d)/1100));if(k<=0)continue;
      const e=1-Math.pow(1-k,3);
      let x=ox+(p.tx-ox)*e,y=oy+(p.ty-oy)*e,s=p.size*(.15+.85*e),a=p.rot0*(1-e)+p.rot;
      const ft=t-FALL-p.fall;
      if(ft>0){y+=.5*p.g*ft*ft;a+=p.spin*ft}
      if(y-s/2>H)continue;alive++;
      bx.save();bx.translate(x,y);bx.rotate(a);bx.drawImage(p.sp,-s/2,-s/2,s,s);bx.restore();
    }
    if(t>COVER-300&&!galaxyStarted){galaxyStarted=true;$("intro").classList.add("gone");startGalaxy()}
    if(t<FALL||alive>0)requestAnimationFrame(frame);else bx.clearRect(0,0,W,H);
  }
  requestAnimationFrame(frame);
}
$("gift").addEventListener("click",openGift);$("heartbtn").addEventListener("click",openGift);

function startGalaxy(){
  goStep(0);
  setTimeout(()=>galaxy.classList.add("ready"),reduce?0:900);
}
function restart(){
  ["finale","lastThing","memVeil","vidVeil"].forEach(id=>$(id).classList.remove("show"));vid.pause();vid.currentTime=0;
  galaxy.classList.remove("explore","ready");$("gifts").classList.remove("open");
  $("pill").textContent="Galaxy of My Love";$("eyebrow").style.display="";$("dots").style.visibility="";
  showWords=false;view.pitchT=-1.12;view.zoomT=.5;
  opened=false;$("gift").classList.remove("open");document.querySelector(".hint").style.display="";
  $("intro").classList.remove("gone");
}
$("again1").addEventListener("click",restart);$("again2").addEventListener("click",restart);

/* ---------------- fill text ---------------- */
$("ltText").textContent=CONFIG.lastThing;$("ltSign").textContent=CONFIG.signature;
$("noteText").textContent=CONFIG.note;$("noteSign").textContent=CONFIG.signature;
$("movieTitle").textContent=CONFIG.video.title;$("vidCap").textContent=CONFIG.video.caption;
const vid=$("vid"),PLAY="M3 1.5v9l7.5-4.5z",PAUSE="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z";
function syncPlay(){const on=!vid.paused;$("playIcon").setAttribute("d",on?PAUSE:PLAY);$("movieCard").classList.toggle("playing",on)}
vid.addEventListener("play",syncPlay);vid.addEventListener("pause",syncPlay);
function openVideo(){$("vidVeil").classList.add("show");vid.play().catch(()=>{});}
$("movieOpen").addEventListener("click",openVideo);
$("moviePlay").addEventListener("click",()=>{vid.paused?vid.play().catch(()=>{}):vid.pause()});
$("vidClose").addEventListener("click",()=>$("vidVeil").classList.remove("show"));
$("finaleText").textContent=CONFIG.finale;

/* ---------------- boot ---------------- */
resize();addEventListener("resize",resize);
buildStage();
goStep(0);
requestAnimationFrame(loop);
})();
