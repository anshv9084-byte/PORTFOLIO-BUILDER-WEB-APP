import"./style-DBZd-7v8.js";import{createClient as ne}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const re="https://mkuzksoyetgxjsycfnnx.supabase.co",ce="sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1",y=ne(re,ce);async function de(){const{data:{user:e}}=await y.auth.getUser();if(e){b=e,console.log("User signed in:",e.email),K.classList.remove("hidden"),loadSavedPortfolios();const{data:t}=await y.from("users").select("*").eq("id",e.id).single();t&&(t.name&&(document.getElementById("name").value=t.name),t.title&&(document.getElementById("role").value=t.title),t.github_url&&(document.getElementById("github").value=t.github_url),v.disabled=!1,v.classList.remove("opacity-50","cursor-not-allowed"))}else localStorage.getItem("guestMode")!=="true"?window.location.href="./login.html":(console.log("Running in Ghost Mode (Guest)"),K.classList.add("hidden"))}de();let C=1,x="developer",E="#00D9FF",G="clash",p=null,b=null,L={};async function pe(){const{data:{user:e}}=await y.auth.getUser();b=e}pe();const O=document.getElementById("portfolio-form"),Q=[document.getElementById("step-1"),document.getElementById("step-2"),document.getElementById("step-3"),document.getElementById("step-4")],me=document.querySelectorAll(".next-step"),ge=document.querySelectorAll(".prev-step"),fe=document.querySelectorAll(".step-indicator"),V=document.getElementById("status-container"),ee=document.getElementById("preview-empty"),u=document.getElementById("preview-content"),J=document.querySelectorAll("#theme-selector button"),_=document.getElementById("tab-preview"),F=document.getElementById("tab-code"),te=document.getElementById("preview-frame"),U=document.getElementById("code-editor-pane"),f=document.getElementById("code-editor"),j=document.getElementById("copy-code-btn"),se=document.getElementById("code-info"),ae=document.getElementById("preview-label"),K=document.getElementById("my-portfolios-panel");document.getElementById("portfolios-count");document.getElementById("portfolios-list");const v=document.getElementById("save-btn");let X=[];document.querySelectorAll(".color-swatch").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".color-swatch").forEach(t=>t.classList.remove("active")),e.classList.add("active"),E=e.dataset.color,document.documentElement.style.setProperty("--accent",E),p&&P()})});document.querySelectorAll(".font-option").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".font-option").forEach(t=>{t.classList.remove("border-accent/50","bg-accent/10","text-accent"),t.classList.add("border-white/10","bg-white/5")}),e.classList.add("border-accent/50","bg-accent/10","text-accent"),e.classList.remove("border-white/10","bg-white/5"),G=e.dataset.font,p&&P()})});const ie=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),ie.unobserve(t.target))})},{threshold:.1});document.querySelectorAll(".scroll-reveal").forEach(e=>ie.observe(e));function ve(){_.classList.add("bg-accent","text-black"),_.classList.remove("text-white/40","hover:text-white"),F.classList.remove("bg-accent","text-black"),F.classList.add("text-white/40","hover:text-white"),te.classList.remove("hidden"),U.classList.add("hidden"),U.classList.remove("flex"),j.classList.add("hidden"),j.classList.remove("flex"),se.classList.add("hidden"),ae.classList.remove("hidden")}function ue(){F.classList.add("bg-accent","text-black"),F.classList.remove("text-white/40","hover:text-white"),_.classList.remove("bg-accent","text-black"),_.classList.add("text-white/40","hover:text-white"),te.classList.add("hidden"),U.classList.remove("hidden"),U.classList.add("flex"),j.classList.remove("hidden"),j.classList.add("flex"),se.classList.remove("hidden"),ae.classList.add("hidden"),p&&!f.dataset.userEdited&&(f.value=u.innerHTML)}_.addEventListener("click",ve);F.addEventListener("click",ue);f.addEventListener("input",()=>{f.dataset.userEdited="true",u.innerHTML=f.value,u.classList.remove("opacity-20","pointer-events-none","select-none"),ee.classList.add("hidden")});j.addEventListener("click",async()=>{const e=f.value||u.innerHTML;if(e)try{await navigator.clipboard.writeText(e);const t=j.querySelector("span");t.textContent="Copied!",j.classList.add("border-accent/50","text-accent"),setTimeout(()=>{t.textContent="Copy",j.classList.remove("border-accent/50","text-accent")},2e3)}catch(t){alert("Could not copy: "+t.message)}});window.addEventListener("beforeunload",e=>{if(f.dataset.userEdited==="true"&&p){const t="You have unsaved changes to your portfolio code. Are you sure you want to leave?";return e.returnValue=t,t}});function oe(){Q.forEach((e,t)=>{t+1===C?(e.classList.remove("hidden"),e.classList.add("animate-fade-in")):e.classList.add("hidden")}),fe.forEach((e,t)=>{t+1<=C?(e.classList.remove("bg-white/10"),e.classList.add("bg-accent")):(e.classList.add("bg-white/10"),e.classList.remove("bg-accent"))})}me.forEach(e=>{e.addEventListener("click",()=>{C<Q.length&&(C++,oe())})});ge.forEach(e=>{e.addEventListener("click",()=>{C>1&&(C--,oe())})});O.addEventListener("submit",async e=>{var t,i,o,r,a;e.preventDefault(),L={name:document.getElementById("name").value,role:document.getElementById("role").value,tagline:((t=document.getElementById("tagline-input"))==null?void 0:t.value)||"",skills:document.getElementById("skills").value.split(",").map(g=>g.trim()).filter(g=>g),projects:document.getElementById("projects").value,experience:((i=document.getElementById("experience"))==null?void 0:i.value.split(`
`).map(g=>g.trim()).filter(g=>g))||[],github:document.getElementById("github").value,linkedin:((o=document.getElementById("linkedin"))==null?void 0:o.value)||"",email:((r=document.getElementById("email"))==null?void 0:r.value)||"",photoUrl:((a=document.getElementById("photo-url"))==null?void 0:a.value)||"",accentColor:E,font:G},L=formData,V.classList.remove("hidden"),O.classList.add("opacity-50","pointer-events-none");try{const{data:g,error:d}=await y.functions.invoke("generate-portfolio",{body:formData});d?(console.warn("Edge Function failed or key missing. Falling back to Demo Mode."),p=Z(formData)):p=g,P(),he(formData,p),document.getElementById("download-btn").disabled=!1,document.getElementById("download-btn").classList.remove("opacity-40","cursor-not-allowed"),document.getElementById("readme-btn").disabled=!1,document.getElementById("readme-btn").classList.remove("opacity-40","cursor-not-allowed"),document.getElementById("share-btn").disabled=!1,document.getElementById("share-btn").classList.remove("opacity-40","cursor-not-allowed"),b&&(v.disabled=!1,v.classList.remove("opacity-40","cursor-not-allowed"))}catch{console.warn("AI Generation trigger failed. Falling back to Demo Mode."),p=Z(formData),P()}finally{V.classList.add("hidden"),O.classList.remove("opacity-50","pointer-events-none")}});async function he(e,t){const{data:{user:i}}=await y.auth.getUser();if(!i){console.log("No authenticated user — skipping database save (guest mode).");return}try{console.log("Saving portfolio to Supabase for user:",i.id);const o=i.id,r=e.name.toLowerCase().replace(/\s+/g,".").replace(/[^a-z0-9.]/g,"")+"_"+o.slice(0,6),{error:a}=await y.from("users").upsert({id:o,username:r,name:e.name,title:e.role,bio:t.about,github_url:e.github||null,selected_template:x},{onConflict:"id"});if(a){console.error("User upsert error:",a.message);return}console.log("✅ User profile saved.")}catch(o){console.error("Failed to save portfolio to database:",o.message)}}function Z(e){const t=e.skills.split(",").map(r=>r.trim()).filter(Boolean),i=(e.projects||"Awesome Project, NextGen App").split(",").map(r=>r.trim()).filter(Boolean),o=e.experience?e.experience.split(`
`).map(r=>r.trim()).filter(Boolean):[];return{tagline:`Crafting high-performance ${e.role} experiences with precision & creative flair.`,about:`I'm a passionate ${e.role} who transforms complex challenges into elegant, user-centric solutions. With deep expertise in ${t.slice(0,3).join(", ")}, I build scalable products that people love. I care deeply about clean code, great design, and shipping fast.`,skills:t,experience:o,photoUrl:e.photoUrl||"",github:e.github||"",projects:i.map((r,a)=>({title:r,description:"A modern, production-grade platform built to deliver an exceptional user experience. Focused on performance, accessibility, and beautiful design.",tech:t.slice(0,3),color:["#00D9FF","#6C63FF","#FF6584","#43D9AD"][a%4]}))}}function q(e){const t={html:"🌐",css:"🎨",javascript:"⚡",js:"⚡",typescript:"📘",ts:"📘",react:"⚛️",vue:"💚",angular:"🔴",node:"🟢",nodejs:"🟢",python:"🐍",java:"☕",php:"🐘",go:"🐹",rust:"🦀",swift:"🍎",kotlin:"🟣",flutter:"💙",dart:"🎯",supabase:"⚡",firebase:"🔥",aws:"☁️",docker:"🐳",git:"📦",figma:"🎭",tailwind:"💨",next:"▲",nextjs:"▲",mongodb:"🍃",sql:"🗄️",mysql:"🗄️",postgres:"🐘",postgresql:"🐘",graphql:"🔷",redux:"🟣",express:"🚂",django:"🎸",rails:"💎",laravel:"🔴"},i=e.toLowerCase().replace(/[^a-z]/g,"");return t[i]||"🔧"}function xe(e,t,i=50){if(!e)return;e.innerHTML="",e.classList.add("typing-cursor");let o=0;function r(){o<t.length?(e.innerHTML+=t.charAt(o),o++,setTimeout(r,i)):setTimeout(()=>e.classList.remove("typing-cursor"),2e3)}r()}function be(){if(typeof gsap>"u")return;gsap.killTweensOf("#preview-content *");const e=gsap.timeline();e.fromTo("#preview-content .portfolio-hero",{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:"expo.out"}),e.fromTo("#preview-content .portfolio-section",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out",stagger:.2},"-=0.5"),document.querySelectorAll(".skill-bar-fill").forEach((i,o)=>{const r=i.dataset.width||"80%";e.fromTo(i,{width:"0%"},{width:r,duration:1.2,ease:"expo.out"},`-=${.7-o*.05}`)}),document.querySelectorAll(".portfolio-root .btn-pulse").forEach(i=>{gsap.to(i,{scale:1.05,duration:.8,repeat:-1,yoyo:!0,ease:"sine.inOut"})});const t=document.querySelector("#preview-content .hero-title-typing");t&&L.name&&xe(t,L.name,100)}J.forEach(e=>{e.addEventListener("click",()=>{if(console.log("Theme button clicked:",e.dataset.theme),J.forEach(t=>{t.classList.remove("bg-accent","text-black","pulse-btn"),t.classList.add("hover:bg-white/5")}),e.classList.add("bg-accent","text-black"),e.classList.remove("hover:bg-white/5"),x=e.dataset.theme,p)P(),b&&document.getElementById("name").value&&y.from("users").update({selected_template:x}).match({id:b.id}).then(()=>{console.log("Theme saved to DB")});else{const t=document.querySelector("#preview-empty h3");t&&(t.innerHTML=`AI Portfolio Ready <span class="text-accent text-sm block mt-2 font-mono">Theme: ${x}</span>`)}console.log("Current theme set to:",x)})});function P(){var B,S,A,$,R,N,W,Y;if(!p)return;ee.classList.add("hidden"),u.classList.remove("hidden","opacity-20","pointer-events-none"),u.innerHTML="",u.classList.add("select-text");const{tagline:e,about:t,skills:i,projects:o,github:r}=p,a=document.getElementById("name").value||"Your Name",g=document.getElementById("role").value||"Developer",d=document.getElementById("github").value||r||"",k=a.split(" ").map(l=>l[0]).join("").toUpperCase().slice(0,2),T="./images/hero.svg";function M(l){return l.split("").reduce((c,s)=>c+s.charCodeAt(0),42)%29+70+"%"}const D={clash:'font-family: "Clash Display", system-ui, sans-serif !important;',inter:'font-family: "Inter", system-ui, sans-serif !important;',mono:"font-family: monospace !important;"},I=D[G]||D.clash;let w="";if(x==="developer"){const l=((B=document.getElementById("photo-url"))==null?void 0:B.value)||p.photoUrl||"",n=((S=document.getElementById("linkedin"))==null?void 0:S.value)||"",c=p.experience||[];w=`
        <div class="portfolio-root font-mono text-white bg-[#070710] min-h-screen" style="--accent: ${E}; ${I}">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden">
                <!-- Background image with overlay -->
                <div class="absolute inset-0">
                    <img src="${T}" class="w-full h-full object-cover opacity-10" alt="hero">
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
                        ${l?`<div class="w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:scale-105 transition-transform duration-500">
                                <img src="${l}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-black text-3xl font-bold shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] flex-shrink-0 hover:rotate-3 transition-transform">
                                ${k}
                             </div>`}
                        <div>
                            <div class="text-white/40 text-sm mb-1 tracking-widest uppercase">${g}</div>
                            <h1 class="text-5xl font-bold font-clash tracking-tight hero-title-typing">
                                ${a}
                            </h1>
                        </div>
                    </div>
                    
                    <!-- Tagline -->
                    <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${e}</p>
                    
                    <!-- CTA Row -->
                    <div class="flex gap-4 flex-wrap animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="#projects" class="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)] text-sm pulse-btn">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            View Projects
                        </a>
                        ${d?`<a href="https://github.com/${d.replace(/^.*github\.com\//,"")}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-github"></i> GitHub
                        </a>`:""}
                        ${n?`<a href="https://${n.replace("https://","")}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>`:""}
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
                    ${c.length>0?`
                    <div>
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                            <span class="w-6 h-px bg-accent"></span>Experience
                        </h2>
                        <div class="space-y-6">
                            ${c.map(s=>`
                            <div class="premium-card p-5 !bg-white/[0.01]">
                                <p class="text-white/80 font-bold">${s}</p>
                            </div>`).join("")}
                        </div>
                    </div>`:""}
                </div>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section px-10 py-16 border-t border-white/5 bg-[#080812]">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-10 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Tech Stack
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    ${i.map(s=>{const m=M(s);return`
                        <div class="group">
                            <div class="flex items-center justify-between mb-2.5">
                                <span class="text-sm text-white/80 flex items-center gap-3 group-hover:text-accent transition-colors">
                                    <span class="text-xl">${q(s)}</span> 
                                    <span class="font-bold tracking-tight">${s}</span>
                                </span>
                                <span class="text-[10px] font-mono text-white/20">${m}</span>
                            </div>
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent via-blue-400 to-purple-500" style="width:0%" data-width="${m}"></div>
                            </div>
                        </div>`}).join("")}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="projects" class="portfolio-section px-10 py-20 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-12 text-center">Selected Work</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${o.map((s,m)=>`
                        <div class="group premium-card !p-0 overflow-hidden">
                            <!-- Image Container -->
                            <div class="h-64 overflow-hidden relative">
                                <img src="${`./images/project-${m%4+1}.svg`}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="${s.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#070710] via-transparent to-transparent"></div>
                                <div class="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-accent uppercase tracking-widest">
                                    Build 0${m+1}
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="p-8">
                                <h3 class="text-2xl font-bold mb-3 group-hover:text-accent transition-all duration-300 font-clash">${s.title}</h3>
                                <p class="text-sm text-white/40 mb-6 leading-relaxed">${s.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex gap-2.5 flex-wrap">
                                        ${s.tech.map(z=>`<span class="text-[9px] bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg text-white/50 font-bold uppercase tracking-wider">${z}</span>`).join("")}
                                    </div>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-accent hover:text-black transition-all">
                                        <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`).join("")}
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
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="px-10 py-4 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform text-lg shadow-[0_15px_40px_rgba(var(--accent-rgb),0.35)] pulse-btn">
                            Initiate Contact
                        </a>
                        ${d?`<a href="https://github.com/${d}" class="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-white/60">
                            Source Files
                        </a>`:""}
                    </div>
                    <div class="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p class="text-white/20 text-xs">© ${new Date().getFullYear()} ${a} · Engineered with AI Pro</p>
                        <div class="flex gap-6">
                            ${d?`<a href="https://github.com/${d}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-github"></i></a>`:""}
                            ${n?`<a href="https://${n.replace("https://","")}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-linkedin"></i></a>`:""}
                        </div>
                    </div>
                </div>
            </div>
        </div>`}else if(x==="startup"){const l=((A=document.getElementById("photo-url"))==null?void 0:A.value)||p.photoUrl||"",n=(($=document.getElementById("linkedin"))==null?void 0:$.value)||"",c=p.experience||[];w=`
        <div class="portfolio-root font-sans bg-white text-[#111] min-h-screen pb-0" style="--accent: ${E}; ${I}">
            <!-- Navigation -->
            <nav class="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 py-5 flex items-center justify-between">
                <div class="font-black text-xl tracking-tighter">${k}</div>
                <div class="flex gap-8 items-center">
                    <a href="#work" class="text-sm font-bold text-slate-500 hover:text-black">Work</a>
                    <a href="#about" class="text-sm font-bold text-slate-500 hover:text-black">About</a>
                    <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform pulse-btn">Let's Talk</a>
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
                                ${d?`<a href="https://github.com/${d}" target="_blank" class="px-8 py-4.5 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-800 transition-all text-base text-slate-700">
                                    Source
                                </a>`:""}
                            </div>
                        </div>
                        ${l?`<div class="w-64 h-80 rounded-[40px] overflow-hidden rotate-2 shadow-2xl border-8 border-white animate-fade-in">
                                <img src="${l}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-64 h-64 rounded-[50px] bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-6xl font-black shadow-2xl rotate-3">
                                ${k}
                             </div>`}
                    </div>
                </div>
                
                <!-- Hero Visual -->
                <div class="relative h-[480px] overflow-hidden rounded-t-[60px] mx-auto max-w-6xl shadow-[0_-30px_100px_rgba(0,0,0,0.08)] bg-slate-50 mt-12 group">
                    <img src="${T}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-2000" alt="Work Process">
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

                ${c.length>0?`
                <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-1">
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-6">Career Path</h2>
                    </div>
                    <div class="md:col-span-2 space-y-12">
                        ${c.slice(0,3).map(s=>{const[m,h]=s.split(" at ");return`
                            <div class="flex gap-8 group">
                                <div class="text-4xl font-black text-slate-100 group-hover:text-black transition-colors duration-500">→</div>
                                <div>
                                    <h4 class="text-2xl font-black">${m}</h4>
                                    <p class="text-lg text-slate-400 font-bold">${h||""}</p>
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>`:""}
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section bg-slate-50 py-24 border-y border-slate-100">
                <div class="max-w-5xl mx-auto px-12 text-center">
                    <h2 class="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-black mb-16">Core Competencies</h2>
                    <div class="flex flex-wrap justify-center gap-6">
                        ${i.map(s=>`
                        <div class="flex items-center gap-4 bg-white text-slate-800 px-8 py-5 rounded-3xl font-bold text-lg shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <span class="text-2xl">${q(s)}</span> ${s}
                        </div>`).join("")}
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
                    ${o.map((s,m)=>{const h=`./images/project-${m%4+1}.svg`,z=m%2===0;return`
                        <div class="group grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div class="lg:col-span-7 ${z?"lg:order-1":"lg:order-2"} aspect-[4/3] w-full overflow-hidden rounded-[50px] shadow-3xl shadow-slate-200/80 bg-slate-100">
                                <img src="${h}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="${s.title}">
                            </div>
                            <div class="lg:col-span-5 ${z?"lg:order-2":"lg:order-1"}">
                                <div class="text-[10px] font-black tracking-widest text-[#111] opacity-20 mb-4">0${m+1} / Project</div>
                                <h3 class="text-4xl font-black tracking-tighter mb-6">${s.title}</h3>
                                <p class="text-slate-500 text-lg leading-relaxed mb-8">${s.description}</p>
                                <div class="flex flex-wrap gap-3 mb-10">
                                    ${s.tech.map(le=>`<span class="text-[10px] bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-600 uppercase tracking-widest">${le}</span>`).join("")}
                                </div>
                                <a href="#" class="inline-flex items-center gap-2 text-black font-black text-sm uppercase tracking-widest border-b-2 border-black pb-1 hover:gap-4 transition-all">
                                    View Repository <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>`}).join("")}
                </div>
            </div>

            <!-- CTA -->
            <div class="portfolio-section bg-black text-white py-40 px-12 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
                <div class="max-w-4xl mx-auto text-center relative z-10">
                    <h2 class="text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">Let's build<br>the future.</h2>
                    <p class="text-xl text-white/40 mb-16 max-w-xl mx-auto font-medium">Have a vision for a project? Let's turn it into reality with cutting-edge tech and elite design.</p>
                    <div class="flex gap-6 justify-center flex-wrap">
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="px-12 py-6 bg-white text-black rounded-3xl font-black hover:scale-110 transition-transform text-lg pulse-btn">
                            Get In Touch
                        </a>
                        ${n?`<a href="https://${n.replace("https://","")}" target="_blank" class="px-12 py-6 border-2 border-white/20 rounded-3xl font-black hover:bg-white/10 transition-all text-lg">
                            LinkedIn
                        </a>`:""}
                    </div>
                    <div class="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
                        <p class="text-xs font-bold uppercase tracking-widest">© ${new Date().getFullYear()} ${a}</p>
                        <div class="flex gap-10">
                            ${d?`<a href="https://github.com/${d}" class="hover:text-white transition-colors"><i class="fab fa-github fa-lg"></i></a>`:""}
                            ${n?`<a href="https://${n.replace("https://","")}" class="hover:text-white transition-colors"><i class="fab fa-linkedin fa-lg"></i></a>`:""}
                        </div>
                    </div>
                </div>
            </div>
        </div>`}else if(x==="creative")w=`
        <div class="portfolio-root text-white min-h-screen pb-20" style="background:linear-gradient(135deg,#06060F 0%,#0E0720 50%,#06060F 100%); --accent: ${E}; ${I}">
            <!-- Ambient blobs -->
            <div class="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(0,217,255,0.08),transparent 70%);transform:translate(-30%,-30%)"></div>
            <div class="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%);transform:translate(30%,30%)"></div>
            
            <!-- HERO -->
            <div class="portfolio-hero relative px-10 pt-20 pb-10">
                <!-- Huge name in background -->
                <div class="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
                    <span class="text-[100px] font-black tracking-tighter opacity-[0.03] leading-none" style="font-family:'Clash Display',sans-serif">${a.split(" ")[0]}</span>
                </div>
                
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-12">
                        <div>
                            <div class="flex items-center gap-2 mb-6">
                                <span class="w-8 h-px bg-accent/60"></span>
                                <span class="text-accent/80 text-xs tracking-[0.3em] uppercase">${g}</span>
                            </div>
                            <h1 class="font-black leading-none tracking-tighter" style="font-size:clamp(3rem,7vw,5.5rem);font-family:'Clash Display',sans-serif">
                                ${a.split(" ")[0]}<br>
                                <span style="color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.2)">${a.split(" ").slice(1).join(" ")||"&nbsp;"}</span>
                            </h1>
                        </div>
                        <!-- Avatar circle -->
                        <div class="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(0,217,255,0.2)] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-accent/20 to-purple-500/20">
                            ${k}
                        </div>
                    </div>
                    
                    <p class="text-2xl text-white/50 max-w-xl leading-relaxed font-light mb-10">${e}</p>
                    
                    <div class="flex gap-4">
                        <a href="#creative-work" class="px-7 py-3.5 rounded-full border border-accent/50 text-accent font-semibold hover:bg-accent hover:text-black transition-all text-sm">
                            Explore Work ↓
                        </a>
                        ${d?`<a href="https://github.com/${d.replace(/^.*github\.com\//,"")}" target="_blank" class="px-7 py-3.5 rounded-full border border-white/10 font-semibold hover:bg-white/5 transition-all text-sm text-white/50">
                            GitHub
                        </a>`:""}
                    </div>
                </div>
            </div>

            <!-- MAIN IMAGE COLLAGE -->
            <div class="grid grid-cols-3 gap-4 px-10 py-8 h-[400px]">
                <div class="col-span-2 rounded-[30px] overflow-hidden relative bg-black/50">
                    <img src="${T}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="${a}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex-1 rounded-[30px] overflow-hidden" style="background:linear-gradient(135deg,rgba(0,217,255,0.15),rgba(139,92,246,0.15));backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08)">
                        <div class="h-full flex flex-col justify-between p-6">
                            <span class="text-5xl font-black opacity-10 font-mono">{ }</span>
                            <div>
                                <div class="text-xs text-white/40 uppercase tracking-widest mb-1">Stack</div>
                                <div class="text-white/80 text-sm font-medium">${i.slice(0,3).join(" · ")}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 rounded-[30px] overflow-hidden relative bg-purple-900/50">
                        <img src="./images/project-4.svg" class="w-full h-full object-cover opacity-60" alt="Projects">
                        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4 text-sm font-bold">${o.length} Projects</div>
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
                    ${i.map((l,n)=>{const c=["rgba(0,217,255,0.15)","rgba(139,92,246,0.15)","rgba(236,72,153,0.15)","rgba(34,197,94,0.15)"],s=["rgba(0,217,255,0.3)","rgba(139,92,246,0.3)","rgba(236,72,153,0.3)","rgba(34,197,94,0.3)"],m=c[n%4],h=s[n%4];return`<span class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default" style="background:${m};border:1px solid ${h}">
                            ${q(l)} ${l}
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
                    ${o.map((l,n)=>`
                        <div class="group relative overflow-hidden rounded-[30px] border border-white/5 hover:border-white/15 transition-all duration-700" style="background:rgba(255,255,255,0.025)">
                            <div class="grid grid-cols-5 gap-0 h-56">
                                <!-- Image -->
                                <div class="col-span-3 overflow-hidden">
                                    <img src="${`./images/project-${n%4+1}.svg`}" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" alt="${l.title}">
                                </div>
                                <!-- Info -->
                                <div class="col-span-2 p-7 flex flex-col justify-between">
                                    <div>
                                        <div class="text-accent font-mono text-sm mb-3">0${n+1} /</div>
                                        <h3 class="text-2xl font-bold mb-3 leading-tight group-hover:text-accent transition-colors" style="font-family:'Clash Display',sans-serif">${l.title}</h3>
                                        <p class="text-white/40 text-sm leading-relaxed">${l.description}</p>
                                    </div>
                                    <div class="flex gap-2 flex-wrap">
                                        ${l.tech.map(s=>`<span class="text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/50">${s}</span>`).join("")}
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
                    <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,217,255,0.3)]" style="background:linear-gradient(135deg,#00D9FF,#818CF8);color:#000">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Get In Touch
                    </a>
                    <p class="text-white/15 text-xs mt-12">© ${new Date().getFullYear()} ${a} · AI Portfolio Pro</p>
                </div>
            </div>
        </div>`;else if(x==="minimal"){const l=((R=document.getElementById("photo-url"))==null?void 0:R.value)||p.photoUrl||"",n=((N=document.getElementById("linkedin"))==null?void 0:N.value)||"";w=`
        <div class="portfolio-root font-sans bg-white text-zinc-900 min-h-screen px-6 py-12 md:px-20 md:py-32" style="--accent: ${E}; ${I}">
            <div class="max-w-3xl mx-auto">
                <!-- Header -->
                <header class="portfolio-hero mb-24">
                    <div class="flex items-center gap-8 mb-12">
                        ${l?`<div class="w-24 h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="${l}" class="w-full h-full object-cover" alt="${a}">
                             </div>`:`<div class="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-3xl font-light">
                                ${k}
                             </div>`}
                        <div>
                            <h1 class="text-4xl font-light tracking-tight mb-2 hero-title-typing">${a}</h1>
                            <p class="text-zinc-400 text-lg uppercase tracking-widest font-medium">${g}</p>
                        </div>
                    </div>
                    <p class="text-2xl text-zinc-500 leading-relaxed font-light mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${e}</p>
                    <div class="flex gap-8 animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">Email</a>
                        ${d?`<a href="https://github.com/${d.replace(/^.*github\.com\//,"")}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">GitHub</a>`:""}
                        ${n?`<a href="https://${n.replace("https://","")}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>`:""}
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
                        ${o.map((c,s)=>`
                        <div class="group">
                            <div class="flex justify-between items-baseline mb-4">
                                <h3 class="text-2xl font-light group-hover:text-black transition-colors">${c.title}</h3>
                                <span class="text-[10px] items-center text-zinc-200 font-mono tracking-tighter">0${s+1}</span>
                            </div>
                            <p class="text-zinc-500 mb-6 leading-relaxed max-w-xl">${c.description}</p>
                            <div class="flex gap-4">
                                ${c.tech.map(m=>`<span class="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">${m}</span>`).join('<span class="text-zinc-200">/</span>')}
                            </div>
                        </div>`).join("")}
                    </div>
                </section>

                <!-- Footer -->
                <footer class="portfolio-section pt-12 border-t border-zinc-100 flex justify-between items-center">
                    <p class="text-[10px] text-zinc-300 uppercase tracking-widest">© ${new Date().getFullYear()} ${a}</p>
                    <div class="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">A+</div>
                </footer>
            </div>
        </div>`}if(x==="resume"){const l=((W=document.getElementById("photo-url"))==null?void 0:W.value)||p.photoUrl||"",n=((Y=document.getElementById("linkedin"))==null?void 0:Y.value)||"",c=p.experience||[];w=`
        <div class="portfolio-root font-serif bg-[#fdfdfd] text-[#222] min-h-screen p-8 md:p-16" style="--accent: ${E}; ${I}">
            <div class="max-w-4xl mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-zinc-100 p-10 md:p-20 relative animate-fade-in">
                <!-- Decor Line -->
                <div class="absolute top-0 left-0 w-full h-1.5 bg-zinc-900"></div>
                
                <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div class="portfolio-hero">
                        <h1 class="text-5xl font-black tracking-tight mb-4 hero-title-typing">${a}</h1>
                        <p class="text-xl text-zinc-500 font-sans italic mb-8">${g}</p>
                        <div class="flex gap-6 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                            ${d?`<a href="https://github.com/${d.replace(/^.*github\.com\//,"")}" class="hover:text-black">GitHub</a>`:""}
                            ${n?`<a href="https://${n.replace("https://","")}" class="hover:text-black">LinkedIn</a>`:""}
                            <a href="mailto:hello@${a.toLowerCase().replace(/\s/g,"")}.dev" class="hover:text-black">Email</a>
                        </div>
                    </div>
                    ${l?`<div class="w-32 h-32 border-4 border-white shadow-xl rotate-2 shrink-0 overflow-hidden">
                            <img src="${l}" class="w-full h-full object-cover grayscale" alt="${a}">
                         </div>`:`<div class="w-32 h-32 bg-zinc-50 border border-zinc-100 shrink-0 flex items-center justify-center text-zinc-200 text-3xl font-bold">
                            ${k}
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
                                ${c.map(s=>{const[m,h]=s.split(" at ");return`
                                    <div class="relative pl-6 border-l border-zinc-100">
                                        <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-200"></div>
                                        <h3 class="text-xl font-bold">${m}</h3>
                                        <p class="text-zinc-500 italic mb-2">${h||""}</p>
                                    </div>`}).join("")}
                                ${c.length===0?'<p class="text-zinc-400 italic">Experience details coming soon...</p>':""}
                            </div>
                        </section>

                        <section class="portfolio-section">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Work Samples</h2>
                            <div class="space-y-8">
                                ${o.map(s=>`
                                <div>
                                    <h3 class="font-bold underline italic text-lg decoration-zinc-200 underline-offset-4 mb-2">${s.title}</h3>
                                    <p class="text-zinc-600 text-sm leading-relaxed">${s.description}</p>
                                </div>`).join("")}
                            </div>
                        </section>
                    </div>

                    <div class="md:col-span-1 font-sans">
                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Expertise</h2>
                            <div class="flex flex-wrap gap-2">
                                ${i.map(s=>`<span class="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500">${s}</span>`).join("")}
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
        </div>`}if(x==="bold"){const l=E;w=`
        <div class="portfolio-root" style="background:#000;color:#fff;min-height:100vh;${I}">
            <!-- HERO BANNER -->
            <div class="portfolio-hero" style="padding:0;position:relative;overflow:hidden">
                <div style="background:${l};padding:48px 48px 64px;min-height:300px;display:grid;grid-template-columns:1fr auto;gap:32px;align-items:end">
                    <div>
                        <div style="font-size:0.7rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,0,0,0.5);margin-bottom:12px">${g}</div>
                        <h1 style="font-size:clamp(3rem,8vw,6rem);font-weight:900;line-height:0.9;color:#000;letter-spacing:-4px;margin-bottom:0">${a}</h1>
                    </div>
                    <div style="text-align:right">
                        <div style="width:80px;height:80px;background:#000;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900;color:${l}">${k}</div>
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
                    ${d?`<a href="https://github.com/${d}" target="_blank" style="margin-top:24px;display:inline-flex;align-items:center;gap:8px;color:${l};font-size:0.8rem;font-weight:700;text-decoration:none">View GitHub ↗</a>`:""}
                </div>
                <!-- Skills -->
                <div class="portfolio-section" style="padding:48px">
                    <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:24px">Expertise</div>
                    <div style="display:flex;flex-direction:column;gap:12px">
                        ${i.map(n=>`
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #1a1a1a">
                            <span style="font-size:0.9rem;font-weight:700;color:#fff">${n}</span>
                            <div style="width:60px;height:3px;background:#222;border-radius:2px;overflow:hidden">
                                <div style="width:${Math.floor(Math.random()*30+70)}%;height:100%;background:${l};border-radius:2px"></div>
                            </div>
                        </div>`).join("")}
                    </div>
                </div>
            </div>

            <!-- PROJECTS GRID -->
            <div class="portfolio-section" style="padding:48px;border-top:1px solid #222">
                <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:32px">Selected Work</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2px">
                    ${o.map((n,c)=>{const s=[l,"#1a1a1a","#111","#0a0a0a"],m=c===0?"#000":"#fff";return`
                    <div class="card-hover" style="background:${s[c%s.length]};padding:40px 32px;cursor:default">
                        <div style="font-size:2rem;font-weight:900;color:${c===0?"rgba(0,0,0,0.15)":"rgba(255,255,255,0.06)"};font-family:monospace;margin-bottom:24px">0${c+1}</div>
                        <h3 style="font-size:1.4rem;font-weight:900;color:${m};letter-spacing:-1px;margin-bottom:12px">${n.title}</h3>
                        <p style="font-size:0.8rem;color:${c===0?"rgba(0,0,0,0.65)":"#666"};line-height:1.6;margin-bottom:20px;font-family:'Inter',sans-serif">${n.description}</p>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                            ${n.tech.map(h=>`<span style="font-size:0.65rem;padding:3px 10px;background:${c===0?"rgba(0,0,0,0.15)":"rgba(255,255,255,0.08)"};border-radius:20px;color:${c===0?"rgba(0,0,0,0.7)":"#888"};font-weight:700">${h}</span>`).join("")}
                        </div>
                    </div>`}).join("")}
                </div>
            </div>

            <!-- FOOTER -->
            <div style="background:${l};padding:40px 48px;display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:1.5rem;font-weight:900;color:#000;letter-spacing:-1px">${a}</span>
                ${L!=null&&L.email?`<a href="mailto:${L.email}" style="color:#000;font-weight:700;text-decoration:none;font-size:0.85rem">${L.email}</a>`:`<span style="color:rgba(0,0,0,0.5);font-size:0.8rem">© ${new Date().getFullYear()}</span>`}
            </div>
        </div>`}u.innerHTML=w,f.dataset.userEdited="",f.value=w,requestAnimationFrame(be),u.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener("click",function(n){n.preventDefault();const c=this.getAttribute("href").substring(1),s=u.querySelector("#"+c);if(s){const m=u.getBoundingClientRect().top,z=s.getBoundingClientRect().top-m;u.scrollBy({top:z,behavior:"smooth"})}})})}v.addEventListener("click",async()=>{if(!p||!b){b||alert("You must be logged in to save portfolios.");return}const e=f.dataset.userEdited==="true"&&f.value?f.value:u.innerHTML;let t=prompt("Name this portfolio version:","My Portfolio");if(!t)return;const i=v.innerHTML;v.innerHTML="Saving...",v.disabled=!0;try{const{data:o,error:r}=await y.from("saved_portfolios").insert([{user_id:b.id,name:t,html_content:e}]).select();if(r)throw r;f.dataset.userEdited="",X=[o[0],...X],renderSavedPortfoliosList(),v.innerHTML='<i class="fas fa-check"></i> Saved!',v.classList.add("text-green-400"),setTimeout(()=>{v.innerHTML=i,v.classList.remove("text-green-400"),v.disabled=!1},2e3)}catch(o){console.error("Error saving portfolio code:",o),alert("Failed to save portfolio. Please try again."),v.innerHTML=i,v.disabled=!1}});document.getElementById("download-btn").addEventListener("click",()=>{if(!p)return;const e=f.dataset.userEdited&&f.value?f.value:u.innerHTML,t=document.getElementById("name").value||"portfolio",i=`<!DOCTYPE html>
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
</html>`,o=new Blob([i],{type:"text/html"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=`${t.toLowerCase().replace(/\s/g,"-")}-portfolio.html`,a.click(),URL.revokeObjectURL(r)});document.getElementById("share-btn").addEventListener("click",async()=>{let e=(document.getElementById("name").value||"user").toLowerCase().replace(/\s/g,"-")+"-"+Math.random().toString(36).substring(2,6);if(b){const{data:t}=await y.from("users").select("username").match({id:b.id}).single();t&&t.username&&(e=t.username),await y.from("users").update({is_published:!0}).match({id:b.id})}alert(`🚀 Your portfolio is live at:
https://portfolio.ai/${e}

(Copy this link to share with anyone!)`)});document.getElementById("readme-btn").addEventListener("click",()=>{var S,A;if(!p)return;const e=document.getElementById("name").value||"Developer",t=document.getElementById("role").value||"Developer",i=document.getElementById("github").value||"",o=((S=document.getElementById("linkedin"))==null?void 0:S.value)||"",r=((A=document.getElementById("email"))==null?void 0:A.value)||"",{tagline:a,about:g,skills:d,projects:k}=p,T=d.map($=>`![${$}](https://img.shields.io/badge/${encodeURIComponent($)}-informational?style=flat&color=00D9FF)`).join(" "),M=k.map(($,R)=>`### ${R+1}. ${$.title}
${$.description}

**Tech:** ${$.tech.join(", ")}`).join(`

---

`),D=[i?`[🐙 GitHub](https://github.com/${i})`:null,o?`[💼 LinkedIn](https://${o.replace("https://","")})`:null,r?`[📧 Email](mailto:${r})`:null].filter(Boolean).join(" · "),I=`<div align="center">

# 👋 Hi, I'm ${e}

### ${t}

*${a}*

${D}

</div>

---

## 🙋 About Me

${g}

---

## 🛠️ Skills & Technologies

${T}

---

## 🚀 Featured Projects

${M}

---

<div align="center">

*Built with [AI Portfolio Pro](https://github.com/ai-portfolio-pro)*

</div>
`,w=new Blob([I],{type:"text/markdown"}),H=URL.createObjectURL(w),B=document.createElement("a");B.href=H,B.download="README.md",B.click(),URL.revokeObjectURL(H)});
