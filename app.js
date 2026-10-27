// Frameproof prototype: example listings, serial check, trust scoring, scam spotter and meet-up checklist.

// ---------- Example data ----------
const LISTINGS = [
  {
    id: "trek-fx2", title: "Trek FX 2 Disc", type: "Hybrid", year: 2021, size: "M · 18.5\"",
    price: 340, market: [300, 420], color: "#2e8c8c", miles: 0.8, posted: "2 days ago",
    seller: { name: "Amira K.", uni: true, sales: 3, since: "Sep 2024" },
    serial: "WTU308C1142", serialStatus: "clear", proof: "Original shop receipt",
    inspection: { chain: 0.3, pads: 3.5, tyres: "Good tread, no cracks", by: "Campus Bike Hub", date: "21 Oct 2026" },
    desc: "Commuted to lectures for two years, always stored indoors. New bar tape and a rear rack included.",
  },
  {
    id: "allez", title: "Specialized Allez", type: "Road", year: 2019, size: "54 cm",
    price: 420, market: [380, 520], color: "#c8372d", miles: 1.6, posted: "5 hours ago",
    seller: { name: "Tom R.", uni: true, sales: 1, since: "Jan 2025" },
    serial: "WSBC6045821L", serialStatus: "clear", proof: "Bank statement",
    inspection: { chain: 0.6, pads: 2.8, tyres: "Front tyre worn, rear good", by: "Campus Bike Hub", date: "18 Oct 2026" },
    desc: "Shimano Claris groupset, light and quick. Chain is due a change soon (about a £25 job).",
  },
  {
    id: "brompton", title: "Brompton C Line Explore", type: "Folding", year: 2020, size: "One size",
    price: 780, market: [720, 950], color: "#6d8b3a", miles: 2.1, posted: "1 day ago",
    seller: { name: "Priya S.", uni: true, sales: 6, since: "Oct 2023" },
    serial: "2009451234", serialStatus: "clear", proof: "Registration certificate",
    inspection: { chain: 0.2, pads: 4.0, tyres: "Nearly new", by: "Campus Bike Hub", date: "24 Oct 2026" },
    desc: "6-speed, folds in seconds and fits under a lecture desk. Comes with front bag.",
  },
  {
    id: "cannondale", title: "Cannondale road bike, barely used", type: "Road", year: null, size: "Not stated",
    price: 120, market: [450, 650], color: "#3a3f45", miles: 4.8, posted: "3 hours ago",
    seller: { name: "bikedeals_99", uni: false, sales: 0, since: "Yesterday" },
    serial: null, serialStatus: "missing", proof: null, inspection: null,
    desc: "Need gone today. Cash or bank transfer only. Can't meet on campus.",
    flags: ["Price is about 75% below what this model usually sells for", "Account created yesterday with no sales", "No serial number added, so it can't be checked", "Seller asks for bank transfer and won't meet at a safe spot"],
  },
  {
    id: "carrera", title: "Carrera Vengeance", type: "Mountain", year: 2022, size: "L · 20\"",
    price: 260, market: [240, 330], color: "#3b5ba9", miles: 1.2, posted: "4 days ago",
    seller: { name: "Jonah M.", uni: true, sales: 2, since: "Feb 2025" },
    serial: "CV22L0093318", serialStatus: "clear", proof: "Bank statement", inspection: null,
    desc: "Hydraulic disc brakes, front suspension. A couple of scratches on the top tube.",
  },
  {
    id: "raleigh", title: "Raleigh Pioneer", type: "Hybrid", year: 2018, size: "M · 19\"",
    price: 150, market: [130, 200], color: "#7a4e8c", miles: 0.4, posted: "6 days ago",
    seller: { name: "Chen L.", uni: true, sales: 1, since: "Sep 2025" },
    serial: "RP18M774102", serialStatus: "clear", proof: null,
    inspection: { chain: 0.4, pads: 2.5, tyres: "Good", by: "Campus Bike Hub", date: "15 Oct 2026" },
    desc: "Reliable runaround with mudguards and lights. Bought second hand, no receipt from the first owner.",
  },
  {
    id: "giant", title: "Giant Escape 3", type: "Hybrid", year: 2020, size: "S · 16\"",
    price: 230, market: [210, 290], color: "#2d6a4f", miles: 3.0, posted: "1 week ago",
    seller: { name: "Sofia B.", uni: true, sales: 0, since: "Aug 2026" },
    serial: "GE20S551208", serialStatus: "clear", proof: "Original shop receipt", inspection: null,
    desc: "Smaller frame, good for riders around 155–170 cm. Kickstand and bell included.",
  },
  {
    id: "pendleton", title: "Pendleton Somerby", type: "City", year: 2021, size: "One size · 17\"",
    price: 210, market: [190, 260], color: "#a64b2a", miles: 1.9, posted: "3 days ago",
    seller: { name: "Ellie W.", uni: true, sales: 4, since: "Sep 2023" },
    serial: "PS21U302877", serialStatus: "clear", proof: "Gift receipt",
    inspection: { chain: 0.8, pads: 1.5, tyres: "Good", by: "Campus Bike Hub", date: "12 Oct 2026" },
    desc: "Step-through frame with a front basket. Brakes and chain need attention, priced to reflect that.",
  },
];

// Example theft register used by the serial checker
const STOLEN = {
  WTU284G7713: { model: "Trek Marlin 5, blue", date: "14 Oct 2026", where: "Outside the Engineering building", ref: "CR/0412/26" },
  CV19M0088421: { model: "Carrera Subway, black", date: "2 Sep 2026", where: "Station Road bike rack", ref: "CR/0377/26" },
};

const SAFE_SPOTS = ["Campus Security Lodge", "Students' Union foyer", "Campus Bike Hub", "Library entrance"];

const CHECKLIST = [
  { group: "Before you go", items: [
    ["Run the serial check", "Ask the seller for the frame number and check it above."],
    ["Ask for proof of ownership", "Receipt, bank statement or registration with the same serial."],
    ["Book a safe spot", "Somewhere staffed and covered by CCTV, in daylight if you can."],
  ]},
  { group: "At the bike", items: [
    ["Match the serial on the frame", "Look under the bottom bracket. Filed-off or painted-over numbers are a dealbreaker."],
    ["Squeeze both brakes", "Levers should stop well before touching the bar. Push the bike: wheels must lock."],
    ["Check the chain", "Lift it off the front ring. If you can see most of a tooth, it's worn."],
    ["Spin both wheels", "No wobble side to side, no rubbing on brake pads."],
    ["Look for frame cracks", "Check around welds, the head tube and where the seat tube meets the top tube."],
    ["Ride it", "Run through every gear. Listen for clicks or grinding."],
  ]},
  { group: "Paying", items: [
    ["Pay through Safe Pay, never by bank transfer upfront", "Your money is held until you give the seller's handover code."],
  ]},
];

const FLAG_NOTES = [
  ["Cash or bank transfer only", "Neither can be reversed if the bike turns out to be stolen or never shows up."],
  ["Has to go today", "Rushing you is a pressure tactic so you skip the checks."],
  ["Won't meet on campus, after dark", "Safe, staffed places are exactly where someone selling a stolen bike won't go."],
  ["No receipt, it was a present", "Possible, but with no serial check either, you have no way to know it's theirs."],
  ["Deposit to hold it", "The most common scam: the deposit gets paid and the seller disappears."],
];

// ---------- Helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const gbp = (n) => "£" + n.toLocaleString("en-GB");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const normSerial = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3200);
}

// ---------- Bike drawing ----------
function bikeSVG({ type = "Hybrid", color = "#2f4a5e", marker = false } = {}) {
  const folding = type === "Folding";
  const r = folding ? 24 : 33;
  const tyre = type === "Mountain" ? 6 : type === "Road" ? 2.5 : 4;
  const rear = folding ? [58, 86] : [48, 80];
  const front = folding ? [146, 86] : [154, 80];
  const bb = folding ? [100, 88] : [96, 82];
  const seat = folding ? [92, 44] : type === "City" ? [84, 40] : [84, 38];
  const headTop = folding ? [138, 30] : [140, 38];
  const headBot = folding ? [140, 50] : [137, 52];
  const L = (a, b, w = 5) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" style="stroke:${color}" stroke-width="${w}" stroke-linecap="round"/>`;

  let frame;
  if (folding) {
    frame = L(rear, bb) + L(bb, [118, 62], 6) + L([118, 62], headBot, 6) + L(bb, seat) + L(seat, [92, 30], 3);
  } else if (type === "City") {
    frame = L(rear, bb) + L(seat, rear, 4) + L(bb, seat) + L(bb, headBot) + L([88, 62], [136, 47], 4);
  } else {
    frame = L(rear, bb) + L(seat, rear, 4) + L(bb, seat) + L(bb, headBot) + L(seat, headTop);
  }
  const fork = L(headBot, front, 4) + L(headTop, headBot, 6);
  let bars;
  if (type === "Road") {
    bars = `<path d="M${headTop[0]} ${headTop[1]} l8 -2 q8 0 7 9 q-1 6 -7 5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>`;
  } else if (type === "City") {
    bars = `<path d="M${headTop[0]} ${headTop[1]} q2 -8 -10 -8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
            <rect x="${headTop[0] + 6}" y="${headTop[1] + 2}" width="22" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>`;
  } else {
    bars = `<line x1="${headTop[0] - 2}" y1="${headTop[1] - 4}" x2="${headTop[0] + 10}" y2="${headTop[1] - 6}" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="${headTop[0]}" y1="${headTop[1]}" x2="${headTop[0] + 1}" y2="${headTop[1] - 5}" stroke="currentColor" stroke-width="3"/>`;
  }
  const saddleY = seat[1] - (folding ? 16 : 8);
  const saddle = `<line x1="${seat[0]}" y1="${seat[1]}" x2="${seat[0] - 2}" y2="${saddleY}" stroke="currentColor" stroke-width="3"/>
    <path d="M${seat[0] - 14} ${saddleY} q12 -4 22 0" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`;
  const wheel = (c) => `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="none" stroke="currentColor" stroke-width="${tyre}"/>
    <circle cx="${c[0]}" cy="${c[1]}" r="${r - tyre - 2}" fill="none" stroke="currentColor" stroke-width=".6" opacity=".45"/>
    <circle cx="${c[0]}" cy="${c[1]}" r="2.5" fill="currentColor"/>`;
  const crank = `<circle cx="${bb[0]}" cy="${bb[1]}" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/>
    <line x1="${bb[0]}" y1="${bb[1]}" x2="${bb[0] + 8}" y2="${bb[1] + 10}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
  const mark = marker ? `
    <circle cx="${bb[0]}" cy="${bb[1]}" r="13" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-dasharray="4 3"/>
    <line x1="${bb[0] + 10}" y1="${bb[1] + 10}" x2="${bb[0] + 30}" y2="${bb[1] + 30}" style="stroke:var(--accent)" stroke-width="2.5"/>
    <text x="${bb[0] + 32}" y="${bb[1] + 36}" font-family="IBM Plex Mono, monospace" font-size="11" font-weight="600" fill="currentColor">SERIAL HERE</text>` : "";
  const h = marker ? 136 : 124;
  return `<svg viewBox="0 0 200 ${h}" role="img" aria-label="${esc(type)} bike illustration">${wheel(rear)}${wheel(front)}${frame}${fork}${bars}${saddle}${crank}${mark}</svg>`;
}

// ---------- Trust scoring ----------
function priceVerdict(l) {
  const [lo, hi] = l.market;
  if (l.price < lo * 0.7) return { label: "Far below market", cls: "is-bad", ok: false, note: "Prices this low are a common sign of a stolen bike or a fake listing." };
  if (l.price < lo) return { label: "Below market", cls: "is-warn", ok: true, note: "A little cheaper than usual. Ask why." };
  if (l.price > hi) return { label: "Above market", cls: "is-warn", ok: false, note: "Higher than this model usually sells for." };
  return { label: "Fair price", cls: "is-yes", ok: true, note: `Usual range for this model is ${gbp(lo)}–${gbp(hi)}.` };
}

function trustBreakdown(l) {
  const pv = priceVerdict(l);
  return [
    { label: "Serial is clear", pts: 30, ok: l.serialStatus === "clear",
      note: l.serialStatus === "clear" ? `${l.serial} has no theft reports` : "No serial number provided, so it can't be checked" },
    { label: "Verified student seller", pts: 25, ok: l.seller.uni,
      note: l.seller.uni ? "Confirmed with a university email" : "Seller hasn't verified a uni email" },
    { label: "Proof of ownership", pts: 20, ok: !!l.proof, note: l.proof || "No receipt or statement uploaded" },
    { label: "Inspected at a bike hub", pts: 15, ok: !!l.inspection,
      note: l.inspection ? `${l.inspection.by}, ${l.inspection.date}` : "Not inspected yet. You can ask for a free hub check." },
    { label: "Price in the usual range", pts: 10, ok: pv.ok, note: pv.note },
  ];
}

const trustScore = (l) => trustBreakdown(l).reduce((s, c) => s + (c.ok ? c.pts : 0), 0);
const trustLevel = (s) => (s >= 85 ? { name: "Strong", cls: "is-strong" } : s >= 60 ? { name: "Good", cls: "is-good" } : { name: "Caution", cls: "is-caution" });

function ring(score) {
  const c = 2 * Math.PI * 12;
  return `<svg class="score-ring" viewBox="0 0 30 30" aria-hidden="true">
    <circle cx="15" cy="15" r="12" fill="none" style="stroke:var(--surface-2)" stroke-width="3.5"/>
    <circle cx="15" cy="15" r="12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"
      stroke-dasharray="${(score / 100) * c} ${c}" transform="rotate(-90 15 15)"/>
    <text x="15" y="19" text-anchor="middle">${score}</text></svg>`;
}

// ---------- Serial check ----------
function checkSerial(raw) {
  const out = $("#serialResult");
  const s = normSerial(raw);
  out.className = "serial-result";
  if (s.length < 6) {
    out.classList.add("is-warn");
    out.innerHTML = `<span class="res-icon">?</span><strong>That looks too short</strong><p>Frame serials are usually 7 to 14 letters and numbers. Check you've copied the whole stamp.</p>`;
    return;
  }
  const hit = STOLEN[s];
  if (hit) {
    out.classList.add("is-bad");
    out.innerHTML = `<span class="res-icon">!</span><strong>Reported stolen on ${hit.date}</strong>
      <p>${esc(hit.model)}, taken from: ${esc(hit.where)}. Police ref <span class="mono">${hit.ref}</span>. Don't buy it. Walk away and tell campus security.</p>`;
    return;
  }
  const listed = LISTINGS.find((l) => l.serial && normSerial(l.serial) === s);
  out.classList.add("is-ok");
  out.innerHTML = `<span class="res-icon">✓</span><strong>No theft reports for ${esc(s)}</strong>
    <p>${listed ? `This matches the <b>${esc(listed.title)}</b> listed on Frameproof.` : "That's a good sign, but not a guarantee."} Still ask for proof of ownership before you pay.</p>`;
}

// ---------- Listings ----------
const state = { type: "all", q: "", max: 800, sort: "trust", strong: false };

function badgeRow(l) {
  const b = [];
  b.push(l.serialStatus === "clear" ? `<span class="badge is-yes">✓ Serial clear</span>` : `<span class="badge is-bad">✕ No serial</span>`);
  b.push(l.seller.uni ? `<span class="badge is-yes">✓ Student</span>` : `<span class="badge is-bad">✕ Unverified</span>`);
  b.push(l.proof ? `<span class="badge is-yes">✓ Proof</span>` : `<span class="badge is-no">No proof</span>`);
  b.push(l.inspection ? `<span class="badge is-yes">✓ Inspected</span>` : `<span class="badge is-no">Not inspected</span>`);
  const pv = priceVerdict(l);
  if (pv.cls !== "is-yes") b.push(`<span class="badge ${pv.cls}">${pv.label}</span>`);
  return b.join("");
}

function renderListings() {
  let list = LISTINGS.map((l) => ({ ...l, score: trustScore(l) }))
    .filter((l) => state.type === "all" || l.type === state.type)
    .filter((l) => l.price <= state.max)
    .filter((l) => !state.strong || l.score >= 85)
    .filter((l) => !state.q || l.title.toLowerCase().includes(state.q));

  const sorters = {
    trust: (a, b) => b.score - a.score || a.price - b.price,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    near: (a, b) => a.miles - b.miles,
  };
  list.sort(sorters[state.sort]);

  $("#listingGrid").innerHTML = list.map((l) => {
    const lv = trustLevel(l.score);
    return `<button type="button" class="card" data-id="${l.id}" aria-label="${esc(l.title)}, ${gbp(l.price)}, trust score ${l.score}">
      <div class="card-thumb">
        ${bikeSVG(l)}
        <span class="score ${lv.cls}">${ring(l.score)}${lv.name}</span>
        <span class="posted mono">${l.posted}</span>
      </div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-title">${esc(l.title)}</span>
          <span class="card-price">${gbp(l.price)}</span>
        </div>
        <span class="card-meta">${l.type} · ${esc(l.size)} · ${l.miles} mi from campus</span>
        <div class="badges">${badgeRow(l)}</div>
      </div>
    </button>`;
  }).join("");

  $("#emptyState").hidden = list.length > 0;
  $("#resultCount").textContent = `${list.length} of ${LISTINGS.length} bikes · example listings`;
}

// ---------- Listing dialog ----------
function gaugeClass(kind, v) {
  if (kind === "chain") return v < 0.5 ? "is-ok" : v <= 0.75 ? "is-warn" : "is-bad";
  if (kind === "pads") return v >= 3 ? "is-ok" : v >= 2 ? "is-warn" : "is-bad";
  return "is-ok";
}

function openListing(id) {
  const l = LISTINGS.find((x) => x.id === id);
  const score = trustScore(l);
  const lv = trustLevel(score);
  const pv = priceVerdict(l);
  const [lo, hi] = l.market;
  const min = Math.min(lo, l.price) * 0.8;
  const max = Math.max(hi, l.price) * 1.1;
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const insp = l.inspection
    ? `<div class="gauges">
        <div class="gauge ${gaugeClass("chain", l.inspection.chain)}"><b class="mono">${l.inspection.chain}%</b><span>Chain wear · replace at 0.75%</span></div>
        <div class="gauge ${gaugeClass("pads", l.inspection.pads)}"><b class="mono">${l.inspection.pads} mm</b><span>Brake pads · replace under 2 mm</span></div>
        <div class="gauge is-ok"><b>Tyres</b><span>${esc(l.inspection.tyres)}</span></div>
      </div>
      <p class="insp-note">Checked by ${esc(l.inspection.by)} on ${l.inspection.date}.</p>`
    : `<p class="insp-note">Not inspected yet. Ask the seller to meet at the Campus Bike Hub for a free 10-minute check.</p>`;

  const canPay = l.serialStatus === "clear" && l.seller.uni;

  $("#dialogBody").innerHTML = `
    <button type="button" class="dlg-close" aria-label="Close">×</button>
    <div class="dlg-left">
      ${bikeSVG(l)}
      <dl class="spec">
        <dt>Type</dt><dd>${l.type}</dd>
        <dt>Frame size</dt><dd>${esc(l.size)}</dd>
        <dt>Year</dt><dd>${l.year || "Not stated"}</dd>
        <dt>Serial</dt><dd class="mono">${l.serial ? esc(l.serial) : "Not provided"}</dd>
        <dt>Distance</dt><dd>${l.miles} mi from campus</dd>
      </dl>
      <p style="margin:0">${esc(l.desc)}</p>
      <div class="seller">
        <span class="avatar" aria-hidden="true">${esc(l.seller.name[0])}</span>
        <div><strong>${esc(l.seller.name)}</strong>
          <small>${l.seller.uni ? "Verified student" : "Not verified"} · ${l.seller.sales} sale${l.seller.sales === 1 ? "" : "s"} · joined ${l.seller.since}</small></div>
      </div>
    </div>
    <div class="dlg-right">
      <div>
        <h2 class="dlg-title" id="dlgTitle">${esc(l.title)}</h2>
        <div class="dlg-price-row">
          <span class="dlg-price">${gbp(l.price)}</span>
          <span class="score ${lv.cls}" style="position:static">${ring(score)}${lv.name} trust</span>
        </div>
      </div>

      ${l.flags ? `<div class="alert"><strong>We'd avoid this one</strong><ul>${l.flags.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>` : ""}

      <div>
        <h3 class="dlg-h">Trust score</h3>
        <ul class="trust-list">
          ${trustBreakdown(l).map((c) => `<li>
            <span class="ic ${c.ok ? "is-yes" : "is-no"}">${c.ok ? "✓" : "✕"}</span>
            <span>${c.label}<small>${esc(c.note)}</small></span>
            <span class="pts ${c.ok ? "is-yes" : "is-no"}">${c.ok ? "+" + c.pts : "0"}</span></li>`).join("")}
        </ul>
        <div class="trust-total"><span>Total</span><span class="mono">${score} / 100</span></div>
      </div>

      <div>
        <h3 class="dlg-h">Price check · ${pv.label}</h3>
        <div class="price-bar">
          <span class="price-range" style="left:${pct(lo)}%;width:${pct(hi) - pct(lo)}%"></span>
          <span class="price-dot" style="left:${pct(l.price)}%"><span>${gbp(l.price)}</span></span>
        </div>
        <div class="price-legend"><span>Usual range ${gbp(lo)}–${gbp(hi)}</span><span>Based on 6 months of sales</span></div>
      </div>

      <div>
        <h3 class="dlg-h">Inspection report</h3>
        ${insp}
      </div>

      <div class="safepay" id="safepay">
        <h4>Safe Pay</h4>
        ${canPay ? `<p>Your ${gbp(l.price)} is held by Frameproof. The seller only gets paid when you hand over their code after checking the bike.</p>
          <ol class="steps" id="spSteps">
            <li class="is-now">Hold payment</li><li>Meet at a safe spot</li><li>Check bike & serial</li><li>Enter handover code</li>
          </ol>
          <div class="sp-row" id="spStage1">
            <select id="spSpot" aria-label="Meeting spot">${SAFE_SPOTS.map((s) => `<option>${s}</option>`).join("")}</select>
            <button type="button" class="btn btn-accent" id="spHold">Hold ${gbp(l.price)}</button>
          </div>
          <div class="sp-row" id="spStage2" hidden>
            <input id="spCode" inputmode="numeric" maxlength="4" placeholder="0000" aria-label="Seller's 4-digit handover code">
            <button type="button" class="btn btn-ink" id="spRelease" disabled>Release payment</button>
          </div>`
        : `<p>Safe Pay isn't available for this listing because the seller hasn't verified their identity or the bike's serial. That's a reason to walk away.</p>
           <button type="button" class="btn btn-ghost btn-small" disabled>Safe Pay unavailable</button>`}
      </div>
    </div>`;

  const dlg = $("#listingDialog");
  dlg.showModal();
  $(".dlg-close", dlg).addEventListener("click", () => dlg.close());

  if (canPay) {
    const steps = $$("#spSteps li");
    const setStep = (n) => steps.forEach((li, i) => { li.className = i < n ? "is-done" : i === n ? "is-now" : ""; });
    $("#spHold").addEventListener("click", () => {
      const spot = $("#spSpot").value;
      setStep(3);
      $("#spStage1").hidden = true;
      $("#spStage2").hidden = false;
      toast(`${gbp(l.price)} held. Meet ${l.seller.name} at the ${spot}.`);
      $("#spCode").focus();
    });
    $("#spCode").addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "");
      $("#spRelease").disabled = e.target.value.length !== 4;
    });
    $("#spRelease").addEventListener("click", () => {
      steps.forEach((li) => (li.className = "is-done"));
      $("#spStage2").hidden = true;
      $("#safepay p").textContent = `Done. ${gbp(l.price)} released to ${l.seller.name}. Enjoy the ride, and register the bike in your name.`;
      toast("Payment released. The bike is yours.");
    });
  }
}

// ---------- Scam spotter ----------
const found = new Set();
function markFlag(i) {
  if (found.has(i)) return;
  found.add(i);
  $(`.flag[data-flag="${i}"]`).classList.add("is-found");
  const [title, why] = FLAG_NOTES[i];
  const li = document.createElement("li");
  li.innerHTML = `<strong>${esc(title)}.</strong> ${esc(why)}`;
  $("#flagNotes").appendChild(li);
  $("#flagCount").textContent = `${found.size} / ${FLAG_NOTES.length}`;
  $("#flagBar").style.width = `${(found.size / FLAG_NOTES.length) * 100}%`;
  if (found.size === FLAG_NOTES.length) toast("All 5 found. You'd have spotted this one.");
}

// ---------- Checklist ----------
function renderChecklist() {
  const ticks = store.get("fp-checklist", {});
  let n = 0;
  $("#checklist").innerHTML = CHECKLIST.map((g, gi) => `
    <div class="check-group"><h3>${g.group}</h3>
      ${g.items.map(([t, d], ii) => {
        const id = `ck-${gi}-${ii}`;
        n++;
        return `<label class="check-item" for="${id}"><input type="checkbox" id="${id}" ${ticks[id] ? "checked" : ""}>
          <div><strong>${esc(t)}</strong><span>${esc(d)}</span></div></label>`;
      }).join("")}
    </div>`).join("");
  updateProgress(n);
}
function updateProgress(total = $$("#checklist input").length) {
  const done = $$("#checklist input:checked").length;
  $("#checkProgress").textContent = `${done} of ${total} done`;
  $("#checkBar").style.width = `${(done / total) * 100}%`;
}

// ---------- Wire up ----------
document.addEventListener("DOMContentLoaded", () => {
  $("#bbDiagram").innerHTML = bikeSVG({ type: "Hybrid", color: "var(--steel)", marker: true });

  $("#serialForm").addEventListener("submit", (e) => { e.preventDefault(); checkSerial($("#serialInput").value); });
  $$(".chip-btn[data-serial]").forEach((b) => b.addEventListener("click", () => {
    $("#serialInput").value = b.dataset.serial;
    checkSerial(b.dataset.serial);
  }));

  $("#typeChips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    $$("#typeChips .chip").forEach((c) => c.classList.toggle("is-on", c === b));
    state.type = b.dataset.type;
    renderListings();
  });
  $("#searchInput").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderListings(); });
  $("#maxPrice").addEventListener("input", (e) => {
    state.max = +e.target.value;
    $("#maxPriceOut").textContent = gbp(state.max);
    renderListings();
  });
  $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderListings(); });
  $("#verifiedOnly").addEventListener("change", (e) => { state.strong = e.target.checked; renderListings(); });
  $("#listingGrid").addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) openListing(c.dataset.id);
  });
  $("#listingDialog").addEventListener("click", (e) => { if (e.target.id === "listingDialog") e.target.close(); });

  $$(".flag").forEach((f) => f.addEventListener("click", () => markFlag(+f.dataset.flag)));
  $("#revealFlags").addEventListener("click", () => FLAG_NOTES.forEach((_, i) => markFlag(i)));

  $("#checklist").addEventListener("change", (e) => {
    const ticks = store.get("fp-checklist", {});
    ticks[e.target.id] = e.target.checked;
    store.set("fp-checklist", ticks);
    updateProgress();
  });
  $("#resetChecklist").addEventListener("click", () => { store.set("fp-checklist", {}); renderChecklist(); });

  $("#sellBtn").addEventListener("click", () => toast("Listing flow is coming next. Have your serial photo and receipt ready."));

  renderChecklist();
  renderListings();
  $("#serialInput").value = "WTU284G7713";
  checkSerial("WTU284G7713");
});
