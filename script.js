document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('background-canvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width;
    let height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);


    /* ================================
       PARTICLES
    ================================= */

    const particles = [];

    const particleCount = 110;

    for (let i = 0; i < particleCount; i++) {

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            speedX: Math.random() * 0.4 - 0.2,
            speedY: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.35 + 0.15
        });

    }


    /* ================================
       GLIMMER PARTICLES
    ================================= */

    const glimmerParticles = [];

    for (let i = 0; i < 18; i++) {

        glimmerParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: 0.5 + Math.random() * 0.7,
            radius: Math.random() * 1.8 + 0.8,
            opacity: Math.random() * 0.35 + 0.15
        });

    }


    /* ================================
       MOUSE INTERACTION
    ================================= */

    const mouse = {
        x: null,
        y: null
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('touchmove', (event) => {

        const touch = event.touches[0];

        mouse.x = touch.clientX;
        mouse.y = touch.clientY;

    }, { passive: true });


    /* ================================
       ANIMATION
    ================================= */

    function animate() {

        ctx.clearRect(0, 0, width, height);


        /* Glimmer particles */

        glimmerParticles.forEach(p => {

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 255, 255, ${p.opacity})`;

            ctx.fill();


            p.x += p.speed;

            if (p.x > width) {
                p.x = 0;
                p.y = Math.random() * height;
            }

            p.y += (Math.random() - 0.5) * 0.3;

        });


        /* Main particles */

        particles.forEach(p => {

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(110, 180, 255, ${p.opacity})`;

            ctx.fill();


            p.x += p.speedX;
            p.y += p.speedY;


            /* Gentle movement */

            p.speedX += Math.random() * 0.01 - 0.005;
            p.speedY += Math.random() * 0.01 - 0.005;


            /* Keep movement controlled */

            p.speedX = Math.max(
                -0.35,
                Math.min(0.35, p.speedX)
            );

            p.speedY = Math.max(
                -0.35,
                Math.min(0.35, p.speedY)
            );


            /* Bounce at edges */

            if (p.x < 0 || p.x > width) {
                p.speedX *= -1;
            }

            if (p.y < 0 || p.y > height) {
                p.speedY *= -1;
            }


            /* Subtle mouse interaction */

            if (mouse.x !== null && mouse.y !== null) {

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    p.x -= dx * 0.0015;
                    p.y -= dy * 0.0015;

                }

            }

        });


        requestAnimationFrame(animate);

    }


    animate();

    console.log('Wiob Digital loaded successfully.');

});