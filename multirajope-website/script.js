const I="assets/images/",C="assets/certificates/";
const G=[
["apartments-machakos","Residential apartments, Machakos town","Residential","Proposed design"],
["teachers-hostel-render","Teachers training college hostel, Kitengela","Institutional","Proposed design, Kajiado County"],
["ittc-hostel-kitengela","ITTC hostel","Institutional","Proposed design"],
["townhouses","Residential townhouse development","Residential","Design render"],
["maisonette-render","Residential maisonette","Residential","Proposed design"],
["maisonette-white","Residential maisonette, rear view","Residential","Proposed design"],
["stone-bungalow-render","Stone-fronted bungalow","Residential","Proposed design"],
["modern-house-render","Modern maisonette","Residential","Design render"],
["villa-render","Residential villa","Residential","Design render"],
["interior-render","Interior design, terrace lounge","Interiors","Design render"],
["bungalow-site","Bungalow, roofing stage","On site","Building and construction works"],
["walls-site","Walling and ring beam","On site","Building and construction works"],
["maisonette-site","Maisonette under construction","On site","Building and construction works"],
["villa-shell","Residential structure on site","On site","Building and construction works"],
["house-shell","Multi-storey house, structure stage","On site","Building and construction works"]];
const S=[
["Construction project management","From first consultation to completion, a seamless, responsive and efficient process.","walls-site","M4 20V8l8-4 8 4v12M9 20v-6h6v6","Also covers consultancy services and proactive management of project risk."],
["Architectural and structural drawing","Architectural and structural design that turns an idea into a buildable drawing.","modern-house-render","M4 20 20 4M4 4h6M4 4v6M20 20h-6M20 20v-6","Interior design is available alongside the drawings."],
["Measurement of building works and bills of quantities","Accurate measurement and preparation of the bill of quantities for your building.","house-shell","M3 8h18v8H3zM7 8v4M11 8v3M15 8v4M19 8v3","Led by consultant quantity surveyor Qs Dennis Omollo."],
["General building construction works","Residential maisonettes and bungalows, apartments and institutional buildings.","maisonette-site","M3 21h18M5 21V10l7-6 7 6v11M10 21v-6h4v6","Renovation and repairs and road construction are also offered."]];
const K=[
["nca-certificate-of-registration","NCA Certificate of Registration",[["Issued by","National Construction Authority"],["Registered as","Building works contractor"],["Category","NCA7"],["Reg. number","46427/B/1118"],["Issued","11/3/2026"],["Valid up to","31/7/2028"],["Serial no.","SN-677323"]]],
["certificate-of-incorporation","Certificate of Incorporation",[["Issued by","Registrar of Companies"],["Company","Multirajope Solutions Limited"],["Type","Private limited company"],["Incorporated","19 Nov 2018"],["Certificate no.","PVT-XYU62YB"],["Act","Companies Act, 2015"]]],
["nca-annual-practising-license","NCA Annual Practising Licence",[["Issued by","National Construction Authority"],["Registered as","Building works contractor"],["Category","NCA7"],["Reg. number","46427/B/1118"],["Issued","11/3/2026"],["Valid up to","31/7/2026"],["Serial no.","SN-677323"]]]];
const $=(s,r=document)=>r.querySelector(s);
// services
$("#svc").innerHTML=S.map((s,i)=>`<article class="card rv"><div class="ph"><img src="${I+s[2]}.jpg" alt="" loading="lazy"></div><div class="bd"><svg viewBox="0 0 24 24"><path d="${s[3]}"/></svg><h3>${s[0]}</h3><p>${s[1]}</p><div class="more" id="m${i}"><div><p>${s[4]}</p></div></div><button class="tg" aria-expanded="false" aria-controls="m${i}">More</button></div></article>`).join("");
document.addEventListener("click",e=>{const b=e.target.closest(".tg");if(!b)return;const o=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",o);b.textContent=o?"Less":"More";document.getElementById(b.getAttribute("aria-controls")).classList.toggle("open",o)});
// gallery
const cats=["All",...new Set(G.map(g=>g[2]))];
$("#filters").innerHTML=cats.map((c,i)=>`<button class="chip" aria-pressed="${i==0}" data-c="${c}">${c}</button>`).join("");
$("#gal").innerHTML=G.map((g,i)=>`<button class="gi" data-i="${i}" data-c="${g[2]}" aria-label="Enlarge: ${g[1]}"><img src="${I+g[0]}.jpg" alt="${g[1]}, ${g[3].toLowerCase()}" loading="lazy"><span>${g[1]}</span></button>`).join("");
$("#filters").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));document.querySelectorAll(".gi").forEach(g=>g.classList.toggle("hide",b.dataset.c!=="All"&&g.dataset.c!==b.dataset.c))};
// certs
$("#certs").innerHTML=K.map((k,i)=>`<article class="cert rv"><button class="pv" data-k="${i}" aria-label="Enlarge ${k[1]}"><img src="${C+k[0]}.jpg" alt="${k[1]} for Multirajope Solutions Limited" loading="lazy"></button><h3>${k[1]}</h3><dl>${k[2].map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join("")}</dl></article>`).join("");
// lightbox
const lb=$("#lb"),lbi=$("#lbi");let list=[],at=0,last;
function show(){const it=list[at];lbi.src=it.src;lbi.alt=it.alt;$("#lbc").textContent=it.cap;lb.classList.remove("zoom");$(".stage",lb).scrollTo(0,0);lb.querySelectorAll(".pv,.nx").forEach(b=>b.style.display=list.length>1?"":"none")}
function open(l,i){list=l;at=i;last=document.activeElement;show();lb.classList.add("open");document.body.style.overflow="hidden";$(".x",lb).focus()}
function close(){lb.classList.remove("open");document.body.style.overflow="";last&&last.focus()}
function step(d){at=(at+list.length+d)%list.length;show()}
$("#gal").onclick=e=>{const b=e.target.closest(".gi");if(!b)return;const vis=[...document.querySelectorAll(".gi:not(.hide)")];open(vis.map(v=>{const g=G[v.dataset.i];return{src:I+g[0]+".jpg",alt:g[1],cap:g[1]+" · "+g[3]}}),vis.indexOf(b))};
$("#certs").onclick=e=>{const b=e.target.closest(".pv");if(!b)return;open(K.map(k=>({src:C+k[0]+".jpg",alt:k[1],cap:k[1]+" · click the image to zoom"})),+b.dataset.k)};
$(".x",lb).onclick=close;$(".pv",lb).onclick=()=>step(-1);$(".nx",lb).onclick=()=>step(1);
lbi.onclick=()=>lb.classList.toggle("zoom");
lb.onclick=e=>{if(e.target.classList.contains("stage"))close()};
addEventListener("keydown",e=>{if(!lb.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1);if(e.key==="Tab"){const f=[...lb.querySelectorAll("button")].filter(b=>b.style.display!=="none");const a=f.indexOf(document.activeElement);e.preventDefault();f[(a+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
// nav
const bg=$(".burger"),mn=$("#menu");
bg.onclick=()=>{const o=bg.getAttribute("aria-expanded")!=="true";bg.setAttribute("aria-expanded",o);mn.classList.toggle("open",o)};
mn.onclick=e=>{if(e.target.closest("a")){bg.setAttribute("aria-expanded",false);mn.classList.remove("open")}};
const links=[...mn.querySelectorAll("a[href^='#']")];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"});
links.forEach(a=>{const s=document.querySelector(a.getAttribute("href"));s&&spy.observe(s)});
// reveal
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(n=>rv.observe(n));
// back to top
const tb=$("#top-btn");addEventListener("scroll",()=>tb.classList.toggle("show",scrollY>700),{passive:true});
tb.onclick=()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
$("#yr").textContent=new Date().getFullYear();
// form
const f=$("#f");
const rules={name:v=>v.trim().length>=2||"Enter your name.",phone:v=>/^\+?[\d\s-]{9,15}$/.test(v.trim())||"Enter a phone number, e.g. +254 712 581 721.",email:v=>!v.trim()||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)||"Enter a valid email address.",service:v=>!!v||"Choose a service.",message:v=>v.trim().length>=10||"Add a few details (at least 10 characters)."};
function check(el){const r=rules[el.name](el.value);const ok=r===true;el.setAttribute("aria-invalid",!ok);el.parentElement.querySelector(".err").textContent=ok?"":r;return ok}
f.querySelectorAll("input,select,textarea").forEach(el=>el.addEventListener("blur",()=>check(el)));
f.onsubmit=e=>{e.preventDefault();const els=[...f.elements].filter(x=>x.name);const bad=els.filter(x=>!check(x));if(bad.length){bad[0].focus();return}
const d=Object.fromEntries(els.map(x=>[x.name,x.value.trim()]));
const t=`Hello Multirajope Solutions, I'm ${d.name}.\nService: ${d.service}\nProject: ${d.message}\nPhone: ${d.phone}${d.email?"\nEmail: "+d.email:""}`;
window.open("https://wa.me/254712581721?text="+encodeURIComponent(t),"_blank","noopener");
const o=$("#ok");o.classList.add("show");o.innerHTML='WhatsApp should now be open with your enquiry. If not, email <a href="mailto:abedkmakau@gmail.com?subject=Project%20enquiry&body='+encodeURIComponent(t)+'">abedkmakau@gmail.com</a>.';f.reset()};
