
/* =========================================
   CEO RIFAT_FX
   PREMIUM DIGITAL DEVELOPMENT STUDIO
   INTERACTIVE ENGINE V2.0
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // PAGE LOADER
  const loader = document.getElementById("loader");

  function hideLoader() {
    loader?.classList.add("hide");
  }

  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 3500);


  // NAVBAR
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  function updateNavbar() {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
    backToTop?.classList.toggle("show", window.scrollY > 450);
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();


  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      navLinks &&
      menuToggle &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });


  // BACK TO TOP
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  // ALL INTERNAL LINKS
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetID);

      if (!target) {
        event.preventDefault();
        console.warn("Missing section:", targetID);
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Keep the URL synchronized with the destination.
      history.replaceState(null, "", targetID);

    });

  });


  // AUTO TYPING
  const typingElement = document.getElementById("typingText");

  const words = [
    "DIGITAL EXPERIENCES.",
    "MODERN WEBSITES.",
    "SOFTWARE SOLUTIONS.",
    "AI AUTOMATION.",
    "FUTURE TECHNOLOGY.",
    "CREATIVE APPLICATIONS."
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {

    if (!typingElement) return;

    const word = words[wordIndex];

    if (!deleting) {

      charIndex++;
      typingElement.textContent = word.substring(0, charIndex);

      if (charIndex === word.length) {
        deleting = true;
        setTimeout(typeEffect, 1400);
        return;
      }

    } else {

      charIndex--;
      typingElement.textContent = word.substring(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

    }

    setTimeout(typeEffect, deleting ? 35 : 75);
  }

  typeEffect();


  // SCROLL REVEAL
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach(item => revealObserver.observe(item));

  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }


  // ANIMATED NUMBERS
  const counters = document.querySelectorAll(".counter");

  if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1800;
        const start = performance.now();

        function count(now) {

          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);

          counter.textContent = Math.floor(target * ease).toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(count);
          } else {
            counter.textContent = target.toLocaleString();
          }

        }

        requestAnimationFrame(count);
        observer.unobserve(counter);

      });

    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

  }


  // MOUSE GLOW
  const mouseGlow = document.getElementById("mouseGlow");

  if (window.matchMedia("(pointer:fine)").matches) {

    window.addEventListener("mousemove", event => {

      if (!mouseGlow) return;

      mouseGlow.style.left = event.clientX + "px";
      mouseGlow.style.top = event.clientY + "px";

    }, { passive: true });

  } else {
    mouseGlow?.style.setProperty("display", "none");
  }


  // PROJECT 3D TILT
  if (window.matchMedia("(pointer:fine)").matches) {

    document.querySelectorAll(".project-card").forEach(card => {

      card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * 5;
        const rotateY = (x - 0.5) * 5;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

    });

  }


  // CLICK / TOUCH RIPPLE
  document.querySelectorAll(".btn, .contact-card, .start-resources a").forEach(element => {

    element.addEventListener("pointerdown", event => {

      const rect = element.getBoundingClientRect();

      const ripple = document.createElement("span");

      ripple.style.cssText = `
        position:absolute;
        width:15px;
        height:15px;
        border-radius:50%;
        background:rgba(255,255,255,.35);
        pointer-events:none;
        left:${event.clientX - rect.left}px;
        top:${event.clientY - rect.top}px;
        transform:translate(-50%,-50%) scale(0);
        animation:rifatRipple .65s ease-out forwards;
      `;

      element.appendChild(ripple);

      setTimeout(() => ripple.remove(), 700);

    });

  });

  const rippleStyle = document.createElement("style");

  rippleStyle.textContent = `
    @keyframes rifatRipple {
      to {
        transform:translate(-50%,-50%) scale(20);
        opacity:0;
      }
    }
  `;

  document.head.appendChild(rippleStyle);


  // FAQ ACCORDION
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach(other => {
        if (other !== item) {
          other.open = false;
        }
      });

    });

  });


  // ACTIVE NAVIGATION
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-links a[href^='#']");

  if ("IntersectionObserver" in window) {

    const navObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navItems.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );

        });

      });

    }, {
      rootMargin: "-25% 0px -65% 0px"
    });

    sections.forEach(section => navObserver.observe(section));

  }


  // PARTICLE ENGINE
  const canvas = document.getElementById("particles");
  const ctx = canvas?.getContext("2d");

  if (canvas && ctx) {

    let particles = [];
    let width = 0;
    let height = 0;
    let animationFrame = null;

    const particleCount = window.innerWidth < 768 ? 25 : 55;

    function resizeCanvas() {

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    }

    function createParticles() {

      particles = [];

      for (let i = 0; i < particleCount; i++) {

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + .5,
          speedX: (Math.random() - .5) * .35,
          speedY: (Math.random() - .5) * .35,
          alpha: Math.random() * .4 + .2
        });

      }

    }

    function drawParticles() {

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(80,190,255,${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {

          const other = particles[j];

          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle =
              `rgba(100,160,255,${.08 * (1 - distance / 100)})`;

            ctx.lineWidth = .6;
            ctx.stroke();

          }

        }

      });

    }

    function animate() {

      if (document.hidden) {
        animationFrame = null;
        return;
      }

      drawParticles();
      animationFrame = requestAnimationFrame(animate);

    }

    function startParticles() {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function stopParticles() {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    resizeCanvas();
    createParticles();
    startParticles();

    window.addEventListener("resize", () => {
      stopParticles();
      resizeCanvas();
      createParticles();
      startParticles();
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopParticles();
      } else {
        startParticles();
      }
    });

  }


  // CURRENT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // BROKEN / EMPTY INTERNAL LINK CHECK
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  let brokenLinks = [];

  internalLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === "#") {
      brokenLinks.push(href);
      return;
    }

    if (!document.querySelector(href)) {
      brokenLinks.push(href);
    }

  });

  if (brokenLinks.length) {
    console.warn("Missing website destinations:", brokenLinks);
  } else {
    console.log("✓ All internal navigation destinations are connected.");
  }


  // SYSTEM READY
  console.log(
    "%c CEO RIFAT_FX ",
    "background:#38bdf8;color:#07111a;font-size:20px;font-weight:900;padding:12px;"
  );

  console.log(
    "%c PREMIUM DIGITAL DEVELOPMENT ENGINE INITIALIZED ",
    "color:#39f5a5;font-size:12px;font-weight:bold;"
  );

});
