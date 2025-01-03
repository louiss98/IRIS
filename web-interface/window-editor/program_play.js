class ProgramPlayer {
    constructor() {
        this.playButton = document.querySelector('.play-button');
        this.progressCircle = document.querySelector('.progress-circle');
        this.isPlaying = false;
        this.circumference = 2 * Math.PI * 28; // 2πr where r=28
        
        // Set initial state of progress circle
        this.progressCircle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.progressCircle.style.strokeDashoffset = this.circumference;
        
        this.playButton.addEventListener('click', () => this.togglePlay());
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.startProgress();
            this.playButton.querySelector('img').src = 'assets/player-pause.png';
        } else {
            this.resetProgress();
            this.playButton.querySelector('img').src = 'assets/player-play.png';
        }
    }

    startProgress() {
        // Reset to starting position
        this.progressCircle.style.strokeDashoffset = this.circumference;
        
        // Animate to complete position
        setTimeout(() => {
            this.progressCircle.style.transition = 'stroke-dashoffset 5s linear';
            this.progressCircle.style.strokeDashoffset = '0';
        }, 50);

        // Auto-reset after animation completes
        setTimeout(() => {
            this.togglePlay();
        }, 5000);
    }

    resetProgress() {
        this.progressCircle.style.transition = 'none';
        this.progressCircle.style.strokeDashoffset = this.circumference;
    }
}

// Initialize the player
const player = new ProgramPlayer();