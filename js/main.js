(function(){
var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
root.classList.add('js');
document.getElementById('yr').textContent=new Date().getFullYear();
try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
document.getElementById('theme').addEventListener('click',function(){
  var d=root.getAttribute('data-theme')==='dark'||(!root.hasAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches),n=d?'light':'dark';
  root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}
});
var prog=document.getElementById('prog');
function sc(){prog.style.transform='scaleX('+(root.scrollTop/((root.scrollHeight-root.clientHeight)||1))+')'}
addEventListener('scroll',sc,{passive:true});sc();

/* Hero: DAG run */
var tasks=[],dagEl=document.getElementById('dag'),log=document.getElementById('log'),timer,curDag;
function line(txt,cls){var d=document.createElement('div');if(cls)d.className=cls;d.textContent=txt;log.appendChild(d)}
function play(){
  clearTimeout(timer);log.textContent='';
  tasks.forEach(function(x){x.className='task'});
  var i=0;(function step(){
    if(i>=tasks.length){line(curDag.done,'g');return}
    var x=tasks[i];x.classList.add('is-running');line('['+x.textContent+'] running...','y');
    timer=setTimeout(function(){x.className='task ok';line('['+x.textContent+'] '+x.dataset.log);i++;step()},900);
  })();
}
document.getElementById('replay').addEventListener('click',function(){if(reduce){return}play()});
function buildDag(c){
  curDag=c;clearTimeout(timer);dagEl.textContent='';
  tasks=c.tasks.map(function(t){var d=document.createElement('div');d.className='task ok';d.textContent=t[0];d.dataset.log=t[1];dagEl.appendChild(d);return d});
  log.textContent='';line(c.done,'g');
}

/* Stack explorer */
var L=[];
var tabs=document.getElementById('tabs'),panel=document.getElementById('panel');
function show(i){
  var l=L[i];
  [].forEach.call(tabs.children,function(b,j){b.setAttribute('aria-selected',j===i)});
  panel.innerHTML='';
  var p=document.createElement('div');p.className='panel';p.style.setProperty('--c',l.c);
  var a=document.createElement('div'),h=document.createElement('h3'),q=document.createElement('p');
  h.textContent=l.n;q.textContent=l.d;a.appendChild(h);a.appendChild(q);
  var ul=document.createElement('ul');ul.className='chips';
  l.t.forEach(function(x,k){
    var li=document.createElement('li');li.textContent=x[0];li.dataset.tip=x[1];li.tabIndex=0;li.style.setProperty('--k',k);
    function place(){var r=li.getBoundingClientRect(),c=r.left+r.width/2,s=0;if(c-115<8)s=8-(c-115);else if(c+115>innerWidth-8)s=innerWidth-8-(c+115);li.style.setProperty('--sx',s+'px')}
    li.addEventListener('mouseenter',place);li.addEventListener('focus',place);ul.appendChild(li);
  });
  p.appendChild(a);p.appendChild(ul);panel.appendChild(p);
}
function buildStack(list){
  L=list;tabs.textContent='';
  L.forEach(function(l,i){
    var b=document.createElement('button');b.className='tab';b.type='button';b.setAttribute('role','tab');b.style.setProperty('--c',l.c);
    b.innerHTML='<i></i>';b.appendChild(document.createTextNode(l.n));b.addEventListener('click',function(){show(i)});tabs.appendChild(b);
  });
  show(0);
}

/* Query console */
var Q=[
{s:'SELECT company, role, period FROM experience;',r:[{company:'Banco Base',role:'Data Engineer & Data Governance Analyst',period:'Oct 2025 - Oct 2026'},{company:'Greenfield Team',role:'Backend Developer & Data Analyst',period:'May 2023 - Nov 2023'}]},
{s:'SELECT * FROM education;',r:[{degree:"Bachelor's in Software Engineering",school:'FMAT, UADY',years:'2021 - 2026'}]},
{s:'SELECT name, issuer FROM certifications;',r:[{name:'CCNA: Introduction to Networks',issuer:'Cisco'},{name:'Using Databases with Python',issuer:'University of Michigan'},{name:'Foundations of Project Management',issuer:'Google'},{name:'NoSQL Systems',issuer:'UNAM'},{name:'Operating Systems Fundamentals',issuer:'Akamai Technologies'}]},
{s:'SELECT * FROM languages;',r:[{language:'Spanish',level:'Native'},{language:'English',level:'B1 (Intermediate)'}]},
{s:'SELECT email, linkedin, github FROM contact;',r:[{email:'genarocutz15@gmail.com',linkedin:'genaro-cutz-anguas-b20622220',github:'GenaroCutzAnguas'}]}];
var qs=document.getElementById('qs'),con=document.getElementById('con'),tok=0;
function table(rows){
  var tb=document.createElement('table'),k=Object.keys(rows[0]),tr=document.createElement('tr');
  k.forEach(function(c){var th=document.createElement('th');th.textContent=c;tr.appendChild(th)});tb.appendChild(tr);
  rows.forEach(function(row,i){var r=document.createElement('tr');k.forEach(function(c){var td=document.createElement('td');td.style.setProperty('--r',i);td.textContent=row[c];r.appendChild(td)});tb.appendChild(r)});
  return tb;
}
function run(i,instant){
  var my=++tok;
  [].forEach.call(qs.children,function(b,j){b.setAttribute('aria-pressed',j===i)});
  con.textContent='';var pr=document.createElement('div');pr.className='pr';con.appendChild(pr);
  function done(){if(my!==tok)return;pr.textContent='duckdb> '+Q[i].s;con.appendChild(table(Q[i].r))}
  if(reduce||instant){done();return}
  var n=0;(function type(){if(my!==tok)return;pr.textContent='duckdb> '+Q[i].s.slice(0,n++);if(n<=Q[i].s.length)setTimeout(type,18);else setTimeout(done,150)})();
}
Q.forEach(function(q,i){var b=document.createElement('button');b.className='q';b.type='button';b.textContent=q.s.split(' FROM ')[1].replace(';','');b.addEventListener('click',function(){run(i)});qs.appendChild(b)});
run(0,true);

/* Dashboard */
var D={Retail:[42,48,51,47,58,64],Online:[30,36,44,52,61,73],Wholesale:[22,25,21,29,31,35]},M=['Jan','Feb','Mar','Apr','May','Jun'],CH=['Retail','Online','Wholesale'],CL={Retail:'var(--bronze)',Online:'var(--silver)',Wholesale:'var(--gold)'},dash=document.getElementById('dash'),dsel='All';
function vals(c){return M.map(function(_,i){return c==='All'?D.Retail[i]+D.Online[i]+D.Wholesale[i]:D[c][i]})}
var T={},tot=0;CH.forEach(function(c){T[c]=D[c].reduce(function(a,b){return a+b},0);tot+=T[c]});
var b='<svg viewBox="0 0 420 200" role="img" aria-label="Bar chart of monthly revenue"><defs><linearGradient id="bgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--gold)"/><stop offset="1" style="stop-color:var(--bronze)"/></linearGradient></defs>';
[30,100,170].forEach(function(y){b+='<line x1="10" x2="410" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-dasharray="3 4"/>'});
M.forEach(function(m,i){var x=20+i*66;b+='<g class="bg" tabindex="0"><rect class="bar" x="'+x+'" y="30" width="40" height="140" rx="6" fill="url(#bgr)" style="transition-delay:'+i*80+'ms"/><text class="val" x="'+(x+20)+'" y="24"></text><text x="'+(x+20)+'" y="190">'+m+'</text></g>'});
document.getElementById('bars').innerHTML=b+'</svg>';
var d='<svg viewBox="0 0 42 42" role="img" aria-label="Donut chart of revenue share by channel"><circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--line)" stroke-width="5"/>';
CH.forEach(function(c){d+='<circle class="seg" data-c="'+c+'" cx="21" cy="21" r="15.915" fill="none" stroke="'+CL[c]+'" stroke-width="5" stroke-dasharray="0 100"/>'});
document.getElementById('don').innerHTML=d+'<text class="ct" x="21" y="23" id="ct"></text></svg>';
var bars=dash.querySelectorAll('.bar'),vals_=dash.querySelectorAll('.val'),segs=dash.querySelectorAll('.seg');
function draw(c){
  var v=vals(c),mx=Math.max.apply(null,v)*1.1;
  v.forEach(function(n,i){bars[i].style.setProperty('--s',n/mx);vals_[i].textContent=n+'k';vals_[i].setAttribute('y',170-140*n/mx-6)});
  var acc=0,on=dash.classList.contains('on');
  segs.forEach(function(sg,i){var k=CH[i],pc=T[k]/tot*100;sg.setAttribute('stroke-dasharray',on?(pc-.6)+' '+(100-pc+.6):'0 100');sg.setAttribute('stroke-dashoffset',25-acc);acc+=pc;sg.style.opacity=(c==='All'||c===k)?1:.2});
  document.getElementById('ct').textContent=c==='All'?'$'+tot+'k':Math.round(T[c]/tot*100)+'%';
}
function cnt(id,to,f){
  var el=document.getElementById(id),from=+el.dataset.v||0,t0=performance.now();el.dataset.v=to;
  if(reduce){el.textContent=f(to);return}
  (function f2(t){var k=Math.min(1,(t-t0)/700),e=1-Math.pow(1-k,3);el.textContent=f(from+(to-from)*e);if(k<1)requestAnimationFrame(f2)})(t0);
}
function kpis(c){
  var v=vals(c),sum=v.reduce(function(a,b){return a+b},0);
  cnt('k1',sum,function(n){return '$'+Math.round(n)+'k'});
  cnt('k2',Math.round(sum*9.4),function(n){return Math.round(n).toLocaleString('en-US')});
  cnt('k3',Math.round((v[5]/v[0]-1)*100),function(n){return '+'+Math.round(n)+'%'});
}
var sl=document.getElementById('sl');
['All'].concat(CH).forEach(function(c){
  var bt=document.createElement('button');bt.type='button';bt.className='sl';bt.textContent=c;bt.setAttribute('aria-pressed',c==='All');
  bt.addEventListener('click',function(){dsel=c;[].forEach.call(sl.children,function(x){x.setAttribute('aria-pressed',x===bt)});draw(c);kpis(c)});
  sl.appendChild(bt);
});
draw('All');
function startDash(){dash.classList.add('on');draw('All');kpis('All')}
if('IntersectionObserver' in window){var dio=new IntersectionObserver(function(en){if(en[0].isIntersecting){startDash();dio.disconnect()}},{threshold:.35});dio.observe(dash)}else startDash();

/* Profile switch */
var P=window.PROFILE_DATA,sw=document.getElementById('switch'),btns=[].slice.call(sw.children),cur,mainEl=document.getElementById('main');
function apply(name,first){
  cur=name;root.setAttribute('data-profile',name);document.title=P[name].title;
  btns.forEach(function(b){var on=b.dataset.profile===name;b.setAttribute('aria-checked',on);b.tabIndex=on?0:-1});
  buildStack(P[name].stack);buildDag(P[name].dag);
  document.dispatchEvent(new CustomEvent('profilechange',{detail:name}));
  if(!reduce)setTimeout(play,first?900:150);
}
function setProfile(name){
  if(name===cur)return;
  try{localStorage.setItem('profile',name)}catch(e){}
  try{var u=new URL(location.href);u.searchParams.set('profile',name);history.replaceState(null,'',u)}catch(e){}
  if(reduce){apply(name);return}
  mainEl.classList.add('swap');
  setTimeout(function(){apply(name);mainEl.classList.remove('swap')},220);
}
btns.forEach(function(b,i){
  b.addEventListener('click',function(){setProfile(b.dataset.profile)});
  b.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var o=btns[(i+1)%btns.length];setProfile(o.dataset.profile);o.focus();e.preventDefault()}
  });
});
var start='data';
try{start=new URLSearchParams(location.search).get('profile')||localStorage.getItem('profile')||'data'}catch(e){}
apply(P[start]?start:'data',true);

/* Reveal */
var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});
els.forEach(function(e){io.observe(e)});
})();