/* ============ CONFIGURACIÓN (edita aquí) ============ */
const CFG = {
  artist: 'Lanubetattoo',
  currency: 'CLP',
  shipping: 3990,
  freeShippingFrom: 40000,
  closedDays: [0, 1],                       // 0 = domingo, 1 = lunes
  blocks: ['10:00', '12:30', '15:00', '17:30'],
  monthsAhead: 3
};

const SERVICES = [
  { id:'consulta', name:'Consulta de diseño', desc:'30 minutos para definir idea, zona y tamaño.', blocks:1, hours:1,  dur:'30–45 min', deposit:10000 },
  { id:'flash',    name:'Flash',              desc:'Un diseño de la hoja, hasta 8 cm.',            blocks:1, hours:2,  dur:'≈ 2 h',     deposit:20000 },
  { id:'pequena',  name:'Pieza pequeña',      desc:'Diseño personalizado, hasta 10 cm.',           blocks:1, hours:2,  dur:'≈ 2 h',     deposit:30000 },
  { id:'mediana',  name:'Pieza mediana',      desc:'Antebrazo, pantorrilla o costillas.',          blocks:2, hours:4,  dur:'≈ 4 h',     deposit:50000 },
  { id:'grande',   name:'Sesión de día completo', desc:'Mangas, espalda o piezas grandes.',        blocks:4, hours:7,  dur:'≈ 7 h',     deposit:100000 }
];

const ART = {
  dagger:`<path d="M50 6 L57 20 V58 H43 V20 Z"/><path d="M50 12 V56"/><path d="M30 58 H70"/><path d="M34 58 Q34 67 41 67 H59 Q66 67 66 58"/><path d="M50 67 V85"/><circle cx="50" cy="90" r="4"/>`,
  moon:`<path d="M58 16 A34 34 0 1 0 84 70 A32 32 0 0 1 58 16 Z"/><path d="M78 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z"/><path d="M88 42 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 z"/>`,
  eye:`<path d="M10 56 Q50 20 90 56 Q50 92 10 56 Z"/><circle cx="50" cy="56" r="13"/><circle class="solid" cx="50" cy="56" r="4.5"/><path d="M50 8 V22"/><path d="M22 18 L29 29"/><path d="M78 18 L71 29"/>`,
  spark:`<path d="M50 8 Q54 46 92 50 Q54 54 50 92 Q46 54 8 50 Q46 46 50 8 Z"/><path d="M82 12 v12"/><path d="M76 18 h12"/>`,
  heart:`<path d="M50 88 C10 60 12 24 34 22 C44 21 50 30 50 34 C50 30 56 21 66 22 C88 24 90 60 50 88 Z"/><circle cx="50" cy="46" r="6"/><path d="M50 52 V66"/>`,
  cloud:`<path d="M26 70 Q10 70 10 55 Q10 41 26 40 Q28 23 46 23 Q60 23 66 35 Q90 33 90 55 Q90 70 74 70 Z"/><path d="M30 82 L26 92"/><path d="M50 82 L46 92"/><path d="M70 82 L66 92"/>`,
  moth:`<path d="M50 30 V80"/><path d="M50 30 Q44 18 38 14"/><path d="M50 30 Q56 18 62 14"/><path d="M50 38 Q18 14 10 40 Q8 58 34 62 Q44 62 50 56"/><path d="M50 38 Q82 14 90 40 Q92 58 66 62 Q56 62 50 56"/><path d="M50 58 Q30 62 26 82 Q40 86 50 70"/><path d="M50 58 Q70 62 74 82 Q60 86 50 70"/>`
};
const svg = k => `<svg class="art" viewBox="0 0 100 100" aria-hidden="true">${ART[k]}</svg>`;

const FLASH = [
  { id:'daga',    art:'dagger', name:'Daga',                  size:'7 cm', price:60000 },
  { id:'luna',    art:'moon',   name:'Luna menguante',        size:'6 cm', price:55000 },
  { id:'ojo',     art:'eye',    name:'Ojo solar',             size:'8 cm', price:70000 },
  { id:'nube',    art:'cloud',  name:'Nube',                  size:'6 cm', price:45000 },
  { id:'corazon', art:'heart',  name:'Corazón con cerradura', size:'7 cm', price:60000 },
  { id:'polilla', art:'moth',   name:'Polilla',               size:'8 cm', price:70000 }
];

const PRODUCTS = [
  { id:'lam-a4',  art:'moon',   name:'Lámina A4 · Luna',      desc:'Impresión sobre papel de 250 g.',                price:12000,  physical:true },
  { id:'lam-a3',  art:'eye',    name:'Lámina A3 · Ojo solar', desc:'Impresión sobre papel de 250 g.',                price:22000,  physical:true },
  { id:'kit',     art:'spark',  name:'Kit de cuidado',        desc:'Jabón neutro y bálsamo para las primeras semanas.', price:18000, physical:true },
  { id:'stickers',art:'dagger', name:'Pack de 6 stickers',    desc:'Vinilo resistente al agua.',                     price:6000,   physical:true },
  { id:'gift50',  art:'heart',  name:'Gift card $50.000',     desc:'Digital, sin fecha de vencimiento.',             price:50000,  physical:false },
  { id:'gift100', art:'heart',  name:'Gift card $100.000',    desc:'Digital, sin fecha de vencimiento.',             price:100000, physical:false }
];

/* ============ UTILIDADES ============ */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = n => new Intl.NumberFormat('es-CL',{style:'currency',currency:CFG.currency,maximumFractionDigits:0}).format(n);
const store = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2,'0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseYmd = s => { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); };
const svcOf = id => SERVICES.find(s => s.id===id);
const longDate = d => new Intl.DateTimeFormat('es',{weekday:'long',day:'numeric',month:'long'}).format(d);
const shortDate = d => new Intl.DateTimeFormat('es',{weekday:'short',day:'numeric',month:'short'}).format(d);

let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),2200); }

/* ============ ESTADO ============ */
let cart = store.get('vi_cart', []);
let booked = store.get('vi_booked', []);
const bk = { service:null, flash:'', date:null, block:null };
let view = new Date(); view.setDate(1);

/* ============ HERO / FLASH / TIENDA ============ */
function renderHero(){
  const sh = $('#sheet');
  sh.innerHTML = FLASH.map((f,i)=>`<div class="cell" style="--i:${i}">${svg(f.art)}</div>`).join('') +
    `<div class="cap"><span>Hoja de flash</span><span>6 diseños únicos</span></div>`;
  if(!reduceMotion){
    $$('.art *:not(.solid)', sh).forEach(el => el.setAttribute('pathLength','1'));
    sh.classList.add('draw');
  }
}
function renderFlash(){
  $('#flash-grid').innerHTML = FLASH.map(f=>`
    <article class="tile">
      <div class="artbox">${svg(f.art)}</div>
      <div class="tb">
        <h3>${f.name}</h3>
        <p>${f.size} · diseño único</p>
        <div class="row"><span class="price">${fmt(f.price)}</span>
        <button class="btn sm red" data-act="pick-flash" data-id="${f.id}">Reservar</button></div>
      </div>
    </article>`).join('');
}
function renderShop(){
  $('#shop-grid').innerHTML = PRODUCTS.map(p=>`
    <article class="tile">
      <div class="artbox">${svg(p.art)}</div>
      <div class="tb">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="row"><span class="price">${fmt(p.price)}</span>
        <button class="btn sm" data-act="add-prod" data-id="${p.id}">Agregar</button></div>
      </div>
    </article>`).join('');
}

/* ============ AGENDA ============ */
function taken(ds,b){
  let h=0; const s=ds+b;
  for(const c of s) h=(h*31+c.charCodeAt(0))>>>0;
  return h%100<30 || booked.includes(ds+':'+b);
}
function slotsFor(ds,s){
  const out=[];
  for(let b=0;b+s.blocks<=CFG.blocks.length;b++){
    let ok=true;
    for(let k=0;k<s.blocks;k++) if(taken(ds,b+k)){ ok=false; break; }
    if(ok) out.push(b);
  }
  return out;
}
function dayBounds(){
  const min=new Date(); min.setHours(0,0,0,0); min.setDate(min.getDate()+1);
  const max=new Date(); max.setHours(0,0,0,0); max.setMonth(max.getMonth()+CFG.monthsAhead);
  return {min,max};
}
function isAvail(date){
  const {min,max}=dayBounds();
  if(date<min||date>max||CFG.closedDays.includes(date.getDay())) return false;
  const s=svcOf(bk.service); if(!s) return false;
  return slotsFor(ymd(date),s).length>0;
}

function renderServices(){
  $('#svcs').innerHTML = SERVICES.map(s=>`
    <label class="svc ${bk.service===s.id?'on':''}">
      <input type="radio" name="svc" value="${s.id}" ${bk.service===s.id?'checked':''}>
      <b>${s.name}</b>
      <small>${s.desc} ${s.dur}.</small>
      <span class="dep"><strong>${fmt(s.deposit)}</strong>de abono</span>
    </label>`).join('');
  const fp=$('#flash-pick');
  fp.hidden = bk.service!=='flash';
  $('#flash-sel').innerHTML = `<option value="">Aún no elijo</option>` + FLASH.map(f=>`<option value="${f.id}" ${bk.flash===f.id?'selected':''}>${f.name} · ${f.size} · ${fmt(f.price)}</option>`).join('');
}
function renderCalendar(){
  const y=view.getFullYear(), m=view.getMonth();
  $('#cal-title').textContent = new Intl.DateTimeFormat('es',{month:'long',year:'numeric'}).format(view);
  const offset=(new Date(y,m,1).getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  let h=['Lu','Ma','Mi','Ju','Vi','Sá','Do'].map(d=>`<div class="wd" aria-hidden="true">${d}</div>`).join('');
  for(let i=0;i<offset;i++) h+='<span></span>';
  for(let d=1; d<=days; d++){
    const dt=new Date(y,m,d), ds=ymd(dt), ok=isAvail(dt);
    h+=`<button class="day ${bk.date===ds?'sel':''}" data-act="day" data-date="${ds}" ${ok?'':'disabled'} aria-label="${longDate(dt)}" aria-pressed="${bk.date===ds}">${d}</button>`;
  }
  $('#cal-g').innerHTML=h;
  const {min,max}=dayBounds();
  const cur=new Date(); cur.setDate(1); cur.setHours(0,0,0,0);
  $('[data-act=prev]').disabled = view<=cur;
  const lastM=new Date(max.getFullYear(),max.getMonth(),1);
  $('[data-act=next]').disabled = view>=lastM;
  $('#cal-hint').textContent = bk.service ? 'Los días tachados están completos o cerrados (domingo y lunes).' : 'Primero elige un servicio para ver los días disponibles.';
}
function renderSlots(){
  const box=$('#slots'), s=svcOf(bk.service);
  if(!s||!bk.date){ box.innerHTML=''; return; }
  const list=slotsFor(bk.date,s);
  box.innerHTML = list.map(b=>`<button class="slot ${bk.block===b?'sel':''}" data-act="slot" data-b="${b}" aria-pressed="${bk.block===b}">${CFG.blocks[b]}</button>`).join('');
}
function renderSummary(){
  const s=svcOf(bk.service);
  const fl=FLASH.find(f=>f.id===bk.flash);
  const rows=[
    ['Servicio', s? s.name : '—'],
    ...(s&&s.id==='flash'&&fl ? [['Diseño', fl.name]] : []),
    ['Fecha', bk.date ? shortDate(parseYmd(bk.date)) : '—'],
    ['Hora', bk.block!==null ? CFG.blocks[bk.block] : '—'],
    ['Duración', s? s.dur : '—']
  ];
  $('#sum-dl').innerHTML = rows.map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('');
  $('#sum-dep').textContent = fmt(s? s.deposit : 0);
  $('#add-cita').disabled = !(s && bk.date && bk.block!==null);
}
function renderAgenda(){ renderServices(); renderCalendar(); renderSlots(); renderSummary(); }

function addCita(){
  const err=$('#agenda-err'); err.textContent='';
  const s=svcOf(bk.service);
  if(!(s&&bk.date&&bk.block!==null)) return;
  const idea=$('#idea').value.trim(), zone=$('#zone').value;
  if(['pequena','mediana','grande'].includes(s.id) && (!zone || idea.length<10)){
    err.textContent='Elige la zona del cuerpo y describe tu idea (mínimo 10 caracteres).';
    return;
  }
  const fl=FLASH.find(f=>f.id===bk.flash);
  cart = cart.filter(i=>i.type!=='cita');
  cart.unshift({
    id:'cita', type:'cita', physical:false, qty:1, price:s.deposit,
    name:'Abono · '+s.name+(s.id==='flash'&&fl?' ('+fl.name+')':''),
    meta: shortDate(parseYmd(bk.date))+' · '+CFG.blocks[bk.block],
    booking:{service:s.id,date:bk.date,block:bk.block,flash:bk.flash,zone,size:$('#size').value.trim(),idea}
  });
  saveCart(); toast('Abono agregado al carrito');
  openCart(1);
}

/* ============ CARRITO Y CHECKOUT ============ */
const co = { step:1, delivery:'retiro', method:'webpay', data:{name:'',email:'',phone:'',address:'',city:'',adult:false}, busy:false, done:null };
function saveCart(){ store.set('vi_cart',cart); updateBadge(); }
function updateBadge(){ $('#cart-count').textContent = cart.reduce((a,i)=>a+i.qty,0); }
function totals(){
  const sub=cart.reduce((a,i)=>a+i.price*i.qty,0);
  const phys=cart.filter(i=>i.physical).reduce((a,i)=>a+i.price*i.qty,0);
  const hasPhys=cart.some(i=>i.physical);
  const ship=(hasPhys && co.delivery==='envio' && phys<CFG.freeShippingFrom) ? CFG.shipping : 0;
  return {sub,hasPhys,ship,total:sub+ship};
}
function addProd(id){
  const p=PRODUCTS.find(x=>x.id===id); const ex=cart.find(i=>i.id===id);
  if(ex) ex.qty++; else cart.push({id:p.id,type:'producto',name:p.name,price:p.price,qty:1,physical:p.physical});
  saveCart(); toast(p.name+' agregado');
}
function openCart(step){
  if(step) co.step=step;
  if(co.step===4 && !co.done) co.step=1;
  renderCart();
  const d=$('#cart'); if(!d.open) d.showModal();
  $('#cart-title').focus();
}
function closeCart(){ const d=$('#cart'); if(d.open) d.close(); if(co.step===4){ co.step=1; co.done=null; } }

function lineHTML(i){
  const ctl = i.type==='cita'
    ? `<button class="link" data-act="rm" data-id="${i.id}">Quitar</button>`
    : `<div class="qty"><button data-act="dec" data-id="${i.id}" aria-label="Quitar una unidad">−</button><span>${i.qty}</span><button data-act="inc" data-id="${i.id}" aria-label="Agregar una unidad">+</button></div><button class="link" data-act="rm" data-id="${i.id}">Quitar</button>`;
  return `<div class="line"><div><b>${esc(i.name)}</b>${i.meta?`<small>${esc(i.meta)}</small>`:''}</div><div class="p">${fmt(i.price*i.qty)}</div><div class="ctl">${ctl}</div></div>`;
}
function totalsHTML(){
  const t=totals();
  return `<ul class="mini">
    <li><span>Subtotal</span><span>${fmt(t.sub)}</span></li>
    ${t.hasPhys?`<li><span>Envío</span><span>${co.delivery==='envio'?(t.ship?fmt(t.ship):'Gratis'):'Retiro en estudio'}</span></li>`:''}
  </ul>`;
}

function renderCart(){
  const body=$('#cart-body'), foot=$('#cart-foot'), steps=$('#cart-steps'), title=$('#cart-title');
  const labels=['Carrito','Tus datos','Pago'];
  steps.innerHTML = co.step<4 ? labels.map((l,i)=> i+1===co.step?`<b>${l}</b>`:`<span>${l}</span>`).join('<span aria-hidden="true">›</span>') : '';
  const t=totals();
  title.textContent = ['','Carrito','Tus datos','Pago','Listo'][co.step];

  if(co.step===1){
    if(!cart.length){
      body.innerHTML=`<div class="empty"><p>Tu carrito está vacío.</p><a class="btn red" href="#agenda" data-act="close-cart">Reservar hora</a><a class="btn" href="#tienda" data-act="close-cart">Ver tienda</a></div>`;
      foot.innerHTML=''; foot.hidden=true; return;
    }
    foot.hidden=false;
    body.innerHTML = cart.map(lineHTML).join('') + (cart.some(i=>i.type==='cita')?'':'<p class="hint">¿Quieres tatuarte? <a href="#agenda" data-act="close-cart">Agenda tu hora</a> y el abono se suma aquí.</p>');
    foot.innerHTML=`<div class="tot"><span>Subtotal</span><strong>${fmt(t.sub)}</strong></div><div class="acts"><button class="btn red" data-act="to-data">Continuar</button></div>`;
  }

  if(co.step===2){
    foot.hidden=false;
    const d=co.data, hasCita=cart.some(i=>i.type==='cita');
    body.innerHTML=`<form id="f-data" novalidate>
      <label class="f">Nombre completo<input type="text" name="name" autocomplete="name" required value="${esc(d.name)}"></label>
      <label class="f">Correo<input type="email" name="email" autocomplete="email" required value="${esc(d.email)}"></label>
      <label class="f">Teléfono o WhatsApp<input type="tel" name="phone" autocomplete="tel" required value="${esc(d.phone)}"></label>
      ${t.hasPhys?`
        <div class="opts" role="radiogroup" aria-label="Entrega de productos">
          <label class="opt ${co.delivery==='retiro'?'on':''}"><input type="radio" name="delivery" value="retiro" ${co.delivery==='retiro'?'checked':''}><span><b>Retiro en el estudio</b><small>Gratis. Lo retiras el día de tu cita o cuando avisemos.</small></span></label>
          <label class="opt ${co.delivery==='envio'?'on':''}"><input type="radio" name="delivery" value="envio" ${co.delivery==='envio'?'checked':''}><span><b>Envío a domicilio</b><small>${fmt(CFG.shipping)}. Gratis desde ${fmt(CFG.freeShippingFrom)} en productos.</small></span></label>
        </div>
        ${co.delivery==='envio'?`<label class="f">Dirección<input type="text" name="address" autocomplete="street-address" required value="${esc(d.address)}"></label>
        <label class="f">Ciudad o comuna<input type="text" name="city" autocomplete="address-level2" required value="${esc(d.city)}"></label>`:''}`:''}
      ${hasCita?`<label class="chk"><input type="checkbox" name="adult" ${d.adult?'checked':''} required><span>Confirmo que tengo 18 años o más y que presentaré mi cédula o documento el día de la sesión.</span></label>`:''}
      <p class="err" id="f-err" role="alert"></p>
    </form>`;
    foot.innerHTML=`<div class="tot"><span>Subtotal</span><strong>${fmt(t.sub)}</strong></div><div class="acts"><button class="btn" data-act="back">Volver</button><button class="btn red" type="submit" form="f-data">Continuar al pago</button></div>`;
  }

  if(co.step===3){
    foot.hidden=false;
    const wp = co.method==='webpay';
    body.innerHTML=`<div class="note"><strong>Modo demostración.</strong> Aquí no se cobra nada. En el sitio real, este botón te lleva al formulario seguro de Webpay (Transbank), donde ingresas tu tarjeta.</div>
      ${cart.map(i=>`<div class="line"><div><b>${esc(i.name)}${i.qty>1?' × '+i.qty:''}</b>${i.meta?`<small>${esc(i.meta)}</small>`:''}</div><div class="p">${fmt(i.price*i.qty)}</div></div>`).join('')}
      <div style="height:1rem"></div>${totalsHTML()}
      <div class="opts" role="radiogroup" aria-label="Método de pago">
        <label class="opt ${wp?'on':''}"><input type="radio" name="method" value="webpay" ${wp?'checked':''}><span><b>Webpay</b><small>Tarjeta de crédito, débito o prepago, en cuotas si tu banco lo permite.</small></span></label>
        <label class="opt ${!wp?'on':''}"><input type="radio" name="method" value="transferencia" ${!wp?'checked':''}><span><b>Transferencia bancaria</b><small>La hora queda bloqueada 24 h mientras llega el pago.</small></span></label>
      </div>
      <form id="f-pay" novalidate>
      ${wp?'':`<div class="note">Datos para transferir (reemplaza con los tuyos):<br>Banco: [Tu banco] · Cuenta: [Número] · Titular: [Nombre] · RUT: [tu RUT]<br>Usa tu código de reserva como glosa.</div>`}
      <p class="err" id="p-err" role="alert"></p>
      </form>`;
    foot.innerHTML=`<div class="tot"><span>Total</span><strong>${fmt(t.total)}</strong></div><div class="acts"><button class="btn" data-act="back" ${co.busy?'disabled':''}>Volver</button><button class="btn red" type="submit" form="f-pay" id="pay-btn" ${co.busy?'disabled':''}>${co.busy?(wp?'Conectando con Webpay…':'Procesando…'):(wp?'Pagar '+fmt(t.total)+' con Webpay':'Confirmar reserva')}</button></div>`;
  }

  if(co.step===4){
    foot.hidden=false;
    const r=co.done, c=r.cita;
    body.innerHTML=`<div class="done"><div class="stamp" aria-hidden="true">✓</div>
      <h3>${r.method==='webpay'?'Pago recibido':'Reserva en espera'}</h3>
      <p>Tu código de reserva:</p><div class="code">${r.ref}</div>
      ${c?`<div class="box"><b>${esc(svcOf(c.service).name)}</b><br>${longDate(parseYmd(c.date))} a las ${CFG.blocks[c.block]}<br><small>Con ${CFG.artist}. Lleva tu cédula de identidad.</small></div>
      <p><a class="btn sm" target="_blank" rel="noopener" href="${gcal(c,r.ref)}">Agregar a Google Calendar</a></p>`:''}
      ${r.method==='transferencia'?`<div class="box">Transfiere <b>${fmt(r.total)}</b> usando <b>${r.ref}</b> como glosa dentro de 24 horas para mantener tu reserva.</div>`:''}
      <p><small>Total ${r.method==='webpay'?'pagado':'a transferir'}: ${fmt(r.total)}</small></p></div>`;
    foot.innerHTML=`<div class="acts"><button class="btn red" data-act="close-cart">Volver al sitio</button></div>`;
  }
}

function gcal(c,ref){
  const s=svcOf(c.service); const [hh,mm]=CFG.blocks[c.block].split(':').map(Number);
  const d=parseYmd(c.date); const a=new Date(d.getFullYear(),d.getMonth(),d.getDate(),hh,mm);
  const b=new Date(a.getTime()+s.hours*3600e3);
  const f=x=>`${x.getFullYear()}${pad(x.getMonth()+1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Tatuaje con '+CFG.artist+' · '+s.name)+'&dates='+f(a)+'/'+f(b)+'&details='+encodeURIComponent('Código de reserva '+ref);
}

function saveData(form){
  const fd=new FormData(form);
  ['name','email','phone','address','city'].forEach(k=>{ if(fd.has(k)) co.data[k]=String(fd.get(k)).trim(); });
  if(form.querySelector('[name=adult]')) co.data.adult=fd.has('adult');
  if(fd.has('delivery')) co.delivery=fd.get('delivery');
}

/* Pago: hoy simulado. En producción, tu servidor crea la transacción Webpay Plus (Transbank),
   esta función redirige al usuario a la URL con el token y luego confirma (commit) el resultado. */
async function processPayment(order){
  await new Promise(r=>setTimeout(r,1400));
  return { ok:true, ref:'LN-'+Math.floor(100000+Math.random()*900000) };
}

async function submitPay(form){
  const err=$('#p-err'); err.textContent='';
  const cita=cart.find(i=>i.type==='cita');
  if(cita){
    const c=cita.booking, s=svcOf(c.service);
    for(let k=0;k<s.blocks;k++) if(booked.includes(c.date+':'+(c.block+k))){
      err.textContent='Esa hora acaba de ser reservada. Vuelve a la agenda y elige otra.'; return;
    }
  }
  co.busy=true; renderCart();
  const t=totals();
  const res=await processPayment({items:cart,total:t.total,method:co.method,customer:co.data,delivery:co.delivery});
  co.busy=false;
  if(!res.ok){ renderCart(); $('#p-err').textContent='No pudimos procesar el pago. Inténtalo otra vez.'; return; }
  if(cita){
    const c=cita.booking, s=svcOf(c.service);
    for(let k=0;k<s.blocks;k++) booked.push(c.date+':'+(c.block+k));
    store.set('vi_booked',booked);
    bk.date=null; bk.block=null;
  }
  co.done={ref:res.ref,total:t.total,method:co.method,cita:cita?cita.booking:null};
  cart=[]; saveCart();
  co.step=4; renderCart(); renderAgenda();
  $('#cart-body').scrollTop=0;
}

/* ============ EVENTOS ============ */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const a=el.dataset.act, id=el.dataset.id;
  switch(a){
    case 'open-cart': openCart(co.step===4?1:co.step||1); break;
    case 'close-cart': closeCart(); break;
    case 'prev': view=new Date(view.getFullYear(),view.getMonth()-1,1); renderCalendar(); break;
    case 'next': view=new Date(view.getFullYear(),view.getMonth()+1,1); renderCalendar(); break;
    case 'day': bk.date=el.dataset.date; bk.block=null; renderCalendar(); renderSlots(); renderSummary(); break;
    case 'slot': bk.block=+el.dataset.b; renderSlots(); renderSummary(); break;
    case 'pick-flash':
      bk.service='flash'; bk.flash=id; bk.date=null; bk.block=null;
      renderAgenda(); $('#agenda').scrollIntoView({behavior:reduceMotion?'auto':'smooth'}); break;
    case 'add-prod': addProd(id); break;
    case 'add-cita': addCita(); break;
    case 'inc': { const i=cart.find(x=>x.id===id); if(i){ i.qty++; saveCart(); renderCart(); } break; }
    case 'dec': { const i=cart.find(x=>x.id===id); if(i){ i.qty--; if(i.qty<=0) cart=cart.filter(x=>x.id!==id); saveCart(); renderCart(); } break; }
    case 'rm': cart=cart.filter(x=>x.id!==id); saveCart(); renderCart(); break;
    case 'to-data': co.step=2; renderCart(); break;
    case 'back': co.step=Math.max(1,co.step-1); renderCart(); break;
  }
});
$('#cart').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeCart(); });
$('#cart').addEventListener('close',()=>{ if(co.step===4){ co.step=1; co.done=null; } });

document.addEventListener('change',e=>{
  const t=e.target;
  if(t.name==='svc'){
    bk.service=t.value;
    if(t.value!=='flash') bk.flash='';
    const s=svcOf(bk.service);
    if(bk.date && !slotsFor(bk.date,s).length){ bk.date=null; bk.block=null; }
    else if(bk.block!==null && !slotsFor(bk.date,s).includes(bk.block)) bk.block=null;
    renderAgenda();
  }
  if(t.id==='flash-sel'){ bk.flash=t.value; renderSummary(); }
  if(t.name==='delivery' && t.closest('#f-data')){ saveData(t.closest('form')); renderCart(); }
  if(t.name==='method'){ co.method=t.value; renderCart(); }
});
document.addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target;
  if(f.id==='f-data'){
    saveData(f);
    const err=$('#f-err'); err.textContent='';
    const d=co.data;
    if(d.name.length<3){ err.textContent='Escribe tu nombre completo.'; return; }
    if(!/^\S+@\S+\.\S+$/.test(d.email)){ err.textContent='Escribe un correo válido, por ejemplo nombre@correo.com.'; return; }
    if(d.phone.replace(/\D/g,'').length<8){ err.textContent='Escribe un teléfono con al menos 8 dígitos.'; return; }
    if(totals().hasPhys && co.delivery==='envio' && (d.address.length<4||d.city.length<2)){ err.textContent='Completa la dirección y la ciudad para el envío.'; return; }
    if(cart.some(i=>i.type==='cita') && !d.adult){ err.textContent='Debes confirmar que eres mayor de 18 años para reservar.'; return; }
    co.step=3; renderCart();
  }
  if(f.id==='f-pay') submitPay(f);
});

/* ============ INICIO ============ */
renderHero(); renderFlash(); renderShop(); renderAgenda(); updateBadge();
