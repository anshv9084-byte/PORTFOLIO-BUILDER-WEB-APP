import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- CONFIGURATION ---
// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://mkuzksoyetgxjsycfnnx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
let savedPortfolios = [];

// --- AUTO-SAVE SYSTEM ---
const AUTO_SAVE_KEY = 'portfolio_builder_draft';

function saveFormDataToLocal() {
    const formData = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        tagline: document.getElementById('tagline-input')?.value || '',
        skills: document.getElementById('skills').value,
        projects: document.getElementById('projects').value,
        experience: document.getElementById('experience')?.value || '',
        github: document.getElementById('github').value,
        linkedin: document.getElementById('linkedin')?.value || '',
        email: document.getElementById('email')?.value || '',
        photoUrl: document.getElementById('photo-url')?.value || '',
        theme: currentTheme,
        accentColor: currentAccentColor,
        font: currentFont
    };
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(formData));
    console.log('Draft auto-saved');
}

function loadFormDataFromLocal() {
    const savedData = localStorage.getItem(AUTO_SAVE_KEY);
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        if (data.name) document.getElementById('name').value = data.name;
        if (data.role) document.getElementById('role').value = data.role;
        if (data.tagline) {
            const taglineInput = document.getElementById('tagline-input');
            if (taglineInput) taglineInput.value = data.tagline;
        }
        if (data.skills) document.getElementById('skills').value = data.skills;
        if (data.projects) document.getElementById('projects').value = data.projects;
        if (data.experience) {
            const expInput = document.getElementById('experience');
            if (expInput) expInput.value = data.experience;
        }
        if (data.github) document.getElementById('github').value = data.github;
        if (data.linkedin) {
            const linkedinInput = document.getElementById('linkedin');
            if (linkedinInput) linkedinInput.value = data.linkedin;
        }
        if (data.email) {
            const emailInput = document.getElementById('email');
            if (emailInput) emailInput.value = data.email;
        }
        if (data.photoUrl) {
            const photoInput = document.getElementById('photo-url');
            if (photoInput) photoInput.value = data.photoUrl;
        }
        
        // Restore theme/color/font if they exist
        if (data.theme) {
            currentTheme = data.theme;
            // Find and click the corresponding theme button to update UI
            const themeBtn = Array.from(themeButtons).find(b => b.dataset.theme === currentTheme);
            if (themeBtn) {
                // We don't want to re-save immediately on load, but we want UI to sync
                themeButtons.forEach(b => {
                    b.classList.remove('bg-accent', 'text-black');
                    b.classList.add('hover:bg-white/5');
                });
                themeBtn.classList.add('bg-accent', 'text-black');
                themeBtn.classList.remove('hover:bg-white/5');
            }
        }
        if (data.accentColor) {
            currentAccentColor = data.accentColor;
            document.documentElement.style.setProperty('--accent', currentAccentColor);
            document.documentElement.style.setProperty('--accent-rgb', hexToRgb(currentAccentColor));
            // Sync active swatch
            document.querySelectorAll('.color-swatch').forEach(s => {
                s.classList.remove('active');
                if (s.dataset.color === currentAccentColor) s.classList.add('active');
            });
        }
        if (data.font) {
            currentFont = data.font;
            document.querySelectorAll('.font-option').forEach(b => {
                b.classList.remove('border-accent/50', 'bg-accent/10', 'text-accent');
                b.classList.add('border-white/10', 'bg-white/5');
                if (b.dataset.font === currentFont) {
                    b.classList.add('border-accent/50', 'bg-accent/10', 'text-accent');
                    b.classList.remove('border-white/10', 'bg-white/5');
                }
            });
        }
        
        console.log('Draft restored from local storage');
    } catch (e) {
        console.error('Failed to load auto-save:', e);
    }
}

// Contrast helper: returns 'black' or 'white' based on hex background
function getContrastColor(hexcolor) {
    if (!hexcolor) return 'white';
    // If it's rgb(...) format, extract hex or handle directly
    if (hexcolor.startsWith('rgb')) {
        const rgb = hexcolor.match(/\d+/g);
        if (!rgb || rgb.length < 3) return 'white';
        const yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }
    
    const hex = hexcolor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

// Helper to convert hex to RGB for Tailwind opacity support
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        null;
}

// --- STATE MANAGEMENT ---
let currentStep = 1;
let currentTheme = 'developer';
let currentAccentColor = '#00D9FF';
document.documentElement.style.setProperty('--accent-rgb', hexToRgb(currentAccentColor));
let currentFont = 'clash';
let generatedContent = null;
let currentUser = null;
let lastFormData = {}; // persisted so renderPortfolio can access it

// --- PREPARE USER ---
async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user;

    // Check for Guest Mode if no Supabase user
    if (!currentUser && localStorage.getItem('guestMode') === 'true') {
        currentUser = { 
            id: 'guest',
            email: 'guest@anshverma.dev', 
            isGuest: true 
        };
    }

    // Refresh UI and Load Data
    handleAuthUI();
    if (currentUser && !currentUser.isGuest) {
        loadSavedPortfolios();
    }
    
    // Load local draft after user status is determined
    loadFormDataFromLocal();
}
fetchUser();

// --- AUTH UI HANDLER ---
function handleAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    if (currentUser) {
        authContainer.innerHTML = `
            <div class="relative group">
                <button id="user-menu-btn" class="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-white/10 transition-all">
                    <div class="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                        ${currentUser.email[0].toUpperCase()}
                    </div>
                    <span class="text-[10px] font-medium text-slate-600 dark:text-slate-400 max-w-[80px] truncate">${currentUser.email}</span>
                    <i class="fas fa-chevron-down text-[8px] opacity-40"></i>
                </button>
                <div id="user-dropdown" class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 hidden z-50">
                    <div class="px-4 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                        <p class="text-[10px] text-slate-400">Signed in as</p>
                        <p class="text-xs font-semibold truncate">${currentUser.email}</p>
                    </div>
                    <button id="logout-btn" class="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-500/5 transition-all flex items-center gap-2">
                        <i class="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                </div>
            </div>
        `;

        // Toggle dropdown
        const menuBtn = document.getElementById('user-menu-btn');
        const dropdown = document.getElementById('user-dropdown');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', () => dropdown.classList.add('hidden'));

        document.getElementById('logout-btn').addEventListener('click', async () => {
            if (currentUser && currentUser.isGuest) {
                localStorage.removeItem('guestMode');
            } else {
                await supabase.auth.signOut();
            }
            window.location.href = './landing.html';
        });
    } else {
        authContainer.innerHTML = `
            <a href="./login.html" class="px-4 py-1.5 bg-accent text-black rounded-full text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20">Log In</a>
        `;
    }
}


// --- COLOR & FONT PICKERS ---
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentAccentColor = swatch.dataset.color;
        document.documentElement.style.setProperty('--accent', currentAccentColor);
        document.documentElement.style.setProperty('--accent-rgb', hexToRgb(currentAccentColor));
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

// --- THEME TOGGLE LOGIC ---
function updateThemeToggleUI() {
    const icon = themeToggleBtn.querySelector('i');
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        icon.className = 'fas fa-sun text-xs';
        themeToggleBtn.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-moon text-xs';
        themeToggleBtn.title = 'Switch to Dark Mode';
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    
    // Update dashboard colors based on mode
    if (isDark) {
        document.body.classList.add('bg-[#0A0A0F]', 'text-white');
        document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
        document.body.classList.remove('bg-[#0A0A0F]', 'text-white');
        document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
    
    updateThemeToggleUI();
});

if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
        themeToggleBtn.click(); // Reuse main toggle logic
    });
}

// Sync UI on load
updateThemeToggleUI();



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
// Auto-save on any input change + Dynamic Header Updates
portfolioForm.addEventListener('input', (e) => {
    saveFormDataToLocal();
    
    // Live Dynamic Branding
    if (e.target.id === 'name') {
        const nameInput = e.target.value.trim();
        const brandName = document.getElementById('header-brand-name');
        const logoInitials = document.getElementById('header-logo-initials');
        
        if (brandName) {
            if (nameInput) {
                const parts = nameInput.split(' ');
                const first = parts[0];
                const rest = parts.slice(1).join(' ');
                brandName.innerHTML = `${first} <span class="text-accent">${rest || ''}</span>`;
            } else {
                brandName.innerHTML = 'Your <span class="text-accent">Identity</span>';
            }
        }
        
        if (logoInitials) {
            const initials = nameInput ? nameInput.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AV';
            logoInitials.textContent = initials;
        }
    }
});

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
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Trigger HTML5 validation on current step inputs
        const currentStepEl = document.getElementById(`step-${currentStep}`);
        const inputs = Array.from(currentStepEl.querySelectorAll('input[required], textarea[required]'));
        const isValid = inputs.every(input => input.checkValidity());
        
        if (!isValid) {
            inputs.forEach(input => input.reportValidity());
            return;
        }

        if (currentStep < steps.length) {
            currentStep++;
            updateSteps();
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 1) {
            currentStep--;
            updateSteps();
        }
    });
});

// --- AI GENERATION ---
portfolioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather manual inputs
    const formData = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        tagline: document.getElementById('tagline-input')?.value || '',
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
        projects: document.getElementById('projects').value, // Projects are still a raw string for AI
        experience: document.getElementById('experience')?.value.split('\n').map(e => e.trim()).filter(e => e) || [],
        github: document.getElementById('github').value,
        linkedin: document.getElementById('linkedin')?.value || '',
        email: document.getElementById('email')?.value || '',
        photoUrl: document.getElementById('photo-url')?.value || '',
        accentColor: currentAccentColor,
        font: currentFont,
    };
    lastFormData = formData;

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
                email: user.email,
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
    const skillStr = info.skills ? String(info.skills) : 'HTML, CSS, JavaScript';
    const skillList = skillStr.split(',').map(s => s.trim()).filter(Boolean);
    const projStr = info.projects ? String(info.projects) : 'Awesome Project, NextGen App';
    const projectList = projStr.split(',').map(p => p.trim()).filter(Boolean);
    const expStr = info.experience ? String(info.experience) : '';
    const experienceList = expStr ? expStr.split('\n').map(e => e.trim()).filter(Boolean) : [];
    return {
        tagline: `Crafting high-performance ${info.role} experiences with precision & creative flair.`,
        about: `I'm a passionate ${info.role} who transforms complex challenges into elegant, user-centric solutions. With deep expertise in ${skillList.slice(0, 3).join(', ')}, I build scalable products that people love. I care deeply about clean code, great design, and shipping fast.`,
        skills: skillList,
        experience: experienceList,
        photoUrl: info.photoUrl || '',
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

// --- TYPING ANIMATION HELPER ---
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    element.innerHTML = '';
    element.classList.add('typing-cursor');
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Keep cursor for a bit then remove? Or just leave it.
            setTimeout(() => element.classList.remove('typing-cursor'), 2000);
        }
    }
    type();
}

// --- GSAP ANIMATION HELPER ---
function animatePortfolio() {
    if (typeof gsap === 'undefined') return;
    
    // Clear previous animations if any
    gsap.killTweensOf('#preview-content *');

    const tl = gsap.timeline();

    tl.fromTo('#preview-content .portfolio-hero',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
    );

    tl.fromTo('#preview-content .portfolio-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 },
        '-=0.5'
    );

    // Animate skill bars with a slight delay
    document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        const target = bar.dataset.width || '80%';
        tl.fromTo(bar, 
            { width: '0%' }, 
            { width: target, duration: 1.2, ease: 'expo.out' }, 
            `-=${0.7 - (i * 0.05)}`
        );
    });

    // Pulse effects for buttons
    document.querySelectorAll('.portfolio-root .btn-pulse').forEach(btn => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    // Start typing hero text if element exists
    const heroTitle = document.querySelector('#preview-content .hero-title-typing');
    if (heroTitle && lastFormData.name) {
        typeWriter(heroTitle, lastFormData.name, 100);
    }
}

// --- THEME ENGINE ---
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Theme button clicked:', btn.dataset.theme);

        // Update button visual states
        themeButtons.forEach(b => {
            b.classList.remove('bg-accent', 'text-black', 'pulse-btn');
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

    const fontStyles = {
        'clash': 'font-family: "Clash Display", system-ui, sans-serif !important;',
        'inter': 'font-family: "Inter", system-ui, sans-serif !important;',
        'mono': 'font-family: monospace !important;'
    };
    const selectedFontStyle = fontStyles[currentFont] || fontStyles['clash'];

    let html = '';

    // ═══════════════════════════════════════════════
    // DEVELOPER THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'developer') {
        const photo = document.getElementById('photo-url')?.value || generatedContent.photoUrl || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const experience = generatedContent.experience || [];

        html = `
        <div class="portfolio-root font-mono text-white bg-[#070710] min-h-screen" style="--accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
            <!-- HERO -->
            <div class="portfolio-hero relative overflow-hidden">
                <!-- Background image with overlay -->
                <div class="absolute inset-0">
                    <img src="${heroImg}" class="w-full h-full object-cover opacity-10" alt="hero">
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
                        ${photo ? 
                            `<div class="w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:scale-105 transition-transform duration-500">
                                <img src="${photo}" class="w-full h-full object-cover" alt="${name}">
                             </div>` :
                            `<div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-${getContrastColor(currentAccentColor)} text-3xl font-bold shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] flex-shrink-0 hover:rotate-3 transition-transform">
                                ${initials}
                             </div>`
                        }
                        <div>
                            <div class="text-white/40 text-sm mb-1 tracking-widest uppercase">${role}</div>
                            <h1 class="text-5xl font-bold font-clash tracking-tight hero-title-typing">
                                ${name}
                            </h1>
                        </div>
                    </div>
                    
                    <!-- Tagline -->
                    <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${tagline}</p>
                    
                    <!-- CTA Row -->
                    <div class="flex gap-4 flex-wrap animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="#projects" class="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-${getContrastColor(currentAccentColor)} rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(var(--accent-rgb),0.3)] text-sm pulse-btn">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            View Projects
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-github"></i> GitHub
                        </a>` : ''}
                        ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm text-white/70">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>` : ''}
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
                        <p class="text-lg text-white/60 leading-[1.8]">${about}</p>
                    </div>
                    ${experience.length > 0 ? `
                    <div>
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8 flex items-center gap-3">
                            <span class="w-6 h-px bg-accent"></span>Experience
                        </h2>
                        <div class="space-y-6">
                            ${experience.map(exp => `
                            <div class="premium-card p-5 !bg-white/[0.01]">
                                <p class="text-white/80 font-bold">${exp}</p>
                            </div>`).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section px-10 py-16 border-t border-white/5 bg-[#080812]">
                <h2 class="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-10 flex items-center gap-3">
                    <span class="w-6 h-px bg-accent"></span>Tech Stack
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    ${skills.map(s => {
            const w = skillWidth(s);
            return `
                        <div class="group">
                            <div class="flex items-center justify-between mb-2.5">
                                <span class="text-sm text-white/80 flex items-center gap-3 group-hover:text-accent transition-colors">
                                    <span class="text-xl">${getSkillIcon(s)}</span> 
                                    <span class="font-bold tracking-tight">${s}</span>
                                </span>
                                <span class="text-[10px] font-mono text-white/20">${w}</span>
                            </div>
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent via-blue-400 to-purple-500" style="width:0%" data-width="${w}"></div>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- PROJECTS -->
            <div id="projects" class="portfolio-section px-10 py-20 border-t border-white/5">
                <h2 class="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-12 text-center">Selected Work</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${projects.map((p, i) => {
            const img = `./images/project-${(i % 4) + 1}.svg`;
            return `
                        <div class="group premium-card !p-0 overflow-hidden">
                            <!-- Image Container -->
                            <div class="h-64 overflow-hidden relative">
                                <img src="${img}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="${p.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#070710] via-transparent to-transparent"></div>
                                <div class="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-accent uppercase tracking-widest">
                                    Build 0${i + 1}
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="p-8">
                                <h3 class="text-2xl font-bold mb-3 group-hover:text-accent transition-all duration-300 font-clash">${p.title}</h3>
                                <p class="text-sm text-white/40 mb-6 leading-relaxed">${p.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="flex gap-2.5 flex-wrap">
                                        ${p.tech.map(t => `<span class="text-[9px] bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg text-white/50 font-bold uppercase tracking-wider">${t}</span>`).join('')}
                                    </div>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-accent hover:text-black transition-all">
                                        <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>`;
        }).join('')}
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
                        <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="px-10 py-4 bg-accent text-black rounded-xl font-bold hover:scale-105 transition-transform text-lg shadow-[0_15px_40px_rgba(var(--accent-rgb),0.35)] pulse-btn">
                            Initiate Contact
                        </a>
                        ${githubUser ? `<a href="https://github.com/${githubUser}" class="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-white/60">
                            Source Files
                        </a>` : ''}
                    </div>
                    <div class="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p class="text-white/20 text-xs">© ${new Date().getFullYear()} ${name} · Engineered with AI Pro</p>
                        <div class="flex gap-6">
                            ${githubUser ? `<a href="https://github.com/${githubUser}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-github"></i></a>` : ''}
                            ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" class="text-white/20 hover:text-accent text-lg transition-colors"><i class="fab fa-linkedin"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        // ═══════════════════════════════════════════════
        // STARTUP THEME
        // ═══════════════════════════════════════════════
    } else if (currentTheme === 'startup') {
        const photo = document.getElementById('photo-url')?.value || generatedContent.photoUrl || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const experience = generatedContent.experience || [];
        
        html = `
        <div class="portfolio-root font-sans bg-white text-[#111] min-h-screen pb-0" style="--accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
            <!-- Navigation -->
            <nav class="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 py-5 flex items-center justify-between">
                <div class="font-black text-xl tracking-tighter">${initials}</div>
                <div class="flex gap-8 items-center">
                    <a href="#work" class="text-sm font-bold text-slate-500 hover:text-black">Work</a>
                    <a href="#about" class="text-sm font-bold text-slate-500 hover:text-black">About</a>
                    <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform pulse-btn">Let's Talk</a>
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
                                ${name}
                            </h1>
                            <p class="text-2xl text-slate-400 font-medium mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s">${tagline}</p>
                            <div class="flex gap-5 animate-fade-in-up" style="animation-delay: 0.5s">
                                <a href="#work" class="px-8 py-4.5 bg-black text-white rounded-2xl font-bold hover:scale-[1.03] transition-transform shadow-2xl shadow-black/20 text-base">
                                    Explore Portfolio
                                </a>
                                ${githubUser ? `<a href="https://github.com/${githubUser}" target="_blank" class="px-8 py-4.5 border-2 border-slate-200 rounded-2xl font-bold hover:border-slate-800 transition-all text-base text-slate-700">
                                    Source
                                </a>` : ''}
                            </div>
                        </div>
                        ${photo ? 
                            `<div class="w-64 h-80 rounded-[40px] overflow-hidden rotate-2 shadow-2xl border-8 border-white animate-fade-in">
                                <img src="${photo}" class="w-full h-full object-cover" alt="${name}">
                             </div>` :
                            `<div class="w-64 h-64 rounded-[50px] bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-6xl font-black shadow-2xl rotate-3">
                                ${initials}
                             </div>`
                        }
                    </div>
                </div>
                
                <!-- Hero Visual -->
                <div class="relative h-[480px] overflow-hidden rounded-t-[60px] mx-auto max-w-6xl shadow-[0_-30px_100px_rgba(0,0,0,0.08)] bg-slate-50 mt-12 group">
                    <img src="${heroImg}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-2000" alt="Work Process">
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
                        <p class="text-2xl leading-relaxed text-slate-500 font-medium">${about}</p>
                    </div>
                </div>

                ${experience.length > 0 ? `
                <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-1">
                        <h2 class="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-6">Career Path</h2>
                    </div>
                    <div class="md:col-span-2 space-y-12">
                        ${experience.slice(0, 3).map(exp => {
                            const [role, comp] = exp.split(' at ');
                            return `
                            <div class="flex gap-8 group">
                                <div class="text-4xl font-black text-slate-100 group-hover:text-black transition-colors duration-500">→</div>
                                <div>
                                    <h4 class="text-2xl font-black">${role}</h4>
                                    <p class="text-lg text-slate-400 font-bold">${comp || ''}</p>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>` : ''}
            </div>

            <!-- SKILLS -->
            <div class="portfolio-section bg-slate-50 py-24 border-y border-slate-100">
                <div class="max-w-5xl mx-auto px-12 text-center">
                    <h2 class="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-black mb-16">Core Competencies</h2>
                    <div class="flex flex-wrap justify-center gap-6">
                        ${skills.map(s => `
                        <div class="flex items-center gap-4 bg-white text-slate-800 px-8 py-5 rounded-3xl font-bold text-lg shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <span class="text-2xl">${getSkillIcon(s)}</span> ${s}
                        </div>`).join('')}
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
                    ${projects.map((p, i) => {
            const img = `./images/project-${(i % 4) + 1}.svg`;
            const isEven = i % 2 === 0;
            return `
                        <div class="group grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div class="lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'} aspect-[4/3] w-full overflow-hidden rounded-[50px] shadow-3xl shadow-slate-200/80 bg-slate-100">
                                <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="${p.title}">
                            </div>
                            <div class="lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}">
                                <div class="text-[10px] font-black tracking-widest text-[#111] opacity-20 mb-4">0${i + 1} / Project</div>
                                <h3 class="text-4xl font-black tracking-tighter mb-6">${p.title}</h3>
                                <p class="text-slate-500 text-lg leading-relaxed mb-8">${p.description}</p>
                                <div class="flex flex-wrap gap-3 mb-10">
                                    ${p.tech.map(t => `<span class="text-[10px] bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-600 uppercase tracking-widest">${t}</span>`).join('')}
                                </div>
                                <a href="#" class="inline-flex items-center gap-2 text-black font-black text-sm uppercase tracking-widest border-b-2 border-black pb-1 hover:gap-4 transition-all">
                                    View Repository <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
        }).join('')}
                </div>
            </div>

            <!-- CTA -->
            <div class="portfolio-section bg-black text-white py-40 px-12 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
                <div class="max-w-4xl mx-auto text-center relative z-10">
                    <h2 class="text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">Let's build<br>the future.</h2>
                    <p class="text-xl text-white/40 mb-16 max-w-xl mx-auto font-medium">Have a vision for a project? Let's turn it into reality with cutting-edge tech and elite design.</p>
                    <div class="flex gap-6 justify-center flex-wrap">
                        <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="px-12 py-6 bg-white text-black rounded-3xl font-black hover:scale-110 transition-transform text-lg pulse-btn">
                            Get In Touch
                        </a>
                        ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" target="_blank" class="px-12 py-6 border-2 border-white/20 rounded-3xl font-black hover:bg-white/10 transition-all text-lg">
                            LinkedIn
                        </a>` : ''}
                    </div>
                    <div class="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
                        <p class="text-xs font-bold uppercase tracking-widest">© ${new Date().getFullYear()} ${name}</p>
                        <div class="flex gap-10">
                            ${githubUser ? `<a href="https://github.com/${githubUser}" class="hover:text-white transition-colors"><i class="fab fa-github fa-lg"></i></a>` : ''}
                            ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" class="hover:text-white transition-colors"><i class="fab fa-linkedin fa-lg"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // ═══════════════════════════════════════════════
    // CREATIVE THEME
    // ═══════════════════════════════════════════════
    } else if (currentTheme === 'creative') {
        html = `
        <div class="portfolio-root text-white min-h-screen pb-20" style="background:linear-gradient(135deg,#06060F 0%,#0E0720 50%,#06060F 100%); --accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
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
                    <p class="text-white/15 text-xs mt-12">© ${new Date().getFullYear()} ${name} · Ansh Verma</p>
                </div>
            </div>
        </div>`;
    }

    // ═══════════════════════════════════════════════
    // MINIMAL THEME
    // ═══════════════════════════════════════════════
    else if (currentTheme === 'minimal') {
        const photo = document.getElementById('photo-url')?.value || generatedContent.photoUrl || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        
        html = `
        <div class="portfolio-root font-sans bg-white text-zinc-900 min-h-screen px-6 py-12 md:px-20 md:py-32" style="--accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
            <div class="max-w-3xl mx-auto">
                <!-- Header -->
                <header class="portfolio-hero mb-24">
                    <div class="flex items-center gap-8 mb-12">
                        ${photo ? 
                            `<div class="w-24 h-24 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src="${photo}" class="w-full h-full object-cover" alt="${name}">
                             </div>` : 
                            `<div class="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-3xl font-light">
                                ${initials}
                             </div>`
                        }
                        <div>
                            <h1 class="text-4xl font-light tracking-tight mb-2 hero-title-typing">${name}</h1>
                            <p class="text-zinc-400 text-lg uppercase tracking-widest font-medium">${role}</p>
                        </div>
                    </div>
                    <p class="text-2xl text-zinc-500 leading-relaxed font-light mb-10 animate-fade-in-up" style="animation-delay: 0.3s">${tagline}</p>
                    <div class="flex gap-8 animate-fade-in-up" style="animation-delay: 0.5s">
                        <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">Email</a>
                        ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">GitHub</a>` : ''}
                        ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" target="_blank" class="text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:opacity-50 transition-opacity">LinkedIn</a>` : ''}
                    </div>
                </header>

                <!-- About -->
                <section class="portfolio-section mb-24 border-l-4 border-zinc-50 pl-8">
                    <h2 class="text-xs uppercase tracking-widest text-zinc-300 font-bold mb-8">Statement</h2>
                    <p class="text-zinc-600 text-xl leading-[1.8] font-light italic">${about}</p>
                </section>

                <!-- Work -->
                <section class="portfolio-section mb-24">
                    <h2 class="text-xs uppercase tracking-widest text-zinc-300 font-bold mb-12">Selected Work</h2>
                    <div class="space-y-20">
                        ${projects.map((p, i) => `
                        <div class="group">
                            <div class="flex justify-between items-baseline mb-4">
                                <h3 class="text-2xl font-light group-hover:text-black transition-colors">${p.title}</h3>
                                <span class="text-[10px] items-center text-zinc-200 font-mono tracking-tighter">0${i + 1}</span>
                            </div>
                            <p class="text-zinc-500 mb-6 leading-relaxed max-w-xl">${p.description}</p>
                            <div class="flex gap-4">
                                ${p.tech.map(t => `<span class="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">${t}</span>`).join('<span class="text-zinc-200">/</span>')}
                            </div>
                        </div>`).join('')}
                    </div>
                </section>

                <!-- Footer -->
                <footer class="portfolio-section pt-12 border-t border-zinc-100 flex justify-between items-center">
                    <p class="text-[10px] text-zinc-300 uppercase tracking-widest">© ${new Date().getFullYear()} ${name}</p>
                    <div class="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">A+</div>
                </footer>
            </div>
        </div>`;
    }

    // ═══════════════════════════════════════════════
    // RESUME THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'resume') {
        const photo = document.getElementById('photo-url')?.value || generatedContent.photoUrl || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const experience = generatedContent.experience || [];

        html = `
        <div class="portfolio-root font-serif bg-[#fdfdfd] text-[#222] min-h-screen p-8 md:p-16" style="--accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
            <div class="max-w-4xl mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-zinc-100 p-10 md:p-20 relative animate-fade-in">
                <!-- Decor Line -->
                <div class="absolute top-0 left-0 w-full h-1.5 bg-zinc-900"></div>
                
                <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div class="portfolio-hero">
                        <h1 class="text-5xl font-black tracking-tight mb-4 hero-title-typing">${name}</h1>
                        <p class="text-xl text-zinc-500 font-sans italic mb-8">${role}</p>
                        <div class="flex gap-6 font-sans text-xs font-bold uppercase tracking-widest text-zinc-400">
                            ${githubUser ? `<a href="https://github.com/${githubUser.replace(/^.*github\.com\//, '')}" class="hover:text-black">GitHub</a>` : ''}
                            ${linkedin ? `<a href="https://${linkedin.replace('https://','')}" class="hover:text-black">LinkedIn</a>` : ''}
                            <a href="mailto:hello@${name.toLowerCase().replace(/\s/g, '')}.dev" class="hover:text-black">Email</a>
                        </div>
                    </div>
                    ${photo ? 
                        `<div class="w-32 h-32 border-4 border-white shadow-xl rotate-2 shrink-0 overflow-hidden">
                            <img src="${photo}" class="w-full h-full object-cover grayscale" alt="${name}">
                         </div>` : 
                        `<div class="w-32 h-32 bg-zinc-50 border border-zinc-100 shrink-0 flex items-center justify-center text-zinc-200 text-3xl font-bold">
                            ${initials}
                         </div>`
                    }
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div class="md:col-span-2">
                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Profile</h2>
                            <p class="text-lg leading-relaxed text-zinc-600">${about}</p>
                        </section>

                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Experience</h2>
                            <div class="space-y-10">
                                ${experience.map(exp => {
                                    const [role, comp] = exp.split(' at ');
                                    return `
                                    <div class="relative pl-6 border-l border-zinc-100">
                                        <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-200"></div>
                                        <h3 class="text-xl font-bold">${role}</h3>
                                        <p class="text-zinc-500 italic mb-2">${comp || ''}</p>
                                    </div>`;
                                }).join('')}
                                ${experience.length === 0 ? '<p class="text-zinc-400 italic">Experience details coming soon...</p>' : ''}
                            </div>
                        </section>

                        <section class="portfolio-section">
                            <h2 class="text-sm font-sans font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Work Samples</h2>
                            <div class="space-y-8">
                                ${projects.map(p => `
                                <div>
                                    <h3 class="font-bold underline italic text-lg decoration-zinc-200 underline-offset-4 mb-2">${p.title}</h3>
                                    <p class="text-zinc-600 text-sm leading-relaxed">${p.description}</p>
                                </div>`).join('')}
                            </div>
                        </section>
                    </div>

                    <div class="md:col-span-1 font-sans">
                        <section class="portfolio-section mb-16">
                            <h2 class="text-sm font-black uppercase tracking-[0.3em] mb-8 border-b border-zinc-100 pb-2">Expertise</h2>
                            <div class="flex flex-wrap gap-2">
                                ${skills.map(s => `<span class="px-3 py-1 bg-zinc-50 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500">${s}</span>`).join('')}
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
        </div>`;
    }

    // ═══════════════════════════════════════════════
    // BOLD THEME
    // ═══════════════════════════════════════════════
    if (currentTheme === 'bold') {
        const accent = currentAccentColor;
        html = `
        <div class="portfolio-root" style="background:#000;color:#fff;min-height:100vh; --accent: ${currentAccentColor}; --accent-rgb: ${hexToRgb(currentAccentColor)}; ${selectedFontStyle}">
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
                <span style="font-size:1.5rem;font-weight:900;color:${getContrastColor(accent)};letter-spacing:-1px">${name}</span>
                ${lastFormData?.email ? `<a href="mailto:${lastFormData.email}" style="color:${getContrastColor(accent)};font-weight:700;text-decoration:none;font-size:0.85rem">${lastFormData.email}</a>` : `<span style="color:${getContrastColor(accent)};opacity:0.5;font-size:0.8rem">© ${new Date().getFullYear()}</span>`}
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
    // Standalone Export Asset Map
    const ASSET_MAP = {
        './images/hero.svg': `<svg width="1400" height="700" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b" /><stop offset="100%" stop-color="#0f172a" /></linearGradient><linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3" /><stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.3" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg)" /><path d="M-100,-100 Q400,300 900,-50 T1500,200 L1500,-100 Z" fill="url(#glow)" /><circle cx="20%" cy="70%" r="300" fill="#38bdf8" opacity="0.1" /><circle cx="80%" cy="30%" r="400" fill="#818cf8" opacity="0.1" /><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /><text x="50%" y="50%" font-family="monospace" font-size="40" font-weight="bold" fill="rgba(255,255,255,0.2)" text-anchor="middle" dominant-baseline="middle">IDENTITY</text></svg>`,
        './images/project-1.svg': `<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f172a" /><stop offset="100%" stop-color="#334155" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg1)" /><rect x="50" y="50" width="200" height="400" rx="10" fill="#1e293b" /><rect x="280" y="50" width="570" height="150" rx="10" fill="#1e293b" /><rect x="280" y="230" width="270" height="220" rx="10" fill="#1e293b" /><rect x="580" y="230" width="270" height="220" rx="10" fill="#1e293b" /><circle cx="150" cy="100" r="30" fill="#38bdf8" /><rect x="80" y="160" width="140" height="20" rx="5" fill="#475569" /><rect x="80" y="210" width="140" height="20" rx="5" fill="#475569" /><rect x="80" y="260" width="140" height="20" rx="5" fill="#475569" /><rect x="310" y="90" width="100" height="70" rx="5" fill="#38bdf8" /><rect x="440" y="90" width="100" height="70" rx="5" fill="#818cf8" /><rect x="570" y="90" width="100" height="70" rx="5" fill="#34d399" /><rect x="700" y="90" width="100" height="70" rx="5" fill="#fbbf24" /></svg>`,
        './images/project-2.svg': `<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#18181b" /><stop offset="100%" stop-color="#27272a" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg2)" /><rect x="300" y="50" width="300" height="600" rx="40" fill="#3f3f46" stroke="#52525b" stroke-width="10"/><rect x="320" y="100" width="260" height="150" rx="20" fill="#52525b" /><rect x="320" y="270" width="120" height="120" rx="15" fill="#52525b" /><rect x="460" y="270" width="120" height="120" rx="15" fill="#52525b" /><rect x="320" y="410" width="120" height="120" rx="15" fill="#52525b" /><rect x="460" y="410" width="120" height="120" rx="15" fill="#52525b" /><circle cx="380" cy="330" r="30" fill="#f43f5e" /><circle cx="520" cy="330" r="30" fill="#a855f7" /><circle cx="450" cy="175" r="50" fill="#3b82f6" opacity="0.8"/></svg>`,
        './images/project-3.svg': `<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0f2922" /><stop offset="100%" stop-color="#134e4a" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg3)" /><circle cx="450" cy="250" r="15" fill="#10b981" /><circle cx="250" cy="150" r="25" fill="#14b8a6" /><circle cx="650" cy="100" r="20" fill="#06b6d4" /><circle cx="300" cy="400" r="30" fill="#6ee7b7" opacity="0.5"/><circle cx="700" cy="350" r="35" fill="#2dd4bf" opacity="0.5"/><circle cx="100" cy="300" r="15" fill="#99f6e4" /><circle cx="800" cy="200" r="20" fill="#5eead4" /><line x1="450" y1="250" x2="250" y2="150" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="650" y2="100" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="300" y2="400" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="450" y1="250" x2="700" y2="350" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="250" y1="150" x2="100" y2="300" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="650" y1="100" x2="800" y2="200" stroke="#10b981" stroke-width="2" opacity="0.5"/><line x1="700" y1="350" x2="800" y2="200" stroke="#10b981" stroke-width="2" opacity="0.5"/><rect x="350" y="320" width="200" height="120" rx="8" fill="#022c22" opacity="0.8"/><rect x="370" y="340" width="100" height="8" rx="4" fill="#34d399"/><rect x="370" y="360" width="140" height="8" rx="4" fill="#6ee7b7"/><rect x="370" y="380" width="80" height="8" rx="4" fill="#6ee7b7"/><rect x="370" y="400" width="120" height="8" rx="4" fill="#34d399"/></svg>`,
        './images/project-4.svg': `<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2e1065" /><stop offset="100%" stop-color="#4c1d95" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg4)" /><circle cx="450" cy="250" r="150" fill="#a78bfa" opacity="0.2"/><rect x="300" y="100" width="150" height="150" transform="rotate(45 375 175)" fill="#c084fc" opacity="0.5"/><rect x="450" y="250" width="150" height="150" transform="rotate(45 525 325)" fill="#e879f9" opacity="0.5"/><circle cx="350" cy="350" r="80" fill="#f472b6" opacity="0.6"/><polygon points="550,150 650,250 500,250" fill="#fb923c" opacity="0.8"/><polygon points="250,250 350,150 200,100" fill="#38bdf8" opacity="0.7"/><rect x="400" y="200" width="100" height="100" rx="20" fill="#fff" opacity="0.9"/><circle cx="450" cy="250" r="20" fill="#4c1d95" /></svg>`
    };

    // Use the editor's content if it has been manually edited, otherwise use the preview pane
    let htmlContent = (codeEditor.dataset.userEdited && codeEditor.value) ? codeEditor.value : previewContent.innerHTML;
    
    // Inline Assets: Replace relative img paths with data URIs or direct SVGs
    Object.entries(ASSET_MAP).forEach(([path, svg]) => {
        const svgBase64 = btoa(svg);
        const dataUri = `data:image/svg+xml;base64,${svgBase64}`;
        htmlContent = htmlContent.split(`src="${path}"`).join(`src="${dataUri}"`);
    });

    const name = document.getElementById('name').value || 'portfolio';
    const fullPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --accent: ${currentAccentColor};
      --accent-rgb: ${hexToRgb(currentAccentColor)};
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
<body class="bg-[#0A0A0F] selection:bg-accent/30 selection:text-white">${htmlContent}</body>
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

*Built with [Ansh Verma](https://github.com/ansh-verma)*

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

// --- DATABASE SYNC ---
async function loadSavedPortfolios() {
    if (!currentUser) return;
    try {
        const { data, error } = await supabase
            .from('saved_portfolios')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        savedPortfolios = data || [];
        renderSavedPortfoliosList();
    } catch (e) {
        console.warn("Could not load saved portfolios:", e.message);
    }
}

function renderSavedPortfoliosList() {
    if (!portfoliosList) return;
    
    portfoliosCount.textContent = savedPortfolios.length;
    
    if (savedPortfolios.length === 0) {
        portfoliosList.innerHTML = `
            <div class="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                <p class="text-white/20 text-xs">No saved versions yet</p>
            </div>`;
        return;
    }

    portfoliosList.innerHTML = savedPortfolios.map(p => `
        <div class="group bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer" onclick="loadSavedVersion('${p.id}')">
            <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-sm truncate pr-4">${p.name}</h4>
                <div class="text-[9px] text-white/30 whitespace-nowrap">${new Date(p.created_at).toLocaleDateString()}</div>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-[9px] text-accent font-bold uppercase tracking-widest">Load Version</span>
            </div>
        </div>
    `).join('');
}

// Global exposure for onclick
window.loadSavedVersion = async function(id) {
    const p = savedPortfolios.find(x => x.id === id);
    if (!p) return;
    
    // Switch to preview mode
    switchToPreview();
    
    // Load content
    previewEmpty.classList.add('hidden');
    previewContent.classList.remove('hidden', 'opacity-20');
    previewContent.innerHTML = p.html_content;
    codeEditor.value = p.html_content;
    generatedContent = { restored: true }; // Dummy to enable buttons
    
    // Re-enable dashboard buttons
    document.querySelectorAll('#download-btn, #readme-btn, #save-btn, #share-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('opacity-40', 'cursor-not-allowed');
    });
};




