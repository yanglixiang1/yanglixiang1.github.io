class ParallaxBackground {
    constructor() {
        this.background = document.body;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.moveStrength = 25;
        this.currentBg = 0;
        this.backgrounds = [
            'imgs/【哲风壁纸】2024-11-08 12_01_08.png',
            'imgs/【哲风壁纸】2024-11-08 12_45_57.png'
        ];
        
        // 预加载和缓存所有背景图片
        this.imageCache = new Map();
        this.preloadImages();
        this.initialize();
        
        // 添加窗口大小变化监听
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    async preloadImages() {
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.imageCache.set(src, img);
                    resolve(img);
                };
                img.onerror = reject;
                img.src = src;
            });
        };

        try {
            await Promise.all(this.backgrounds.map(src => loadImage(src)));
            document.body.classList.add('backgrounds-loaded');
        } catch (error) {
            console.error('Error preloading images:', error);
        }
    }

    initialize() {
        // 设置初始背景
        const savedIndex = localStorage.getItem('background-index');
        this.currentBg = savedIndex ? parseInt(savedIndex) : 0;
        this.setBackground(this.currentBg);
        
        // 使用 Intersection Observer 优化背景切换面板
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const option = entry.target;
                        const img = option.querySelector('img');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        // 观察背景选项
        document.querySelectorAll('.background-option').forEach((option, index) => {
            observer.observe(option);
            option.addEventListener('click', () => {
                this.switchToBackground(index);
                this.updateActiveState(index);
            });
        });
    }

    handleResize() {
        // 使用 requestAnimationFrame 优化resize处理
        if (this.resizeTimeout) {
            cancelAnimationFrame(this.resizeTimeout);
        }
        
        this.resizeTimeout = requestAnimationFrame(() => {
            this.centerX = window.innerWidth / 2;
            this.centerY = window.innerHeight / 2;
        });
    }

    setBackground(index) {
        const url = this.backgrounds[index];
        if (this.imageCache.has(url)) {
            this.background.style.backgroundImage = `url('${url}')`;
            this.currentBg = index;
            localStorage.setItem('background-index', index);
        }
    }

    switchToBackground(index) {
        if (index === this.currentBg) return;

        // 使用 CSS transforms 优化过渡效果
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${this.backgrounds[index]}');
            background-size: cover;
            background-position: center;
            opacity: 0;
            transform: translate3d(0,0,0);
            transition: opacity 0.3s ease;
            z-index: 1;
            will-change: opacity;
        `;

        document.body.appendChild(overlay);
        
        // 强制重绘以确保过渡效果平滑
        overlay.getBoundingClientRect();
        overlay.style.opacity = '1';

        setTimeout(() => {
            this.setBackground(index);
            overlay.style.opacity = '0';
            overlay.addEventListener('transitionend', () => {
                overlay.remove();
            }, { once: true });
        }, 300);
    }

    updateActiveState(activeIndex) {
        requestAnimationFrame(() => {
            document.querySelectorAll('.background-option').forEach((option, index) => {
                option.classList.toggle('active', index === activeIndex);
            });
        });
    }

    handleMouseMove(e) {
        // 使用 requestAnimationFrame 优化视差效果
        if (this.moveTimeout) {
            cancelAnimationFrame(this.moveTimeout);
        }

        this.moveTimeout = requestAnimationFrame(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const deltaX = (mouseX - this.centerX) / this.centerX;
            const deltaY = (mouseY - this.centerY) / this.centerY;
            
            const moveX = deltaX * this.moveStrength;
            const moveY = deltaY * this.moveStrength;
            
            // 使用 transform3d 优化性能
            const transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            this.background.style.transform = transform;
            
            const overlay = document.querySelector('div[style*="position: fixed"]');
            if (overlay) {
                overlay.style.transform = transform;
            }
        });
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
        this.imageCache.clear();
    }
}

// 初始化背景效果
const parallaxBg = new ParallaxBackground();

// 清理函数
window.addEventListener('unload', () => {
    parallaxBg.destroy();
});