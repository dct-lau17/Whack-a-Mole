


class Game {
    constructor(time = 30, noOfHoles = 9, moles = 2) {
        this.startTime = time;
        this.holes = [];
        this.moles = moles;
        this.noOfHoles = noOfHoles;
        this.score = 0;
        this.timer = false;
    }

    // start function - starts the game

    stop() {
        //not working??
        //    this.active = true;
        console.log('stop', this.timer,this.startTime,this.noOfHoles,this.moles)
        // this.timer.stopCountDown();

        // document.getElementById('start').disabled = false;
        // document.getElementById('stop').disabled = true;
        // document.getElementById('level').disabled = false;

        // document.getElementById('start').addEventListener('click', this.start)
        // console.log(timer.timeRemaining)
        // start peeping x amount of times 
       
    }

    // peekaboo

    start() {
        //not working??
        //    this.active = true;
        console.log('asdtime', this.startTime)
        // this.timer = new Timer(this.startTime, 'countdown');
        // this.timer.startCountDown();

        // document.getElementById('start').disabled = true;
        // document.getElementById('stop').disabled = false;
        // document.getElementById('level').disabled = true;
        // document.getElementById('stop').addEventListener('click', this.stop)
    
        // console.log(timer.timeRemaining)
        // start peeping x amount of times 
    }
}

var x = new Game(60,2,3)
x.stop()

var y = new Game(123, 7, 7)
y.stop()