// JavaScript for Arnold N Unson's Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Video Player & Playhead Timeline Sync ---
    const video = document.getElementById('motion-video');
    const playBtn = document.getElementById('video-play-btn');
    const playhead = document.getElementById('playhead');
    const timerText = document.getElementById('video-timer');
    const iconPlay = playBtn ? playBtn.querySelector('.icon-play') : null;
    const iconPause = playBtn ? playBtn.querySelector('.icon-pause') : null;

    if (video && playBtn) {
        // Play/Pause toggler
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                if (iconPlay) iconPlay.style.display = 'none';
                if (iconPause) iconPause.style.display = 'block';
            } else {
                video.pause();
                if (iconPlay) iconPlay.style.display = 'block';
                if (iconPause) iconPause.style.display = 'none';
            }
        });

        // Time format utility (e.g., 00:04)
        const formatTime = (time) => {
            const mins = Math.floor(time / 60);
            const secs = Math.floor(time % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        // Sync playhead and timer
        video.addEventListener('timeupdate', () => {
            const current = video.currentTime;
            const duration = video.duration || 5; // fallback duration
            
            // Format time display
            timerText.textContent = `${formatTime(current)} / ${formatTime(duration)}`;

            // Sync playhead position (from 5% to 95% width)
            const percent = (current / duration) * 90 + 5;
            if (playhead) {
                playhead.style.left = `${percent}%`;
            }
        });

        // Reset playhead on video end
        video.addEventListener('ended', () => {
            if (iconPlay) iconPlay.style.display = 'block';
            if (iconPause) iconPause.style.display = 'none';
            if (playhead) playhead.style.left = '5%';
        });
    }



    // --- 3. Contact Form Submission (localStorage) ---
    const contactForm = document.getElementById('contactForm');
    const successBox = document.getElementById('contactSuccess');

    if (contactForm && successBox) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('c-name').value;
            const format = document.getElementById('c-format').value;
            const email = document.getElementById('c-email').value;
            const message = document.getElementById('c-message').value;

            const submission = {
                designer: 'Arnold N Unson',
                name,
                format,
                email,
                message,
                timestamp: new Date().toISOString()
            };

            // Retrieve and append to storage
            const messages = JSON.parse(localStorage.getItem('arnold_portfolio_messages') || '[]');
            messages.push(submission);
            localStorage.setItem('arnold_portfolio_messages', JSON.stringify(messages));

            // View state toggle
            contactForm.style.display = 'none';
            successBox.style.display = 'block';

            // Auto reset form view after 4 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                successBox.style.display = 'none';
            }, 4000);
        });
    }
});
