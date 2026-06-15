// JavaScript for Arnold N Unson's Freelance Portfolio

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Nav scroll shadow ---
    const nav = document.getElementById('site-nav');
    const onScroll = () => {
        if (window.scrollY > 60) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks  = document.querySelector('.nav-links');
    hamburger?.addEventListener('click', () => {
        navLinks?.classList.toggle('nav-open');
        hamburger.classList.toggle('is-open');
    });
    // Close menu on link click
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            hamburger?.classList.remove('is-open');
        });
    });

    // --- 3. Scroll Reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // --- 4. Video Player & Timeline Playhead Sync ---
    const video    = document.getElementById('motion-video');
    const playBtn  = document.getElementById('video-play-btn');
    const playhead = document.getElementById('playhead');
    const timer    = document.getElementById('video-timer');
    const iconPlay  = playBtn?.querySelector('.icon-play');
    const iconPause = playBtn?.querySelector('.icon-pause');

    if (video && playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                if (iconPlay)  iconPlay.style.display  = 'none';
                if (iconPause) iconPause.style.display = 'block';
            } else {
                video.pause();
                if (iconPlay)  iconPlay.style.display  = 'block';
                if (iconPause) iconPause.style.display = 'none';
            }
        });

        const fmt = (t) => {
            const m = Math.floor(t / 60);
            const s = Math.floor(t % 60);
            return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        };

        video.addEventListener('timeupdate', () => {
            const dur = video.duration || 5;
            if (timer) timer.textContent = `${fmt(video.currentTime)} / ${fmt(dur)}`;
            if (playhead) {
                const pct = (video.currentTime / dur) * 90 + 5;
                playhead.style.left = `${pct}%`;
            }
        });

        video.addEventListener('ended', () => {
            if (iconPlay)  iconPlay.style.display  = 'block';
            if (iconPause) iconPause.style.display = 'none';
            if (playhead) playhead.style.left = '5%';
        });
    }

    // --- 5. Contact Form ---
    const contactForm  = document.getElementById('contactForm');
    const successBox   = document.getElementById('contactSuccess');
    const submitBtn    = contactForm?.querySelector('.btn-submit-star');

    if (contactForm && successBox) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('c-name')?.value;
            const email   = document.getElementById('c-email')?.value;
            const format  = document.getElementById('c-format')?.value;
            const budget  = document.getElementById('c-budget')?.value;
            const message = document.getElementById('c-message')?.value;

            // Validation
            if (!name || !email || !format || !message) return;

            // Animate button
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                submitBtn.style.pointerEvents = 'none';
            }

            // Save to localStorage
            const msgs = JSON.parse(localStorage.getItem('arnold_leads') || '[]');
            msgs.push({ name, email, format, budget, message, ts: new Date().toISOString() });
            localStorage.setItem('arnold_leads', JSON.stringify(msgs));

            // Show success after a beat
            setTimeout(() => {
                contactForm.style.display = 'none';
                successBox.style.display  = 'flex';

                // Reset after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    successBox.style.display  = 'none';
                    if (submitBtn) {
                        submitBtn.innerHTML = '<span>Send Message</span><div class="btn-star-icon">✦</div>';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.pointerEvents = '';
                    }
                }, 5000);
            }, 800);
        });
    }

    // --- 6. Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id], footer');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(link => {
                    link.classList.toggle(
                        'nav-active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));

});
