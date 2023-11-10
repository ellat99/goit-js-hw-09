const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o=document.body;let a;function n(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;o.style.backgroundColor=t}t.addEventListener("click",(()=>{a=setInterval(n,1e3)})),e.addEventListener("click",(()=>{clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.0812c530.js.map
