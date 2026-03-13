/**
 * Aurora + Particle Canvas Background Animation
 */
export function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // --- Particles ---
    const PARTICLE_COUNT = 100;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.08,   // very slow drift
        vy: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.5 + 0.15,
    }));

    // Aurora layers — speed is radians per second (2π = 1 full wave cycle)
    // At speed 0.15 → one full wave every ~42 seconds = very slow & dreamy
    const AURORA_LAYERS = [
        { color: [0, 217, 255],   speed: 0.15, amp: 160, yBase: 0.35, phase: 0   },
        { color: [139, 92, 246],  speed: 0.11, amp: 140, yBase: 0.52, phase: 2.1 },
        { color: [59, 130, 246],  speed: 0.09, amp: 180, yBase: 0.68, phase: 4.2 },
    ];

    const startTime = performance.now();

    function drawAurora(layer, elapsed) {
        const { color, speed, amp, yBase, phase } = layer;
        const h = canvas.height;
        const w = canvas.width;
        const baseY = h * yBase;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 4) {
            const y = baseY
                + Math.sin(x * 0.003 + elapsed * speed + phase) * amp * 0.6
                + Math.sin(x * 0.006 + elapsed * speed * 0.7 + phase + 1) * amp * 0.4;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - amp, 0, baseY + amp);
        grad.addColorStop(0, `rgba(${color.join(',')}, 0.0)`);
        grad.addColorStop(0.4, `rgba(${color.join(',')}, 0.08)`);
        grad.addColorStop(0.7, `rgba(${color.join(',')}, 0.04)`);
        grad.addColorStop(1, `rgba(${color.join(',')}, 0.0)`);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    function draw() {
        // elapsed time in seconds since animation started
        const elapsed = (performance.now() - startTime) / 1000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark background
        ctx.fillStyle = '#0A0A0F';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Aurora layers
        AURORA_LAYERS.forEach(layer => drawAurora(layer, elapsed));

        // Slow-drifting star particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}
