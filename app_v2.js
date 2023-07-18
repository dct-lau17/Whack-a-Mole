
const difficultyConfig = {
    easy: {
        maxSpeed: 1500,
        minSpeed: 2000,
        moles: 1,
        holes: 6
    },
    medium: {
        maxSpeed: 1000,
        minSpeed: 2000,
        moles: 2,
        holes: 9
    },
    hard: {
        maxSpeed: 800,
        minSpeed: 1500,
        moles: 2,
        holes: 16
    },
    insane: {
        maxSpeed: 600,
        minSpeed: 1000,
        moles: 3,
        holes: 16
    }

}

// Start Game

const domEl = {
    stop: document.getElementById('stop'),
    start: document.getElementById('start'),
    level: document.getElementById('level'),
    grid: document.getElementById('grid'),
    restart: document.getElementById('restart')
}

class Game {
    constructor(time = 30, noOfHoles = 9, moles = 2) {
        this.startTime = time;
        this.holes = [];
        this.moles = moles;
        this.noOfHoles = noOfHoles;
        this.score = 0;
        this.timer = false;
    }

    //Load function - creates the hole instance prepares HTML <this function should be called on change of level and on page load
    load() {
        this.holes = [];
        for (let i = 0; i < this.noOfHoles; i++) {
            const hole = new Hole(i);
            hole.createHole();
            this.holes.push(hole);
        }
        this.#showGrid();
        this.timer = new Timer(this.startTime, 'countdown');
        this.timer.showTimer(this.startTime);   

        domEl.restart.disabled = true;

        domEl.start.addEventListener('click', this.start.bind(this));
        domEl.stop.addEventListener('click', this.stop.bind(this));
        domEl.restart.addEventListener('click', this.restart.bind(this));   
        
    
    }

    // start function - starts the game

    stop() {
        //not working??
        //    this.active = true;
        this.timer.stopCountDown();

        domEl.start.disabled = false;
        domEl.stop.disabled = true;
        domEl.level.disabled = false;
        domEl.restart.disabled = false;

        // console.log(timer.timeRemaining)
        // start peeping x amount of times 
       
    }

    restart() {
        //not working??
        //    this.active = true;
        this.timer.reset();
        this.timer.showTimer(this.startTime);   
        domEl.restart.disabled = true;


        // console.log(timer.timeRemaining)
        // start peeping x amount of times 

    }

    // peekaboo

    start() {
        //not working??
        //    this.active = true;
        this.timer.startCountDown();

        domEl.start.disabled = true;
        domEl.stop.disabled = false;
        domEl.level.disabled = true;
    
        // console.log(timer.timeRemaining)
        // start peeping x amount of times 
    }

    // reset

    #showGrid() {
        // reset any previous styling and html
        domEl.grid.classList.remove('col4')
        domEl.grid.innerHTML = '';
        this.holes.forEach((el) => { grid.appendChild(el.el) })

        if (this.noOfHoles > 9) {
            grid.classList.add('col4')
        }
    }

}

class Hole {
    constructor(indx) {
        this.el = null;
        this.indx = indx;
        this.up = false;
        this.upCount = 0;
        this.hitCount = 0;
    }

    createHole() {
        this.el = document.createElement('div');
        this.el.id = this.indx;
        this.el.classList.add('hole');
    }

    peep() {
        this.up = true;
        this.upCount++;
        this.el.classList.add('mole');
    }

    down() {
        this.up = false;
        this.el.classList.remove('mole');
    }

    hit() {
        this.down();
        this.hitCount++
    }

}

class Timer {
    constructor(countFrom = 30, el) {
        this.countFrom = countFrom;
        this.timeRemaining = countFrom;
        this.countdownID = null;
        this.el = document.getElementById(el);
    }

    startCountDown() {
        this.countdownID = setInterval(() => {
            this.timeRemaining -= 1
            this.showTimer(this.timeRemaining)
            if (this.timeRemaining == 0) {
                this.stopCountDown();
            }
        }, 1000);
    }

    stopCountDown() {
        clearInterval(this.countdownID);
    }

    reset() {
        this.timeRemaining = this.countFrom;
    }

    showTimer(time) {
        this.el.textContent = time;
    }
}


const createGame = () => {
    const level = document.getElementById('level') && document.getElementById('level').value || 'medium';
    const levelConfigs = difficultyConfig[level];

    game = new Game(60, levelConfigs.holes, levelConfigs.moles);
    game.load();  
}

let game;
createGame();
document.getElementById('level').addEventListener('change', createGame)




