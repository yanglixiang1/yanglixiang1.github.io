class LoadManager {
    constructor() {
        this.totalResources = 0;
        this.loadedResources = 0;
        this.mainContent = document.querySelector('main');
        this.isInitialized = false;
        
        this.initialize();
    }

    initialize() {
        // 预加载图片
        const imagesToPreload = [
            'imgs/微信图片_20241105115950.jpg',
            'imgs/【哲风壁纸】2024-11-08 12_01_08.png',
            'imgs/【哲风壁纸】2024-11-08 12_45_57.png',
            'imgs/微信图片_20241105101134.jpg',
            'imgs/微信图片_20241105101128.jpg'
        ];

        this.totalResources = imagesToPreload.length;
        
        // 开始加载图片
        imagesToPreload.forEach(src => this.preloadImage(src));

        // 设置加载超时
        setTimeout(() => {
            if (!this.isInitialized) {
                this.finishLoading();
            }
        }, 3000);
    }

    preloadImage(src) {
        const img = new Image();
        img.onload = () => this.resourceLoaded();
        img.onerror = () => this.resourceLoaded();
        img.src = src;
    }

    resourceLoaded() {
        this.loadedResources++;
        
        if (this.loadedResources === this.totalResources) {
            this.finishLoading();
        }
    }

    finishLoading() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        if (this.mainContent) {
            this.mainContent.style.opacity = '1';
            this.mainContent.style.transform = 'translateY(0)';
            document.body.classList.add('loaded');
        }
    }
}

// 初始化加载管理器
document.addEventListener('DOMContentLoaded', () => {
    new LoadManager();
}); 