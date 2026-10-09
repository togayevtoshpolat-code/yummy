const $=id=>document.getElementById(id);
const M=[
{id:1,c:'Burgers',n:'Classic Yummy Burger',d:'Beef patty, cheddar, pickles, house sauce.',p:32000,i:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9',g:'#ffd9a8,#ff9a4d',t:'Bestseller'},
{id:2,c:'Burgers',n:'Double Cheese',d:'Two juicy patties, double cheddar, caramelised onion.',p:45000,i:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90',g:'#ffe8a3,#ffb020'},
{id:3,c:'Burgers',n:'Crispy Chicken',d:'Golden fried chicken, slaw, spicy mayo.',p:30000,i:'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',g:'#ffd0c2,#ff7a59'},
{id:4,c:'Lavash',n:'Beef Lavash',d:'Grilled beef, fresh veggies, garlic sauce.',p:28000,i:'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85',g:'#e6f2c4,#a8d05a',t:'Local love'},
{id:5,c:'Lavash',n:'Chicken Lavash',d:'Tender chicken, cabbage, cheese, spicy sauce.',p:26000,i:'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e',g:'#ffe1b8,#f5a742'},
{id:6,c:'Pizza',n:'Margherita',d:'Tomato, mozzarella, basil on thin crust.',p:55000,i:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',g:'#ffcfc2,#ff6f4d'},
{id:7,c:'Pizza',n:'Pepperoni',d:'Spicy pepperoni and melted mozzarella.',p:65000,i:'https://images.unsplash.com/photo-1513104890138-7c749659a591',g:'#ffd3b5,#ef5a3c',t:'Hot'},
{id:8,c:'Sides',n:'Golden Fries',d:'Crispy, salted, served with ketchup.',p:14000,i:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d',g:'#fff0b0,#ffc93c'},
{id:9,c:'Sides',n:'Chicken Nuggets',d:'Eight crunchy nuggets with dipping sauce.',p:22000,i:'https://images.unsplash.com/photo-1606755962773-d324e0a13086',g:'#ffe0b0,#f2a13b'},
{id:10,c:'Drinks',n:'Fresh Lemonade',d:'House-squeezed with mint and ice.',p:12000,i:'https://images.unsplash.com/photo-1621263764928-df1444c5e859',g:'#f4f7b0,#d8e040'},
{id:11,c:'Drinks',n:'Cola 0.5L',d:'Ice cold classic cola.',p:9000,i:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',g:'#f3c6b8,#c8553d'},
{id:12,c:'Drinks',n:'Milkshake',d:'Creamy vanilla or chocolate shake.',p:24000,i:'https://images.unsplash.com/photo-1563805042-7684c019e1cb',g:'#ffe3ee,#ff9fc0'}];
const cats=['All',...new Set(M.map(m=>m.c))];let cat='All',cart={};
const R=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}};
const f=n=>n.toLocaleString('ru-RU').replace(/,/g,' ')+" so'm";
try{cart=JSON.parse(R('yf-cart')||'{}')}catch(e){}
// theme
const root=document.documentElement,sv=R('yf-theme');if(sv)root.dataset.theme=sv;
$('th').onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;const nx=dark?'light':'dark';root.classList.add('tt');root.dataset.theme=nx;R('yf-theme',nx);setTimeout(()=>root.classList.remove('tt'),500)};
// menu
function draw(){$('chips').innerHTML=cats.map(c=>`<button class="chip ${c==cat?'on':''}" onclick="cat='${c}';draw()">${c}</button>`).join('');
$('grid').innerHTML=M.filter(m=>cat=='All'||m.c==cat).map((m,i)=>`<article class="card" style="animation-delay:${i*45}ms"><div class="ph" style="background:linear-gradient(135deg,${m.g})">${m.t?`<div class="tag" style="position:absolute;margin:0;top:12px;left:12px">${m.t}</div>`:''}<img src="${m.i}?w=700&q=80&auto=format&fit=crop" alt="${m.n}" loading="lazy"></div><div class="cb"><h3>${m.n}</h3><p>${m.d}</p><div class="row"><div class="pr">${f(m.p)}</div><button class="add" onclick="add(${m.id})">+ Add</button></div></div></article>`).join('')}
function save(){R('yf-cart',JSON.stringify(cart));upd()}
const tot=()=>Object.entries(cart).reduce((s,[k,v])=>s+M.find(m=>m.id==k).p*v,0),cnt=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function upd(){const c=cnt();$('bd').textContent=c;$('bd').classList.remove('bump');void $('bd').offsetWidth;$('bd').classList.add('bump');
$('sc').classList.toggle('show',c>0);$('sn').textContent=c+(c>1?' items':' item')+' · View cart';$('st').textContent=f(tot());
$('df').style.display=c?'':'none';$('tot').textContent=f(tot());
$('items').innerHTML=c?Object.entries(cart).map(([k,v])=>{const m=M.find(x=>x.id==k);return`<div class="it"><div class="e"><img src="${m.i}?w=200&q=80&auto=format&fit=crop" alt="${m.n}"></div><div class="n">${m.n}<small>${f(m.p*v)}</small></div><div class="q"><button onclick="chg(${k},-1)">−</button><span>${v}</span><button onclick="chg(${k},1)">+</button></div></div>`}).join(''):'<div class="empty"><div><i data-lucide="shopping-bag"></i></div><b>Your cart is empty</b><p style="margin-top:6px">Add something yummy from the menu.</p></div>'}
if(window.lucide)lucide.createIcons();
function add(id){cart[id]=(cart[id]||0)+1;save();toast('Added to cart ✓')}
function chg(id,d){cart[id]+=d;if(cart[id]<=0)delete cart[id];save()}
let tt;function toast(t){const e=$('ts');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),1800)}
function closeAll(){['dr','md','ov'].forEach(i=>$(i).classList.remove('on'))}
function openCart(){closeAll();$('dr').classList.add('on');$('ov').classList.add('on')}
$('cb').onclick=openCart;$('ov').onclick=closeAll;
let mode='Delivery';
function openCo(){$('dr').classList.remove('on');const m=$('md');m.innerHTML=`<h3>Checkout</h3><div class="seg"><button class="on" onclick="setM(this,'Delivery')"><i data-lucide="truck"></i> Delivery</button><button onclick="setM(this,'Pickup')"><i data-lucide="store"></i> Pickup</button></div><input id="nm" placeholder="Your name" autocomplete="name"><input id="ph" type="tel" placeholder="+998 90 123 45 67" autocomplete="tel"><textarea id="ad" placeholder="Address in Termez"></textarea><div class="row" style="margin:6px 0 16px;font-weight:800;font-size:18px"><span>Total</span><span>${f(tot())}</span></div><button class="btn" style="width:100%" onclick="place()">Place order</button><button class="btn g" style="width:100%;margin-top:10px" onclick="openCart()">Back</button>`;m.classList.add('on');if(window.lucide)lucide.createIcons()}
function setM(b,v){mode=v;[...b.parentNode.children].forEach(x=>x.classList.toggle('on',x==b));$('ad').style.display=v=='Pickup'?'none':''}
function place(){if(!$('nm').value.trim()||$('ph').value.trim().length<7||(mode=='Delivery'&&!$('ad').value.trim()))return toast('Please fill in all fields');
const n=Math.floor(1000+Math.random()*9000);cart={};save();
$('md').innerHTML=`<div class="ok"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/><path d="M14 27l8 8 16-17" fill="none"/></svg><h3>Order #${n} confirmed!</h3><p>We're preparing your food. Estimated time: 30 minutes.</p><button class="btn" onclick="closeAll()">Done</button></div>`}
draw();upd();if(window.lucide)lucide.createIcons();
