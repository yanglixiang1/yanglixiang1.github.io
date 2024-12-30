class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: "原来",
                artist: "南征北战NZBZ",
                src: 'Music/原来-南征北战NZBZ.mp3'
            },
            {
                title: "我的天空",
                artist: "南征北战NZBZ",
                src: 'Music/我的天空-南征北战NZBZ.mp3'
            }
        ];
        
        this.currentTrack = 0;
        this.isPlaying = false;
        this.audio = new Audio();
        
        // 设置音频结束时的处理
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });

        // 设置初始音量
        this.audio.volume = 0.5;
        
        this.initializePlayer();
        this.setupEventListeners();
        
        // 自动播放第一首歌
        setTimeout(() => {
            this.togglePlay();
        }, 1000);
    }
    
    initializePlayer() {
        this.audio.src = this.playlist[this.currentTrack].src;
        this.updateTrackInfo();
        
        // 添加音频加载错误处理
        this.audio.addEventListener('error', () => {
            console.error('音频加载失败:', this.playlist[this.currentTrack].title);
            this.nextTrack();
        });
    }
    
    updateTrackInfo() {
        const track = this.playlist[this.currentTrack];
        const trackName = document.querySelector('.track-name');
        const artistName = document.querySelector('.artist-name');
        
        // 添加滚动效果
        trackName.textContent = track.title;
        artistName.textContent = track.artist;
        
        // 如果文字过长，添加滚动效果
        if (trackName.scrollWidth > trackName.clientWidth) {
            trackName.style.animation = 'scrollText 15s linear infinite';
        } else {
            trackName.style.animation = 'none';
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            document.querySelector('.play-pause i').classList.replace('fa-pause', 'fa-play');
        } else {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    document.querySelector('.play-pause i').classList.replace('fa-play', 'fa-pause');
                }).catch(error => {
                    console.error('播放失败:', error);
                });
            }
        }
        this.isPlaying = !this.isPlaying;
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadAndPlayTrack();
    }
    
    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadAndPlayTrack();
    }
    
    loadAndPlayTrack() {
        const wasPlaying = this.isPlaying;
        this.audio.src = this.playlist[this.currentTrack].src;
        this.updateTrackInfo();
        
        if (wasPlaying) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('切换歌曲失败:', error);
                });
            }
        }
    }
    
    updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (isNaN(duration)) return;
        
        const progressPercent = (currentTime / duration) * 100;
        document.querySelector('.progress').style.width = `${progressPercent}%`;
        
        // 更新时间显示
        document.querySelector('.current').textContent = this.formatTime(currentTime);
        document.querySelector('.duration').textContent = this.formatTime(duration);
    }
    
    setProgress(e) {
        const width = e.target.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        if (isNaN(duration)) return;
        
        this.audio.currentTime = (clickX / width) * duration;
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    setupEventListeners() {
        // 播放控制
        document.querySelector('.play-pause').addEventListener('click', () => this.togglePlay());
        document.querySelector('.next-track').addEventListener('click', () => this.nextTrack());
        document.querySelector('.prev-track').addEventListener('click', () => this.prevTrack());
        
        // 进度条更新
        this.audio.addEventListener('timeupdate', (e) => this.updateProgress(e));
        document.querySelector('.progress-bar').addEventListener('click', (e) => this.setProgress(e));
        
        // 音量控制
        document.querySelector('.volume-slider').addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        // 播放器显示/隐藏
        const musicToggle = document.querySelector('.music-toggle');
        const musicPlayer = document.querySelector('.music-player');
        
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            musicPlayer.classList.toggle('show');
            musicToggle.classList.toggle('active');
        });

        // 最小化按钮事件
        document.querySelector('.minimize-player').addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            musicPlayer.classList.remove('show');
            musicToggle.classList.remove('active');
        });

        // 点击播放器外部区域关闭播放器
        document.addEventListener('click', (e) => {
            if (!musicPlayer.contains(e.target) && !musicToggle.contains(e.target)) {
                musicPlayer.classList.remove('show');
                musicToggle.classList.remove('active');
            }
        });

        // 防止点击播放器内部导致关闭
        musicPlayer.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 添加键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.togglePlay();
            } else if (e.code === 'ArrowLeft') {
                this.prevTrack();
            } else if (e.code === 'ArrowRight') {
                this.nextTrack();
            }
        });
    }
}

// 初始化播放器
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
}); 