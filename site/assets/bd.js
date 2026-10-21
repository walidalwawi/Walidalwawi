/* DATA */
var BD_DATA = {"site":"Walid Al Wawi","menu":true,"pager":true,"nav":{"icon":"text","label":"index;","openLabel":"","corner":"right","headings":true,"accordion":true,"current":"dim","title":"hide"},"sections":[{"key":"a","label":"a. art"},
{"key":"b","label":"b. biography"},
{"key":"c","label":"c. commentary"},
{"key":"e","label":"e. external"}],"pages":[{"section":"a","slug":"eoup","num":"a.1","title":"EOUP"},
{"section":"a","slug":"forbidden-fruit","num":"a. 2","title":"Forbidden Fruit"},
{"section":"a","slug":"eternity-of-silence","num":"a. 3","title":"Eternity Of Silence"},
{"section":"a","slug":"inaudible-dialogue","num":"a. 4","title":"Inaudible Dialogue"},
{"section":"a","slug":"qibla","num":"a. 5","title":"Qibla"},
{"section":"a","slug":"passport","num":"a. 6","title":"Passport"},
{"section":"a","slug":"white-socks","num":"a. 7","title":"White Socks"},
{"section":"a","slug":"chair-of-saladin","num":"a. 8","title":"Chair Of Saladin"},
{"section":"a","slug":"coffin","num":"a. 9","title":"Coffin"},
{"section":"a","slug":"thobe","num":"a. 10","title":"Thobe"},
{"section":"a","slug":"grasshopper","num":"a. 11","title":"Grasshopper"},
{"section":"a","slug":"hiding","num":"a. 12","title":"Hiding"},
{"section":"b","slug":"biography","num":"b.1","title":"Biography"},
{"section":"b","slug":"resume","num":"b.2","title":"Resume"},
{"section":"b","slug":"","num":"b.3","title":"Resignation"},
{"section":"c","slug":"how-to-deseed-a-watermelon","num":"c.1","title":"How To Deseed A Watermelon For Safe Consumption"},
{"section":"c","slug":"militant-improvisation","num":"c.2","title":"Militant Improvisation: The Militant Cultural Front"},
{"section":"c","slug":"the-many-and-the-ones","num":"c.3","title":"The Many And The Ones"},
{"section":"c","slug":"south-north-palestine","num":"c.4","title":"South, North, Palestine"},
{"section":"c","slug":"israels-co-opting","num":"c.5","title":"“Israel's” co opting of indigenous struggle."},
{"section":"c","slug":"al-thawabit","num":"c.6","title":"Al Thawabit"}],"externals":[{"section":"e","title":"Samt for Art and Research","url":"https://samt.co"},
{"section":"e","title":"@walidalwawi","url":"https://www.instagram.com/walidalwawi/"}]};

/* CHROME */
function bdChrome(root, data, nav) {
var host = root.querySelector(".bd-site") || document.body;
var panel = root.querySelector(".bd-panel");
if (!panel) return;
var icons = {
burger: '<svg viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h20M4 12h20M4 18h20"/></svg>',
prev: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 11H4M10 4.5 3.5 11l6.5 6.5"/></svg>',
next: '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11h15M12 4.5l6.5 6.5-6.5 6.5"/></svg>'
};
var pages = data.pages;
var index = -1;
for (var i = 0; i < pages.length; i++) {
if (pages[i].slug === data.current) index = i;
}
var section = index > -1 ? pages[index].section : "";
function make(tag, cls, html) {
var el = document.createElement(tag);
if (cls) el.className = cls;
if (html) el.innerHTML = html;
return el;
}
function href(p) {
return p.slug ? "/" + p.slug : "/";
}
function link(a, p) {
a.href = href(p);
if (nav) {
a.addEventListener("click", function (e) {
e.preventDefault();
nav(p.slug);
});
}
}
if (data.menu) {
var o = data.nav || {};
var menu = make("nav", "bd-menu is-cur-" + (o.current || "dim") + (o.headings === false ? " is-flat" : "") + (o.accordion === false ? " is-open-all" : "") + (o.title === "left" ? " is-title-left" : ""));
menu.setAttribute("aria-label", "Menu");
var list = make("div", "bd-menu-list");
data.sections.forEach(function (s) {
var items = pages.filter(function (p) { return p.section === s.key; });
var ext = (data.externals || []).filter(function (x) { return x.section === s.key; });
if (!items.length && !ext.length) return;
var group = make("div", "bd-menu-group" + (s.key === section ? " is-open" : ""));
var head = make("button", "bd-menu-head");
head.type = "button";
head.textContent = s.label;
head.setAttribute("aria-expanded", s.key === section || o.accordion === false ? "true" : "false");
head.addEventListener("click", function () {
if (o.accordion === false) return;
var open = group.classList.toggle("is-open");
head.setAttribute("aria-expanded", open ? "true" : "false");
});
var ul = make("ul", "bd-menu-items");
items.forEach(function (p) {
var li = make("li");
var a = make("a", p.slug === data.current ? "is-current" : "");
a.textContent = p.title;
link(a, p);
li.appendChild(a);
ul.appendChild(li);
});
ext.forEach(function (x) {
var li = make("li");
var a = make("a");
a.textContent = x.title;
a.href = x.url;
a.target = "_blank";
a.rel = "noopener";
li.appendChild(a);
ul.appendChild(li);
});
group.appendChild(head);
group.appendChild(ul);
list.appendChild(group);
});
var title = make("a", "bd-menu-title");
title.textContent = data.site;
var home = null;
for (var h = 0; h < pages.length; h++) {
if (pages[h].slug === "") home = pages[h];
}
link(title, home || { slug: "" });
menu.appendChild(list);
if (o.title !== "hide") menu.appendChild(title);
panel.appendChild(menu);
var burger = make("button", "bd-burger" + (o.corner === "left" ? " is-left" : ""));
burger.type = "button";
burger.setAttribute("aria-expanded", "false");
var face = function (open) {
if (o.icon === "text") burger.textContent = open && o.openLabel ? o.openLabel : (o.label || "Menu");
else burger.innerHTML = icons.burger;
};
face(false);
burger.setAttribute("aria-label", "Open menu");
host.appendChild(burger);
var setMenu = function (open) {
host.classList.toggle("has-menu", open);
burger.setAttribute("aria-expanded", open ? "true" : "false");
burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
face(open);
if (data.onToggle) data.onToggle(open);
};
if (data.open) setMenu(true);
burger.addEventListener("click", function (e) {
e.stopPropagation();
setMenu(!host.classList.contains("has-menu"));
});
host.addEventListener("click", function (e) {
if (!host.classList.contains("has-menu")) return;
if (menu.contains(e.target) || burger.contains(e.target)) return;
setMenu(false);
});
if (!nav) {
document.addEventListener("keydown", function (e) {
if (e.key === "Escape") setMenu(false);
});
}
}
if (data.pager && index > -1) {
var pager = make("nav", "bd-pager");
pager.setAttribute("aria-label", "Pages");
var prev = pages[index - 1];
var next = pages[index + 1];
var slot = make("span", "bd-pager-prev");
if (prev) {
var pa = make("a", "", icons.prev);
link(pa, prev);
pa.setAttribute("aria-label", "Previous: " + prev.title);
slot.appendChild(pa);
}
pager.appendChild(slot);
pager.appendChild(make("span", "bd-pager-num", pages[index].num || ""));
if (next) {
var na = make("a", "bd-pager-next", icons.next);
link(na, next);
na.setAttribute("aria-label", "Next: " + next.title);
pager.appendChild(na);
}
panel.appendChild(pager);
}
}

/* GALLERIES */
function bdGalleries(root) {
var host = root.querySelector(".bd-site") || (root.classList && root.classList.contains("bd-site") ? root : document.body);
root.querySelectorAll(".bd-gallery.is-slides").forEach(function (g) {
var figs = Array.prototype.slice.call(g.querySelectorAll(".bd-gi figure"));
if (!figs.length) return;
var at = 0;
var navType = g.getAttribute("data-nav") || "arrows";
var count = null;
function show(n) {
at = (n + figs.length) % figs.length;
figs.forEach(function (f, i) {
f.classList.toggle("is-on", i === at);
f.classList.toggle("is-past", i < at);
});
if (count) count.textContent = (at + 1) + " / " + figs.length;
}
if (navType === "arrows" || g.getAttribute("data-counter") === "1") {
var bar = document.createElement("div");
bar.className = "bd-slide-nav";
if (navType === "arrows") {
var prev = document.createElement("button");
prev.type = "button";
prev.textContent = "←";
prev.setAttribute("aria-label", "Previous image");
prev.addEventListener("click", function () { show(at - 1); });
var next = document.createElement("button");
next.type = "button";
next.textContent = "→";
next.setAttribute("aria-label", "Next image");
next.addEventListener("click", function () { show(at + 1); });
bar.appendChild(prev);
bar.appendChild(next);
}
if (g.getAttribute("data-counter") === "1") {
count = document.createElement("span");
bar.appendChild(count);
}
g.appendChild(bar);
}
if (navType === "zones" || navType === "single") {
g.querySelector(".bd-gi").addEventListener("click", function (e) {
var r = this.getBoundingClientRect();
if (navType === "single" || e.clientX > r.left + r.width / 2) show(at + 1);
else show(at - 1);
});
}
var auto = parseFloat(g.getAttribute("data-auto")) || 0;
if (auto > 0) setInterval(function () { show(at + 1); }, auto * 1000);
show(0);
});
root.addEventListener("click", function (e) {
var img = e.target.closest ? e.target.closest(".has-zoom img") : null;
if (!img) return;
var wrap = img.closest(".bd-gi");
var list = wrap ? Array.prototype.slice.call(wrap.querySelectorAll("img")) : [img];
var at = list.indexOf(img);
var box = document.createElement("div");
box.className = "bd-zoom";
box.setAttribute("role", "dialog");
box.setAttribute("aria-label", "Image");
var big = document.createElement("img");
var cap = document.createElement("div");
cap.className = "bd-zoom-cap";
box.appendChild(big);
box.appendChild(cap);
function show(n) {
at = (n + list.length) % list.length;
big.src = list[at].src;
big.alt = list[at].alt;
var fc = list[at].parentNode.querySelector("figcaption");
cap.textContent = fc ? fc.textContent : "";
}
function close() {
box.remove();
document.removeEventListener("keydown", key);
}
function key(ev) {
if (ev.key === "Escape") close();
if (ev.key === "ArrowRight") show(at + 1);
if (ev.key === "ArrowLeft") show(at - 1);
}
box.addEventListener("click", close);
document.addEventListener("keydown", key);
show(at);
host.appendChild(box);
});
}

/* START */
document.addEventListener("DOMContentLoaded", function () {
var data = Object.assign({}, BD_DATA, { current: document.body.getAttribute("data-bd-page") || "" });
bdChrome(document, data);
bdGalleries(document);
});
