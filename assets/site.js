'use strict';
(() => {
 const config = JSON.parse(document.getElementById('site-config').textContent);
 const local = value => typeof value === 'string' ? value : value?.[config.lang] || value?.fa || value?.en || value?.fr || '';
 const node = (tag, text, cls) => { const el = document.createElement(tag); if(text) el.textContent=text; if(cls) el.className=cls; return el; };
 const normalize = text => String(text).toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
 function safeURL(value){ if(!value) return null; try {const url=new URL(value,document.baseURI); return ['http:','https:','file:'].includes(url.protocol)?url.href:null;}catch{return null;} }
 function image(value,alt,cls){const url=safeURL(value); if(!url)return null;const img=node('img');img.src=url;img.alt=alt;img.className=cls||'';img.loading='lazy';return img;}
 if(config.page==='collection'){
  const records=window.NIMA_CATALOGUE || []; const host=document.getElementById('records'); const empty=document.getElementById('empty'); const search=document.getElementById('search'); const type=document.getElementById('type');
  function render(){host.replaceChildren();const query=normalize(search.value.trim()); const matches=records.filter(r=>(type.value==='all'||r.type===type.value)&&normalize([local(r.title),local(r.author),local(r.description),...(r.subjects||[]).map(local)].join(' ')).includes(query));
   document.getElementById('count').textContent=records.length?`${matches.length.toLocaleString(config.lang)} ${config.results}`:'';
   empty.hidden=matches.length>0;if(!matches.length){empty.querySelector('h2').textContent=records.length?config.noresults:config.empty;empty.querySelector('p').textContent=records.length?'':config.emptydesc;}
   for(const r of matches){const card=node('article',null,'record');const cover=image(r.image,local(r.title));if(cover)card.append(cover);card.append(node('span',r.type==='book'?(config.lang==='fa'?'کتاب':config.lang==='fr'?'Livre':'Book'):(config.lang==='fa'?'سند':'Document'),'type'),node('h2',local(r.title)),node('p',[local(r.author),r.year].filter(Boolean).join(' · ')),node('p',local(r.description)));const url=safeURL(r.url);if(url){const link=node('a',config.view);link.href=url;card.append(link);}host.append(card);}
  }search.addEventListener('input',render);type.addEventListener('change',render);render();
 }
 if(config.page==='yade-yaran'){
  const host=document.getElementById('tributes');const entries=window.NIMA_MEMORIALS || [];document.getElementById('memempty').hidden=entries.length>0;
  for(const entry of entries){const card=node('article',null,'record tribute');const photo=image(entry.photo,local(entry.name),'portrait');if(photo)card.append(photo);card.append(node('h2',local(entry.name)));if(entry.dates)card.append(node('p',local(entry.dates),'subtle'));card.append(node('p',local(entry.biography),'bio'));host.append(card);}
 }
})();
