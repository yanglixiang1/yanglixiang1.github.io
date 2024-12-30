// 悬浮气泡效果
function createBubbles() {
    const container = document.querySelector('.floating-bubbles');
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = Math.random() * 60 + 20 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(bubble);
    }
}

// 鼠标跟随效果
function initCursorEffect() {
    const cursor = document.querySelector('.cursor-effect');
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    
    dot.className = 'cursor-dot';
    outline.className = 'cursor-outline';
    cursor.appendChild(dot);
    cursor.appendChild(outline);
    
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        dot.style.left = cursorX + 'px';
        dot.style.top = cursorY + 'px';
    });
    
    function animate() {
        let distX = cursorX - outlineX;
        let distY = cursorY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // 交互效果
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    // 为可点击元素添加悬停效果
    const clickables = document.querySelectorAll('a, button, .weather-toggle, .social-icon, .music-toggle');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// 回到顶部功能
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('light-theme');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
    });
}

// 时钟功能优化
function initClock() {
    const clockWidget = document.querySelector('.clock-widget');
    const clockToggle = document.querySelector('.clock-toggle');
    const hoursDisplay = document.querySelector('.hours');
    const minutesDisplay = document.querySelector('.minutes');
    const secondsDisplay = document.querySelector('.seconds');
    const dateDisplay = document.querySelector('.date');
    const dayDisplay = document.querySelector('.day');
    const runningTime = document.querySelector('.running-time');

    // 网站启动时间
    const startTime = new Date();

    // 计算运行时间
    function getRunningTime() {
        const now = new Date();
        const diff = now - startTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `已运行: ${days}天${hours}小时${minutes}分钟`;
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // 更新时间显示
        hoursDisplay.textContent = String(hours).padStart(2, '0');
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
        
        // 更新日期
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        dateDisplay.textContent = `${year}年${month}月${date}日`;
        
        // 更新星期
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        dayDisplay.textContent = `星期${days[now.getDay()]}`;

        // 更新运行时间
        runningTime.textContent = getRunningTime();

        requestAnimationFrame(updateClock);
    }

    // 时钟开关功能
    clockToggle.addEventListener('click', () => {
        clockWidget.classList.toggle('hidden');
        clockToggle.classList.toggle('active');
    });

    updateClock();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    initCursorEffect();
    initBackToTop();
    initThemeToggle();
    initClock();
}); 