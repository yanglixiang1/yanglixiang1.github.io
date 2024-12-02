// 全屏切换
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 刷新页面
function refreshPage() {
    location.reload();
}

// 返回上一页
function goBack() {
    window.history.back();
}

// 主题切换
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// 运行时间计算
function runTime() {
    const startTime = new Date('2024-03-20').getTime(); // 设置你的网站开始时间
    const now = new Date().getTime();
    const runtime = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));
    document.getElementById('runtime').innerText = `本站已运行: ${runtime} 天`;
}

// 添加滚动动画
function addScrollAnimation() {
    const elements = document.querySelectorAll('.interest-item, .website-card, .social-links a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 添加平滑滚动效果
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// 添加hover音效
function addHoverSound() {
    const hoverSound = new Audio('hover.mp3'); // 需要添加音效文件
    const buttons = document.querySelectorAll('button, .interest-item, .website-card, .social-links a');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
    });
}

// 添加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 延迟加载非关键功能
    setTimeout(() => {
        initNonCriticalFeatures();
    }, 1000);

    // 立即初始化关键功能
    initCriticalFeatures();
});

function initCriticalFeatures() {
    runTime();
    addScrollAnimation();
    initThemePanel();
}

function initNonCriticalFeatures() {
    addSmoothScroll();
    addHoverSound();
    typeWelcomeText();
    addPageTransition();
    addScrollProgress();
    initCardEffect();
    initScrollIndicator();
    initSkillsAnimation();
    updateClock();
    getWeather();
    initParallaxScroll();
    initMouseLight();
}

// 添加页面切换动画
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('main');
    
    loadingScreen.style.opacity = '0';
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});

// 添加页面离开提示
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
});

// 打开模态框并显示图片
function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = 'imgs/微信图片_20241105101117.jpg'; // 设置图片路径
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

// 更新音乐时间
function updateMusicTime() {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    currentTime.textContent = formatTime(audioPlayer.currentTime);
    duration.textContent = formatTime(audioPlayer.duration);
}

// 格式化时间
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// 更新进度条
function updateProgressBar() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progress = document.getElementById('progress');
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percentage + '%';
}

// 设置音量
function setVolume() {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');
    audioPlayer.volume = volumeSlider.value;
}

// 提交评论
function submitComment() {
    const name = document.getElementById('commentName').value;
    const email = document.getElementById('commentEmail').value;
    const content = document.getElementById('commentContent').value;

    if (!name || !content) {
        alert('请填写昵称和评论内容！');
        return;
    }

    const comment = {
        name,
        email,
        content,
        date: new Date().toLocaleString()
    };

    addCommentToDOM(comment);
    saveComment(comment);
    clearCommentForm();
}

// 将评论添加到DOM
function addCommentToDOM(comment) {
    const commentsContainer = document.querySelector('.comments-container');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.name}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
    `;
    commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
}

// 保存评论到localStorage
function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.unshift(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// 清空评论表单
function clearCommentForm() {
    document.getElementById('commentName').value = '';
    document.getElementById('commentEmail').value = '';
    document.getElementById('commentContent').value = '';
}

// 加载已有评论
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.forEach(comment => addCommentToDOM(comment));
}

// 添加打字机欢语效果
function typeWelcomeText() {
    const texts = [
        "欢迎来到立翔的个人空间 ✨",
        "分享，创造，记录生活 🌟",
        "让我们一起探索这个世界 🚀"
    ];
    let textIndex = 0;
    let charIndex = 0;
    const typingText = document.querySelector('.typing-text');
    
    function type() {
        if (charIndex < texts[textIndex].length) {
            typingText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    type();
}

// 添加页面切换动画
function addPageTransition() {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                transitionElement.style.transform = 'scaleY(1)';
                setTimeout(() => {
                    window.location = link.href;
                }, 500);
            }
        });
    });
}

// 添加滚动进度指示器
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 添加相应的CSS
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--secondary-color);
        z-index: 10000;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);

// 初始化滚动进度条
addScrollProgress();

// 主题切换相关功能
function initThemePanel() {
    const themeBtn = document.querySelector('button[onclick="toggleTheme()"]');
    const themePanel = document.getElementById('themePanel');
    const themeColors = document.querySelectorAll('.theme-color');
    const themeModes = document.querySelectorAll('.theme-mode button');

    // 显示/隐藏主题面板
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themePanel.classList.toggle('active');
    });

    // 点击面板外关闭面板
    document.addEventListener('click', (e) => {
        if (!themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
            themePanel.classList.remove('active');
        }
    });

    // 颜色主题切换
    themeColors.forEach(color => {
        color.addEventListener('click', () => {
            const theme = color.dataset.theme;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme-color', theme);
            
            // 更新选中状态
            themeColors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
        });
    });

    // 模式切换
    themeModes.forEach(mode => {
        mode.addEventListener('click', () => {
            const modeId = mode.id;
            themeModes.forEach(m => m.classList.remove('active'));
            mode.classList.add('active');

            switch(modeId) {
                case 'lightMode':
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme-mode', 'light');
                    break;
                case 'darkMode':
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme-mode', 'dark');
                    break;
                case 'autoMode':
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.body.classList.toggle('dark-mode', prefersDark);
                    localStorage.setItem('theme-mode', 'auto');
                    break;
            }
        });
    });

    // 加载保存的主题设置
    const savedThemeColor = localStorage.getItem('theme-color');
    const savedThemeMode = localStorage.getItem('theme-mode');

    if (savedThemeColor) {
        document.body.setAttribute('data-theme', savedThemeColor);
        document.querySelector(`[data-theme="${savedThemeColor}"]`).classList.add('active');
    }

    if (savedThemeMode) {
        document.getElementById(`${savedThemeMode}Mode`).click();
    }
}

// 页面加载进度
function initPageProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const pageProgress = document.querySelector('.page-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                pageProgress.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    }, 200);
}

// 卡片光效
function initCardEffect() {
    const cards = document.querySelectorAll('.interest-item, .website-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 滚动指示器
function initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '0.6';
        }
    });
}

// 音乐可视化效果
class MusicVisualizer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.canvas = document.getElementById('visualizer');
        this.ctx = this.canvas.getContext('2d');
        this.audioElement = document.getElementById('audioPlayer');
        
        this.initialize();
    }

    initialize() {
        this.source = this.audioContext.createMediaElementSource(this.audioElement);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const barWidth = this.canvas.width / this.bufferLength * 2;
        let x = 0;
        
        for(let i = 0; i < this.bufferLength; i++) {
            const barHeight = (this.dataArray[i] / 255) * this.canvas.height;
            
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, `hsla(${i * 2}, 100%, 50%, 0.8)`);
            gradient.addColorStop(1, `hsla(${i * 2}, 100%, 50%, 0.2)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// 添加3D卡片光效
function init3DCardEffect() {
    const cards = document.querySelectorAll('.card3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 添加倾斜效果
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.querySelector('.card3d-content').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card3d-content').style.transform = '';
        });
    });
}

// 添加技能进度条动画
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// 更新时钟
function updateClock() {
    const now = new Date();
    const timeElement = document.querySelector('.clock .time');
    const dateElement = document.querySelector('.clock .date');

    // 更新时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // 更新日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateElement.textContent = `${year}年${month}月${day}日`;
}

// 获取天气信息
async function getWeather() {
    try {
        // 这里使用模拟数据，实际使用时需要替换为真实的天气API
        const weatherData = {
            temperature: 25,
            condition: 'sunny',
            location: '北京'
        };

        updateWeatherUI(weatherData);
    } catch (error) {
        console.error('获取天气信息失败:', error);
    }
}

// 更新天气UI
function updateWeatherUI(data) {
    const temperatureElement = document.querySelector('.weather .temperature');
    const locationElement = document.querySelector('.weather .location');
    const weatherIcon = document.querySelector('.weather i');

    temperatureElement.textContent = `${data.temperature}°C`;
    locationElement.textContent = data.location;

    // 根据天气状况更新图标
    const weatherIcons = {
        sunny: 'fa-sun',
        cloudy: 'fa-cloud',
        rainy: 'fa-cloud-rain',
        snowy: 'fa-snowflake'
    };

    weatherIcon.className = `fas ${weatherIcons[data.condition] || 'fa-cloud-sun'}`;
}

// 背景切换功能
function toggleBackgroundPanel() {
    const panel = document.getElementById('backgroundPanel');
    panel.classList.toggle('active');
}

// 切换背景图片
function changeBackground(element) {
    const bgImage = element.dataset.bg;
    document.body.style.backgroundImage = `url('${bgImage}')`;
    
    // 保存选择
    localStorage.setItem('selected-background', bgImage);
    
    // 更新选中状态
    document.querySelectorAll('.background-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
}

// 图片画廊功能
let currentImageIndex = 0;
const galleryImages = [];

function openGalleryModal(element) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImage');
    
    // 收集所有图片
    galleryImages.length = 0;
    document.querySelectorAll('.gallery-item img').forEach(img => {
        galleryImages.push(img.src);
    });
    
    // 设置当前图片
    currentImageIndex = galleryImages.indexOf(element.querySelector('img').src);
    modalImg.src = galleryImages[currentImageIndex];
    
    modal.style.display = 'block';
}

function closeGalleryModal() {
    document.getElementById('galleryModal').style.display = 'none';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('galleryModalImage').src = galleryImages[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('galleryModalImage').src = galleryImages[currentImageIndex];
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (document.getElementById('galleryModal').style.display === 'block') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGalleryModal();
    }
});

// 在页面加载时加载保存的背景
document.addEventListener('DOMContentLoaded', () => {
    // 原有的初始化代码...
    
    const savedBg = localStorage.getItem('selected-background');
    if (savedBg) {
        document.body.style.backgroundImage = `url('${savedBg}')`;
        const option = document.querySelector(`[data-bg="${savedBg}"]`);
        if (option) option.classList.add('active');
    }
});

// 添加视差滚动效果
function initParallaxScroll() {
    const parallaxElements = document.querySelectorAll('.feature-card, .portfolio-item');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.2;
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// 添加鼠标移动光效
function initMouseLight() {
    const cards = document.querySelectorAll('.interest-item, .website-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 添加图片懒加载功能
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 优化背景图片加载
function loadBackgroundImages() {
    const elements = document.querySelectorAll('[data-background]');
    elements.forEach(element => {
        const url = element.dataset.background;
        const img = new Image();
        img.onload = () => {
            element.style.backgroundImage = `url(${url})`;
        };
        img.src = url;
    });
}