// Prosty sparkline i dane demo
document.querySelectorAll('.spark').forEach((c,i)=>{
  const ctx=c.getContext('2d'); const w=c.width=c.offsetWidth; const h=c.height;
  const pts = Array.from({length:24}, (_,k)=> Math.round(h/2 + Math.sin((k+i)*0.5)*h/3 + (Math.random()*10-5)));
  ctx.strokeStyle = '#4D8CFF'; ctx.lineWidth=2; ctx.beginPath();
  pts.forEach((y,x)=> x?ctx.lineTo(x*(w/pts.length), y):ctx.moveTo(0,y));
  ctx.stroke(); // glow
  ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(46,108,255,.6)'; ctx.stroke();
});

// Tabela kampanii – dane przykładowe
const rows=[
  {name:'FB – Prospecting', status:'Aktywna', budget:'8,000 zł', cpc:'1.24 zł', leads:412, conv:'4.8%'},
  {name:'Google – Brand', status:'Aktywna', budget:'5,500 zł', cpc:'0.88 zł', leads:530, conv:'7.2%'},
  {name:'TikTok – Video', status:'Wstrzymana', budget:'3,000 zł', cpc:'1.02 zł', leads:190, conv:'3.1%'}
];
document.getElementById('campaigns').innerHTML = rows.map(r=>`<tr>
  <td>${r.name}</td><td>${r.status}</td><td>${r.budget}</td><td>${r.cpc}</td><td>${r.leads}</td><td>${r.conv}</td>
</tr>`).join('');

// Zadania
const tasks=[
  {t:'Przegląd kampanii Google', due:'dziś 14:00'},
  {t:'Nowy landing dla sklepu', due:'jutro 10:00'},
  {t:'Audyt SEO – raport', due:'piątek 12:00'}
];
document.getElementById('tasks').innerHTML = tasks.map(x=>`<li><span>${x.t}</span><small>${x.due}</small></li>`).join('');
