/* ============================================================
   Startup Repair Store — main.js
   01 Product data        02 Store render & filters
   03 Cart logic          04 Repair request wizard
   05 Bulk modal & misc   06 Toasts, nav, scroll
============================================================ */

const $ = id => document.getElementById(id);

const CATEGORIES = [
  { id: 'all',    label: 'All' },
  { id: 'charger',label: 'Chargers & Cables' },
  { id: 'audio',  label: 'Audio' },
  { id: 'case',   label: 'Covers & Cases' },
  { id: 'power',  label: 'Power Banks' },
  { id: 'guard',  label: 'Screen Guards' },
  { id: 'smart',  label: 'Smart Gadgets' }
];

const PRODUCTS = [
  { id: 1,  name: '65W GaN Fast Charger with Type-C Cable',      cat: 'charger', price: 699,  mrp: 1499, bulk: 599,  bqty: 10, rating: 4.6, reviews: 1240, tag: 'Bestseller', tagClass: '',                  emoji: '🔌', grad: 'linear-gradient(135deg,#dbeafe,#eff6ff)' },
  { id: 2,  name: 'Type-C to Type-C Braided Cable 2m (Fast PD)', cat: 'charger', price: 179,  mrp: 499,  bulk: 129,  bqty: 10, rating: 4.5, reviews: 890,  tag: '',             tagClass: '',                  emoji: '🔗', grad: 'linear-gradient(135deg,#ecfdf5,#d1fae5)' },
  { id: 3,  name: '4-in-1 Multi Charging Cable 1.5m',            cat: 'charger', price: 249,  mrp: 499,  bulk: 189,  bqty: 10, rating: 4.4, reviews: 760,  tag: '',             tagClass: '',                  emoji: '🔀', grad: 'linear-gradient(135deg,#fef3c7,#fffbeb)' },
  { id: 4,  name: '15W Wireless Charging Pad',                   cat: 'charger', price: 449,  mrp: 999,  bulk: 379,  bqty: 5,  rating: 4.4, reviews: 310,  tag: 'Hot Deal',      tagClass: 'tag-sale',         emoji: '📶', grad: 'linear-gradient(135deg,#fce7f3,#fdf2f8)' },
  { id: 5,  name: 'ANC True Wireless Earbuds with Charging Case',cat: 'audio',   price: 999,  mrp: 2499, bulk: 849,  bqty: 5,  rating: 4.4, reviews: 2100, tag: 'Bestseller', tagClass: '',                  emoji: '🎧', grad: 'linear-gradient(135deg,#ede9fe,#f5f3ff)' },
  { id: 6,  name: 'Wired Earphones with Mic (3.5mm)',            cat: 'audio',   price: 149,  mrp: 399,  bulk: 99,   bqty: 10, rating: 4.2, reviews: 3400, tag: '',             tagClass: '',                  emoji: '🎵', grad: 'linear-gradient(135deg,#cffafe,#ecfeff)' },
  { id: 7,  name: 'Bluetooth Speaker 20W with Deep Bass',        cat: 'audio', price: 899,  mrp: 1799, bulk: 759,  bqty: 5,  rating: 4.3, reviews: 540,  tag: '',             tagClass: '',                  emoji: '🔊', grad: 'linear-gradient(135deg,#fee2e2,#fef2f2)' },
  { id: 8,  name: 'Type-C Gaming Headset with Mic',              cat: 'audio', price: 699,  mrp: 1299, bulk: 599,  bqty: 5,  rating: 4.1, reviews: 290,  tag: 'New',          tagClass: 'tag-new',           emoji: '🎮', grad: 'linear-gradient(135deg,#dbeafe,#e0f2fe)' },
  { id: 9,  name: 'Shockproof Mobile Cover (All Models)',        cat: 'case',  price: 179,  mrp: 399,  bulk: 99,   bqty: 10, rating: 4.4, reviews: 5200, tag: 'Hot Deal',      tagClass: 'tag-sale',         emoji: '🛡️', grad: 'linear-gradient(135deg,#e0e7ff,#eef2ff)' },
  { id: 10, name: 'Magnetic Glass Back Case',                    cat: 'case',  price: 299,  mrp: 599,  bulk: 199,  bqty: 10, rating: 4.5, reviews: 410,  tag: '',             tagClass: '',                  emoji: '🗂️', grad: 'linear-gradient(135deg,#f1f5f9,#e2e8f0)' },
  { id: 11, name: 'Slim PU Laptop Sleeve (14-inch)',             cat: 'case',  price: 399,  mrp: 899,  bulk: 299,  bqty: 5,  rating: 4.3, reviews: 210,  tag: '',             tagClass: '',                  emoji: '💼', grad: 'linear-gradient(135deg,#ffedd5,#fff7ed)' },
  { id: 12, name: '20000mAh 22.5W Fast Power Bank',              cat: 'power', price: 1299, mrp: 2999, bulk: 1099, bqty: 5,  rating: 4.6, reviews: 980,  tag: 'Bestseller',     tagClass: '',                  emoji: '🔋', grad: 'linear-gradient(135deg,#ecfdf5,#d1fae5)' },
  { id: 13, name: 'Ultra-Slim 10000mAh Power Bank',              cat: 'power', price: 799,  mrp: 1699, bulk: 649,  bqty: 10, rating: 4.4, reviews: 1500, tag: '',             tagClass: '',                  emoji: '🔋', grad: 'linear-gradient(135deg,#fef9c3,#fefce8)' },
  { id: 14, name: '9H Tempered Glass Guard (All Models)',        cat: 'guard', price: 99,   mrp: 299,  bulk: 49,   bqty: 20, rating: 4.5, reviews: 8300, tag: 'Hot Deal',      tagClass: 'tag-sale',         emoji: '🪟', grad: 'linear-gradient(135deg,#cffafe,#ecfeff)' },
  { id: 15, name: 'Privacy Full-Cover Screen Guard',             cat: 'guard', price: 199,  mrp: 499,  bulk: 129,  bqty: 20, rating: 4.1, reviews: 640,  tag: '',             tagClass: '',                  emoji: '👁️', grad: 'linear-gradient(135deg,#e0e7ff,#f5f3ff)' },
  { id: 16, name: 'Smart Fitness Band with AMOLED Display',      cat: 'smart', price: 1699, mrp: 3499, bulk: 1449, bqty: 5,  rating: 4.4, reviews: 760,  tag: 'Hot Deal',      tagClass: 'tag-sale',         emoji: '⌚',  grad: 'linear-gradient(135deg,#fee2e2,#fff1f2)' },
  { id: 17, name: 'Magnetic Wireless Charging Stand',            cat: 'smart', price: 449,  mrp: 999,  bulk: 359,  bqty: 10, rating: 4.2, reviews: 380,  tag: 'New',          tagClass: 'tag-new',           emoji: '🧲', grad: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)' }
];

const store = { cat: 'all', search: '', sort: 'popular' };
const cart = {};   /* id -> qty */
const toUSD = n => '₹' + n.toLocaleString('en-IN');
const discount = p => Math.round(((p.mrp - p.price) / p.mrp) * 100);
/* ---------- 02. Store render & filters ---------- */
function renderCats() {
  $('catTabs').innerHTML = CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === store.cat ? ' active' : ''}" data-cat="${c.id}">${c.label}</button>`
  ).join('');
  document.querySelectorAll('.cat-chip').forEach(btn =>
    btn.addEventListener('click', () => { store.cat = btn.dataset.cat; renderCats(); renderProducts(); })
  );
}

function filteredProducts() {
  let list = PRODUCTS.filter(p => {
    const okCat = store.cat === 'all' || p.cat === store.cat;
    const q = store.search.toLowerCase();
    const okText = !q || p.name.toLowerCase().includes(q);
    return okCat && okText;
  });
  switch (store.sort) {
    case 'low':        list.sort((a, b) => a.price - b.price); break;
    case 'high':       list.sort((a, b) => b.price - a.price); break;
    case 'discount':   list.sort((a, b) => discount(b) - discount(a)); break;
    default:           list.sort((a, b) => b.reviews - a.reviews);
  }
  return list;
}

function productHTML(p) {
  const inCart = cart[p.id] || 0;
  const d = discount(p);
  return `
  <article class="product-card">
    <div class="product-media" style="background:${p.grad}">
      <span class="product-emoji">${p.emoji}</span>
      ${p.tag ? `<span class="tagchip ${p.tagClass}">${p.tag}</span>` : ''}
      <span class="bulkchip">Bulk <b>${p.bqty}+</b> @ ${toUSD(p.bulk)}</span>
    </div>
    <div class="product-body">
      <h4 class="product-name">${p.name}</h4>
      <div class="product-rating"><span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>${p.rating.toFixed(1)} · ${p.reviews.toLocaleString('en-IN')} ratings</div>
      <div class="price-row">
        <span class="price">${toUSD(p.price)}</span>
        <span class="mrp">${toUSD(p.mrp)}</span>
        <span class="off">${d}% off</span>
      </div>
      <div class="bulk-row"><span class="bulk-plain">Buy ${p.bqty}+ → only ${toUSD(p.bulk)} each</span></div>
      <button class="add-btn" data-add="${p.id}">${inCart ? `+ ${inCart} in cart` : 'Add to Cart'}</button>
    </div>
  </article>`;
}

function renderProducts() {
  const products = applyFilter();
  const gridEl = $('productGrid');
  if (!products.length) {
    gridEl.innerHTML = '';
    $('noResult').hidden = false;
  } else {
    gridEl.innerHTML = products.map(productHTML).join('');
    $('noResult').hidden = true;
    gridEl.querySelectorAll('[data-add]').forEach(btn =>
      btn.addEventListener('click', () => addToCart(Number(btn.dataset.add)))
    );
  }
}

function applyFilter() {
  let target = PRODUCTS.filter(p => (store.cat === 'all' || p.cat === store.cat))
                       .filter(p => !store.search || p.name.toLowerCase().includes(store.search.toLowerCase()));
  switch (store.sort) {
    case 'low':      target.sort((a, b) => a.price - b.price); break;
    case 'high':     target.sort((a, b) => b.price - a.price); break;
    case 'discount': target.sort((a, b) => discount(b) - discount(a)); break;
    default:         target.sort((a, b) => b.reviews - a.reviews);
  }
  return target;
}

/* ---------- 03. Cart logic ---------- */
function unitPrice(p) { return (cart[p.id] || 0) >= p.bqty ? p.bulk : p.price; }

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  cart[id] = (cart[id] || 0) + 1;
  if (cart[id] === p.bqty) toast('🎉', 'Bulk price unlocked!', `${p.name} is now ${toUSD(p.bulk)} per unit.`, 'success');
  else toast('🛒', 'Added to cart', `${p.name} × ${cart[id]}`, 'primary');
  renderCartUI();
}

function changeQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (!cart[id]) delete cart[id];
  renderCart(); renderCartCount();
}

const cartItems = () => Object.keys(cart).map(id => PRODUCTS.find(p => p.id === Number(id)));

function cartTotals() {
  let subtotal = 0, original = 0;
  cartItems().forEach(p => {
    const q = cart[p.id];
    original += q * p.price;
    subtotal += q * unitPrice(p);
  });
  return { subtotal, saving: original - subtotal };
}

function renderCart() {
  const body = $('cartBody');
  const items = cartItems();
  if (!items.length) {
    body.innerHTML = `<div class="cart-empty"><span class="ce-icon">🛍️</span><b>Your cart is empty</b><p style="margin-top:6px;font-size:13px">Add accessories and bulk pricing applies automatically.</p></div>`;
  } else {
    body.innerHTML = items.map(p => {
      const q = cart[p.id];
      const onBulk = q >= p.bqty;
      return `<div class="cart-item">
        <div class="ci-thumb" style="background:${p.grad}">${p.emoji}</div>
        <div class="ci-info">
          <h4>${p.name}</h4>
          <div class="ci-price">${toUSD(unitPrice(p))} each${onBulk ? ` <b>· Bulk ${q}+</b>` : ''}</div>
          <div class="qty-control">
            <button data-dec="${p.id}">−</button><span>${q}</span><button data-inc="${p.id}">+</button>
          </div>
        </div>
        <div class="ci-right"><strong>${toUSD(q * unitPrice(p))}</strong><button class="ci-remove" data-rm="${p.id}">Remove</button></div>
      </div>`;
    }).join('');
    body.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => changeQty(Number(b.dataset.inc), +1)));
    body.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => changeQty(Number(b.dataset.dec), -1)));
    body.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { delete cart[Number(b.dataset.rm)]; renderCartUI(); }));
  }
  const t = cartTotals();
  $('cartTotal').textContent = toUSD(t.subtotal);
  $('cartSave').textContent = t.saving > 0 ? `🎉 You're saving ${toUSD(t.saving)} with bulk pricing!` : 'Add more items to unlock bigger bulk savings.';
}

function renderCartCount() { $('cartCount').textContent = Object.values(cart).reduce((a, b) => a + b, 0); }
function renderCartUI() { renderCart(); renderCartCount(); }

$('checkoutBtn').addEventListener('click', () => {
  if (!cartItems().length) return toast(null, 'Cart is empty', 'Add something first!', 'warn');
  const t = cartTotals();
  toast('✅', 'Checkout successful (demo)', `Total ${toUSD(t.subtotal)} | ${t.saving > 0 ? `Bulk saving ${toUSD(t.saving)} applied.` : 'Use code REPAIR10 at payment.'}`);
  Object.keys(cart).forEach(k => delete cart[k]);
  renderCartUI();
});

/* ---------- 04. Repair request wizard ---------- */
const MODES = [
  { icon: '🧰', title: 'Online Repair Request', desc: 'Chat with technicians, share photos and fix most issues remotely. No packing needed.' },
  { icon: '🚚', title: 'Courier Delivery', desc: 'We email a prepaid shipping label. You pack and drop the parcel at any courier counter.' },
  { icon: '🏠', title: 'Home Pickup', desc: 'Choose a 2-hour slot — our executive collects the device right from your doorstep.' }
];
const REPAIR_STEPS = ['Device & Issue', 'Service Mode', 'Contact', 'Confirm'];
const DEVICES = ['📱 Phone', '💻 Laptop', '📟 Tablet', '⌚ Smartwatch', '🎮 Other'];
let rState = { step: 1, mode: 1, device: 0, model: '', issue: '', date: '', name: '', phone: '', email: '', pincode: '', address: '' };
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function openRepairModal(mode) {
  rState = { step: 1, mode: mode || 0, device: 0, model: '', issue: '', date: '', name: '', phone: '', email: '', pincode: '', address: '' };
  openModal('repairModal');
  renderRepair();
}
function closeModal(id) { $(id).hidden = true; hideOverlayIfNoneOpen(); }

function renderRepair() {
  const prog = [0, 1, 2, 3].map(i => {
    const cls = rState.step === i + 1 ? 'active' : (rState.step > i + 1 ? 'done' : '');
    return `<div class="prog-step ${cls}"><b>${REPAIR_STEPS[i]}</b></div>`;
  }).join('');
  $('repairProgress').hidden = false;
  $('repairProgress').innerHTML = prog;
  $('repairForm').innerHTML = stepHTML(rState.step);
  afterRenderStep();
}

function stepHTML(s) {
  if (s === 1) return `
<h4>Which device needs repair?</h4>
<div class="chip-row">${DEVICES.map((d, i) => `<button type="button" class="chip-opt${rState.device === i ? ' sel' : ''}" data-device="${i}"><span class="co-icon">${d.split(' ')[0]}</span><span class="co-name">${d.split(' ').slice(1).join(' ')}</span></button>`).join('')}</div>
<div class="field" id="fModel"><label class="label">Brand &amp; model <span class="req">*</span></label><input class="input" id="rModel" type="text" placeholder="e.g. iPhone 13, Dell Inspiron 15" value="${esc(rState.model)}" /><div class="err-msg">Please enter the brand and model.</div></div>
<div class="field" id="fIssue"><label class="label">What's the problem? <span class="req">*</span></label><textarea class="textarea" id="rIssue" placeholder="e.g. screen cracked, battery drains in 2 hours, not charging"></textarea><div class="err-msg">Please describe the issue (at least 10 characters).</div></div>
<div class="form-actions"><button type="button" class="btn btn-primary btn-block" id="next1">Continue →</button></div>`;
  if (s === 2) return `
<h4>How would you like the service?</h4>
${MODES.map((m, i) => `<label class="mode-opt${rState.mode === i ? ' active' : ''}" data-mode="${i}"><span class="em">${m.icon}</span><span style="flex:1"><h5>${m.title}</h5><p>${m.desc}</p></span><input type="radio" class="mo-input" name="mode" ${rState.mode === i ? 'checked' : ''} /></label>`).join('')}
<div class="field" id="fDate" style="${rState.mode === 2 ? '' : 'display:none'}"><label class="label">Preferred pickup date <span class="req">*</span></label><input class="input" id="rDate" type="date" /></div>
<div class="form-actions"><button type="button" class="btn btn-ghost" id="back2">← Back</button><button type="button" class="btn btn-primary" id="next2">Continue →</button></div>`;
  if (s === 3) return `
<h4>Where should we contact?</h4>
<div class="row-2">
  <div class="field" id="fName"><label class="label">Full name <span class="req">*</span></label><input class="input" id="rName" type="text" placeholder="Your name" value="${esc(rState.name)}" /><div class="err-msg">Please enter your name.</div></div>
  <div class="field" id="fPhone"><label class="label">Mobile number <span class="req">*</span></label><input class="input" id="rPhone" type="tel" placeholder="10-digit number" maxlength="10" value="${esc(rState.phone)}" /><div class="err-msg">Enter a valid 10-digit mobile number.</div></div>
</div>
<div class="field" id="fAddr" style="${rState.mode === 0 ? 'display:none' : ''}"><label class="label">Full address <span class="req">*</span></label><textarea class="textarea" id="rAddress" style="min-height:70px" placeholder="House no, street, landmark, city">${esc(rState.address)}</textarea><div class="err-msg">Address is required for courier / pickup.</div></div>
<div class="row-2">
  <div class="field" id="fPin" style="${rState.mode === 0 ? 'display:none' : ''}"><label class="label">PIN code <span class="req">*</span></label><input class="input" id="rPin" type="text" placeholder="6-digit PIN" maxlength="6" value="${esc(rState.pincode)}" /><div class="err-msg">Enter a valid 6-digit PIN.</div></div>
  <div class="field"><label class="label">Email (optional)</label><input class="input" id="rEmail" type="email" placeholder="you@example.com" value="${esc(rState.email)}" /></div>
</div>
<div class="form-actions"><button type="button" class="btn btn-ghost" id="back3">← Back</button><button type="button" class="btn btn-primary" id="next3">Continue →</button></div>`;
  if (s === 4) {
    const dateTxt = rState.date ? new Date(rState.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Anytime';
    return `
<h4>Review your request</h4>
<div class="summary">
  <div class="summary-row"><b>Device</b><span>${DEVICES[rState.device]}</span></div>
  <div class="summary-row"><b>Brand &amp; model</b><span>${esc(rState.model)}</span></div>
  <div class="summary-row"><b>Issue</b><span>${esc(rState.issue)}</span></div>
  <div class="summary-row"><b>Service mode</b><span>${MODES[rState.mode].icon} ${MODES[rState.mode].title}</span></div>
  <div class="summary-row"><b>${rState.mode === 2 ? 'Pickup date' : 'Preferred date'}</b><span>${rState.date ? dateTxt : 'Anytime'}</span></div>
  <div class="summary-row"><b>Customer</b><span>${esc(rState.name)} · ${esc(rState.phone)}</span></div>
  ${rState.mode !== 0 ? `<div class="summary-row"><b>Address</b><span>${esc(rState.address)}, ${esc(rState.pincode)}</span></div>` : ''}
</div>
<div class="form-actions"><button type="button" class="btn btn-ghost" id="back4">← Back</button><button type="button" class="btn btn-primary" id="submitRepair">Confirm &amp; Submit ✓</button></div>`;
  }
  return '';
}
function afterRenderStep() {
  const rf = $('repairForm');
  rf.querySelectorAll('.chip-opt').forEach(c => c.addEventListener('click', () => {
    rState.device = Number(c.dataset.device);
    rf.querySelectorAll('.chip-opt').forEach(x => x.classList.toggle('sel', x === c));
  }));
  rf.querySelectorAll('.mode-opt').forEach(m => m.addEventListener('click', () => { rState.mode = Number(m.dataset.mode); renderRepair(); }));
  const n1 = $('next1'); if (n1) n1.addEventListener('click', () => { if (validStep1()) { rState.step = 2; renderRepair(); } });
  const n2 = $('next2'); if (n2) n2.addEventListener('click', () => { if (validStep2()) { rState.step = 3; renderRepair(); } });
  const n3 = $('next3'); if (n3) n3.addEventListener('click', () => { if (validStep3()) { rState.step = 4; renderRepair(); } });
  const b2 = $('back2'); if (b2) b2.addEventListener('click', () => { rState.step = 1; renderRepair(); });
  const b3 = $('back3'); if (b3) b3.addEventListener('click', () => { rState.step = 2; renderRepair(); });
  const b4 = $('back4'); if (b4) b4.addEventListener('click', () => { rState.step = 3; renderRepair(); });
  const sub = $('submitRepair'); if (sub) sub.addEventListener('click', submitRepair);
  wire('rModel', v => rState.model = v, 'fModel');
  wire('rIssue', v => rState.issue = v, 'fIssue');
  wire('rName',  v => rState.name = v, 'fName');
  wire('rPhone', v => rState.phone = v, 'fPhone');
  wire('rAddress', v => rState.address = v, 'fAddr');
  wire('rPin',   v => rState.pincode = v, 'fPin');
  wire('rEmail', v => rState.email = v, null);
  const rd = $('rDate'); if (rd) rd.addEventListener('change', () => { rState.date = rd.value; $('fDate').classList.remove('invalid'); });
}
function wire(id, set, field) {
  const el = $(id); if (!el) return;
  el.addEventListener('input', () => { set(el.value); if (field) $(field).classList.remove('invalid'); });
}
function validStep1() {
  const a = $('fModel').classList.toggle('invalid', rState.model.trim().length < 2);
  const b = $('fIssue').classList.toggle('invalid', rState.issue.trim().length < 10);
  return !a && !b;
}
function validStep2() {
  if (rState.mode !== 2) return true;
  const bad = !rState.date || new Date(rState.date + 'T00:00:00') <= new Date(new Date().toDateString());
  $('fDate').classList.toggle('invalid', bad);
  return !bad;
}
function validStep3() {
  const a = $('fName').classList.toggle('invalid', rState.name.trim().length < 2);
  const b = $('fPhone').classList.toggle('invalid', !/^\d{10}$/.test(rState.phone.trim()));
  const need = rState.mode !== 0;
  const c = need ? $('fAddr').classList.toggle('invalid', rState.address.trim().length < 8) : false;
  const d = need ? $('fPin').classList.toggle('invalid', !/^\d{6}$/.test(rState.pincode.trim())) : false;
  return !a && !b && !c && !d;
}
function submitRepair() {
  const ticket = 'SRS-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  $('repairProgress').hidden = true;
  $('repairForm').innerHTML = `
<div class="success-view">
  <div class="success-icon">✅</div>
  <h3>Repair request received!</h3>
  <p>Our team will call within 60 minutes with a free quote and ${rState.mode === 1 ? 'your prepaid courier label' : rState.mode === 2 ? 'pickup slot confirmation' : 'online next steps'}.</p>
  <span class="ticket">#${ticket}</span><br/>
  <button type="button" class="btn btn-primary" id="repairDone">Done</button>
</div>`;
  $('repairDone').addEventListener('click', () => { closeModal('repairModal'); $('repairProgress').hidden = false; });
  toast('✅', 'Repair request submitted', `Ticket #${ticket} — free quote within 60 minutes.`, 'primary');
}
/* ---------- 05. Bulk modal & misc UI ---------- */
function openBulkModal() { openModal('bulkModal'); }
function openModal(id) { $(id).hidden = false; $('overlay').classList.add('show'); }
function hideOverlayIfNoneOpen() {
  if (Array.from(document.querySelectorAll('.modal')).every(m => m.hidden)) $('overlay').classList.remove('show');
}

$('bulkForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('bName').value.trim(), phone = $('bPhone').value.trim(), product = $('bProduct').value.trim();
  let ok = true;
  if (name.length < 2) { ok = false; $('bName').parentElement.classList.add('invalid'); }
  if (!/^\d{10}$/.test(phone)) { ok = false; $('bPhone').parentElement.classList.add('invalid'); }
  if (product.length < 5) { ok = false; $('bProduct').parentElement.classList.add('invalid'); }
  if (!ok) return;
  closeModal('bulkModal');
  toast('📦', 'Bulk request received!', 'Our wholesale team will email you the price list within 24 hours.', 'primary');
  $('bulkForm').reset();
});

/* ---------- 06. Toasts, drawer, nav, scroll ---------- */
function toast(icon, title, msg, type = 'success') {
  const box = $('toasts');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="t-icon">${icon}</span><div><b>${title}</b><span>${msg}</span></div>`;
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }, 3800);
}

$('cartBtn').addEventListener('click', () => { $('cartDrawer').classList.add('open'); $('overlay').classList.add('show'); });
$('cartClose').addEventListener('click', () => { $('cartDrawer').classList.remove('open'); hideOverlayIfNoneOpen(); });
$('overlay').addEventListener('click', () => {
  $('cartDrawer').classList.remove('open');
  Array.from(document.querySelectorAll('.modal')).forEach(m => m.hidden = true);
  $('overlay').classList.remove('show');
});
$('hamburger').addEventListener('click', () => { $('mainNav').classList.toggle('open'); });
document.querySelectorAll('.main-nav .nav-link').forEach(a => a.addEventListener('click', () => {
  document.querySelectorAll('.main-nav .nav-link').forEach(x => x.classList.remove('active'));
  a.classList.add('active');
  $('mainNav').classList.remove('open');
}));

/* Live store search + sort */
$('storeSearch').addEventListener('input', ev => { store.search = ev.target.value.trim(); renderProducts(); });
$('sortSelect').addEventListener('change', ev => { store.sort = ev.target.value; renderProducts(); });

/* Global header search → store */
function searchStore() {
  const q = $('globalSearch').value.trim();
  if (!q) return;
  store.search = q; store.cat = 'all';
  renderCats(); renderProducts();
  $('storeSearch').value = q;
  document.getElementById('store').scrollIntoView({ behavior: 'smooth' });
  $('mainNav').classList.remove('open');
}
$('doSearch').addEventListener('click', searchStore);
$('searchForm').addEventListener('submit', ev => { ev.preventDefault(); searchStore(); });
$('bulkIconBtn').addEventListener('click', () => { document.getElementById('bulk').scrollIntoView({ behavior: 'smooth' }); });

/* Scroll behaviour */
const header = $('siteHeader'), toTop = $('toTop');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  toTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Init ---------- */
renderCats();
renderProducts();
renderCart();