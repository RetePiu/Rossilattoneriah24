document.addEventListener('DOMContentLoaded', () => {
    
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // header offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Read More Toggle ---
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');

    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener('click', () => {
            if (moreText.style.display === 'none' || moreText.style.display === '') {
                moreText.style.display = 'block';
                readMoreBtn.innerText = 'Mostra meno';
            } else {
                moreText.style.display = 'none';
                readMoreBtn.innerText = 'Scopri di più';
            }
        });
    }

    // --- History Carousel ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentSlideIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarousel(currentSlideIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentSlideIndex);
    });

    // Auto-advance
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarousel(currentSlideIndex);
    }, 5000);


    // --- Before/After Comparison Sliders ---
    const sliders = document.querySelectorAll('[data-compare]');

    sliders.forEach(slider => {
        const afterImg = slider.querySelector('.comparison-after');
        const handle = slider.querySelector('.slider-handle');

        const moveSlider = (e) => {
            const rect = slider.getBoundingClientRect();
            let x;
            
            if (e.type === 'mousemove') {
                x = e.clientX - rect.left;
            } else if (e.type === 'touchmove') {
                x = e.touches[0].clientX - rect.left;
            }

            let positionPercentage = (x / rect.width) * 100;
            
            // Constrain
            if (positionPercentage < 0) positionPercentage = 0;
            if (positionPercentage > 100) positionPercentage = 100;

            afterImg.style.width = `${positionPercentage}%`;
            handle.style.left = `${positionPercentage}%`;
        };

        slider.addEventListener('mousemove', moveSlider);
        slider.addEventListener('touchmove', moveSlider);
    });


    // --- Copy to Clipboard ---
    const copyBtn = document.getElementById('copyBtn');
    const addressText = document.getElementById('address').innerText;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(addressText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Indirizzo copiato!';
            copyBtn.style.backgroundColor = '#27ae60';
            copyBtn.style.borderColor = '#27ae60';
            copyBtn.style.color = 'white';

            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = 'transparent';
                copyBtn.style.borderColor = '#b87333';
                copyBtn.style.color = '#b87333';
            }, 2000);
        }).catch(err => {
            console.error('Errore durante la copia:', err);
        });
    });

    // --- Navbar Glow on Scroll ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
