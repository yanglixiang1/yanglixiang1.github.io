class MouseEffect {
    constructor() {
        this.canvas = document.getElementById('mouseCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.circle = {
            x: 0,
            y: 0,
            radius: 8,
            color: this.createGradient()
        };
        this.targetX = 0;
        this.targetY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.speed = 0.15;
        this.trailLength = 20;
        
        this.initialize();
    }

    initialize() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            this.addParticle(e.clientX, e.clientY);
        });

        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createGradient() {
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.circle.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, 'rgba(100, 181, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(33, 150, 243, 0.6)');
        return gradient;
    }

    addParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            life: 1,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
        };
        this.particles.push(particle);

        // 限制粒子数量
        if (this.particles.length > this.trailLength) {
            this.particles.shift();
        }
    }

    drawParticles() {
        this.particles.forEach((particle, index) => {
            particle.life -= 0.02;
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size *= 0.95;

            if (particle.life > 0) {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color.replace(')', `, ${particle.life})`);
                this.ctx.fill();
            } else {
                this.particles.splice(index, 1);
            }
        });
    }

    drawMainCircle() {
        // 平滑移动
        this.lastX += (this.targetX - this.lastX) * this.speed;
        this.lastY += (this.targetY - this.lastY) * this.speed;

        // 绘制光晕效果
        const glowRadius = this.circle.radius * 2;
        const glowGradient = this.ctx.createRadialGradient(
            this.lastX, this.lastY, 0,
            this.lastX, this.lastY, glowRadius
        );
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        glowGradient.addColorStop(0.5, 'rgba(100, 181, 246, 0.1)');
        glowGradient.addColorStop(1, 'rgba(33, 150, 243, 0)');

        this.ctx.beginPath();
        this.ctx.arc(this.lastX, this.lastY, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = glowGradient;
        this.ctx.fill();

        // 绘制主圆
        const mainGradient = this.ctx.createRadialGradient(
            this.lastX, this.lastY, 0,
            this.lastX, this.lastY, this.circle.radius
        );
        mainGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        mainGradient.addColorStop(0.5, 'rgba(100, 181, 246, 0.8)');
        mainGradient.addColorStop(1, 'rgba(33, 150, 243, 0.6)');

        this.ctx.beginPath();
        this.ctx.arc(this.lastX, this.lastY, this.circle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = mainGradient;
        this.ctx.fill();

        // 添加内部光点
        this.ctx.beginPath();
        this.ctx.arc(this.lastX, this.lastY, this.circle.radius * 0.3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fill();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制粒子轨迹
        this.drawParticles();
        
        // 绘制主光标
        this.drawMainCircle();

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化鼠标效果
document.addEventListener('DOMContentLoaded', () => {
    new MouseEffect();
}); 