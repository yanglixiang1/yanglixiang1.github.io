class Timeline {
    constructor() {
        this.events = [
            {
                date: '2024-01',
                title: '个人网站上线',
                description: '开始记录生活点滴',
                icon: 'fa-rocket'
            },
            {
                date: '2024-02',
                title: '摄影作品展',
                description: '记录美好瞬间',
                icon: 'fa-camera'
            },
            {
                date: '2024-03',
                title: '音乐创作',
                description: '开始音乐创作之旅',
                icon: 'fa-music'
            }
            // 可以继续添加更多事件
        ];
        
        this.initialize();
    }

    initialize() {
        this.createTimeline();
        this.addScrollAnimation();
    }

    createTimeline() {
        const container = document.createElement('section');
        container.className = 'dynamic-timeline';
        container.innerHTML = `
            <h2>时间轴</h2>
            <div class="timeline-container">
                ${this.events.map(event => this.createEventElement(event)).join('')}
            </div>
        `;

        // 在作品展示区之前插入时间轴
        const portfolioSection = document.querySelector('.portfolio-section');
        portfolioSection.parentNode.insertBefore(container, portfolioSection);
    }

    createEventElement(event) {
        return `
            <div class="timeline-event">
                <div class="event-icon">
                    <i class="fas ${event.icon}"></i>
                </div>
                <div class="event-content">
                    <div class="event-date">${event.date}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                </div>
            </div>
        `;
    }

    addScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-event').forEach(event => {
            observer.observe(event);
        });
    }
}

// 初始化时间轴
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
}); 