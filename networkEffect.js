class NetworkEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.particleCount = 50;
        this.connectionDistance = 150;
        
        this.initialize();
    }

    initialize() {
        // 设置canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        document.body.prepend(this.canvas);

        // 设置canvas尺寸
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 跟踪鼠标位置
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });

        // 创建粒子
        this.createParticles();

        // 开始动画
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            // 连接到鼠标
            const mouseDistance = this.getDistance(particle, this.mousePosition);
            if (mouseDistance < this.connectionDistance) {
                const opacity = (1 - mouseDistance / this.connectionDistance) * 0.5;
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.stroke();
            }

            // 连接到其他粒子
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle2 = this.particles[j];
                const distance = this.getDistance(particle, particle2);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                }
            }
        });
    }

    getDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制粒子
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // 边界检查
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        // 绘制连接线
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化网络效果
document.addEventListener('DOMContentLoaded', () => {
    new NetworkEffect();
}); 