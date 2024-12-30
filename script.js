document.addEventListener('DOMContentLoaded', function() {
    const background = document.querySelector('.background-image');
    
    // 背景跟随鼠标移动效果
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = 20 * (mouseX - 0.5);
        const moveY = 20 * (mouseY - 0.5);
        
        background.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // QQ二维码弹窗
    const qqLink = document.querySelector('.qq-link');
    const qqModal = document.querySelector('.qq-modal');
    
    // 微信二维码弹窗
    const wechatLink = document.querySelector('.wechat-link');
    const wechatModal = document.querySelector('.wechat-modal');
    
    // 所有关闭按钮
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // 优化二维码弹窗动画
    function showModal(modal) {
        modal.style.opacity = '0';
        modal.classList.add('show-modal');
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    function hideModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show-modal');
        }, 300);
    }

    // 显示QQ二维码
    qqLink.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(qqModal);
    });
    
    // 显示微信二维码
    wechatLink.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(wechatModal);
    });
    
    // 关闭弹窗
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.qr-modal');
            hideModal(modal);
        });
    });
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('qr-modal')) {
            hideModal(e.target);
        }
    });

    // 添加社交图标悬停音效（可选）
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('path/to/hover-sound.mp3'); // 可选：添加悬停音效
            hoverSound.volume = 0.2;
            hoverSound.play().catch(() => {});
        });
    });

    // 添加轮播图功能
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-button.prev');
        const nextBtn = document.querySelector('.carousel-button.next');
        
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;

        // 初始化位置
        function updateCarousel() {
            items.forEach((item, index) => {
                item.className = 'carousel-item';
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === (currentIndex - 1 + items.length) % items.length) {
                    item.classList.add('prev');
                } else if (index === (currentIndex + 1) % items.length) {
                    item.classList.add('next');
                } else {
                    item.classList.add('hidden');
                }
            });
        }

        // 切换到下一张
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        // 切换到上一张
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        // 鼠标拖动效果
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            carousel.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const diffX = e.pageX - startX;
            if (Math.abs(diffX) > 100) {
                if (diffX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                isDragging = false;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        // 按钮点击事件
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // 自动播放
        let autoplayInterval = setInterval(nextSlide, 5000);

        // 鼠标悬停时暂停自动播放
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });

        // 初始化显示
        updateCarousel();
    }

    // 在文档加载完成后初始化轮播图
    initCarousel();

    // 添加滚动显示动画
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.comparison-pair').forEach(el => {
        observer.observe(el);
    });

    // 添加滚动指示器功能
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('section');

    function updateScrollIndicator() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (currentScroll >= sectionTop - windowHeight/2 &&
                currentScroll < sectionTop + sectionHeight - windowHeight/2) {
                scrollDots[index].classList.add('active');
            } else {
                scrollDots[index].classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateScrollIndicator);

    // 点击滚动到对应部分
    scrollDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(dot.dataset.section);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 添加页面滚动动画
    function initScrollAnimations() {
        const sections = document.querySelectorAll('section');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        
        const observerOptions = {
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    updateScrollDot(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            section.classList.add('section-transition');
            observer.observe(section);
        });
        
        function updateScrollDot(sectionId) {
            scrollDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.dataset.section === sectionId) {
                    dot.classList.add('active');
                }
            });
        }
    }

    // 初始化音乐可视化器
    function initMusicVisualizer() {
        const visualizerContainer = document.querySelector('.visualizer-container');
        const musicPlayer = document.querySelector('.music-player');
        
        // 当音乐播放器显示时显示可视化器
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('show')) {
                    visualizerContainer.classList.add('show');
                } else {
                    visualizerContainer.classList.remove('show');
                }
            });
        });
        
        observer.observe(musicPlayer, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initMusicVisualizer();
    });

    // 横屏提示处理
    function handleOrientation() {
        const landscapeTip = document.querySelector('.landscape-tip');
        if (window.innerWidth <= 768) {
            if (window.orientation === 0 || window.orientation === 180) {
                // 竖屏状态
                landscapeTip.style.display = 'block';
                setTimeout(() => {
                    landscapeTip.style.opacity = '0';
                    setTimeout(() => {
                        landscapeTip.style.display = 'none';
                    }, 500);
                }, 3000);
            } else {
                // 横屏状态
                landscapeTip.style.display = 'none';
            }
        } else {
            landscapeTip.style.display = 'none';
        }
    }

    // 监听屏幕旋转
    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('resize', handleOrientation);
    document.addEventListener('DOMContentLoaded', handleOrientation);

    // 横竖屏切换功能
    function initOrientationToggle() {
        const orientationBtn = document.querySelector('.orientation-btn');
        const orientationIcon = orientationBtn.querySelector('i');
        const orientationText = orientationBtn.querySelector('.orientation-text');
        
        function toggleOrientation() {
            if (screen.orientation) {
                // 检查当前方向
                if (screen.orientation.type.includes('portrait')) {
                    // 当前是竖屏，切换到横屏
                    screen.orientation.lock('landscape')
                        .then(() => {
                            orientationIcon.style.transform = 'rotate(90deg)';
                            orientationText.textContent = '切换竖屏';
                        })
                        .catch(err => console.log('横屏切换失败:', err));
                } else {
                    // 当前是横屏，切换到竖屏
                    screen.orientation.lock('portrait')
                        .then(() => {
                            orientationIcon.style.transform = 'rotate(0)';
                            orientationText.textContent = '切换横屏';
                        })
                        .catch(err => console.log('竖屏切换失败:', err));
                }
            } else {
                // 不支持 screen.orientation API 的情况
                alert('您的设备不支持屏幕方向切换');
            }
        }

        // 更新按钮状态
        function updateOrientationButton() {
            if (window.orientation === 0 || window.orientation === 180) {
                // 竖屏状态
                orientationIcon.style.transform = 'rotate(0)';
                orientationText.textContent = '切换横屏';
            } else {
                // 横屏状态
                orientationIcon.style.transform = 'rotate(90deg)';
                orientationText.textContent = '切换竖屏';
            }
        }

        // 添加点击事件
        orientationBtn.addEventListener('click', toggleOrientation);
        
        // 监听屏幕旋转
        window.addEventListener('orientationchange', updateOrientationButton);
        
        // 初始化按钮状态
        updateOrientationButton();
    }

    // 在 DOMContentLoaded 事件中初始化
    document.addEventListener('DOMContentLoaded', () => {
        // ... 其他初始化代码 ...
        initOrientationToggle();
    });
}); 