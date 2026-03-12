import"./style-qyWBTZjR.js";import{createClient as W}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const Y="https://mkuzksoyetgxjsycfnnx.supabase.co",V="sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1",v=W(Y,V);async function K(){const{data:{user:e}}=await v.auth.getUser();if(e){g=e,console.log("User signed in:",e.email),M.classList.remove("hidden"),loadSavedPortfolios();const{data:t}=await v.from("users").select("*").eq("id",e.id).single();t&&(t.name&&(document.getElementById("name").value=t.name),t.title&&(document.getElementById("role").value=t.title),t.github_url&&(document.getElementById("github").value=t.github_url),d.disabled=!1,d.classList.remove("opacity-50","cursor-not-allowed"))}else localStorage.getItem("guestMode")!=="true"?window.location.href="./login.html":(console.log("Running in Ghost Mode (Guest)"),M.classList.add("hidden"))}K();let b=1,h="developer",u=null,g=null;async function J(){const{data:{user:e}}=await v.auth.getUser();g=e}J();const I=document.getElementById("dark-mode-toggle");I.addEventListener("click",()=>{const e=document.documentElement.classList.toggle("dark");localStorage.theme=e?"dark":"light",I.style.transform="scale(0.85) rotate(20deg)",setTimeout(()=>{I.style.transform=""},200)});const C=document.getElementById("portfolio-form"),H=[document.getElementById("step-1"),document.getElementById("step-2")],X=document.querySelectorAll(".next-step"),Z=document.querySelectorAll(".prev-step"),Q=document.querySelectorAll(".step-indicator"),A=document.getElementById("status-container"),U=document.getElementById("preview-empty"),r=document.getElementById("preview-content"),F=document.querySelectorAll("#theme-selector button"),y=document.getElementById("tab-preview"),k=document.getElementById("tab-code"),O=document.getElementById("preview-frame"),L=document.getElementById("code-editor-pane"),n=document.getElementById("code-editor"),f=document.getElementById("copy-code-btn"),R=document.getElementById("code-info"),z=document.getElementById("preview-label"),M=document.getElementById("my-portfolios-panel");document.getElementById("portfolios-count");document.getElementById("portfolios-list");const d=document.getElementById("save-btn");let P=[];function ee(){y.classList.add("bg-accent","text-black"),y.classList.remove("text-white/40","hover:text-white"),k.classList.remove("bg-accent","text-black"),k.classList.add("text-white/40","hover:text-white"),O.classList.remove("hidden"),L.classList.add("hidden"),L.classList.remove("flex"),f.classList.add("hidden"),f.classList.remove("flex"),R.classList.add("hidden"),z.classList.remove("hidden")}function te(){k.classList.add("bg-accent","text-black"),k.classList.remove("text-white/40","hover:text-white"),y.classList.remove("bg-accent","text-black"),y.classList.add("text-white/40","hover:text-white"),O.classList.add("hidden"),L.classList.remove("hidden"),L.classList.add("flex"),f.classList.remove("hidden"),f.classList.add("flex"),R.classList.remove("hidden"),z.classList.add("hidden"),u&&!n.dataset.userEdited&&(n.value=r.innerHTML)}y.addEventListener("click",ee);k.addEventListener("click",te);n.addEventListener("input",()=>{n.dataset.userEdited="true",r.innerHTML=n.value,r.classList.remove("opacity-20","pointer-events-none","select-none"),U.classList.add("hidden")});f.addEventListener("click",async()=>{const e=n.value||r.innerHTML;if(e)try{await navigator.clipboard.writeText(e);const t=f.querySelector("span");t.textContent="Copied!",f.classList.add("border-accent/50","text-accent"),setTimeout(()=>{t.textContent="Copy",f.classList.remove("border-accent/50","text-accent")},2e3)}catch(t){alert("Could not copy: "+t.message)}});window.addEventListener("beforeunload",e=>{if(n.dataset.userEdited==="true"&&u){const t="You have unsaved changes to your portfolio code. Are you sure you want to leave?";return e.returnValue=t,t}});function q(){H.forEach((e,t)=>{t+1===b?(e.classList.remove("hidden"),e.classList.add("animate-fade-in")):e.classList.add("hidden")}),Q.forEach((e,t)=>{t+1<=b?(e.classList.remove("bg-white/10"),e.classList.add("bg-accent")):(e.classList.add("bg-white/10"),e.classList.remove("bg-accent"))})}X.forEach(e=>{e.addEventListener("click",()=>{b<H.length&&(b++,q())})});Z.forEach(e=>{e.addEventListener("click",()=>{b>1&&(b--,q())})});C.addEventListener("submit",async e=>{e.preventDefault();const t={name:document.getElementById("name").value,role:document.getElementById("role").value,skills:document.getElementById("skills").value,projects:document.getElementById("projects").value,github:document.getElementById("github").value};A.classList.remove("hidden"),C.classList.add("opacity-50","pointer-events-none");try{const{data:o,error:a}=await v.functions.invoke("generate-portfolio",{body:t});a?(console.warn("Edge Function failed or key missing. Falling back to Demo Mode."),u=D(t)):u=o,_(),se(t,u),document.getElementById("download-btn").disabled=!1,document.getElementById("download-btn").classList.remove("opacity-50","cursor-not-allowed"),document.getElementById("share-btn").disabled=!1,document.getElementById("share-btn").classList.remove("opacity-50","cursor-not-allowed")}catch{console.warn("AI Generation trigger failed. Falling back to Demo Mode."),u=D(t),_()}finally{A.classList.add("hidden"),C.classList.remove("opacity-50","pointer-events-none")}});async function se(e,t){const{data:{user:o}}=await v.auth.getUser();if(!o){console.log("No authenticated user — skipping database save (guest mode).");return}try{console.log("Saving portfolio to Supabase for user:",o.id);const a=o.id,m=e.name.toLowerCase().replace(/\s+/g,".").replace(/[^a-z0-9.]/g,"")+"_"+a.slice(0,6),{error:l}=await v.from("users").upsert({id:a,username:m,name:e.name,title:e.role,bio:t.about,github_url:e.github||null,selected_template:h},{onConflict:"id"});if(l){console.error("User upsert error:",l.message);return}console.log("✅ User profile saved.")}catch(a){console.error("Failed to save portfolio to database:",a.message)}}function D(e){const t=e.skills.split(",").map(a=>a.trim()).filter(Boolean),o=(e.projects||"Awesome Project, NextGen App").split(",").map(a=>a.trim()).filter(Boolean);return{tagline:`Crafting high-performance ${e.role} experiences with precision & creative flair.`,about:`I'm a passionate ${e.role} who transforms complex challenges into elegant, user-centric solutions. With deep expertise in ${t.slice(0,3).join(", ")}, I build scalable products that people love. I care deeply about clean code, great design, and shipping fast.`,skills:t,github:e.github||"",projects:o.map((a,m)=>({title:a,description:"A modern, production-grade platform built to deliver an exceptional user experience. Focused on performance, accessibility, and beautiful design.",tech:t.slice(0,3),color:["#00D9FF","#6C63FF","#FF6584","#43D9AD"][m%4]}))}}function T(e){const t={html:"🌐",css:"🎨",javascript:"⚡",js:"⚡",typescript:"📘",ts:"📘",react:"⚛️",vue:"💚",angular:"🔴",node:"🟢",nodejs:"🟢",python:"🐍",java:"☕",php:"🐘",go:"🐹",rust:"🦀",swift:"🍎",kotlin:"🟣",flutter:"💙",dart:"🎯",supabase:"⚡",firebase:"🔥",aws:"☁️",docker:"🐳",git:"📦",figma:"🎭",tailwind:"💨",next:"▲",nextjs:"▲",mongodb:"🍃",sql:"🗄️",mysql:"🗄️",postgres:"🐘",postgresql:"🐘",graphql:"🔷",redux:"🟣",express:"🚂",django:"🎸",rails:"💎",laravel:"🔴"},o=e.toLowerCase().replace(/[^a-z]/g,"");return t[o]||"🔧"}function ae(){typeof gsap>"u"||(gsap.fromTo("#preview-content .portfolio-hero",{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:"power3.out"}),gsap.fromTo("#preview-content .portfolio-section",{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:"power2.out",stagger:.15,delay:.2}),document.querySelectorAll(".skill-bar-fill").forEach(e=>{const t=e.dataset.width||"80%";gsap.fromTo(e,{width:"0%"},{width:t,duration:1,ease:"power2.out",delay:.5})}))}F.forEach(e=>{e.addEventListener("click",()=>{if(console.log("Theme button clicked:",e.dataset.theme),F.forEach(t=>{t.classList.remove("bg-accent","text-black"),t.classList.add("hover:bg-white/5")}),e.classList.add("bg-accent","text-black"),e.classList.remove("hover:bg-white/5"),h=e.dataset.theme,u)_(),g&&document.getElementById("name").value&&v.from("users").update({selected_template:h}).match({id:g.id}).then(()=>{console.log("Theme saved to DB")});else{const t=document.querySelector("#preview-empty h3");t&&(t.innerHTML=`AI Portfolio Ready <span class="text-accent text-sm block mt-2 font-mono">Theme: ${h}</span>`)}console.log("Current theme set to:",h)})});function _(){if(!u)return;U.classList.add("hidden"),r.classList.remove("hidden","opacity-20","pointer-events-none"),r.innerHTML="",r.classList.add("select-text");const{tagline:e,about:t,skills:o,projects:a,github:m}=u,l=document.getElementById("name").value||"Your Name",E=document.getElementById("role").value||"Developer",c=document.getElementById("github").value||m||"",$=l.split(" ").map(s=>s[0]).join("").toUpperCase().slice(0,2),j="./images/hero.svg";function G(s){return s.split("").reduce((x,p)=>x+p.charCodeAt(0),42)%29+70+"%"}let w="";h==="developer"?w=`
        <div class="portfolio-root font-mono text-white bg-[#070710] min-h-screen">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden">
                <!-- Background image with overlay -->
                <div class="absolute inset-0">
                    <img src="${j}" class="w-full h-full object-cover opacity-10" alt="hero">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#070710] via-[#0D0D20]/90 to-[#070710]"></div>
                    <!-- Grid lines -->
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px); background-size: 40px 40px;"></div>
                    <!-- Glow blobs -->
                    <div class="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                </div>
                
                <div class="relative z-10 px-10 pt-16 pb-14">
                    <!-- Status badge -->
                    <div class="flex items-center gap-2 mb-8">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        <span class="text-accent text-xs tracking-[0.3em] uppercase font-bold">Available for opportunities</span>
                    </div>
                    
                    <!-- Avatar + Name Row -->
                    <div class="flex items-center gap-6 mb-6">
                        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-black text-2xl font-bold shadow-[0_0_30px_rgba(0,217,255,0.4)] flex-shrink-0">
                            ${$}
                        </div>
                        <div>
                            <div class="text-white/40 text-sm mb-1 tracking-widest uppercase">${E}</div>
                            <h1 class="text-5xl font-bold leading-none tracking-tight" style="font-family:'Clash Display',monospace">
                                <span style="background:linear-gradient(120deg,#00D9FF,#818CF8,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${l}</span>
                            </h1>
                        </div>
                    </div>
                    
                    <!-- Tagline -->
                    <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">${e}</p>
                    
                    <!-- CTA Row -->
                    <div class="flex gap-4 flex-wrap">
                        <a href="#projects" class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_25px_rgba(0,217,255,0.4)] text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            View My Work
                        </a>
                        ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all text-sm text-white/70">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            GitHub
                        </a>`:""}
                    </div>
                </div>
            </div>

            <!-- ABOUT -->
            <div class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>About
                </h2>
                <p class="text-lg text-white/60 leading-[1.9] max-w-3xl">${t}</p>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Technologies
                </h2>
                <div class="space-y-5 max-w-2xl">
                    ${o.map(s=>{const i=G(s);return`
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-white/80 flex items-center gap-2">
                                    <span>${T(s)}</span> ${s}
                                </span>
                                <span class="text-xs text-accent font-bold">${i}</span>
                            </div>
                            <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-blue-400" style="width:0%" data-width="${i}"></div>
                            </div>
                        </div>`}).join("")}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="projects" class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-10 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Selected Work
                </h2>
                <div class="grid grid-cols-1 gap-6">
                    ${a.map((s,i)=>`
                        <div class="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]">
                            <!-- Image -->
                            <div class="h-52 overflow-hidden relative">
                                <img src="${`./images/project-${i%4+1}.svg`}" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700" alt="${s.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#070710] via-transparent to-transparent"></div>
                                <!-- Number badge -->
                                <div class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-bold text-accent">
                                    0${i+1}
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2 group-hover:text-accent transition-colors">${s.title}</h3>
                                <p class="text-sm text-white/50 mb-5 leading-relaxed">${s.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex gap-2 flex-wrap">
                                        ${s.tech.map(p=>`<span class="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/50 hover:border-accent/40 hover:text-accent transition-all">${p}</span>`).join("")}
                                    </div>
                                    ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="text-white/30 hover:text-accent transition-colors">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>`:""}
                                </div>
                            </div>
                        </div>`).join("")}
                </div>
            </div>

            <!-- CONTACT / FOOTER -->
            <div class="portfolio-section px-10 py-14 border-t border-white/5 text-center">
                <div class="max-w-xl mx-auto">
                    <div class="text-4xl mb-4">🚀</div>
                    <h2 class="text-3xl font-bold mb-4 font-clash">Let's work together</h2>
                    <p class="text-white/40 mb-8 leading-relaxed">I'm currently open to new opportunities. Whether you have a project in mind or just want to say hello — my inbox is always open.</p>
                    <div class="flex gap-4 justify-center flex-wrap">
                        ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent/50 hover:text-accent transition-all text-sm text-white/60">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            @${c.replace(/^.*github\.com\//,"")}
                        </a>`:""}
                        <a href="mailto:hello@${l.toLowerCase().replace(/\s/g,"")}.dev" class="inline-flex items-center gap-2 px-5 py-3 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            Say Hello
                        </a>
                    </div>
                    <p class="text-white/20 text-xs mt-10">Built with AI Portfolio Pro · ${new Date().getFullYear()}</p>
                </div>
            </div>
        </div>`:h==="startup"?w=`
        <div class="portfolio-root font-[system-ui] bg-white text-[#111] min-h-screen -m-12 pb-0">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden bg-white pt-20 pb-0 px-12">
                <!-- Subtle gradient BG -->
                <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#f0f9ff,#fff_60%)]"></div>
                
                <div class="relative z-10 max-w-4xl mx-auto">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8">
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Open to work
                    </div>
                    
                    <!-- Avatar -->
                    <div class="mb-6">
                        <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                            ${$}
                        </div>
                    </div>
                    
                    <h1 class="text-7xl font-black tracking-tighter leading-none mb-4">${l}</h1>
                    <div class="text-2xl text-slate-400 font-medium mb-6">${E}</div>
                    <p class="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">${e}</p>
                    
                    <div class="flex gap-4 mb-16">
                        <a href="#work" class="px-7 py-4 bg-black text-white rounded-2xl font-bold hover:scale-[1.03] transition-transform shadow-xl shadow-black/20 text-sm">
                            View Work ↓
                        </a>
                        ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="px-7 py-4 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-400 transition-colors text-sm text-slate-700">
                            GitHub
                        </a>`:""}
                    </div>
                </div>
                
                <!-- Hero banner image -->
                <div class="relative h-[360px] overflow-hidden rounded-t-[40px] mx-auto max-w-5xl shadow-[0_-20px_60px_rgba(0,0,0,0.08)] bg-slate-100">
                    <img src="${j}" class="w-full h-full object-cover" alt="${l}">
                </div>
            </div>

            <!-- ABOUT -->
            <div class="portfolio-section max-w-4xl mx-auto px-12 py-20">
                <div class="grid grid-cols-5 gap-16 items-start">
                    <div class="col-span-2">
                        <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-4">About</div>
                        <h2 class="text-4xl font-black leading-tight tracking-tight">Who<br>I am.</h2>
                    </div>
                    <div class="col-span-3">
                        <p class="text-xl leading-relaxed text-slate-500">${t}</p>
                    </div>
                </div>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section bg-slate-50 py-16">
                <div class="max-w-4xl mx-auto px-12">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-8">Skills & Tools</div>
                    <div class="flex flex-wrap gap-3">
                        ${o.map(s=>`
                        <div class="flex items-center gap-2 bg-white text-slate-700 px-5 py-3 rounded-2xl font-semibold text-sm shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
                            <span>${T(s)}</span> ${s}
                        </div>`).join("")}
                    </div>
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="work" class="portfolio-section max-w-4xl mx-auto px-12 py-20">
                <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-12">Selected Work</div>
                <div class="space-y-16">
                    ${a.map((s,i)=>`
                        <div class="group">
                            <div class="aspect-video w-full overflow-hidden rounded-[30px] mb-8 shadow-xl shadow-slate-200/80 bg-slate-100">
                                <img src="${`./images/project-${i%4+1}.svg`}" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" alt="${s.title}">
                            </div>
                            <div class="flex items-start justify-between gap-8">
                                <div>
                                    <div class="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Project 0${i+1}</div>
                                    <h3 class="text-3xl font-black tracking-tight mb-3">${s.title}</h3>
                                    <p class="text-slate-500 text-lg leading-relaxed max-w-xl">${s.description}</p>
                                </div>
                                <div class="flex flex-col gap-2 flex-shrink-0">
                                    ${s.tech.map(p=>`<span class="text-[10px] bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">${p}</span>`).join("")}
                                </div>
                            </div>
                        </div>`).join("")}
                </div>
            </div>

            <!-- CONTACT -->
            <div class="portfolio-section bg-black text-white py-24 px-12">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Contact</div>
                    <h2 class="text-6xl font-black tracking-tighter mb-6">Let's create<br>something great.</h2>
                    <p class="text-xl text-white/40 mb-12 max-w-lg mx-auto">Open to freelance projects, full-time roles, and creative collaborations.</p>
                    <div class="flex gap-4 justify-center flex-wrap">
                        <a href="mailto:hello@${l.toLowerCase().replace(/\s/g,"")}.dev" class="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-transform text-sm">
                            📧 Get In Touch
                        </a>
                        ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="px-8 py-4 border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">
                            GitHub →
                        </a>`:""}
                    </div>
                    <p class="text-white/20 text-xs mt-16">© ${new Date().getFullYear()} ${l} · Built with AI Portfolio Pro</p>
                </div>
            </div>
        </div>`:h==="creative"&&(w=`
        <div class="portfolio-root text-white min-h-screen pb-20" style="background:linear-gradient(135deg,#06060F 0%,#0E0720 50%,#06060F 100%)">
            <!-- Ambient blobs -->
            <div class="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(0,217,255,0.08),transparent 70%);transform:translate(-30%,-30%)"></div>
            <div class="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%);transform:translate(30%,30%)"></div>
            
            <!-- HERO -->
            <div class="portfolio-hero relative px-10 pt-20 pb-10">
                <!-- Huge name in background -->
                <div class="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
                    <span class="text-[100px] font-black tracking-tighter opacity-[0.03] leading-none" style="font-family:'Clash Display',sans-serif">${l.split(" ")[0]}</span>
                </div>
                
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-12">
                        <div>
                            <div class="flex items-center gap-2 mb-6">
                                <span class="w-8 h-px bg-accent/60"></span>
                                <span class="text-accent/80 text-xs tracking-[0.3em] uppercase">${E}</span>
                            </div>
                            <h1 class="font-black leading-none tracking-tighter" style="font-size:clamp(3rem,7vw,5.5rem);font-family:'Clash Display',sans-serif">
                                ${l.split(" ")[0]}<br>
                                <span style="color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.2)">${l.split(" ").slice(1).join(" ")||"&nbsp;"}</span>
                            </h1>
                        </div>
                        <!-- Avatar circle -->
                        <div class="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(0,217,255,0.2)] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-accent/20 to-purple-500/20">
                            ${$}
                        </div>
                    </div>
                    
                    <p class="text-2xl text-white/50 max-w-xl leading-relaxed font-light mb-10">${e}</p>
                    
                    <div class="flex gap-4">
                        <a href="#creative-work" class="px-7 py-3.5 rounded-full border border-accent/50 text-accent font-semibold hover:bg-accent hover:text-black transition-all text-sm">
                            Explore Work ↓
                        </a>
                        ${c?`<a href="https://github.com/${c.replace(/^.*github\.com\//,"")}" target="_blank" class="px-7 py-3.5 rounded-full border border-white/10 font-semibold hover:bg-white/5 transition-all text-sm text-white/50">
                            GitHub
                        </a>`:""}
                    </div>
                </div>
            </div>

            <!-- MAIN IMAGE COLLAGE -->
            <div class="grid grid-cols-3 gap-4 px-10 py-8 h-[400px]">
                <div class="col-span-2 rounded-[30px] overflow-hidden relative bg-black/50">
                    <img src="${j}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="${l}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex-1 rounded-[30px] overflow-hidden" style="background:linear-gradient(135deg,rgba(0,217,255,0.15),rgba(139,92,246,0.15));backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08)">
                        <div class="h-full flex flex-col justify-between p-6">
                            <span class="text-5xl font-black opacity-10 font-mono">{ }</span>
                            <div>
                                <div class="text-xs text-white/40 uppercase tracking-widest mb-1">Stack</div>
                                <div class="text-white/80 text-sm font-medium">${o.slice(0,3).join(" · ")}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 rounded-[30px] overflow-hidden relative bg-purple-900/50">
                        <img src="./images/project-4.svg" class="w-full h-full object-cover opacity-60" alt="Projects">
                        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4 text-sm font-bold">${a.length} Projects</div>
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
                    ${o.map((s,i)=>{const x=["rgba(0,217,255,0.15)","rgba(139,92,246,0.15)","rgba(236,72,153,0.15)","rgba(34,197,94,0.15)"],p=["rgba(0,217,255,0.3)","rgba(139,92,246,0.3)","rgba(236,72,153,0.3)","rgba(34,197,94,0.3)"],B=x[i%4],S=p[i%4];return`<span class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default" style="background:${B};border:1px solid ${S}">
                            ${T(s)} ${s}
                        </span>`}).join("")}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="creative-work" class="portfolio-section px-10 pb-10">
                <div class="flex items-start gap-4 mb-12">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">Selected Projects</span>
                </div>
                <div class="space-y-6">
                    ${a.map((s,i)=>`
                        <div class="group relative overflow-hidden rounded-[30px] border border-white/5 hover:border-white/15 transition-all duration-700" style="background:rgba(255,255,255,0.025)">
                            <div class="grid grid-cols-5 gap-0 h-56">
                                <!-- Image -->
                                <div class="col-span-3 overflow-hidden">
                                    <img src="${`./images/project-${i%4+1}.svg`}" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" alt="${s.title}">
                                </div>
                                <!-- Info -->
                                <div class="col-span-2 p-7 flex flex-col justify-between">
                                    <div>
                                        <div class="text-accent font-mono text-sm mb-3">0${i+1} /</div>
                                        <h3 class="text-2xl font-bold mb-3 leading-tight group-hover:text-accent transition-colors" style="font-family:'Clash Display',sans-serif">${s.title}</h3>
                                        <p class="text-white/40 text-sm leading-relaxed">${s.description}</p>
                                    </div>
                                    <div class="flex gap-2 flex-wrap">
                                        ${s.tech.map(p=>`<span class="text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/50">${p}</span>`).join("")}
                                    </div>
                                </div>
                            </div>
                        </div>`).join("")}
                </div>
            </div>

            <!-- FOOTER CTA -->
            <div class="portfolio-section px-10 py-20 text-center relative overflow-hidden">
                <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at center,rgba(0,217,255,0.06),transparent 70%)"></div>
                <div class="relative z-10">
                    <h2 class="font-black mb-6 leading-none" style="font-family:'Clash Display',sans-serif;font-size:clamp(2.5rem,6vw,4.5rem)">
                        Let's build<br>
                        <span class="text-transparent" style="-webkit-text-stroke:1px rgba(0,217,255,0.5)">something</span><br>
                        <span style="color:#00D9FF">extraordinary.</span>
                    </h2>
                    <p class="text-white/30 mb-10 max-w-sm mx-auto">Available for select projects and collaborations worldwide.</p>
                    <a href="mailto:hello@${l.toLowerCase().replace(/\s/g,"")}.dev" class="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,217,255,0.3)]" style="background:linear-gradient(135deg,#00D9FF,#818CF8);color:#000">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Get In Touch
                    </a>
                    <p class="text-white/15 text-xs mt-12">© ${new Date().getFullYear()} ${l} · AI Portfolio Pro</p>
                </div>
            </div>
        </div>`),r.innerHTML=w,n.dataset.userEdited="",n.value=w,requestAnimationFrame(ae),r.querySelectorAll('a[href^="#"]').forEach(s=>{s.addEventListener("click",function(i){i.preventDefault();const x=this.getAttribute("href").substring(1),p=r.querySelector("#"+x);if(p){const B=r.getBoundingClientRect().top,N=p.getBoundingClientRect().top-B;r.scrollBy({top:N,behavior:"smooth"})}})})}d.addEventListener("click",async()=>{if(!u||!g){g||alert("You must be logged in to save portfolios.");return}const e=n.dataset.userEdited==="true"&&n.value?n.value:r.innerHTML;let t=prompt("Name this portfolio version:","My Portfolio");if(!t)return;const o=d.innerHTML;d.innerHTML="Saving...",d.disabled=!0;try{const{data:a,error:m}=await v.from("saved_portfolios").insert([{user_id:g.id,name:t,html_content:e}]).select();if(m)throw m;n.dataset.userEdited="",P=[a[0],...P],renderSavedPortfoliosList(),d.innerHTML='<i class="fas fa-check"></i> Saved!',d.classList.add("text-green-400"),setTimeout(()=>{d.innerHTML=o,d.classList.remove("text-green-400"),d.disabled=!1},2e3)}catch(a){console.error("Error saving portfolio code:",a),alert("Failed to save portfolio. Please try again."),d.innerHTML=o,d.disabled=!1}});document.getElementById("download-btn").addEventListener("click",()=>{if(!u)return;const e=n.dataset.userEdited&&n.value?n.value:r.innerHTML,t=document.getElementById("name").value||"portfolio",o=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">
  <style>
    @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
    .animate-ping { animation: ping 1s cubic-bezier(0,0,0.2,1) infinite; }
    .font-mono { font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; }
  </style>
</head>
<body>${e}</body>
</html>`,a=new Blob([o],{type:"text/html"}),m=URL.createObjectURL(a),l=document.createElement("a");l.href=m,l.download=`${t.toLowerCase().replace(/\s/g,"-")}-portfolio.html`,l.click(),URL.revokeObjectURL(m)});document.getElementById("share-btn").addEventListener("click",async()=>{let e=(document.getElementById("name").value||"user").toLowerCase().replace(/\s/g,"-")+"-"+Math.random().toString(36).substring(2,6);if(g){const{data:t}=await v.from("users").select("username").match({id:g.id}).single();t&&t.username&&(e=t.username),await v.from("users").update({is_published:!0}).match({id:g.id})}alert(`🚀 Your portfolio is live at:
https://portfolio.ai/${e}

(Copy this link to share with anyone!)`)});
