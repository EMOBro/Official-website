export function initLoader() {
    const loader = document.getElementById('loader');
    const contactContainer = document.querySelector('.contact-container');

    // Simulate content loading
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            contactContainer.style.display = 'block';
            
            // Fade in the contact container
            setTimeout(() => {
                contactContainer.style.opacity = '1';
                loader.style.display = 'none';
            }, 300);
        }, 1500); // Minimum loader display time
    });
}

export function createFluidBackground() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to full window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Fluid background particles
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = `rgba(135, 206, 235, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.7;
            ctx.shadowColor = 'rgba(135, 206, 235, 0.5)';
            ctx.shadowBlur = 10;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    const particlesCount = 100;
    const particles = Array.from({ length: particlesCount }, () => new Particle());

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(135, 206, 235, 0.1)');
        gradient.addColorStop(1, 'rgba(25, 25, 112, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Add copy functionality to contact info items
    const contactInfoItems = document.querySelectorAll('.info-item');
    contactInfoItems.forEach(item => {
        item.addEventListener('click', () => {
            // Find the text to copy (the <p> element)
            const textToCopy = item.querySelector('p').textContent;
            
            // Create or get existing popup
            let popup = document.getElementById('copy-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'copy-popup';
                popup.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 15px 30px;
                    border-radius: 10px;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    text-align: center;
                `;
                document.body.appendChild(popup);
            }

            // Use Clipboard API to copy text
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show popup
                popup.textContent = `已复制: ${textToCopy}`;
                popup.style.opacity = '1';

                // Temporary visual feedback on the item
                item.style.backgroundColor = 'rgba(135, 206, 235, 0.2)';
                
                // Hide popup and reset item after 2 seconds
                setTimeout(() => {
                    popup.style.opacity = '0';
                    item.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}