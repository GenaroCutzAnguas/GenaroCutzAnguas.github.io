/* Three.js hero scene. Data profile: layered medallion slabs. Software profile: a connected cube of services. */
(function(){
  'use strict';
  var host=document.getElementById('stage');
  if(!host||!window.THREE)return;
  var T=THREE,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,renderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true})}catch(e){host.hidden=true;return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  host.appendChild(renderer.domElement);

  var scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,50),world=new T.Group();
  cam.position.set(0,0,9);world.rotation.x=.35;scene.add(world);
  scene.add(new T.AmbientLight(0xffffff,.7));
  var sun=new T.DirectionalLight(0xffffff,.9);sun.position.set(4,6,5);scene.add(sun);
  function metal(c){return new T.MeshStandardMaterial({color:c,metalness:.85,roughness:.3})}
  function edges(geo,c,o){return new T.LineSegments(new T.EdgesGeometry(geo),new T.LineBasicMaterial({color:c,transparent:true,opacity:o}))}

  /* Data: three hexagonal slabs and particles rising through them */
  var dataG=new T.Group(),slabs=[],N=120,pos=new Float32Array(N*3),speed=[],k;
  [[0xB87333,-1.1],[0xA9B7C6,0],[0xE8B73A,1.1]].forEach(function(s){
    var m=new T.Mesh(new T.CylinderGeometry(1.6,1.6,.4,6),metal(s[0]));
    m.position.y=s[1];m.add(edges(m.geometry,0xffffff,.35));dataG.add(m);slabs.push(m);
  });
  for(k=0;k<N;k++){pos[k*3]=(Math.random()-.5)*2.4;pos[k*3+1]=Math.random()*4.4-2.2;pos[k*3+2]=(Math.random()-.5)*2.4;speed.push(.006+Math.random()*.012)}
  var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pos,3));
  dataG.add(new T.Points(pg,new T.PointsMaterial({color:0xE8B73A,size:.07})));

  /* Software: wireframe cube, glowing core, corner nodes and orbiting services */
  var swG=new T.Group(),orbits=[],core=new T.Mesh(new T.IcosahedronGeometry(.8,1),new T.MeshBasicMaterial({color:0x35D0E0,wireframe:true}));
  swG.add(edges(new T.BoxGeometry(2.4,2.4,2.4),0x8B8CFF,.9),core);
  [-1,1].forEach(function(x){[-1,1].forEach(function(y){[-1,1].forEach(function(z){
    var n=new T.Mesh(new T.SphereGeometry(.13,16,16),metal(0xA9B7C6));n.position.set(x*1.2,y*1.2,z*1.2);swG.add(n);
  })})});
  [0x8B8CFF,0x35D0E0,0xA9B7C6].forEach(function(c,i){
    var pivot=new T.Group(),o=new T.Mesh(new T.SphereGeometry(.2,20,20),metal(c));
    pivot.rotation.set(i*1.05,0,i*.6);o.position.x=2.2;pivot.add(o);swG.add(pivot);orbits.push(pivot);
  });
  world.add(dataG,swG);

  /* State */
  var cur={d:1,s:0},tgt={d:1,s:0},mx=0,my=0,running=false,visible=true;
  function setScale(){dataG.scale.setScalar(Math.max(cur.d,.001));dataG.visible=cur.d>.01;swG.scale.setScalar(Math.max(cur.s,.001));swG.visible=cur.s>.01}
  document.addEventListener('profilechange',function(e){tgt.d=e.detail==='data'?1:0;tgt.s=1-tgt.d;if(reduce){cur.d=tgt.d;cur.s=tgt.s;setScale();draw()}else start()});
  addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});

  function resize(){var w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();draw()}
  function draw(){renderer.render(scene,cam)}
  function frame(){
    cur.d+=(tgt.d-cur.d)*.08;cur.s+=(tgt.s-cur.s)*.08;setScale();
    slabs.forEach(function(m,i){m.rotation.y+=.004*(i+1)*(i%2?-1:1)});
    var a=pg.attributes.position;for(k=0;k<N;k++){a.array[k*3+1]+=speed[k];if(a.array[k*3+1]>2.2)a.array[k*3+1]=-2.2}a.needsUpdate=true;
    swG.rotation.y+=.004;core.rotation.x+=.01;core.rotation.y+=.012;orbits.forEach(function(p,i){p.rotation.y+=.012+i*.004});
    world.rotation.y+=(mx*1.2-world.rotation.y)*.04;world.rotation.x+=(.35+my*.5-world.rotation.x)*.04;
    draw();
  }
  function loop(){if(!running)return;requestAnimationFrame(loop);frame()}
  function start(){if(reduce||running||!visible||document.hidden)return;running=true;loop()}
  function stop(){running=false}

  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(function(en){visible=en[0].isIntersecting;visible?start():stop()}).observe(host);
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
  addEventListener('pagehide',function(){stop();renderer.dispose()});
  setScale();resize();start();
})();