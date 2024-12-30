document.addEventListener('DOMContentLoaded', () => {
    // 创建画布
    const particleCanvas = document.createElement('canvas');
    const snakeCanvas = document.createElement('canvas');
    const particleContainer = document.querySelector('.particle-container');
    const snakeContainer = document.querySelector('.snake-container');
    
    // 设置画布尺寸
    function setCanvasSize() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        snakeCanvas.width = window.innerWidth;
        snakeCanvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    particleContainer.appendChild(particleCanvas);
    snakeContainer.appendChild(snakeCanvas);
    
    const particleCtx = particleCanvas.getContext('2d');
    const snakeCtx = snakeCanvas.getContext('2d');
    
    // 粒子类
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`;
            this.alpha = 1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.15;
            this.alpha -= 0.02;
        }
        
        draw() {
            particleCtx.save();
            particleCtx.globalAlpha = this.alpha;
            particleCtx.fillStyle = this.color;
            particleCtx.shadowColor = this.color;
            particleCtx.shadowBlur = 5;
            particleCtx.beginPath();
            particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            particleCtx.fill();
            particleCtx.restore();
        }
    }
    
    // 蛇类
    class Snake {
        constructor() {
            this.segments = [];
            this.length = 20;
            this.centerX = window.innerWidth / 2;
            this.centerY = window.innerHeight / 2;
            this.radius = 180;
            this.angle = 0;
            this.speed = 0.05;
            this.amplitude = 20;
            
            for (let i = 0; i < this.length; i++) {
                this.segments.push({
                    x: this.centerX,
                    y: this.centerY
                });
            }
        }
        
        update() {
            this.angle += this.speed;
            const waveY = Math.sin(this.angle * 2) * this.amplitude;
            const newX = this.centerX + Math.cos(this.angle) * this.radius;
            const newY = this.centerY + Math.sin(this.angle) * this.radius + waveY;
            
            this.segments.unshift({ x: newX, y: newY });
            this.segments.pop();
        }
        
        draw() {
            snakeCtx.strokeStyle = '#FFD700';
            snakeCtx.lineWidth = 10;
            snakeCtx.lineCap = 'round';
            snakeCtx.lineJoin = 'round';
            
            snakeCtx.beginPath();
            snakeCtx.moveTo(this.segments[0].x, this.segments[0].y);
            
            for (let i = 1; i < this.segments.length - 2; i++) {
                const xc = (this.segments[i].x + this.segments[i + 1].x) / 2;
                const yc = (this.segments[i].y + this.segments[i + 1].y) / 2;
                snakeCtx.quadraticCurveTo(
                    this.segments[i].x,
                    this.segments[i].y,
                    xc,
                    yc
                );
            }
            
            snakeCtx.stroke();
            
            snakeCtx.shadowColor = '#FFD700';
            snakeCtx.shadowBlur = 15;
            snakeCtx.fillStyle = '#FFD700';
            snakeCtx.beginPath();
            snakeCtx.arc(this.segments[0].x, this.segments[0].y, 8, 0, Math.PI * 2);
            snakeCtx.fill();
            snakeCtx.shadowBlur = 0;
        }
    }
    
    const particles = [];
    const snake = new Snake();
    
    // 创建粒子
    function createParticles(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }
    
    // 自动生成一些粒子
    function generateRandomParticles() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(x, y));
        }
    }
    
    // 每100ms生成随机粒子
    setInterval(generateRandomParticles, 100);
    
    // 动画循环
    function animate() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
        
        // 更新粒子
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
            }
        }
        
        // 更新蛇
        snake.update();
        snake.draw();
        
        requestAnimationFrame(animate);
    }
    
    // ���听鼠标移动
    document.addEventListener('mousemove', createParticles);
    
    // 开始动画
    animate();
    
    // 3秒后淡出加载屏幕
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('fade-out');
    }, 3000);
    
    // 添加文字展示动画
    function showTextSequentially() {
        const texts = [
            document.querySelector('.loading-text'),
            document.querySelector('.loading-subtext'),
            document.querySelector('.loading-wishes')
        ];

        texts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('show');
            }, index * 400); // 每个文字间隔400ms显示
        });
    }

    // 立即开始文字动画
    showTextSequentially();
}); 