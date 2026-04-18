/* ============================================
   AIDEFEND Labs - Main JavaScript v2
   Particle network + animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Full-Page Particle Network Canvas ---
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    let mouse = { x: -9999, y: -9999 };
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Node pattern definitions (normalized 0-1)
    const patternA = [
      { x: 0.30, y: 0.25, mag: 1.0 },
      { x: 0.70, y: 0.20, mag: 1.0 },
      { x: 0.50, y: 0.40, mag: 0.9 },
      { x: 0.20, y: 0.50, mag: 0.7 },
      { x: 0.38, y: 0.53, mag: 0.7 },
      { x: 0.62, y: 0.48, mag: 0.7 },
      { x: 0.80, y: 0.50, mag: 0.7 },
      { x: 0.50, y: 0.60, mag: 0.8 },
      { x: 0.50, y: 0.78, mag: 0.6 },
      { x: 0.15, y: 0.35, mag: 0.4 },
      { x: 0.85, y: 0.30, mag: 0.4 },
    ];
    const edgesA = [
      [0, 2], [1, 2], [0, 3], [0, 4], [3, 4],
      [1, 5], [1, 6], [5, 6], [2, 7], [7, 8],
      [0, 9], [1, 10],
    ];

    const patternB = [
      { x: 0.30, y: 0.62, mag: 1.0 },
      { x: 0.92, y: 0.50, mag: 0.9 },
      { x: 0.28, y: 0.35, mag: 0.8 },
      { x: 0.72, y: 0.35, mag: 0.8 },
      { x: 0.15, y: 0.10, mag: 0.7 },
      { x: 0.22, y: 0.20, mag: 0.7 },
      { x: 0.62, y: 0.58, mag: 0.7 },
      { x: 0.18, y: 0.45, mag: 0.7 },
      { x: 0.08, y: 0.15, mag: 0.6 },
      { x: 0.20, y: 0.80, mag: 0.5 },
    ];
    const edgesB = [
      [4, 8], [4, 5], [5, 2], [2, 7], [7, 0],
      [0, 6], [6, 3], [3, 1],
      [0, 9],
    ];

    // Placement configs (fixed viewport positions)
    const patternConfigs = [
      {
        nodes: patternA, edges: edgesA,
        vx: 0.05, vy: 0.12, vw: 0.38, vh: 0.65,
        color1: [59, 130, 246], color2: [6, 214, 160],
      },
      {
        nodes: patternB, edges: edgesB,
        vx: 0.55, vy: 0.10, vw: 0.38, vh: 0.70,
        color1: [139, 92, 246], color2: [6, 182, 212],
      },
    ];

    function createParticles() {
      const count = Math.min(Math.floor((w * h) / 10000), 140);
      particles = [];
      const colors = [
        [59, 130, 246],
        [6, 182, 212],
        [6, 214, 160],
      ];
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.6 + 0.3,
          color,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    let frame = 0;

    function drawPatterns() {
      for (const cfg of patternConfigs) {
        const ox = cfg.vx * w;
        const oy = cfg.vy * h;
        const cw = cfg.vw * w;
        const ch = cfg.vh * h;
        const [r1, g1, b1] = cfg.color1;
        const [r2, g2, b2] = cfg.color2;

        // Compute positions with subtle drift
        const pts = cfg.nodes.map((s, idx) => {
          const drift = 4;
          const speed1 = 0.0015 + idx * 0.0004;
          const speed2 = 0.002 + idx * 0.0003;
          const phase1 = idx * 1.7;
          const phase2 = idx * 2.3;
          return {
            x: ox + s.x * cw + Math.sin(frame * speed1 + phase1) * drift,
            y: oy + s.y * ch + Math.cos(frame * speed2 + phase2) * drift,
            mag: s.mag,
          };
        });

        // Draw edges
        for (const [a, b] of cfg.edges) {
          const pa = pts[a], pb = pts[b];
          const gradient = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
          gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.18)`);
          gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0.18)`);
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2;
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }

        // Draw nodes
        for (const p of pts) {
          const pulse = Math.sin(frame * 0.015 + p.x * 0.01 + p.y * 0.01) * 0.3 + 0.7;
          const nodeR = (2 + p.mag * 3) * pulse;
          const nodeOpacity = (0.3 + p.mag * 0.5) * pulse;

          // Glow
          const glowR = nodeR * 5;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          glow.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, ${nodeOpacity * 0.25})`);
          glow.addColorStop(0.5, `rgba(${r1}, ${g1}, ${b1}, ${nodeOpacity * 0.08})`);
          glow.addColorStop(1, `rgba(${r1}, ${g1}, ${b1}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${nodeOpacity})`;
          ctx.fill();

          // Center highlight
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeR * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity * 0.9})`;
          ctx.fill();
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Background patterns
      drawPatterns();

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.25;
            const ci = particles[i].color;
            const cj = particles[j].color;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${(ci[0]+cj[0])>>1}, ${(ci[1]+cj[1])>>1}, ${(ci[2]+cj[2])>>1}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const alpha = (1 - dist / 250) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 214, 160, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Particles
      for (const p of particles) {
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.15 + 0.85;
        const currentOpacity = p.opacity * pulse;
        const currentR = p.r * pulse;
        const [cr, cg, cb] = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${currentOpacity * 0.1})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${currentOpacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Mouse repel
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120 && mDist > 0) {
          const force = (120 - mDist) / 120 * 0.8;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      animId = requestAnimationFrame(animate);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animate();
      }
    });

    resize();
    createParticles();
    animate();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Sticky Nav Shadow ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // --- Mobile Nav Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',
        navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Animated counter for stats ---
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // --- Year in footer ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
