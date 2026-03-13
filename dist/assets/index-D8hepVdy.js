import{createClient as e}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e(`https://mkuzksoyetgxjsycfnnx.supabase.co`,`sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1`);async function n(){let{data:{session:e}}=await t.auth.getSession(),n=localStorage.getItem(`guestMode`)===`true`;!e&&!n&&(window.location.href=`./landing.html`)}n();var r=e(`https://mkuzksoyetgxjsycfnnx.supabase.co`,`sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1`),i=document.getElementById(`portfolio-form`),a=[document.getElementById(`step-1`),document.getElementById(`step-2`),document.getElementById(`step-3`),document.getElementById(`step-4`)],o=document.querySelectorAll(`.next-step`),s=document.querySelectorAll(`.prev-step`),c=document.querySelectorAll(`.step-indicator`),l=document.getElementById(`status-container`),u=document.getElementById(`preview-empty`),d=document.getElementById(`preview-content`),f=document.querySelectorAll(`#theme-selector button`),p=document.getElementById(`tab-preview`),m=document.getElementById(`tab-code`),h=document.getElementById(`preview-frame`),g=document.getElementById(`code-editor-pane`),_=document.getElementById(`code-editor`),v=document.getElementById(`copy-code-btn`),y=document.getElementById(`code-info`),b=document.getElementById(`preview-label`);document.getElementById(`my-portfolios-panel`);var x=document.getElementById(`portfolios-count`),S=document.getElementById(`portfolios-list`),C=document.getElementById(`save-btn`),w=document.getElementById(`theme-toggle`),T=document.getElementById(`mobile-theme-toggle`),E=[],D=`portfolio_builder_draft`;function O(){let e={name:document.getElementById(`name`).value,role:document.getElementById(`role`).value,tagline:document.getElementById(`tagline-input`)?.value||``,skills:document.getElementById(`skills`).value,projects:document.getElementById(`projects`).value,experience:document.getElementById(`experience`)?.value||``,github:document.getElementById(`github`).value,linkedin:document.getElementById(`linkedin`)?.value||``,email:document.getElementById(`email`)?.value||``,photoUrl:document.getElementById(`photo-url`)?.value||``,theme:N,accentColor:P,font:F};localStorage.setItem(D,JSON.stringify(e)),console.log(`Draft auto-saved`)}function k(){let e=localStorage.getItem(D);if(e)try{let t=JSON.parse(e);if(t.name&&(document.getElementById(`name`).value=t.name),t.role&&(document.getElementById(`role`).value=t.role),t.tagline){let e=document.getElementById(`tagline-input`);e&&(e.value=t.tagline)}if(t.skills&&(document.getElementById(`skills`).value=t.skills),t.projects&&(document.getElementById(`projects`).value=t.projects),t.experience){let e=document.getElementById(`experience`);e&&(e.value=t.experience)}if(t.github&&(document.getElementById(`github`).value=t.github),t.linkedin){let e=document.getElementById(`linkedin`);e&&(e.value=t.linkedin)}if(t.email){let e=document.getElementById(`email`);e&&(e.value=t.email)}if(t.photoUrl){let e=document.getElementById(`photo-url`);e&&(e.value=t.photoUrl)}if(t.theme){N=t.theme;let e=Array.from(f).find(e=>e.dataset.theme===N);e&&(f.forEach(e=>{e.classList.remove(`bg-accent`,`text-black`),e.classList.add(`hover:bg-white/5`)}),e.classList.add(`bg-accent`,`text-black`),e.classList.remove(`hover:bg-white/5`))}t.accentColor&&(P=t.accentColor,document.documentElement.style.setProperty(`--accent`,P),document.documentElement.style.setProperty(`--accent-rgb`,j(P)),document.querySelectorAll(`.color-swatch`).forEach(e=>{e.classList.remove(`active`),e.dataset.color===P&&e.classList.add(`active`)})),t.font&&(F=t.font,document.querySelectorAll(`.font-option`).forEach(e=>{e.classList.remove(`border-accent/50`,`bg-accent/10`,`text-accent`),e.classList.add(`border-white/10`,`bg-white/5`),e.dataset.font===F&&(e.classList.add(`border-accent/50`,`bg-accent/10`,`text-accent`),e.classList.remove(`border-white/10`,`bg-white/5`))})),console.log(`Draft restored from local storage`)}catch(e){console.error(`Failed to load auto-save:`,e)}}function A(e){if(!e)return`white`;if(e.startsWith(`rgb`)){let t=e.match(/\d+/g);return!t||t.length<3?`white`:(t[0]*299+t[1]*587+t[2]*114)/1e3>=128?`black`:`white`}let t=e.replace(`#`,``),n=parseInt(t.substr(0,2),16),r=parseInt(t.substr(2,2),16),i=parseInt(t.substr(4,2),16);return(n*299+r*587+i*114)/1e3>=128?`black`:`white`}function j(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?`${parseInt(t[1],16)}, ${parseInt(t[2],16)}, ${parseInt(t[3],16)}`:null}var M=1,N=`developer`,P=`#00D9FF`;document.documentElement.style.setProperty(`--accent-rgb`,j(P));var F=`clash`,I=null,L=null,R={};async function z(){let{data:{user:e}}=await r.auth.getUser();L=e,!L&&localStorage.getItem(`guestMode`)===`true`&&(L={id:`guest`,email:`guest@anshverma.dev`,isGuest:!0}),B(),L&&!L.isGuest&&Q(),k()}z();function B(){let e=document.getElementById(`auth-container`);if(e)if(L){e.innerHTML=`
            <div class="relative group">
                <button id="user-menu-btn" class="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-white/10 transition-all">
                    <div class="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                        ${L.email[0].toUpperCase()}
                    </div>
                    <span class="text-[10px] font-medium text-slate-600 dark:text-slate-400 max-w-[80px] truncate">${L.email}</span>
                    <i class="fas fa-chevron-down text-[8px] opacity-40"></i>
                </button>
                <div id="user-dropdown" class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 hidden z-50">
                    <div class="px-4 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                        <p class="text-[10px] text-slate-400">Signed in as</p>
                        <p class="text-xs font-semibold truncate">${L.email}</p>
                    </div>
                    <button id="logout-btn" class="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-500/5 transition-all flex items-center gap-2">
                        <i class="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                </div>
            </div>
        `;let t=document.getElementById(`user-menu-btn`),n=document.getElementById(`user-dropdown`);t.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.toggle(`hidden`)}),document.addEventListener(`click`,()=>n.classList.add(`hidden`)),document.getElementById(`logout-btn`).addEventListener(`click`,async()=>{L&&L.isGuest?localStorage.removeItem(`guestMode`):await r.auth.signOut(),window.location.href=`./landing.html`})}else e.innerHTML=`
            <a href="./login.html" class="px-4 py-1.5 bg-accent text-black rounded-full text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20">Log In</a>
        `}document.querySelectorAll(`.color-swatch`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.color-swatch`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),P=e.dataset.color,document.documentElement.style.setProperty(`--accent`,P),document.documentElement.style.setProperty(`--accent-rgb`,j(P)),I&&Z()})}),document.querySelectorAll(`.font-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.font-option`).forEach(e=>{e.classList.remove(`border-accent/50`,`bg-accent/10`,`text-accent`),e.classList.add(`border-white/10`,`bg-white/5`)}),e.classList.add(`border-accent/50`,`bg-accent/10`,`text-accent`),e.classList.remove(`border-white/10`,`bg-white/5`),F=e.dataset.font,I&&Z()})});var V=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`visible`),V.unobserve(e.target))})},{threshold:.1});document.querySelectorAll(`.scroll-reveal`).forEach(e=>V.observe(e));function H(){let e=w.querySelector(`i`);document.documentElement.classList.contains(`dark`)?(e.className=`fas fa-sun text-xs`,w.title=`Switch to Light Mode`):(e.className=`fas fa-moon text-xs`,w.title=`Switch to Dark Mode`)}w.addEventListener(`click`,()=>{document.documentElement.classList.toggle(`dark`);let e=document.documentElement.classList.contains(`dark`);localStorage.theme=e?`dark`:`light`,e?(document.body.classList.add(`bg-[#0A0A0F]`,`text-white`),document.body.classList.remove(`bg-slate-50`,`text-slate-900`)):(document.body.classList.remove(`bg-[#0A0A0F]`,`text-white`),document.body.classList.add(`bg-slate-50`,`text-slate-900`)),H()}),T&&T.addEventListener(`click`,()=>{w.click()}),H();function U(){p.classList.add(`bg-accent`,`text-black`),p.classList.remove(`text-white/40`,`hover:text-white`),m.classList.remove(`bg-accent`,`text-black`),m.classList.add(`text-white/40`,`hover:text-white`),h.classList.remove(`hidden`),g.classList.add(`hidden`),g.classList.remove(`flex`),v.classList.add(`hidden`),v.classList.remove(`flex`),y.classList.add(`hidden`),b.classList.remove(`hidden`)}function W(){m.classList.add(`bg-accent`,`text-black`),m.classList.remove(`text-white/40`,`hover:text-white`),p.classList.remove(`bg-accent`,`text-black`),p.classList.add(`text-white/40`,`hover:text-white`),h.classList.add(`hidden`),g.classList.remove(`hidden`),g.classList.add(`flex`),v.classList.remove(`hidden`),v.classList.add(`flex`),y.classList.remove(`hidden`),b.classList.add(`hidden`),I&&!_.dataset.userEdited&&(_.value=d.innerHTML)}p.addEventListener(`click`,U),m.addEventListener(`click`,W),_.addEventListener(`input`,()=>{_.dataset.userEdited=`true`,d.innerHTML=_.value,d.classList.remove(`opacity-20`,`pointer-events-none`,`select-none`),u.classList.add(`hidden`)}),v.addEventListener(`click`,async()=>{let e=_.value||d.innerHTML;if(e)try{await navigator.clipboard.writeText(e);let t=v.querySelector(`span`);t.textContent=`Copied!`,v.classList.add(`border-accent/50`,`text-accent`),setTimeout(()=>{t.textContent=`Copy`,v.classList.remove(`border-accent/50`,`text-accent`)},2e3)}catch(e){alert(`Could not copy: `+e.message)}}),window.addEventListener(`beforeunload`,e=>{if(_.dataset.userEdited===`true`&&I){let t=`You have unsaved changes to your portfolio code. Are you sure you want to leave?`;return e.returnValue=t,t}}),i.addEventListener(`input`,e=>{if(O(),e.target.id===`name`){let t=e.target.value.trim(),n=document.getElementById(`header-brand-name`),r=document.getElementById(`header-logo-initials`);if(n)if(t){let e=t.split(` `);n.innerHTML=`${e[0]} <span class="text-accent">${e.slice(1).join(` `)||``}</span>`}else n.innerHTML=`Your <span class="text-accent">Identity</span>`;r&&(r.textContent=t?t.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2):`AV`)}});function G(){a.forEach((e,t)=>{t+1===M?(e.classList.remove(`hidden`),e.classList.add(`animate-fade-in`)):e.classList.add(`hidden`)}),c.forEach((e,t)=>{t+1<=M?(e.classList.remove(`bg-white/10`),e.classList.add(`bg-accent`)):(e.classList.add(`bg-white/10`),e.classList.remove(`bg-accent`))})}o.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault();let t=document.getElementById(`step-${M}`),n=Array.from(t.querySelectorAll(`input[required], textarea[required]`));if(!n.every(e=>e.checkValidity())){n.forEach(e=>e.reportValidity());return}M<a.length&&(M++,G())})}),s.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),M>1&&(M--,G())})}),i.addEventListener(`submit`,async e=>{e.preventDefault();let t={name:document.getElementById(`name`).value,role:document.getElementById(`role`).value,tagline:document.getElementById(`tagline-input`)?.value||``,skills:document.getElementById(`skills`).value.split(`,`).map(e=>e.trim()).filter(e=>e),projects:document.getElementById(`projects`).value,experience:document.getElementById(`experience`)?.value.split(`
`).map(e=>e.trim()).filter(e=>e)||[],github:document.getElementById(`github`).value,linkedin:document.getElementById(`linkedin`)?.value||``,email:document.getElementById(`email`)?.value||``,photoUrl:document.getElementById(`photo-url`)?.value||``,accentColor:P,font:F};R=t,l.classList.remove(`hidden`),i.classList.add(`opacity-50`,`pointer-events-none`);try{let{data:e,error:n}=await r.functions.invoke(`generate-portfolio`,{body:t});n?(console.warn(`Edge Function failed or key missing. Falling back to Demo Mode.`),I=q(t)):I=e,Z(),K(t,I),document.getElementById(`download-btn`).disabled=!1,document.getElementById(`download-btn`).classList.remove(`opacity-40`,`cursor-not-allowed`),document.getElementById(`readme-btn`).disabled=!1,document.getElementById(`readme-btn`).classList.remove(`opacity-40`,`cursor-not-allowed`),document.getElementById(`share-btn`).disabled=!1,document.getElementById(`share-btn`).classList.remove(`opacity-40`,`cursor-not-allowed`),L&&(C.disabled=!1,C.classList.remove(`opacity-40`,`cursor-not-allowed`))}catch{console.warn(`AI Generation trigger failed. Falling back to Demo Mode.`),I=q(t),Z()}finally{l.classList.add(`hidden`),i.classList.remove(`opacity-50`,`pointer-events-none`)}});async function K(e,t){let{data:{user:n}}=await r.auth.getUser();if(!n){console.log(`No authenticated user — skipping database save (guest mode).`);return}try{console.log(`Saving portfolio to Supabase for user:`,n.id);let i=n.id,a=e.name.toLowerCase().replace(/\s+/g,`.`).replace(/[^a-z0-9.]/g,``)+`_`+i.slice(0,6),{error:o}=await r.from(`users`).upsert({id:i,email:n.email,username:a,name:e.name,title:e.role,bio:t.about,github_url:e.github||null,selected_template:N},{onConflict:`id`});if(o){console.error(`User upsert error:`,o.message);return}console.log(`✅ User profile saved.`)}catch(e){console.error(`Failed to save portfolio to database:`,e.message)}}function q(e){let t=(e.skills?String(e.skills):`HTML, CSS, JavaScript`).split(`,`).map(e=>e.trim()).filter(Boolean),n=(e.projects?String(e.projects):`Awesome Project, NextGen App`).split(`,`).map(e=>e.trim()).filter(Boolean),r=e.experience?String(e.experience):``,i=r?r.split(`
`).map(e=>e.trim()).filter(Boolean):[];return{tagline:`Crafting high-performance ${e.role} experiences with precision & creative flair.`,about:`I'm a passionate ${e.role} who transforms complex challenges into elegant, user-centric solutions. With deep expertise in ${t.slice(0,3).join(`, `)}, I build scalable products that people love. I care deeply about clean code, great design, and shipping fast.`,skills:t,experience:i,photoUrl:e.photoUrl||``,github:e.github||``,projects:n.map((e,n)=>({title:e,description:`A modern, production-grade platform built to deliver an exceptional user experience. Focused on performance, accessibility, and beautiful design.`,tech:t.slice(0,3),color:[`#00D9FF`,`#6C63FF`,`#FF6584`,`#43D9AD`][n%4]}))}}function J(e){return{html:`🌐`,css:`🎨`,javascript:`⚡`,js:`⚡`,typescript:`📘`,ts:`📘`,react:`⚛️`,vue:`💚`,angular:`🔴`,node:`🟢`,nodejs:`🟢`,python:`🐍`,java:`☕`,php:`🐘`,go:`🐹`,rust:`🦀`,swift:`🍎`,kotlin:`🟣`,flutter:`💙`,dart:`🎯`,supabase:`⚡`,firebase:`🔥`,aws:`☁️`,docker:`🐳`,git:`📦`,figma:`🎭`,tailwind:`💨`,next:`▲`,nextjs:`▲`,mongodb:`🍃`,sql:`🗄️`,mysql:`🗄️`,postgres:`🐘`,postgresql:`🐘`,graphql:`🔷`,redux:`🟣`,express:`🚂`,django:`🎸`,rails:`💎`,laravel:`🔴`}[e.toLowerCase().replace(/[^a-z]/g,``)]||`🔧`}function Y(e,t,n=50){if(!e)return;e.innerHTML=``,e.classList.add(`typing-cursor`);let r=0;function i(){r<t.length?(e.innerHTML+=t.charAt(r),r++,setTimeout(i,n)):setTimeout(()=>e.classList.remove(`typing-cursor`),2e3)}i()}function X(){if(typeof gsap>`u`)return;gsap.killTweensOf(`#preview-content *`);let e=gsap.timeline();e.fromTo(`#preview-content .portfolio-hero`,{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:`expo.out`}),e.fromTo(`#preview-content .portfolio-section`,{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:`power3.out`,stagger:.2},`-=0.5`),document.querySelectorAll(`.skill-bar-fill`).forEach((t,n)=>{let r=t.dataset.width||`80%`;e.fromTo(t,{width:`0%`},{width:r,duration:1.2,ease:`expo.out`},`-=${.7-n*.05}`)}),document.querySelectorAll(`.portfolio-root .btn-pulse`).forEach(e=>{gsap.to(e,{scale:1.05,duration:.8,repeat:-1,yoyo:!0,ease:`sine.inOut`})});let t=document.querySelector(`#preview-content .hero-title-typing`);t&&R.name&&Y(t,R.name,100)}f.forEach(e=>{e.addEventListener(`click`,()=>{if(console.log(`Theme button clicked:`,e.dataset.theme),f.forEach(e=>{e.classList.remove(`bg-accent`,`text-black`,`pulse-btn`),e.classList.add(`hover:bg-white/5`)}),e.classList.add(`bg-accent`,`text-black`),e.classList.remove(`hover:bg-white/5`),N=e.dataset.theme,I)Z(),L&&document.getElementById(`name`).value&&r.from(`users`).update({selected_template:N}).match({id:L.id}).then(()=>{console.log(`Theme saved to DB`)});else{let e=document.querySelector(`#preview-empty h3`);e&&(e.innerHTML=`AI Portfolio Ready <span class="text-accent text-sm block mt-2 font-mono">Theme: ${N}</span>`)}console.log(`Current theme set to:`,N)})});function Z(){if(!I)return;u.classList.add(`hidden`),d.classList.remove(`hidden`,`opacity-20`,`pointer-events-none`),d.innerHTML=``,d.classList.add(`select-text`);let{tagline:e,about:t,skills:n,projects:r,github:i}=I,a=document.getElementById(`name`).value||`Your Name`,o=document.getElementById(`role`).value||`Developer`,s=document.getElementById(`github`).value||i||``,c=a.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2),l=`./images/hero.svg`;function f(e){return e.split(``).reduce((e,t)=>e+t.charCodeAt(0),42)%29+70+`%`}let p={clash:`font-family: "Clash Display", system-ui, sans-serif !important;`,inter:`font-family: "Inter", system-ui, sans-serif !important;`,mono:`font-family: monospace !important;`},m=p[F]||p.clash,h=``;if(N===`developer`){let i=document.getElementById(`photo-url`)?.value||I.photoUrl||``,u=document.getElementById(`linkedin`)?.value||``,d=I.experience||[];h=`
        <div class="portfolio-root font-mono text-white bg-[#070710] min-h-screen" style="--accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden">
                <!-- Background image with overlay -->
                <div class="absolute inset-0">
                    <img src="${l}" class="w-full h-full object-cover opacity-10" alt="hero">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#070710] via-[#0D0D20]/90 to-[#070710]"></div>
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px); background-size: 40px 40px;"></div>
                    <div class="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-blob"></div>
                    <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-blob" style="animation-delay: 2s"></div>
                </div>
                
                <div class="relative z-10 px-10 pt-16 pb-14">
                    <!-- Status badge -->
                    <div class="flex items-center gap-2 mb-8 animate-fade-in">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        <span class="text-accent text-xs tracking-[0.3em] uppercase font-bold">System Online & Ready</span>
                    </div>
                    
                    <!-- Avatar + Name Row -->
                    <div class="flex items-center gap-6 mb-8">
                        ${i?`<div class="w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:scale-105 transition-transform duration-500">
                                <img src="${i}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-${A(P)} text-3xl font-bold shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] flex-shrink-0 hover:rotate-3 transition-transform">
                                ${c}
                             </div>`}
                        <div>
                            <div class="text-white/40 text-sm mb-1 tracking-widest uppercase">${o}</div>
                            <h1 class="text-5xl font-bold font-clash tracking-tight hero-title-typing">
                                ${a}
                            </h1>
                        </div>
                    </div>
                    
                    <!-- Tagline -->
                    <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${e}</p>
                    
                    <!-- CTA Row -->
                    <div class="flex gap-4 flex-wrap animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="#projects" class="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-${A(P)} rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)] text-sm pulse-btn">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            View Projects
                        </a>
                        ${s?`<a href="https://github.com/${s.replace(/^.*github\.com\//,``)}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-github"></i> GitHub
                        </a>`:``}
                        ${u?`<a href="https://${u.replace(`https://`,``)}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>`:``}
                    </div>
                </div>
            </div>

            <!-- ABOUT / EXPERIENCE GRID -->
            <div class="portfolio-section px-10 py-16 border-t border-white/5">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                            <span class="w-6 h-px bg-accent"></span>About Me
                        </h2>
                        <p class="text-lg text-white/60 leading-[1.8]">${t}</p>
                    </div>
                    ${d.length>0?`
                    <div>
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                            <span class="w-6 h-px bg-accent"></span>Experience
                        </h2>
                        <div class="space-y-6">
                            ${d.map(e=>`
                            <div class="premium-card p-5 !bg-white/[0.01]">
                                <p class="text-white/80 font-bold">${e}</p>
                            </div>`).join(``)}
                        </div>
                    </div>`:``}
                </div>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section px-10 py-16 border-t border-white/5 bg-[#080812]">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-10 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Tech Stack
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    ${n.map(e=>{let t=f(e);return`
                        <div class="group">
                            <div class="flex items-center justify-between mb-2.5">
                                <span class="text-sm text-white/80 flex items-center gap-3 group-hover:text-accent transition-colors">
                                    <span class="text-xl">${J(e)}</span> 
                                    <span class="font-bold tracking-tight">${e}</span>
                                </span>
                                <span class="text-[10px] font-mono text-white/20">${t}</span>
                            </div>
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent via-blue-400 to-purple-500" style="width:0%" data-width="${t}"></div>
                            </div>
                        </div>`}).join(``)}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="projects" class="portfolio-section px-10 py-20 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-12 text-center">Selected Work</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${r.map((e,t)=>`
                        <div class="group premium-card !p-0 overflow-hidden">
                            <!-- Image Container -->
                            <div class="h-64 overflow-hidden relative">
                                <img src="${`./images/project-${t%4+1}.svg`}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="${e.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#070710] via-transparent to-transparent"></div>
                                <div class="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-accent uppercase tracking-widest">
                                    Build 0${t+1}
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="p-8">
                                <h3 class="text-2xl font-bold mb-3 group-hover:text-accent transition-all duration-300 font-clash">${e.title}</h3>
                                <p class="text-sm text-white/40 mb-6 leading-relaxed">${e.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex gap-2.5 flex-wrap">
                                        ${e.tech.map(e=>`<span class="text-[9px] bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg text-white/50 font-bold uppercase tracking-wider">${e}</span>`).join(``)}
                                    </div>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-accent hover:text-black transition-all">
                                        <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`).join(``)}
                </div>
            </div>

            <!-- CONTACT -->
            <div class="portfolio-section px-10 py-24 border-t border-white/5 bg-gradient-to-b from-[#070710] to-black">
                <div class="max-w-2xl mx-auto text-center">
                    <div class="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent text-3xl mx-auto mb-10 shadow-[0_0_50px_rgba(var(--accent-rgb),0.2)] animate-pulse">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                    <h2 class="text-5xl font-black mb-6 font-clash">Ready for the next sprint?</h2>
                    <p class="text-white/40 mb-12 text-lg">Currently available for selected freelance opportunities and innovative role collaborations.</p>
                    <div class="flex gap-4 justify-center flex-wrap">
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="px-10 py-4 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform text-lg shadow-[0_15px_40px_rgba(var(--accent-rgb),0.35)] pulse-btn">
                            Initiate Contact
                        </a>
                        ${s?`<a href="https://github.com/${s}" class="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-white/60">
                            Source Files
                        </a>`:``}
                    </div>
                    <div class="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p class="text-white/20 text-xs">© ${new Date().getFullYear()} ${a} · Engineered with AI Pro</p>
                        <div class="flex gap-6">
                            ${s?`<a href="https://github.com/${s}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-github"></i></a>`:``}
                            ${u?`<a href="https://${u.replace(`https://`,``)}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-linkedin"></i></a>`:``}
                        </div>
                    </div>
                </div>
            </div>
        </div>`}else if(N===`startup`){let i=document.getElementById(`photo-url`)?.value||I.photoUrl||``,o=document.getElementById(`linkedin`)?.value||``,u=I.experience||[];h=`
        <div class="portfolio-root font-sans bg-white text-[#111] min-h-screen pb-0" style="--accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <!-- Navigation -->
            <nav class="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 py-5 flex items-center justify-between">
                <div class="font-black text-xl tracking-tighter">${c}</div>
                <div class="flex gap-8 items-center">
                    <a href="#work" class="text-sm font-bold text-slate-500 hover:text-black">Work</a>
                    <a href="#about" class="text-sm font-bold text-slate-500 hover:text-black">About</a>
                    <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform pulse-btn">Let's Talk</a>
                </div>
            </nav>

            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden bg-white pt-24 pb-0 px-12">
                <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#f0f9ff,#fff_60%)]"></div>
                
                <div class="relative z-10 max-w-5xl mx-auto">
                    <div class="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full mb-10 animate-fade-in">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Available for Scale
                    </div>
                    
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-12 mb-16">
                        <div class="flex-1">
                            <h1 class="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 hero-title-typing">
                                ${a}
                            </h1>
                            <p class="text-2xl text-slate-400 font-medium mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">${e}</p>
                            <div class="flex gap-5 animate-fade-in-up" style="animation-delay: 0.5s">
                                <a href="#work" class="px-8 py-4.5 bg-black text-white rounded-2xl font-bold hover:scale-[1.03] transition-transform shadow-2xl shadow-black/20 text-base">
                                    Explore Portfolio
                                </a>
                                ${s?`<a href="https://github.com/${s}" target="_blank" class="px-8 py-4.5 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-800 transition-all text-base text-slate-700">
                                    Source
                                </a>`:``}
                            </div>
                        </div>
                        ${i?`<div class="w-64 h-80 rounded-[40px] overflow-hidden rotate-2 shadow-2xl border-8 border-white animate-fade-in">
                                <img src="${i}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-64 h-64 rounded-[50px] bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-6xl font-black shadow-2xl rotate-3">
                                ${c}
                             </div>`}
                    </div>
                </div>
                
                <!-- Hero Visual -->
                <div class="relative h-[480px] overflow-hidden rounded-t-[60px] mx-auto max-w-6xl shadow-[0_-30px_100px_rgba(0,0,0,0.08)] bg-slate-50 mt-12 group">
                    <img src="${l}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-2000" alt="Work Process">
                    <div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                </div>
            </div>

            <!-- ABOUT & STATS -->
            <div id="about" class="portfolio-section max-w-5xl mx-auto px-12 py-32">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-20 items-start">
                    <div class="lg:col-span-2">
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-6">Manifesto</h2>
                        <h3 class="text-5xl font-black leading-tight tracking-tighter">Building products people love.</h3>
                    </div>
                    <div class="lg:col-span-3">
                        <p class="text-2xl leading-relaxed text-slate-500 font-medium">${t}</p>
                    </div>
                </div>

                ${u.length>0?`
                <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-1">
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-6">Career Path</h2>
                    </div>
                    <div class="md:col-span-2 space-y-12">
                        ${u.slice(0,3).map(e=>{let[t,n]=e.split(` at `);return`
                            <div class="flex gap-8 group">
                                <div class="text-4xl font-black text-slate-100 group-hover:text-black transition-colors duration-500">→</div>
                                <div>
                                    <h4 class="text-2xl font-black">${t}</h4>
                                    <p class="text-lg text-slate-400 font-bold">${n||``}</p>
                                </div>
                            </div>`}).join(``)}
                    </div>
                </div>`:``}
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section bg-slate-50 py-24 border-y border-slate-100">
                <div class="max-w-5xl mx-auto px-12 text-center">
                    <h2 class="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-black mb-16">Core Competencies</h2>
                    <div class="flex flex-wrap justify-center gap-6">
                        ${n.map(e=>`
                        <div class="flex items-center gap-4 bg-white text-slate-800 px-8 py-5 rounded-3xl font-bold text-lg shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <span class="text-2xl">${J(e)}</span> ${e}
                        </div>`).join(``)}
                    </div>
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="work" class="portfolio-section max-w-5xl mx-auto px-12 py-32">
                <div class="flex items-end justify-between mb-20">
                    <div>
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-6">Portfolio</h2>
                        <h3 class="text-5xl font-black tracking-tighter">Case Studies</h3>
                    </div>
                    <div class="text-right hidden md:block">
                        <p class="text-slate-400 font-bold max-w-xs text-sm">A collection of products, experiments, and high-impact projects.</p>
                    </div>
                </div>

                <div class="space-y-32">
                    ${r.map((e,t)=>{let n=`./images/project-${t%4+1}.svg`,r=t%2==0;return`
                        <div class="group grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div class="lg:col-span-7 ${r?`lg:order-1`:`lg:order-2`} aspect-[4/3] w-full overflow-hidden rounded-[50px] shadow-3xl shadow-slate-200/80 bg-slate-100">
                                <img src="${n}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="${e.title}">
                            </div>
                            <div class="lg:col-span-5 ${r?`lg:order-2`:`lg:order-1`}">
                                <div class="text-[10px] font-black tracking-widest text-[#111] opacity-20 mb-4">0${t+1} / Project</div>
                                <h3 class="text-4xl font-black tracking-tighter mb-6">${e.title}</h3>
                                <p class="text-slate-500 text-lg leading-relaxed mb-8">${e.description}</p>
                                <div class="flex flex-wrap gap-3 mb-10">
                                    ${e.tech.map(e=>`<span class="text-[10px] bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-600 uppercase tracking-widest">${e}</span>`).join(``)}
                                </div>
                                <a href="#" class="inline-flex items-center gap-2 text-black font-black text-sm uppercase tracking-widest border-b-2 border-black pb-1 hover:gap-4 transition-all">
                                    View Repository <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>`}).join(``)}
                </div>
            </div>

            <!-- CTA -->
            <div class="portfolio-section bg-black text-white py-40 px-12 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
                <div class="max-w-4xl mx-auto text-center relative z-10">
                    <h2 class="text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">Let's build<br>the future.</h2>
                    <p class="text-xl text-white/40 mb-16 max-w-xl mx-auto font-medium">Have a vision for a project? Let's turn it into reality with cutting-edge tech and elite design.</p>
                    <div class="flex gap-6 justify-center flex-wrap">
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="px-12 py-6 bg-white text-black rounded-3xl font-black hover:scale-110 transition-transform text-lg pulse-btn">
                            Get In Touch
                        </a>
                        ${o?`<a href="https://${o.replace(`https://`,``)}" target="_blank" class="px-12 py-6 border-2 border-white/20 rounded-3xl font-black hover:bg-white/10 transition-all text-lg">
                            LinkedIn
                        </a>`:``}
                    </div>
                    <div class="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
                        <p class="text-xs font-bold uppercase tracking-widest">© ${new Date().getFullYear()} ${a}</p>
                        <div class="flex gap-10">
                            ${s?`<a href="https://github.com/${s}" class="hover:text-white transition-colors"><i class="fab fa-github fa-lg"></i></a>`:``}
                            ${o?`<a href="https://${o.replace(`https://`,``)}" class="hover:text-white transition-colors"><i class="fab fa-linkedin fa-lg"></i></a>`:``}
                        </div>
                    </div>
                </div>
            </div>
        </div>`}else if(N===`creative`)h=`
        <div class="portfolio-root text-white min-h-screen pb-20" style="background:linear-gradient(135deg,#06060F 0%,#0E0720 50%,#06060F 100%); --accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <!-- Ambient blobs -->
            <div class="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(0,217,255,0.08),transparent 70%);transform:translate(-30%,-30%)"></div>
            <div class="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%);transform:translate(30%,30%)"></div>
            
            <!-- HERO -->
            <div class="portfolio-hero relative px-10 pt-20 pb-10">
                <!-- Huge name in background -->
                <div class="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
                    <span class="text-[100px] font-black tracking-tighter opacity-[0.03] leading-none" style="font-family:'Clash Display',sans-serif">${a.split(` `)[0]}</span>
                </div>
                
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-12">
                        <div>
                            <div class="flex items-center gap-2 mb-6">
                                <span class="w-8 h-px bg-accent/60"></span>
                                <span class="text-accent/80 text-xs tracking-[0.3em] uppercase">${o}</span>
                            </div>
                            <h1 class="font-black leading-none tracking-tighter" style="font-size:clamp(3rem,7vw,5.5rem);font-family:'Clash Display',sans-serif">
                                ${a.split(` `)[0]}<br>
                                <span style="color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.2)">${a.split(` `).slice(1).join(` `)||`&nbsp;`}</span>
                            </h1>
                        </div>
                        <!-- Avatar circle -->
                        <div class="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(0,217,255,0.2)] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-accent/20 to-purple-500/20">
                            ${c}
                        </div>
                    </div>
                    
                    <p class="text-2xl text-white/50 max-w-xl leading-relaxed font-light mb-10">${e}</p>
                    
                    <div class="flex gap-4">
                        <a href="#creative-work" class="px-7 py-3.5 rounded-full border border-accent/50 text-accent font-semibold hover:bg-accent hover:text-black transition-all text-sm">
                            Explore Work ↓
                        </a>
                        ${s?`<a href="https://github.com/${s.replace(/^.*github\.com\//,``)}" target="_blank" class="px-7 py-3.5 rounded-full border border-white/10 font-semibold hover:bg-white/5 transition-all text-sm text-white/50">
                            GitHub
                        </a>`:``}
                    </div>
                </div>
            </div>

            <!-- MAIN IMAGE COLLAGE -->
            <div class="grid grid-cols-3 gap-4 px-10 py-8 h-[400px]">
                <div class="col-span-2 rounded-[30px] overflow-hidden relative bg-black/50">
                    <img src="${l}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="${a}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex-1 rounded-[30px] overflow-hidden" style="background:linear-gradient(135deg,rgba(0,217,255,0.15),rgba(139,92,246,0.15));backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08)">
                        <div class="h-full flex flex-col justify-between p-6">
                            <span class="text-5xl font-black opacity-10 font-mono">{ }</span>
                            <div>
                                <div class="text-xs text-white/40 uppercase tracking-widest mb-1">Stack</div>
                                <div class="text-white/80 text-sm font-medium">${n.slice(0,3).join(` · `)}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 rounded-[30px] overflow-hidden relative bg-purple-900/50">
                        <img src="./images/project-4.svg" class="w-full h-full object-cover opacity-60" alt="Projects">
                        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4 text-sm font-bold">${r.length} Projects</div>
                    </div>
                </div>
            </div>

            <!-- ABOUT -->
            <div class="portfolio-section px-10 py-16">
                <div class="flex items-start gap-4 mb-10">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">About</span>
                </div>
                <p class="text-3xl font-medium leading-[1.4] text-white/80 max-w-3xl" style="font-family:'Clash Display',sans-serif">
                    ${t}
                </p>
            </div>

            <!-- SKILLS - pill cloud -->
            <div class="portfolio-section px-10 pb-16">
                <div class="flex items-start gap-4 mb-8">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">Expertise</span>
                </div>
                <div class="flex flex-wrap gap-3">
                    ${n.map((e,t)=>`<span class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default" style="background:${[`rgba(0,217,255,0.15)`,`rgba(139,92,246,0.15)`,`rgba(236,72,153,0.15)`,`rgba(34,197,94,0.15)`][t%4]};border:1px solid ${[`rgba(0,217,255,0.3)`,`rgba(139,92,246,0.3)`,`rgba(236,72,153,0.3)`,`rgba(34,197,94,0.3)`][t%4]}">
                            ${J(e)} ${e}
                        </span>`).join(``)}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="creative-work" class="portfolio-section px-10 pb-10">
                <div class="flex items-start gap-4 mb-12">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">Selected Projects</span>
                </div>
                <div class="space-y-6">
                    ${r.map((e,t)=>`
                        <div class="group relative overflow-hidden rounded-[30px] border border-white/5 hover:border-white/15 transition-all duration-700" style="background:rgba(255,255,255,0.025)">
                            <div class="grid grid-cols-5 gap-0 h-56">
                                <!-- Image -->
                                <div class="col-span-3 overflow-hidden">
                                    <img src="${`./images/project-${t%4+1}.svg`}" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" alt="${e.title}">
                                </div>
                                <!-- Info -->
                                <div class="col-span-2 p-7 flex flex-col justify-between">
                                    <div>
                                        <div class="text-accent font-mono text-sm mb-3">0${t+1} /</div>
                                        <h3 class="text-2xl font-bold mb-3 leading-tight group-hover:text-accent transition-colors" style="font-family:'Clash Display',sans-serif">${e.title}</h3>
                                        <p class="text-white/40 text-sm leading-relaxed">${e.description}</p>
                                    </div>
                                    <div class="flex gap-2 flex-wrap">
                                        ${e.tech.map(e=>`<span class="text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/50">${e}</span>`).join(``)}
                                    </div>
                                </div>
                            </div>
                        </div>`).join(``)}
                </div>
            </div>

            <!-- FOOTER CTA -->
            <div class="portfolio-section px-10 py-20 text-center relative overflow-hidden">
                <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at center,rgba(0,217,255,0.06),transparent 70%)"></div>
                <div class="relative z-10">
                    <h2 class="font-black mb-6 leading-none" style="font-family:'Clash Display',sans-serif;font-size:clamp(2.5rem,6vw,4.5rem)">
                    <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,217,255,0.3)]" style="background:linear-gradient(135deg,#00D9FF,#818CF8);color:#000">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Get In Touch
                    </a>
                    <p class="text-white/15 text-xs mt-12">© ${new Date().getFullYear()} ${a} · Ansh Verma</p>
                </div>
            </div>
        </div>`;else if(N===`minimal`){let n=document.getElementById(`photo-url`)?.value||I.photoUrl||``,i=document.getElementById(`linkedin`)?.value||``;h=`
        <div class="portfolio-root font-sans bg-white text-zinc-900 min-h-screen px-6 py-12 md:px-20 md:py-32" style="--accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <div class="max-w-3xl mx-auto">
                <!-- Header -->
                <header class="portfolio-hero mb-24">
                    <div class="flex items-center gap-8 mb-12">
                        ${n?`<div class="w-24 h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="${n}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-3xl font-light">
                                ${c}
                             </div>`}
                        <div>
                            <h1 class="text-4xl font-light tracking-tight mb-2 hero-title-typing">${a}</h1>
                            <p class="text-zinc-400 text-lg uppercase tracking-widest font-medium">${o}</p>
                        </div>
                    </div>
                    <p class="text-2xl text-zinc-500 leading-relaxed font-light mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${e}</p>
                    <div class="flex gap-8 animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">Email</a>
                        ${s?`<a href="https://github.com/${s.replace(/^.*github\.com\//,``)}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">GitHub</a>`:``}
                        ${i?`<a href="https://${i.replace(`https://`,``)}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>`:``}
                    </div>
                </header>

                <!-- About -->
                <section class="portfolio-section mb-24 border-l-4 border-zinc-50 pl-8">
                    <h2 class="text-xs uppercase tracking-widest text-zinc-300 font-bold mb-8">Statement</h2>
                    <p class="text-zinc-600 text-xl leading-[1.8] font-light italic">${t}</p>
                </section>

                <!-- Work -->
                <section class="portfolio-section mb-24">
                    <h2 class="text-xs uppercase tracking-widest text-zinc-300 font-bold mb-12">Selected Work</h2>
                    <div class="space-y-20">
                        ${r.map((e,t)=>`
                        <div class="group">
                            <div class="flex justify-between items-baseline mb-4">
                                <h3 class="text-2xl font-light group-hover:text-black transition-colors">${e.title}</h3>
                                <span class="text-[10px] items-center text-zinc-200 font-mono tracking-tighter">0${t+1}</span>
                            </div>
                            <p class="text-zinc-500 mb-6 leading-relaxed max-w-xl">${e.description}</p>
                            <div class="flex gap-4">
                                ${e.tech.map(e=>`<span class="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">${e}</span>`).join(`<span class="text-zinc-200">/</span>`)}
                            </div>
                        </div>`).join(``)}
                    </div>
                </section>

                <!-- Footer -->
                <footer class="portfolio-section pt-12 border-t border-zinc-100 flex justify-between items-center">
                    <p class="text-[10px] text-zinc-300 uppercase tracking-widest">© ${new Date().getFullYear()} ${a}</p>
                    <div class="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">A+</div>
                </footer>
            </div>
        </div>`}if(N===`resume`){let e=document.getElementById(`photo-url`)?.value||I.photoUrl||``,i=document.getElementById(`linkedin`)?.value||``,l=I.experience||[];h=`
        <div class="portfolio-root font-serif bg-[#fdfdfd] text-[#222] min-h-screen p-8 md:p-16" style="--accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <div class="max-w-4xl mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-zinc-100 p-10 md:p-20 relative animate-fade-in">
                <!-- Decor Line -->
                <div class="absolute top-0 left-0 w-full h-1.5 bg-zinc-900"></div>
                
                <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div class="portfolio-hero">
                        <h1 class="text-5xl font-black tracking-tight mb-4 hero-title-typing">${a}</h1>
                        <p class="text-xl text-zinc-500 font-sans italic mb-8">${o}</p>
                        <div class="flex gap-6 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                            ${s?`<a href="https://github.com/${s.replace(/^.*github\.com\//,``)}" class="hover:text-black">GitHub</a>`:``}
                            ${i?`<a href="https://${i.replace(`https://`,``)}" class="hover:text-black">LinkedIn</a>`:``}
                            <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,``)}.dev" class="hover:text-black">Email</a>
                        </div>
                    </div>
                    ${e?`<div class="w-32 h-32 border-4 border-white shadow-xl rotate-2 shrink-0 overflow-hidden">
                            <img src="${e}" class="w-full h-full object-cover grayscale" alt="${a}">
                         </div>`:`<div class="w-32 h-32 bg-zinc-50 border border-zinc-100 shrink-0 flex items-center justify-center text-zinc-200 text-3xl font-bold">
                            ${c}
                         </div>`}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div class="md:col-span-2">
                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Profile</h2>
                            <p class="text-lg leading-relaxed text-zinc-600">${t}</p>
                        </section>

                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Experience</h2>
                            <div class="space-y-10">
                                ${l.map(e=>{let[t,n]=e.split(` at `);return`
                                    <div class="relative pl-6 border-l border-zinc-100">
                                        <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-200"></div>
                                        <h3 class="text-xl font-bold">${t}</h3>
                                        <p class="text-zinc-500 italic mb-2">${n||``}</p>
                                    </div>`}).join(``)}
                                ${l.length===0?`<p class="text-zinc-400 italic">Experience details coming soon...</p>`:``}
                            </div>
                        </section>

                        <section class="portfolio-section">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Work Samples</h2>
                            <div class="space-y-8">
                                ${r.map(e=>`
                                <div>
                                    <h3 class="font-bold underline italic text-lg decoration-zinc-200 underline-offset-4 mb-2">${e.title}</h3>
                                    <p class="text-zinc-600 text-sm leading-relaxed">${e.description}</p>
                                </div>`).join(``)}
                            </div>
                        </section>
                    </div>

                    <div class="md:col-span-1 font-sans">
                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Expertise</h2>
                            <div class="flex flex-wrap gap-2">
                                ${n.map(e=>`<span class="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500">${e}</span>`).join(``)}
                            </div>
                        </section>

                        <section class="portfolio-section">
                            <h2 class="text-sm font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Contact Info</h2>
                            <div class="space-y-4 text-xs">
                                <div>
                                    <div class="text-zinc-300 font-bold mb-1 uppercase tracking-tighter">Availability</div>
                                    <div class="font-bold">Worldwide / Remote</div>
                                </div>
                                <div>
                                    <div class="text-zinc-300 font-bold mb-1 uppercase tracking-tighter">Location</div>
                                    <div class="font-bold">Digital Nomad</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="mt-20 pt-10 border-t border-zinc-100 text-center">
                    <p class="text-[10px] font-sans font-bold text-zinc-300 uppercase tracking-[0.5em]">Fine Art of Engineering</p>
                </div>
            </div>
        </div>`}if(N===`bold`){let i=P;h=`
        <div class="portfolio-root" style="background:#000;color:#fff;min-height:100vh; --accent: ${P}; --accent-rgb: ${j(P)}; ${m}">
            <!-- HERO BANNER -->
            <div class="portfolio-hero" style="padding:0;position:relative;overflow:hidden">
                <div style="background:${i};padding:48px 48px 64px;min-height:300px;display:grid;grid-template-columns:1fr auto;gap:32px;align-items:end">
                    <div>
                        <div style="font-size:0.7rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,0,0,0.5);margin-bottom:12px">${o}</div>
                        <h1 style="font-size:clamp(3rem,8vw,6rem);font-weight:900;line-height:0.9;color:#000;letter-spacing:-4px;margin-bottom:0">${a}</h1>
                    </div>
                    <div style="text-align:right">
                        <div style="width:80px;height:80px;background:#000;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900;color:${i}">${c}</div>
                    </div>
                </div>
                <!-- Tagline bar -->
                <div style="background:#111;padding:16px 48px;border-bottom:1px solid #222">
                    <p style="font-size:0.9rem;color:#666;font-family:'Inter',sans-serif">${e}</p>
                </div>
            </div>

            <!-- CONTENT GRID -->
            <div style="display:grid;grid-template-columns:1fr 1fr;min-height:400px">
                <!-- About -->
                <div class="portfolio-section" style="padding:48px;border-right:1px solid #222">
                    <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:24px">About</div>
                    <p style="font-size:0.95rem;color:#999;line-height:1.8;font-family:'Inter',sans-serif">${t}</p>
                    ${s?`<a href="https://github.com/${s}" target="_blank" style="margin-top:24px;display:inline-flex;align-items:center;gap:8px;color:${i};font-size:0.8rem;font-weight:700;text-decoration:none">View GitHub ↗</a>`:``}
                </div>
                <!-- Skills -->
                <div class="portfolio-section" style="padding:48px">
                    <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:24px">Expertise</div>
                    <div style="display:flex;flex-direction:column;gap:12px">
                        ${n.map(e=>`
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #1a1a1a">
                            <span style="font-size:0.9rem;font-weight:700;color:#fff">${e}</span>
                            <div style="width:60px;height:3px;background:#222;border-radius:2px;overflow:hidden">
                                <div style="width:${Math.floor(Math.random()*30+70)}%;height:100%;background:${i};border-radius:2px"></div>
                            </div>
                        </div>`).join(``)}
                    </div>
                </div>
            </div>

            <!-- PROJECTS GRID -->
            <div class="portfolio-section" style="padding:48px;border-top:1px solid #222">
                <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:32px">Selected Work</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2px">
                    ${r.map((e,t)=>{let n=[i,`#1a1a1a`,`#111`,`#0a0a0a`],r=t===0?`#000`:`#fff`;return`
                    <div class="card-hover" style="background:${n[t%n.length]};padding:40px 32px;cursor:default">
                        <div style="font-size:2rem;font-weight:900;color:${t===0?`rgba(0,0,0,0.15)`:`rgba(255,255,255,0.06)`};font-family:monospace;margin-bottom:24px">0${t+1}</div>
                        <h3 style="font-size:1.4rem;font-weight:900;color:${r};letter-spacing:-1px;margin-bottom:12px">${e.title}</h3>
                        <p style="font-size:0.8rem;color:${t===0?`rgba(0,0,0,0.65)`:`#666`};line-height:1.6;margin-bottom:20px;font-family:'Inter',sans-serif">${e.description}</p>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                            ${e.tech.map(e=>`<span style="font-size:0.65rem;padding:3px 10px;background:${t===0?`rgba(0,0,0,0.15)`:`rgba(255,255,255,0.08)`};border-radius:20px;color:${t===0?`rgba(0,0,0,0.7)`:`#888`};font-weight:700">${e}</span>`).join(``)}
                        </div>
                    </div>`}).join(``)}
                </div>
            </div>

            <!-- FOOTER -->
            <div style="background:${i};padding:40px 48px;display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:1.5rem;font-weight:900;color:${A(i)};letter-spacing:-1px">${a}</span>
                ${R?.email?`<a href="mailto:${R.email}" style="color:${A(i)};font-weight:700;text-decoration:none;font-size:0.85rem">${R.email}</a>`:`<span style="color:${A(i)};opacity:0.5;font-size:0.8rem">© ${new Date().getFullYear()}</span>`}
            </div>
        </div>`}d.innerHTML=h,_.dataset.userEdited=``,_.value=h,requestAnimationFrame(X),d.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault();let t=this.getAttribute(`href`).substring(1),n=d.querySelector(`#`+t);if(n){let e=d.getBoundingClientRect().top,t=n.getBoundingClientRect().top-e;d.scrollBy({top:t,behavior:`smooth`})}})})}C.addEventListener(`click`,async()=>{if(!I||!L){L||alert(`You must be logged in to save portfolios.`);return}let e=_.dataset.userEdited===`true`&&_.value?_.value:d.innerHTML,t=prompt(`Name this portfolio version:`,`My Portfolio`);if(!t)return;let n=C.innerHTML;C.innerHTML=`Saving...`,C.disabled=!0;try{let{data:i,error:a}=await r.from(`saved_portfolios`).insert([{user_id:L.id,name:t,html_content:e}]).select();if(a)throw a;_.dataset.userEdited=``,E=[i[0],...E],$(),C.innerHTML=`<i class="fas fa-check"></i> Saved!`,C.classList.add(`text-green-400`),setTimeout(()=>{C.innerHTML=n,C.classList.remove(`text-green-400`),C.disabled=!1},2e3)}catch(e){console.error(`Error saving portfolio code:`,e),alert(`Failed to save portfolio. Please try again.`),C.innerHTML=n,C.disabled=!1}}),document.getElementById(`download-btn`).addEventListener(`click`,()=>{let e={"./images/hero.svg":`<svg width="1400" height="700" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b" /><stop offset="100%" stop-color="#0f172a" /></linearGradient><linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3" /><stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.3" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg)" /><path d="M-100,-100 Q400,300 900,-50 T1500,200 L1500,-100 Z" fill="url(#glow)" /><circle cx="20%" cy="70%" r="300" fill="#38bdf8" opacity="0.1" /><circle cx="80%" cy="30%" r="400" fill="#818cf8" opacity="0.1" /><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /><text x="50%" y="50%" font-family="monospace" font-size="40" font-weight="bold" fill="rgba(255,255,255,0.2)" text-anchor="middle" dominant-baseline="middle">IDENTITY</text></svg>`,"./images/project-1.svg":`<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a" /><stop offset="100%" stop-color="#334155" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg1)" /><rect x="50" y="50" width="200" height="400" rx="10" fill="#1e293b" /><rect x="280" y="50" width="570" height="150" rx="10" fill="#1e293b" /><rect x="280" y="230" width="270" height="220" rx="10" fill="#1e293b" /><rect x="580" y="230" width="270" height="220" rx="10" fill="#1e293b" /><circle cx="150" cy="100" r="30" fill="#38bdf8" /><rect x="80" y="160" width="140" height="20" rx="5" fill="#475569" /><rect x="80" y="210" width="140" height="20" rx="5" fill="#475569" /><rect x="80" y="260" width="140" height="20" rx="5" fill="#475569" /><rect x="310" y="90" width="100" height="70" rx="5" fill="#38bdf8" /><rect x="440" y="90" width="100" height="70" rx="5" fill="#818cf8" /><rect x="570" y="90" width="100" height="70" rx="5" fill="#34d399" /><rect x="700" y="90" width="100" height="70" rx="5" fill="#fbbf24" /></svg>`,"./images/project-2.svg":`<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#18181b" /><stop offset="100%" stop-color="#27272a" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg2)" /><rect x="300" y="50" width="300" height="600" rx="40" fill="#3f3f46" stroke="#52525b" stroke-width="10"/><rect x="320" y="100" width="260" height="150" rx="20" fill="#52525b" /><rect x="320" y="270" width="120" height="120" rx="15" fill="#52525b" /><rect x="460" y="270" width="120" height="120" rx="15" fill="#52525b" /><rect x="320" y="410" width="120" height="120" rx="15" fill="#52525b" /><rect x="460" y="410" width="120" height="120" rx="15" fill="#52525b" /><circle cx="380" cy="330" r="30" fill="#f43f5e" /><circle cx="520" cy="330" r="30" fill="#a855f7" /><circle cx="450" cy="175" r="50" fill="#3b82f6" opacity="0.8"/></svg>`,"./images/project-3.svg":`<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f2922" /><stop offset="100%" stop-color="#134e4a" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg3)" /><circle cx="450" cy="250" r="15" fill="#10b981" /><circle cx="250" cy="150" r="25" fill="#14b8a6" /><circle cx="650" cy="100" r="20" fill="#06b6d4" /><circle cx="300" cy="400" r="30" fill="#6ee7b7" opacity="0.5"/><circle cx="700" cy="350" r="35" fill="#2dd4bf" opacity="0.5"/><circle cx="100" cy="300" r="15" fill="#99f6e4" /><circle cx="800" cy="200" r="20" fill="#5eead4" /><line x1="450" y1="250" x2="250" y2="150" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="650" y2="100" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="300" y2="400" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="700" y2="350" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="250" y1="150" x2="100" y2="300" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="650" y1="100" x2="800" y2="200" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="700" y1="350" x2="800" y2="200" stroke="#10b981" stroke-width="2" opacity="0.5"/><rect x="350" y="320" width="200" height="120" rx="8" fill="#022c22" opacity="0.8"/><rect x="370" y="340" width="100" height="8" rx="4" fill="#34d399"/><rect x="370" y="360" width="140" height="8" rx="4" fill="#6ee7b7"/><rect x="370" y="380" width="80" height="8" rx="4" fill="#6ee7b7"/><rect x="370" y="400" width="120" height="8" rx="4" fill="#34d399"/></svg>`,"./images/project-4.svg":`<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2e1065" /><stop offset="100%" stop-color="#4c1d95" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg4)" /><circle cx="450" cy="250" r="150" fill="#a78bfa" opacity="0.2"/><rect x="300" y="100" width="150" height="150" transform="rotate(45 375 175)" fill="#c084fc" opacity="0.5"/><rect x="450" y="250" width="150" height="150" transform="rotate(45 525 325)" fill="#e879f9" opacity="0.5"/><circle cx="350" cy="350" r="80" fill="#f472b6" opacity="0.6"/><polygon points="550,150 650,250 500,250" fill="#fb923c" opacity="0.8"/><polygon points="250,250 350,150 200,100" fill="#38bdf8" opacity="0.7"/><rect x="400" y="200" width="100" height="100" rx="20" fill="#fff" opacity="0.9"/><circle cx="450" cy="250" r="20" fill="#4c1d95" /></svg>`},t=_.dataset.userEdited&&_.value?_.value:d.innerHTML;Object.entries(e).forEach(([e,n])=>{let r=`data:image/svg+xml;base64,${btoa(n)}`;t=t.split(`src="${e}"`).join(`src="${r}"`)});let n=document.getElementById(`name`).value||`portfolio`,r=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${n} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --accent: ${P};
      --accent-rgb: ${j(P)};
      --shadow-premium: 0 40px 100px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(var(--accent-rgb), 0.1);
      --shadow-soft: 0 20px 50px -15px rgba(0, 0, 0, 0.4);
      --gradient-premium: linear-gradient(135deg, var(--accent) 0%, #8B5CF6 50%, #6C63FF 100%);
    }
    body {
      background: #0A0A0F;
      color: white;
      font-family: 'General Sans', system-ui, sans-serif;
      margin: 0;
      overflow-x: hidden;
    }
    .portfolio-root { min-height: 100vh; }
    .font-clash { font-family: 'Clash Display', sans-serif; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
    
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
    .animate-blob { animation: blob 15s infinite ease-in-out; }
    
    .premium-card {
      background: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 2.5rem;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .premium-card:hover {
      background: rgba(255, 255, 255, 0.03);
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 40px 80px -20px rgba(var(--accent-rgb), 0.2), var(--shadow-premium);
      border-color: rgba(255, 255, 255, 0.08);
    }
    
    .portfolio-section { opacity: 1 !important; transform: none !important; }
    .selection\\:bg-accent\\/30 ::selection { background: rgba(var(--accent-rgb), 0.3); color: white; }
    
    /* Smooth Scroll */
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-[#0A0A0F] selection:bg-accent/30 selection:text-white">${t}</body>
</html>`,i=new Blob([r],{type:`text/html`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`${n.toLowerCase().replace(/\s/g,`-`)}-portfolio.html`,o.click(),URL.revokeObjectURL(a)}),document.getElementById(`share-btn`).addEventListener(`click`,async()=>{let e=(document.getElementById(`name`).value||`user`).toLowerCase().replace(/\s/g,`-`)+`-`+Math.random().toString(36).substring(2,6);if(L){let{data:t}=await r.from(`users`).select(`username`).match({id:L.id}).single();t&&t.username&&(e=t.username),await r.from(`users`).update({is_published:!0}).match({id:L.id})}alert(`🚀 Your portfolio is live at:\nhttps://portfolio.ai/${e}\n\n(Copy this link to share with anyone!)`)}),document.getElementById(`readme-btn`).addEventListener(`click`,()=>{if(!I)return;let e=document.getElementById(`name`).value||`Developer`,t=document.getElementById(`role`).value||`Developer`,n=document.getElementById(`github`).value||``,r=document.getElementById(`linkedin`)?.value||``,i=document.getElementById(`email`)?.value||``,{tagline:a,about:o,skills:s,projects:c}=I,l=s.map(e=>`![${e}](https://img.shields.io/badge/${encodeURIComponent(e)}-informational?style=flat&color=00D9FF)`).join(` `),u=c.map((e,t)=>`### ${t+1}. ${e.title}\n${e.description}\n\n**Tech:** ${e.tech.join(`, `)}`).join(`

---

`),d=`<div align="center">

# 👋 Hi, I'm ${e}

### ${t}

*${a}*

${[n?`[🐙 GitHub](https://github.com/${n})`:null,r?`[💼 LinkedIn](https://${r.replace(`https://`,``)})`:null,i?`[📧 Email](mailto:${i})`:null].filter(Boolean).join(` · `)}

</div>

---

## 🙋 About Me

${o}

---

## 🛠️ Skills & Technologies

${l}

---

## 🚀 Featured Projects

${u}

---

<div align="center">

*Built with [Ansh Verma](https://github.com/ansh-verma)*

</div>
`,f=new Blob([d],{type:`text/markdown`}),p=URL.createObjectURL(f),m=document.createElement(`a`);m.href=p,m.download=`README.md`,m.click(),URL.revokeObjectURL(p)});async function Q(){if(L)try{let{data:e,error:t}=await r.from(`saved_portfolios`).select(`*`).eq(`user_id`,L.id).order(`created_at`,{ascending:!1});if(t)throw t;E=e||[],$()}catch(e){console.warn(`Could not load saved portfolios:`,e.message)}}function $(){if(S){if(x.textContent=E.length,E.length===0){S.innerHTML=`
            <div class="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                <p class="text-white/20 text-xs">No saved versions yet</p>
            </div>`;return}S.innerHTML=E.map(e=>`
        <div class="group bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer" onclick="loadSavedVersion('${e.id}')">
            <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-sm truncate pr-4">${e.name}</h4>
                <div class="text-[9px] text-white/30 whitespace-nowrap">${new Date(e.created_at).toLocaleDateString()}</div>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-[9px] text-accent font-bold uppercase tracking-widest">Load Version</span>
            </div>
        </div>
    `).join(``)}}window.loadSavedVersion=async function(e){let t=E.find(t=>t.id===e);t&&(U(),u.classList.add(`hidden`),d.classList.remove(`hidden`,`opacity-20`),d.innerHTML=t.html_content,_.value=t.html_content,I={restored:!0},document.querySelectorAll(`#download-btn, #readme-btn, #save-btn, #share-btn`).forEach(e=>{e.disabled=!1,e.classList.remove(`opacity-40`,`cursor-not-allowed`)}))};