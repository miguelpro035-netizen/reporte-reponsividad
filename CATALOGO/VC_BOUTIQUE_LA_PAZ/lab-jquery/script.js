/* Laboratorio independiente: efectos jQuery, DOM/BOM, delegación y temporizador. */
(() => {
  'use strict'; const $=window.jQuery; let selectedPrice=245, selectedName='Blazer Aura', timer=null, seconds=30;
  const byId=id=>document.getElementById(id); const log=(type,msg)=>{const row=document.createElement('p');row.textContent=`[${new Date().toLocaleTimeString()}] ${type}: ${msg}`;if($)$('#labLog').prepend(row);else byId('labLog').prepend(row);while(byId('labLog').children.length>20)byId('labLog').lastElementChild.remove();};
  function calculate(){const qty=Math.max(1,Math.min(10,Number(byId('labQty').value)||1));const service=Number(byId('labService').value);const total=selectedPrice*qty+service;byId('labTotal').textContent=`Bs ${total}`;byId('modalTotal').textContent=`Bs ${total}`;byId('labSummary').textContent=`${qty} prenda(s) · ${service?'entrega coordinada':'compra en boutique'}`;if($)$('#labTotal').stop(true).animate({opacity:.55},90).animate({opacity:1},170);return total;}
  function toast(message){byId('labToast').textContent=message;if($)$('#labToast').stop(true,true).slideDown(180).delay(3000).fadeOut(300);else{byId('labToast').style.display='block';setTimeout(()=>byId('labToast').style.display='none',3000);}}
  function openModal(){byId('labOverlay').hidden=false;byId('bookingModal').hidden=false;seconds=30;byId('labTimer').textContent='00:30';if(timer)clearInterval(timer);timer=setInterval(()=>{seconds--;byId('labTimer').textContent=`00:${String(Math.max(0,seconds)).padStart(2,'0')}`;if(seconds<=0){clearInterval(timer);timer=null;closeModal();toast('Tarifa Flash Expirada · vuelve a calcular tu solicitud.');log('TIMEOUT','Temporizador de 30 segundos expirado');}},1000);}
  function closeModal(){if(timer){clearInterval(timer);timer=null;}if($){$('#bookingModal').fadeOut(180,()=>{byId('bookingModal').hidden=true;});$('#labOverlay').fadeOut(180,()=>{byId('labOverlay').hidden=true;});}else{byId('bookingModal').hidden=true;byId('labOverlay').hidden=true;}}
  function init(){
    // jQuery: .off().on() previene listeners duplicados al re-inicializar la práctica.
    if($){$('#labTabs').off('click.vc','.lab-tabs button').on('click.vc','.lab-tabs button',function(){$('.lab-tabs button').removeClass('active');$(this).addClass('active');const cat=this.dataset.filter;$('.lab-product').stop(true,true)[cat==='all'?'fadeIn':'each'](function(){if(cat==='all')return;$(this)[$(this).data('category')===cat?'fadeIn':'fadeOut'](180);});log('FILTER',`Categoría: ${cat}`);});$('#detailsToggle').off('click.vc').on('click.vc',function(){$('#detailsPanel').stop(true,true).slideToggle('fast');});$('#labSearch').off('keyup.vc').on('keyup.vc',function(){const q=$(this).val().toLowerCase();$('.lab-product').each(function(){$(this)[$(this).text().toLowerCase().includes(q)?'fadeIn':'fadeOut'](120);});});}
    // Event Bubbling: un único listener en el contenedor para productos que cambian dinámicamente.
    byId('labProducts').addEventListener('click',e=>{const btn=e.target.closest('.lab-add');if(!btn)return;selectedName=btn.dataset.name;selectedPrice=Number(btn.dataset.price);calculate();log('CLICK',`${selectedName} agregado a la selección`);toast(`${selectedName} añadido a la selección.`);});
    byId('labQty').addEventListener('input',()=>{calculate();log('INPUT','Cantidad actualizada');});byId('labService').addEventListener('change',()=>{calculate();log('CHANGE',`Servicio seleccionado: ${byId('labService').selectedOptions[0].textContent}`);});
    byId('openBooking').addEventListener('click',openModal);byId('closeBooking').addEventListener('click',closeModal);byId('cancelBooking').addEventListener('click',closeModal);byId('labOverlay').addEventListener('click',closeModal);
    byId('confirmBooking').addEventListener('click',()=>{const name=byId('labCustomer').value.trim();if(name.length<2){byId('labCustomer').focus();toast('Escribe tu nombre para continuar.');return;}const total=calculate();log('SUBMIT',`Solicitud de ${name}: ${selectedName} · Bs ${total}`);closeModal();toast(`Solicitud de ${name} registrada en el laboratorio.`);});
    byId('labLiveContainer').addEventListener('click',e=>{const target=e.target.closest('[data-live]');if(target)log('CLICK',target.dataset.live);});byId('labLiveContainer').addEventListener('dblclick',e=>{if(e.target.closest('button'))log('DBLCLICK','Doble interacción capturada por Event Bubbling');});byId('labComment').addEventListener('keyup',e=>{if(e.key==='Enter'&&e.target.value.trim()){log('KEYUP',e.target.value.trim());e.target.value='';}});
    byId('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('dark-lab');log('DOM','Tema alternado mediante classList.toggle()');});byId('labMenuBtn').addEventListener('click',()=>{if($)$('#labNav').stop(true,true).slideToggle(180);else byId('labNav').classList.toggle('show');});
    byId('labContainer').dataset.hidratado='true';byId('labStatus').textContent='● INTERFAZ HIDRATADA';log('HYDRATION','Controladores DOM conectados a la estructura inicial');calculate();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* PWA independiente del laboratorio: registro del Service Worker (guía Offline-First). */
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW lab:', err))); }

/* Comparativa de consumo de servicios web (guía Karaoke PWA): Fetch (res.ok), jQuery AJAX (.fail) y Axios (rechaza fuera de 2xx). */
(function(){window.addEventListener('DOMContentLoaded',()=>{const btn=document.getElementById('httpRun');if(!btn)return;btn.addEventListener('click',async()=>{const rows=document.getElementById('httpRows');rows.replaceChildren();const url='../data/products.json';
  const add=(m,n,t,r)=>{const tr=document.createElement('tr');[m,n,t,r].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});rows.append(tr);};
  const timed=async(name,fn)=>{const t0=performance.now();try{const n=await fn();add(name,n,`${Math.round(performance.now()-t0)} ms`,'Correcto');}catch(e){add(name,'—',`${Math.round(performance.now()-t0)} ms`,`Error: ${e&&e.message||e}`);}};
  await timed('Fetch API (nativo)',async()=>{const r=await fetch(url);if(!r.ok)throw new Error(`HTTP ${r.status}`);return (await r.json()).length;});
  await timed('jQuery AJAX',()=>new Promise((ok,fail)=>{if(!window.jQuery)return fail(new Error('jQuery no disponible'));window.jQuery.ajax({url,dataType:'json'}).done(d=>ok(d.length)).fail((x,s,e)=>fail(new Error(e||s)));}));
  await timed('Axios',async()=>{if(!window.axios)throw new Error('Axios no disponible (requiere conexión la primera vez)');return (await window.axios.get(url)).data.length;});
});});})();
