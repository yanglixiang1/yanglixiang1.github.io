// 延迟加载音乐播放器
function loadMusicPlayer() {
    const container = document.getElementById('music-player-container');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', 'no');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('marginwidth', '0');
    iframe.setAttribute('marginheight', '0');
    iframe.setAttribute('width', '330');
    iframe.setAttribute('height', '86');
    iframe.setAttribute('src', '//music.163.com/outchain/player?type=2&id=28892408&auto=1&height=66');
    container.appendChild(iframe);
    
    // 隐藏加载按钮
    document.querySelector('.load-music-btn').style.display = 'none';
}

// 图片懒加载优化
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 回退方案
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// 添加更多性能监控指标
const performanceMetrics = {
    observe() {
        // FCP (First Contentful Paint)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FCP:', entry.startTime);
            }
        }).observe({entryTypes: ['paint']});

        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({entryTypes: ['largest-contentful-paint']});

        // FID (First Input Delay)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({entryTypes: ['first-input']});

        // CLS (Cumulative Layout Shift)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }).observe({entryTypes: ['layout-shift']});
    }
};

// 初始化性能监控
document.addEventListener('DOMContentLoaded', () => {
    performanceMetrics.observe();
}); 