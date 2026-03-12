import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://mkuzksoyetgxjsycfnnx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_seUTej9kixmVRZgvtugmXw__p2MUoU1';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
        alert('Success! Check your email for confirmation.');
        window.location.href = 'login.html';
    }
});

document.getElementById('guest-btn').addEventListener('click', () => {
    localStorage.setItem('guest_mode', 'true');
    window.location.href = 'index.html';
});

