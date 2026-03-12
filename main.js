import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- CONFIGURATION ---
// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://mkuzksoyetgxjsycfnnx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- AUTH CHECK ---// Call this on load to check if user is returning
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        currentUser = user;
        console.log('User signed in:', user.email);
        
        // Unhide the My Portfolios panel layout (it will just be empty if no saves)
        myPortfoliosPanel.classList.remove('hidden');
        loadSavedPortfolios();
        
        // Auto-fill some form data if they have a saved profile
        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profile) {
            if(profile.name) document.getElementById('name').value = profile.name;
            if(profile.title) document.getElementById('role').value = profile.title;
            if(profile.github_url) document.getElementById('github').value = profile.github_url;
            
            // Also enable the save/publish buttons
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    } else {
        // If no user and not guest, redirect to login
        if (localStorage.getItem('guestMode') !== 'true') {
            window.location.href = './login.html';
        } else {
            // Guest mode
            console.log("Running in Ghost Mode (Guest)");
            myPortfoliosPanel.classList.add('hidden'); // Ensure hidden for guests
        }
    }
}
checkUser();

// --- STATE MANAGEMENT ---
let currentStep = 1;
let currentTheme = 'developer';
let currentAccentColor = '#00D9FF';
let currentFont = 'clash';
let generatedContent = null;
let currentUser = null;

// --- PREPARE USER ---
async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user;
}
fetchUser();

// --- DOM ELEMENTS ---
const portfolioForm = document.getElementById('portfolio-form');
const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4')
];
const nextBtns = document.querySelectorAll('.next-step');
const prevBtns = document.querySelectorAll('.prev-step');
const indicators = document.querySelectorAll('.step-indicator');
const statusContainer = document.getElementById('status-container');
const previewEmpty = document.getElementById('preview-empty');
const previewContent = document.getElementById('preview-content');
const themeButtons = document.querySelectorAll('#theme-selector button');

// --- CODE EDITOR ELEMENTS ---
const tabPreview = document.getElementById('tab-preview');
const tabCode = document.getElementById('tab-code');
const previewFrame = document.getElementById('preview-frame');
const codeEditorPane = document.getElementById('code-editor-pane');
const codeEditor = document.getElementById('code-editor');
const copyCodeBtn = document.getElementById('copy-code-btn');
const codeInfo = document.getElementById('code-info');
const previewLabel = document.getElementById('preview-label');

// --- SAVED PORTFOLIOS ELEMENTS ---
const myPortfoliosPanel = document.getElementById('my-portfolios-panel');
const portfoliosCount = document.getElementById('portfolios-count');
const portfoliosList = document.getElementById('portfolios-list');
const saveBtn = document.getElementById('save-btn');
let savedPortfolios = [];

// --- COLOR & FONT PICKERS ---
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentAccentColor = swatch.dataset.color;
        document.documentElement.style.setProperty('--accent', currentAccentColor);
        // update any existing preview
        if (generatedContent) renderPortfolio();
    });
});

document.querySelectorAll('.font-option').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.font-option').forEach(b => {
            b.classList.remove('border-accent/50', 'bg-accent/10', 'text-accent');
            b.classList.add('border-white/10', 'bg-white/5');
        });
        btn.classList.add('border-accent/50', 'bg-accent/10', 'text-accent');
        btn.classList.remove('border-white/10', 'bg-white/5');
        currentFont = btn.dataset.font;
        if (generatedContent) renderPortfolio();
    });
});

// --- SCROLL REVEAL (Intersection Observer) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));



// --- TAB SWITCHING ---
function switchToPreview() {
    tabPreview.classList.add('bg-accent', 'text-black');
    tabPreview.classList.remove('text-white/40', 'hover:text-white');
    tabCode.classList.remove('bg-accent', 'text-black');
    tabCode.classList.add('text-white/40', 'hover:text-white');
    previewFrame.classList.remove('hidden');
    codeEditorPane.classList.add('hidden');
    codeEditorPane.classList.remove('flex');
    copyCodeBtn.classList.add('hidden');
    copyCodeBtn.classList.remove('flex');
    codeInfo.classList.add('hidden');
    previewLabel.classList.remove('hidden');
}

function switchToCode() {
    tabCode.classList.add('bg-accent', 'text-black');
    tabCode.classList.remove('text-white/40', 'hover:text-white');
    tabPreview.classList.remove('bg-accent', 'text-black');
    tabPreview.classList.add('text-white/40', 'hover:text-white');
    previewFrame.classList.add('hidden');
    codeEditorPane.classList.remove('hidden');
    codeEditorPane.classList.add('flex');
    copyCodeBtn.classList.remove('hidden');
    copyCodeBtn.classList.add('flex');
    codeInfo.classList.remove('hidden');
    previewLabel.classList.add('hidden');
    // Sync editor with current preview HTML
    if (generatedContent && !codeEditor.dataset.userEdited) {
        codeEditor.value = previewContent.innerHTML;
    }
}

tabPreview.addEventListener('click', switchToPreview);
tabCode.addEventListener('click', switchToCode);

// Live preview update FROM code editor
codeEditor.addEventListener('input', () => {
    codeEditor.dataset.userEdited = 'true';
    previewContent.innerHTML = codeEditor.value;
    previewContent.classList.remove('opacity-20', 'pointer-events-none', 'select-none');
    previewEmpty.classList.add('hidden');
});

// Copy code button
copyCodeBtn.addEventListener('click', async () => {
    const content = codeEditor.value || previewContent.innerHTML;
    if (!content) return;
    try {
        await navigator.clipboard.writeText(content);
        const span = copyCodeBtn.querySelector('span');
        span.textContent = 'Copied!';
        copyCodeBtn.classList.add('border-accent/50', 'text-accent');
        setTimeout(() => {
            span.textContent = 'Copy';
            copyCodeBtn.classList.remove('border-accent/50', 'text-accent');
        }, 2000);
    } catch (e) {
        alert('Could not copy: ' + e.message);
    }
});

// Unsaved changes warning
window.addEventListener('beforeunload', (e) => {
    if (codeEditor.dataset.userEdited === 'true' && generatedContent) {
        const message = 'You have unsaved changes to your portfolio code. Are you sure you want to leave?';
        e.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
    }
});

// --- FORM NAVIGATION ---
function updateSteps() {
    steps.forEach((step, idx) => {
        if (idx + 1 === currentStep) {
            step.classList.remove('hidden');
            step.classList.add('animate-fade-in');
        } else {
            step.classList.add('hidden');
        }
    });

    indicators.forEach((indicator, idx) => {
        if (idx + 1 <= currentStep) {
            indicator.classList.remove('bg-white/10');
            indicator.classList.add('bg-accent');
        } else {
            indicator.classList.add('bg-white/10');
            indicator.classList.remove('bg-accent');
        }
    });
}

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep < steps.length) {
            currentStep++;
            updateSteps();
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateSteps();
        }
    });
});

// --- AI GENERATION ---
portfolioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        taglineInput: document.getElementById('tagline-input')?.value || '',
        skills: document.getElementById('skills').value,
        projects: document.getElementById('projects').value,
        github: document.getElementById('github').value,
        email: document.getElementById('email')?.value || '',
        linkedin: document.getElementById('linkedin')?.value || '',
        accentColor: currentAccentColor,
        font: currentFont,
    };

    // Show loading state
    statusContainer.classList.remove('hidden');
    portfolioForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        // Call Supabase Edge Function
        // Note: You must deploy the function first: 'supabase functions deploy generate-portfolio'
        const { data, error } = await supabase.functions.invoke('generate-portfolio', {
            body: formData
        });

        if (error) {
            console.warn('Edge Function failed or key missing. Falling back to Demo Mode.');
            generatedContent = getDemoData(formData);
        } else {
            generatedContent = data;
        }

        renderPortfolio();

        // Save to database asynchronously (don't block the UI)
        savePortfolioToDatabase(formData, generatedContent);

        // Show success / enable buttons
        document.getElementById('download-btn').disabled = false;
        document.getElementById('download-btn').classList.remove('opacity-40', 'cursor-not-allowed');
        document.getElementById('readme-btn').disabled = false;
        document.getElementById('readme-btn').classList.remove('opacity-40', 'cursor-not-allowed');
        document.getElementById('share-btn').disabled = false;
        document.getElementById('share-btn').classList.remove('opacity-40', 'cursor-not-allowed');
        if (currentUser) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-40', 'cursor-not-allowed');
        }

    } catch (err) {
        console.warn('AI Generation trigger failed. Falling back to Demo Mode.');
        generatedContent = getDemoData(formData);
        renderPortfolio();
    } finally {
        statusContainer.classList.add('hidden');
        portfolioForm.classList.remove('opacity-50', 'pointer-events-none');
    }
});

// --- DATABASE SAVING LOGIC ---
async function savePortfolioToDatabase(formData, content) {
    // Always re-fetch the user at the moment of saving to avoid race conditions
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        console.log('No authenticated user — skipping database save (guest mode).');
        return;
    }

    try {
        console.log('Saving portfolio to Supabase for user:', user.id);
        const userId = user.id;

        // 1. Upsert User Profile
        // Generate a slug-style username from the person's name as a safe fallback
        const username = formData.name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '') + '_' + userId.slice(0, 6);
        const { error: userError } = await supabase
            .from('users')
            .upsert({
                id: userId,
                username: username,
                name: formData.name,
                title: formData.role,
                bio: content.about,
                github_url: formData.github || null,
                selected_template: currentTheme
            }, { onConflict: 'id' });
            
        if (userError) { console.error('User upsert error:', userError.message); return; }
        console.log('✅ User profile saved.');

    } catch (err) {
        console.error('Failed to save portfolio to database:', err.message);
    }
}

// --- DEMO DATA FALLBACK ---
function getDemoData(info) {
    const skillList = info.skills.split(',').map(s => s.trim()).filter(Boolean);
    const projectList = (info.projects || 'Awesome Project, NextGen App').split(',').map(p => p.trim()).filter(Boolean);
    return {
        tagline: `Crafting high-performance ${info.role} experiences with precision & creative flair.`,
        about: `I'm a passionate ${info.role} who transforms complex challenges into elegant, user-centric solutions. With deep expertise in ${skillList.slice(0, 3).join(', ')}, I build scalable products that people love. I care deeply about clean code, great design, and shipping fast.`,
        skills: skillList,
        github: info.github || '',
        projects: projectList.map((p, i) => ({
            title: p,
            description: `A modern, production-grade platform built to deliver an exceptional user experience. Focused on performance, accessibility, and beautiful design.`,
            tech: skillList.slice(0, 3),
            color: ['#00D9FF', '#6C63FF', '#FF6584', '#43D9AD'][i % 4]
        }))
    };
}

// --- IMAGE HELPER ---
// Uses picsum.photos which is always reliable, seeded by text for consistency
function getImg(seed, w = 800, h = 500) {
    const num = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 1000;
    return `https://picsum.photos/seed/${num}/${w}/${h}`;
}

// --- SKILL ICON MAP ---
function getSkillIcon(skill) {
    const icons = {
        'html': '🌐', 'css': '🎨', 'javascript': '⚡', 'js': '⚡',
        'typescript': '📘', 'ts': '📘', 'react': '⚛️', 'vue': '💚',
        'angular': '🔴', 'node': '🟢', 'nodejs': '🟢', 'python': '🐍',
        'java': '☕', 'php': '🐘', 'go': '🐹', 'rust': '🦀',
        'swift': '🍎', 'kotlin': '🟣', 'flutter': '💙', 'dart': '🎯',
        'supabase': '⚡', 'firebase': '🔥', 'aws': '☁️', 'docker': '🐳',
        'git': '📦', 'figma': '🎭', 'tailwind': '💨', 'next': '▲',
        'nextjs': '▲', 'mongodb': '🍃', 'sql': '🗄️', 'mysql': '🗄️',
        'postgres': '🐘', 'postgresql': '🐘', 'graphql': '🔷', 'redux': '🟣',
        'express': '🚂', 'django': '🎸', 'rails': '💎', 'laravel': '🔴'
    };
    const key = skill.toLowerCase().replace(/[^a-z]/g, '');
    return icons[key] || '🔧';
}

// --- GSAP ANIMATION HELPER ---
function animatePortfolio() {
    if (typeof gsap === 'undefined') return;
    gsap.fromTo('#preview-content .portfolio-hero',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );
    gsap.fromTo('#preview-content .portfolio-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.2 }
    );
    // Animate skill bars
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.dataset.width || '80%';
        gsap.fromTo(bar, { width: '0%' }, { width: target, duration: 1, ease: 'power2.out', delay: 0.5 });
    });
}

// --- THEME ENGINE ---
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Theme button clicked:', btn.dataset.theme);

        // Update button visual states
        themeButtons.forEach(b => {
            b.classList.remove('bg-accent', 'text-black');
            b.classList.add('hover:bg-white/5');
        });

        btn.classList.add('bg-accent', 'text-black');
        btn.classList.remove('hover:bg-white/5');

        // Update state
        currentTheme = btn.dataset.theme;

        // Provide immediate visual feedback even if no content is generated
        if (!generatedContent) {
            const emptyTitle = document.querySelector('#preview-empty h3');
            if (emptyTitle) {
                emptyTitle.innerHTML = `AI Portfolio Ready <span class="text-accent text-sm block mt-2 font-mono">Theme: ${currentTheme}</span>`;
            }
        } else {
            renderPortfolio();
            // Upate the database with the new theme
            if (currentUser && document.getElementById('name').value) {
                supabase.from('users').update({ selected_template: currentTheme }).match({ id: currentUser.id }).then(() => {
                    console.log('Theme saved to DB');
                });
            }
        }

        console.log('Current theme set to:', currentTheme);
    });
});

// --- RENDER ENGINE ---
function renderPortfolio() {
    if (!generatedContent) return;

    previewEmpty.classList.add('hidden');
    previewContent.classList.remove('hidden', 'opacity-20', 'pointer-events-none');
    previewContent.innerHTML = '';
    previewContent.classList.add('select-text');

    const { tagline, about, skills, projects, github } = generatedContent;
    const name = document.getElementById('name').value || 'Your Name';
    const role = document.getElementById('role').value || 'Developer';
    const githubUser = document.getElementById('github').value || github || '';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const heroImg = './images/hero.svg';

    // Skill widths: randomly between 70-98%
    function skillWidth(s) {
        const n = s.split('').reduce((a, c) => a + c.charCodeAt(0), 42) % 29 + 70;
        return n + '%';
    }

    let html = '';

    // ═══════════════════════════════════════════════
    // DEVELOPER THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'developer') {
        html = `
        <div class="portfolio-root font-mono text-white bg-[#070710] min-h-screen">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden">
                <!-- Background image with overlay -->
                <div class="absolute inset-0">
                    <img src="${heroImg}" class="w-full h-full object-cover opacity-10" alt="hero">
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
                            ${initials}
                        </div>
                        <div>
                            <div class="text-white/40 text-sm mb-1 tracking-widest uppercase">${role}</div>
                            <h1 class="text-5xl font-bold leading-none tracking-tight" style="font-family:'Clash Display',monospace">
                                <span style="background:linear-gradient(120deg,#00D9FF,#818CF8,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${name}</span>
                            </h1>
                        </div>
                    </div>
                    
                    <!-- Tagline -->
                    <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">${tagline}</p>
                    
                    <!-- CTA Row -->
                    <div class="flex gap-4 flex-wrap">
                        <a href="#projects" class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_25px_rgba(0,217,255,0.4)] text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            View My Work
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all text-sm text-white/70">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            GitHub
                        </a>` : ''}
                    </div>
                </div>
            </div>

            <!-- ABOUT -->
            <div class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>About
                </h2>
                <p class="text-lg text-white/60 leading-[1.9] max-w-3xl">${about}</p>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Technologies
                </h2>
                <div class="space-y-5 max-w-2xl">
                    ${skills.map(s => {
            const w = skillWidth(s);
            return `
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-white/80 flex items-center gap-2">
                                    <span>${getSkillIcon(s)}</span> ${s}
                                </span>
                                <span class="text-xs text-accent font-bold">${w}</span>
                            </div>
                            <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-blue-400" style="width:0%" data-width="${w}"></div>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="projects" class="portfolio-section px-10 py-12 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-10 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Selected Work
                </h2>
                <div class="grid grid-cols-1 gap-6">
                    ${projects.map((p, i) => {
            const img = `./images/project-${(i % 4) + 1}.svg`;
            return `
                        <div class="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]">
                            <!-- Image -->
                            <div class="h-52 overflow-hidden relative">
                                <img src="${img}" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700" alt="${p.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#070710] via-transparent to-transparent"></div>
                                <!-- Number badge -->
                                <div class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xs font-bold text-accent">
                                    0${i + 1}
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2 group-hover:text-accent transition-colors">${p.title}</h3>
                                <p class="text-sm text-white/50 mb-5 leading-relaxed">${p.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex gap-2 flex-wrap">
                                        ${p.tech.map(t => `<span class="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/50 hover:border-accent/40 hover:text-accent transition-all">${t}</span>`).join('')}
                                    </div>
                                    ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="text-white/30 hover:text-accent transition-colors">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>` : ''}
                                </div>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- CONTACT / FOOTER -->
            <div class="portfolio-section px-10 py-14 border-t border-white/5 text-center">
                <div class="max-w-xl mx-auto">
                    <div class="text-4xl mb-4">🚀</div>
                    <h2 class="text-3xl font-bold mb-4 font-clash">Let's work together</h2>
                    <p class="text-white/40 mb-8 leading-relaxed">I'm currently open to new opportunities. Whether you have a project in mind or just want to say hello — my inbox is always open.</p>
                    <div class="flex gap-4 justify-center flex-wrap">
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent/50 hover:text-accent transition-all text-sm text-white/60">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            @${githubUser.replace(/^.*github\.com\//, '')}
                        </a>` : ''}
                        <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="inline-flex items-center gap-2 px-5 py-3 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            Say Hello
                        </a>
                    </div>
                    <p class="text-white/20 text-xs mt-10">Built with AI Portfolio Pro · ${new Date().getFullYear()}</p>
                </div>
            </div>
        </div>`;

        // ═══════════════════════════════════════════════
        // STARTUP THEME
        // ═══════════════════════════════════════════════
    } else if (currentTheme === 'startup') {
        html = `
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
                            ${initials}
                        </div>
                    </div>
                    
                    <h1 class="text-7xl font-black tracking-tighter leading-none mb-4">${name}</h1>
                    <div class="text-2xl text-slate-400 font-medium mb-6">${role}</div>
                    <p class="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">${tagline}</p>
                    
                    <div class="flex gap-4 mb-16">
                        <a href="#work" class="px-7 py-4 bg-black text-white rounded-2xl font-bold hover:scale-[1.03] transition-transform shadow-xl shadow-black/20 text-sm">
                            View Work ↓
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="px-7 py-4 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-400 transition-colors text-sm text-slate-700">
                            GitHub
                        </a>` : ''}
                    </div>
                </div>
                
                <!-- Hero banner image -->
                <div class="relative h-[360px] overflow-hidden rounded-t-[40px] mx-auto max-w-5xl shadow-[0_-20px_60px_rgba(0,0,0,0.08)] bg-slate-100">
                    <img src="${heroImg}" class="w-full h-full object-cover" alt="${name}">
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
                        <p class="text-xl leading-relaxed text-slate-500">${about}</p>
                    </div>
                </div>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section bg-slate-50 py-16">
                <div class="max-w-4xl mx-auto px-12">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-8">Skills & Tools</div>
                    <div class="flex flex-wrap gap-3">
                        ${skills.map(s => `
                        <div class="flex items-center gap-2 bg-white text-slate-700 px-5 py-3 rounded-2xl font-semibold text-sm shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
                            <span>${getSkillIcon(s)}</span> ${s}
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="work" class="portfolio-section max-w-4xl mx-auto px-12 py-20">
                <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-12">Selected Work</div>
                <div class="space-y-16">
                    ${projects.map((p, i) => {
            const img = `./images/project-${(i % 4) + 1}.svg`;
            return `
                        <div class="group">
                            <div class="aspect-video w-full overflow-hidden rounded-[30px] mb-8 shadow-xl shadow-slate-200/80 bg-slate-100">
                                <img src="${img}" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" alt="${p.title}">
                            </div>
                            <div class="flex items-start justify-between gap-8">
                                <div>
                                    <div class="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Project 0${i + 1}</div>
                                    <h3 class="text-3xl font-black tracking-tight mb-3">${p.title}</h3>
                                    <p class="text-slate-500 text-lg leading-relaxed max-w-xl">${p.description}</p>
                                </div>
                                <div class="flex flex-col gap-2 flex-shrink-0">
                                    ${p.tech.map(t => `<span class="text-[10px] bg-slate-100 px-3 py-1.5 rounded-lg font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">${t}</span>`).join('')}
                                </div>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- CONTACT -->
            <div class="portfolio-section bg-black text-white py-24 px-12">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Contact</div>
                    <h2 class="text-6xl font-black tracking-tighter mb-6">Let's create<br>something great.</h2>
                    <p class="text-xl text-white/40 mb-12 max-w-lg mx-auto">Open to freelance projects, full-time roles, and creative collaborations.</p>
                    <div class="flex gap-4 justify-center flex-wrap">
                        <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-transform text-sm">
                            📧 Get In Touch
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="px-8 py-4 border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">
                            GitHub →
                        </a>` : ''}
                    </div>
                    <p class="text-white/20 text-xs mt-16">© ${new Date().getFullYear()} ${name} · Built with AI Portfolio Pro</p>
                </div>
            </div>
        </div>`;

        // ═══════════════════════════════════════════════
        // CREATIVE THEME
        // ═══════════════════════════════════════════════
    } else if (currentTheme === 'creative') {
        html = `
        <div class="portfolio-root text-white min-h-screen pb-20" style="background:linear-gradient(135deg,#06060F 0%,#0E0720 50%,#06060F 100%)">
            <!-- Ambient blobs -->
            <div class="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(0,217,255,0.08),transparent 70%);transform:translate(-30%,-30%)"></div>
            <div class="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style="background:radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%);transform:translate(30%,30%)"></div>
            
            <!-- HERO -->
            <div class="portfolio-hero relative px-10 pt-20 pb-10">
                <!-- Huge name in background -->
                <div class="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
                    <span class="text-[100px] font-black tracking-tighter opacity-[0.03] leading-none" style="font-family:'Clash Display',sans-serif">${name.split(' ')[0]}</span>
                </div>
                
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-12">
                        <div>
                            <div class="flex items-center gap-2 mb-6">
                                <span class="w-8 h-px bg-accent/60"></span>
                                <span class="text-accent/80 text-xs tracking-[0.3em] uppercase">${role}</span>
                            </div>
                            <h1 class="font-black leading-none tracking-tighter" style="font-size:clamp(3rem,7vw,5.5rem);font-family:'Clash Display',sans-serif">
                                ${name.split(' ')[0]}<br>
                                <span style="color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.2)">${name.split(' ').slice(1).join(' ') || '&nbsp;'}</span>
                            </h1>
                        </div>
                        <!-- Avatar circle -->
                        <div class="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(0,217,255,0.2)] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-accent/20 to-purple-500/20">
                            ${initials}
                        </div>
                    </div>
                    
                    <p class="text-2xl text-white/50 max-w-xl leading-relaxed font-light mb-10">${tagline}</p>
                    
                    <div class="flex gap-4">
                        <a href="#creative-work" class="px-7 py-3.5 rounded-full border border-accent/50 text-accent font-semibold hover:bg-accent hover:text-black transition-all text-sm">
                            Explore Work ↓
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="px-7 py-3.5 rounded-full border border-white/10 font-semibold hover:bg-white/5 transition-all text-sm text-white/50">
                            GitHub
                        </a>` : ''}
                    </div>
                </div>
            </div>

            <!-- MAIN IMAGE COLLAGE -->
            <div class="grid grid-cols-3 gap-4 px-10 py-8 h-[400px]">
                <div class="col-span-2 rounded-[30px] overflow-hidden relative bg-black/50">
                    <img src="${heroImg}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="${name}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex-1 rounded-[30px] overflow-hidden" style="background:linear-gradient(135deg,rgba(0,217,255,0.15),rgba(139,92,246,0.15));backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08)">
                        <div class="h-full flex flex-col justify-between p-6">
                            <span class="text-5xl font-black opacity-10 font-mono">{ }</span>
                            <div>
                                <div class="text-xs text-white/40 uppercase tracking-widest mb-1">Stack</div>
                                <div class="text-white/80 text-sm font-medium">${skills.slice(0, 3).join(' · ')}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 rounded-[30px] overflow-hidden relative bg-purple-900/50">
                        <img src="./images/project-4.svg" class="w-full h-full object-cover opacity-60" alt="Projects">
                        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4 text-sm font-bold">${projects.length} Projects</div>
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
                    ${about}
                </p>
            </div>

            <!-- SKILLS - pill cloud -->
            <div class="portfolio-section px-10 pb-16">
                <div class="flex items-start gap-4 mb-8">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">Expertise</span>
                </div>
                <div class="flex flex-wrap gap-3">
                    ${skills.map((s, i) => {
            const colors = ['rgba(0,217,255,0.15)', 'rgba(139,92,246,0.15)', 'rgba(236,72,153,0.15)', 'rgba(34,197,94,0.15)'];
            const borders = ['rgba(0,217,255,0.3)', 'rgba(139,92,246,0.3)', 'rgba(236,72,153,0.3)', 'rgba(34,197,94,0.3)'];
            const c = colors[i % 4];
            const b = borders[i % 4];
            return `<span class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default" style="background:${c};border:1px solid ${b}">
                            ${getSkillIcon(s)} ${s}
                        </span>`;
        }).join('')}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="creative-work" class="portfolio-section px-10 pb-10">
                <div class="flex items-start gap-4 mb-12">
                    <span class="w-10 h-px bg-white/20 mt-3 flex-shrink-0"></span>
                    <span class="text-[10px] uppercase tracking-[0.4em] text-white/30">Selected Projects</span>
                </div>
                <div class="space-y-6">
                    ${projects.map((p, i) => {
            const img = `./images/project-${(i % 4) + 1}.svg`;
            return `
                        <div class="group relative overflow-hidden rounded-[30px] border border-white/5 hover:border-white/15 transition-all duration-700" style="background:rgba(255,255,255,0.025)">
                            <div class="grid grid-cols-5 gap-0 h-56">
                                <!-- Image -->
                                <div class="col-span-3 overflow-hidden">
                                    <img src="${img}" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" alt="${p.title}">
                                </div>
                                <!-- Info -->
                                <div class="col-span-2 p-7 flex flex-col justify-between">
                                    <div>
                                        <div class="text-accent font-mono text-sm mb-3">0${i + 1} /</div>
                                        <h3 class="text-2xl font-bold mb-3 leading-tight group-hover:text-accent transition-colors" style="font-family:'Clash Display',sans-serif">${p.title}</h3>
                                        <p class="text-white/40 text-sm leading-relaxed">${p.description}</p>
                                    </div>
                                    <div class="flex gap-2 flex-wrap">
                                        ${p.tech.map(t => `<span class="text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/50">${t}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- FOOTER CTA -->
            <div class="portfolio-section px-10 py-20 text-center relative overflow-hidden">
                <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at center,rgba(0,217,255,0.06),transparent 70%)"></div>
                <div class="relative z-10">
                    <h2 class="font-black mb-6 leading-none" style="font-family:'Clash Display',sans-serif;font-size:clamp(2.5rem,6vw,4.5rem)">
                    <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,217,255,0.3)]" style="background:linear-gradient(135deg,#00D9FF,#818CF8);color:#000">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Get In Touch
                    </a>
                    <p class="text-white/15 text-xs mt-12">© ${new Date().getFullYear()} ${name} · AI Portfolio Pro</p>
                </div>
            </div>
        </div>`;
    }

    // ═══════════════════════════════════════════════
    // MINIMAL THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'minimal') {
        const accent = currentAccentColor;
        html = `
        <div class="portfolio-root" style="font-family:'Inter',system-ui,sans-serif;background:#fff;color:#111;min-height:100vh">
            <!-- Header -->
            <div class="portfolio-hero" style="max-width:680px;margin:0 auto;padding:72px 24px 48px">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:48px">
                    <div style="width:44px;height:44px;background:${accent};border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:14px">${initials}</div>
                    ${githubUser ? `<a href="https://github.com/${githubUser}" target="_blank" style="color:#888;font-size:13px;text-decoration:none;border:1px solid #eee;padding:6px 14px;border-radius:20px;transition:all 0.2s" onmouseover="this.style.borderColor='${accent}'" onmouseout="this.style.borderColor='#eee'">GitHub ↗</a>` : ''}
                </div>
                <h1 style="font-size:3rem;font-weight:800;line-height:1.1;letter-spacing:-2px;margin-bottom:12px;color:#111">${name}</h1>
                <p style="font-size:1.1rem;color:#555;margin-bottom:16px">${role}</p>
                <p style="font-size:0.95rem;color:#777;line-height:1.7;max-width:540px;border-left:3px solid ${accent};padding-left:16px">${tagline}</p>
            </div>

            <!-- About -->
            <div class="portfolio-section" style="max-width:680px;margin:0 auto;padding:0 24px 48px">
                <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#aaa;margin-bottom:16px">About</p>
                <p style="font-size:1rem;color:#444;line-height:1.8">${about}</p>
            </div>

            <!-- Skills -->
            <div class="portfolio-section" style="max-width:680px;margin:0 auto;padding:0 24px 48px">
                <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#aaa;margin-bottom:16px">Skills</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px">
                    ${skills.map(s => `<span style="font-size:0.8rem;padding:4px 12px;background:#f5f5f5;border-radius:20px;color:#444">${s}</span>`).join('')}
                </div>
            </div>

            <!-- Projects -->
            <div class="portfolio-section" style="max-width:680px;margin:0 auto;padding:0 24px 64px">
                <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#aaa;margin-bottom:24px">Projects</p>
                <div style="display:flex;flex-direction:column;gap:24px">
                    ${projects.map((p, i) => `
                    <div style="padding:24px;border:1px solid #eee;border-radius:16px;transition:all 0.2s" class="card-hover">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                            <h3 style="font-size:1.05rem;font-weight:700;color:#111">${p.title}</h3>
                            <span style="font-size:0.7rem;color:#aaa;font-family:monospace">0${i+1}</span>
                        </div>
                        <p style="font-size:0.875rem;color:#666;line-height:1.6;margin-bottom:12px">${p.description}</p>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                            ${p.tech.map(t => `<span style="font-size:0.7rem;padding:2px 8px;background:#f5f5f5;color:#666;border-radius:10px">${t}</span>`).join('')}
                        </div>
                    </div>`).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div style="border-top:1px solid #eee;max-width:680px;margin:0 auto;padding:32px 24px;display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:0.8rem;color:#aaa">© ${new Date().getFullYear()} ${name}</span>
                ${formData?.email ? `<a href="mailto:${formData.email}" style="font-size:0.85rem;color:${accent};text-decoration:none;font-weight:600">${formData.email}</a>` : ''}
            </div>
        </div>`;
    }

    // ═══════════════════════════════════════════════
    // BOLD THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'bold') {
        const accent = currentAccentColor;
        html = `
        <div class="portfolio-root" style="font-family:'Clash Display',system-ui,sans-serif;background:#000;color:#fff;min-height:100vh">
            <!-- HERO BANNER -->
            <div class="portfolio-hero" style="padding:0;position:relative;overflow:hidden">
                <div style="background:${accent};padding:48px 48px 64px;min-height:300px;display:grid;grid-template-columns:1fr auto;gap:32px;align-items:end">
                    <div>
                        <div style="font-size:0.7rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,0,0,0.5);margin-bottom:12px">${role}</div>
                        <h1 style="font-size:clamp(3rem,8vw,6rem);font-weight:900;line-height:0.9;color:#000;letter-spacing:-4px;margin-bottom:0">${name}</h1>
                    </div>
                    <div style="text-align:right">
                        <div style="width:80px;height:80px;background:#000;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900;color:${accent}">${initials}</div>
                    </div>
                </div>
                <!-- Tagline bar -->
                <div style="background:#111;padding:16px 48px;border-bottom:1px solid #222">
                    <p style="font-size:0.9rem;color:#666;font-family:'Inter',sans-serif">${tagline}</p>
                </div>
            </div>

            <!-- CONTENT GRID -->
            <div style="display:grid;grid-template-columns:1fr 1fr;min-height:400px">
                <!-- About -->
                <div class="portfolio-section" style="padding:48px;border-right:1px solid #222">
                    <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:24px">About</div>
                    <p style="font-size:0.95rem;color:#999;line-height:1.8;font-family:'Inter',sans-serif">${about}</p>
                    ${githubUser ? `<a href="https://github.com/${githubUser}" target="_blank" style="margin-top:24px;display:inline-flex;align-items:center;gap:8px;color:${accent};font-size:0.8rem;font-weight:700;text-decoration:none">View GitHub ↗</a>` : ''}
                </div>
                <!-- Skills -->
                <div class="portfolio-section" style="padding:48px">
                    <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:24px">Expertise</div>
                    <div style="display:flex;flex-direction:column;gap:12px">
                        ${skills.map(s => `
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #1a1a1a">
                            <span style="font-size:0.9rem;font-weight:700;color:#fff">${s}</span>
                            <div style="width:60px;height:3px;background:#222;border-radius:2px;overflow:hidden">
                                <div style="width:${Math.floor(Math.random() * 30 + 70)}%;height:100%;background:${accent};border-radius:2px"></div>
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- PROJECTS GRID -->
            <div class="portfolio-section" style="padding:48px;border-top:1px solid #222">
                <div style="font-size:0.65rem;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#444;margin-bottom:32px">Selected Work</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2px">
                    ${projects.map((p, i) => {
                        const colors = [accent, '#1a1a1a', '#111', '#0a0a0a'];
                        const textColor = i === 0 ? '#000' : '#fff';
                        return `
                    <div class="card-hover" style="background:${colors[i % colors.length]};padding:40px 32px;cursor:default">
                        <div style="font-size:2rem;font-weight:900;color:${i===0?'rgba(0,0,0,0.15)':'rgba(255,255,255,0.06)'};font-family:monospace;margin-bottom:24px">0${i+1}</div>
                        <h3 style="font-size:1.4rem;font-weight:900;color:${textColor};letter-spacing:-1px;margin-bottom:12px">${p.title}</h3>
                        <p style="font-size:0.8rem;color:${i===0?'rgba(0,0,0,0.65)':'#666'};line-height:1.6;margin-bottom:20px;font-family:'Inter',sans-serif">${p.description}</p>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                            ${p.tech.map(t => `<span style="font-size:0.65rem;padding:3px 10px;background:${i===0?'rgba(0,0,0,0.15)':'rgba(255,255,255,0.08)'};border-radius:20px;color:${i===0?'rgba(0,0,0,0.7)':'#888'};font-weight:700">${t}</span>`).join('')}
                        </div>
                    </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- FOOTER -->
            <div style="background:${accent};padding:40px 48px;display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:1.5rem;font-weight:900;color:#000;letter-spacing:-1px">${name}</span>
                ${formData?.email ? `<a href="mailto:${formData.email}" style="color:#000;font-weight:700;text-decoration:none;font-size:0.85rem">${formData.email}</a>` : `<span style="color:rgba(0,0,0,0.5);font-size:0.8rem">© ${new Date().getFullYear()}</span>`}
            </div>
        </div>`;
    }

    previewContent.innerHTML = html;
    // Sync code editor with newly generated content (reset user edits on new render)
    codeEditor.dataset.userEdited = '';
    codeEditor.value = html;
    // Run enter animations
    requestAnimationFrame(animatePortfolio);
    
    // Add smooth scrolling for internal anchor links within the preview
    const projectLinks = previewContent.querySelectorAll('a[href^="#"]');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = previewContent.querySelector('#' + targetId);
            if (targetElement) {
                // Scroll within the previewContent container
                const containerTop = previewContent.getBoundingClientRect().top;
                const elementTop = targetElement.getBoundingClientRect().top;
                const offset = elementTop - containerTop;
                previewContent.scrollBy({ top: offset, behavior: 'smooth' });
            }
        });
    });
}

// --- INITIALIZE BUTTONS ---
saveBtn.addEventListener('click', async () => {
    if (!generatedContent || !currentUser) {
        if (!currentUser) alert("You must be logged in to save portfolios.");
        return;
    }
    
    const htmlToSave = codeEditor.dataset.userEdited === 'true' && codeEditor.value ? codeEditor.value : previewContent.innerHTML;
    let portfolioName = prompt("Name this portfolio version:", "My Portfolio");
    if (!portfolioName) return;
    
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = 'Saving...';
    saveBtn.disabled = true;
    
    try {
        const { data, error } = await supabase
            .from('saved_portfolios')
            .insert([{
                user_id: currentUser.id,
                name: portfolioName,
                html_content: htmlToSave
            }])
            .select();
            
        if (error) throw error;
        
        // Reset user edited state since they just saved it
        codeEditor.dataset.userEdited = '';
        
        // Refresh the list
        savedPortfolios = [data[0], ...savedPortfolios];
        renderSavedPortfoliosList();
        
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        saveBtn.classList.add('text-green-400');
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.classList.remove('text-green-400');
            saveBtn.disabled = false;
        }, 2000);
    } catch (e) {
        console.error("Error saving portfolio code:", e);
        alert("Failed to save portfolio. Please try again.");
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }
});

document.getElementById('download-btn').addEventListener('click', () => {
    if (!generatedContent) return;
    // Use the editor's content if it has been manually edited, otherwise use the preview pane
    const html = (codeEditor.dataset.userEdited && codeEditor.value) ? codeEditor.value : previewContent.innerHTML;
    const name = document.getElementById('name').value || 'portfolio';
    const fullPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">
  <style>
    @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
    .animate-ping { animation: ping 1s cubic-bezier(0,0,0.2,1) infinite; }
    .font-mono { font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace; }
  </style>
</head>
<body>${html}</body>
</html>`;
    const blob = new Blob([fullPage], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s/g, '-')}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('share-btn').addEventListener('click', async () => {
    let slug = (document.getElementById('name').value || 'user').toLowerCase().replace(/\s/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    if (currentUser) {
        // Mark as published in DB
        const { data } = await supabase.from('users').select('username').match({ id: currentUser.id }).single();
        if (data && data.username) slug = data.username;

        await supabase.from('users').update({ is_published: true }).match({ id: currentUser.id });
    }

    alert(`🚀 Your portfolio is live at:\nhttps://portfolio.ai/${slug}\n\n(Copy this link to share with anyone!)`);
});

// --- README EXPORT ---
document.getElementById('readme-btn').addEventListener('click', () => {
    if (!generatedContent) return;

    const name = document.getElementById('name').value || 'Developer';
    const role = document.getElementById('role').value || 'Developer';
    const github = document.getElementById('github').value || '';
    const linkedin = document.getElementById('linkedin')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const { tagline, about, skills, projects } = generatedContent;

    const skillBadges = skills.map(s =>
        `![${s}](https://img.shields.io/badge/${encodeURIComponent(s)}-informational?style=flat&color=00D9FF)`
    ).join(' ');

    const projectSection = projects.map((p, i) => 
        `### ${i + 1}. ${p.title}\n${p.description}\n\n**Tech:** ${p.tech.join(', ')}`
    ).join('\n\n---\n\n');

    const contactLinks = [
        github ? `[🐙 GitHub](https://github.com/${github})` : null,
        linkedin ? `[💼 LinkedIn](https://${linkedin.replace('https://','')})` : null,
        email ? `[📧 Email](mailto:${email})` : null,
    ].filter(Boolean).join(' · ');

    const readme = `<div align="center">

# 👋 Hi, I'm ${name}

### ${role}

*${tagline}*

${contactLinks}

</div>

---

## 🙋 About Me

${about}

---

## 🛠️ Skills & Technologies

${skillBadges}

---

## 🚀 Featured Projects

${projectSection}

---

<div align="center">

*Built with [AI Portfolio Pro](https://github.com/ai-portfolio-pro)*

</div>
`;

    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
});




