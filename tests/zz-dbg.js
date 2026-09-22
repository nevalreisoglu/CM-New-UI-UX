const { chromium } = require('@playwright/test'); const path=require('path');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:800}});
  await p.route('https://fonts.googleapis.com/**',r=>r.abort());
  await p.goto('file://'+path.resolve(__dirname,'../index.html')+'?notour'); await p.waitForSelector('.view.active');
  await p.selectOption('#role-sel','admin'); await p.click('.nav button[data-view="datamart"]');
  await p.click('#dm-card tr[data-dm="DM-1"] [data-open]'); await p.click('[data-dmtab="columns"]');
  await p.click('#btn-nav'); await p.waitForTimeout(300);
  await p.click('.dm-col-row[data-col="MSISDN"]'); await p.waitForTimeout(500);
  console.log(await p.evaluate(()=>{ const d=document.getElementById('dm-drawer'); const r=d.getBoundingClientRect();
    const cs=getComputedStyle(d);
    return JSON.stringify({rect:[r.left,r.top,r.right,r.bottom],innerW:innerWidth,innerH:innerHeight,
      bg:cs.backgroundColor,pos:cs.position,z:cs.zIndex,op:cs.opacity,bodyOverflow:document.documentElement.scrollWidth}); }));
  await b.close(); })();
