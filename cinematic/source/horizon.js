import {WebGLRenderer,Scene,OrthographicCamera,PlaneGeometry,ShaderMaterial,Mesh,Vector2} from 'three';
const hero=document.querySelector('.hero'), canvas=document.querySelector('#horizon');
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let renderer,frame,paused=motionQuery.matches,visible=true,active=true,t=0,prev=0,drift=0;
const pointer=new Vector2();
try {
 renderer=new WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
 const scene=new Scene(),camera=new OrthographicCamera(-1,1,1,-1,0,1);
 const material=new ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{uTime:{value:0},uSize:{value:new Vector2()},uPointer:{value:pointer},uDrift:{value:0}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`
 precision highp float;varying vec2 vUv;uniform float uTime,uDrift;uniform vec2 uSize,uPointer;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 float fbm(vec2 p){float a=.5,v=0.;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.02+3.1;a*=.5;}return v;}
 vec3 sunDir(){return normalize(vec3(.35*(uSize.x/uSize.y)+uPointer.x*.014,.13+uDrift*.045,-1.));}
 vec3 sky(vec3 rd){float y=max(rd.y,0.);vec3 c=mix(vec3(.61,.49,.40),vec3(.035,.135,.23),smoothstep(0.,.72,y));c=mix(c,vec3(.94,.72,.45),pow(max(dot(rd,sunDir()),0.),12.)*.32);float d=length(rd-sunDir());float sun=1.-smoothstep(.029,.033,d);c+=vec3(1.,.78,.39)*sun*1.3; c+=vec3(.92,.48,.14)*pow(max(dot(rd,sunDir()),0.),240.)*.26;float cloud=fbm(rd.xz*5.+rd.y*20.+vec2(uTime*.004,0.));c+=vec3(.11,.12,.13)*smoothstep(.55,.78,cloud)*smoothstep(.06,.14,rd.y)*(1.-smoothstep(.22,.6,rd.y));return c;}
 float wave(vec2 p){float ti=uTime*.32;return sin(p.x*.54+p.y*.34-ti)*.12+sin(p.y*.91-p.x*.15+ti*.8)*.055+sin(p.x*1.9+p.y*1.55-ti*1.7)*.018+sin(p.y*4.+p.x*2.4-ti*1.1)*.007;}
 void main(){vec2 uv=vUv;vec2 p=uv*2.-1.;p.x*=uSize.x/uSize.y;vec3 ro=vec3(uPointer.x*.12,2.7,8.);vec3 rd=normalize(vec3(p.x,p.y+.105+uPointer.y*.007,-1.48));vec3 col=sky(rd);
 if(rd.y<0.){float distance=-ro.y/rd.y;vec3 pos=ro+rd*distance;for(int i=0;i<3;i++){distance=(wave(pos.xz)-ro.y)/rd.y;pos=ro+rd*distance;}float eps=.04;float h=wave(pos.xz);vec3 n=normalize(vec3(h-wave(pos.xz+vec2(eps,0)),eps,h-wave(pos.xz+vec2(0,eps))));vec3 reflected=reflect(rd,n);float fresnel=pow(1.-max(dot(-rd,n),0.),4.);vec3 deep=vec3(.009,.063,.092);vec3 water=mix(deep,sky(reflected)*.62,.28+fresnel*.65);float spec=pow(max(dot(reflected,sunDir()),0.),150.);float wide=pow(max(dot(reflected,sunDir()),0.),20.);water+=vec3(1.,.59,.19)*spec*.95+vec3(.24,.16,.065)*wide*.25;water+=vec3(.028,.085,.105)*smoothstep(.2,.8,fbm(pos.xz*.4))*max(0.,n.y);float haze=1.-exp(-distance*.0035);water=mix(water,vec3(.50,.47,.43),haze*.9);col=water;}
 // A low, distant coastline, kept away from the sun's reflection.
 float horizon=.4475;float landHeight=.018+.035*fbm(vec2(uv.x*11.,3.))+pow(max(0.,1.-uv.x/.48),2.)*.12;
 float coast=(1.-smoothstep(horizon+landHeight-.001,horizon+landHeight+.001,uv.y))*(1.-smoothstep(.38,.66,uv.x))*smoothstep(horizon-.013,horizon+.001,uv.y);col=mix(col,vec3(.025,.095,.13),coast*.94);
 float vignette=(1.-smoothstep(.2,1.4,length((uv-vec2(.65,.5))*vec2(.9,1.))));col*=.75+.25*vignette;col+= (hash(gl_FragCoord.xy+fract(uTime)*71.)-.5)*.008;
 gl_FragColor=vec4(col,1.);
 }`});
 scene.add(new Mesh(new PlaneGeometry(2,2),material));
 const paint=()=>{material.uniforms.uTime.value=t;material.uniforms.uDrift.value=drift;renderer.render(scene,camera);};
 const size=()=>{const w=hero.clientWidth,h=hero.clientHeight;renderer.setSize(w,h,false);material.uniforms.uSize.value.set(w,h);paint();};
 new ResizeObserver(size).observe(hero);size();
 const loop=now=>{frame=undefined;if(!visible||document.hidden||paused||!active)return;if(now-prev<33){frame=requestAnimationFrame(loop);return;}t+=Math.min((now-prev)/1000,.05);prev=now;paint();frame=requestAnimationFrame(loop);};
 const start=()=>{if(frame===undefined&&!paused&&visible&&!document.hidden&&active){prev=performance.now();frame=requestAnimationFrame(loop);}};
 const stop=()=>{if(frame!==undefined)cancelAnimationFrame(frame);frame=undefined;};
 const toggle=document.querySelector('#motion');const setToggle=()=>{toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Play scene':'Pause scene';};setToggle();
 toggle.addEventListener('click',()=>{paused=!paused;setToggle();if(paused){stop();paint();}else start();});
 motionQuery.addEventListener('change',e=>{paused=e.matches;setToggle();if(paused){stop();paint();}else start();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop();},{threshold:0}).observe(hero);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start();});
 hero.addEventListener('pointermove',e=>{if(paused||e.pointerType==='touch')return;const r=hero.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5);},{passive:true});
 hero.addEventListener('pointerleave',()=>pointer.set(0,0),{passive:true});
 window.addEventListener('scroll',()=>{drift=Math.max(0,Math.min(1,window.scrollY/hero.clientHeight));},{passive:true});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();active=false;stop();hero.classList.remove('webgl-ready');toggle.hidden=true;});
 canvas.addEventListener('webglcontextrestored',()=>{active=true;paint();hero.classList.add('webgl-ready');toggle.hidden=false;start();});
 hero.classList.add('webgl-ready');toggle.hidden=false;start();
} catch(error){canvas.hidden=true;document.querySelector('#motion').hidden=true;console.info('Horizon uses its still-image fallback on this device.');}
