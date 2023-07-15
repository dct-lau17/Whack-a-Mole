
const difficultyConfig = {
    easy: {
        maxSpeed: 1500,
        minSpeed: 2000,
        moles: 1,
        height: 2,
        width: 3
    },
    medium: {
        maxSpeed: 1000,
        minSpeed: 2000,
        moles: 2,
        height: 3,
        width: 3
    },
    hard: {
        maxSpeed: 800,
        minSpeed: 1500,
        moles: 2,
        height: 4,
        width: 4
    },
    insane: {
        maxSpeed: 800,
        minSpeed: 1200,
        moles: 3,
        height: 4,
        width: 4
    }

}

class Game {
    constructor(timer = 30, moles = 2, level='medium') {
        this.score = score;
        this.timer = timer;
        this.noOfMoles = moles;
        this.level = level;
        this.minSpeed = 3000;
        this.maxSpeed = 2000;
        this.height = 3;
        this.width = 3;
        this.countdownID = false;
        this.peekabooFlag = true;
        this.activeHoles = [];
    }

    displayGrid(gridArr = []) {
        let htmlDisplay = ''
        gridArr.forEach((heightArr) => {
            heightArr.forEach((panel) => {
                htmlDisplay += `<div id=${panel.id} class=hole></div>`
            })
        })
        return htmlDisplay
    }

    createGrid(height, width) {
       // console.log('in create grid')
        let grid = [];
        let id = 0;

        if (!Number.isInteger(height) || height <= 0 || !Number.isInteger(width) || width <= 0) return
        // create array
        for (let i = 0; i < height; i++) {
            let heightArr = [];
            for (let j = 0; j < width; j++) {
                id++
                heightArr.push({ id: id })
            }

            grid.push(heightArr);
        }
      //  console.log('grrr', grid)
        return grid
    }

    // peekaboo(holes, minTime=1000, maxTime=2000){
    //   //  console.log('HHH', holes)
    //     const time = this.#randTime(minTime, maxTime);
    //     const holeToAppear = this.#randHole(holes)
    //     //console.log('rt:', time)
    //     holeToAppear.classList.add('mole')
    //     setTimeout(()=>{
    //         holeToAppear.classList.remove('mole')
    //         if (this.timer > 0) {this.peekaboo(holes)}
    //     }, time)
    // }

    peekaboo(holes,pst) {
        if (!this.peekabooFlag) {
            console.log('pst',pst)
            clearTimeout(pst);
            return;
        }
        //  console.log('HHH', holes)
        const time = this.#randTime(this.maxSpeed, this.minSpeed);
        const holeToAppear = this.#randHole(holes)
        
        holeToAppear.classList.add('mole')
        // this.activeHoles.push(holesToAppear.id)
        pst = setTimeout(() => {
            holeToAppear.classList.remove('mole')
            this.peekaboo(holes,pst)
        }, time)
    }


    whack(e){
        console.log('this', e.target.classList)
        if (e.target && e.target.classList && e.target.classList.contains('mole')){
            this.score++
            this.#updateScore();
            e.target.classList.remove('mole')
            
        }
    }

    // countdown(){
    //     this.countdownID = setTimeout(() => {
    //         this.timer-=1
    //         this.#setTimer(this.timer)
    //         if(this.timer > 0){
    //             this.countdown()
    //         }else{
                
    //             document.getElementById('start').disabled = false
    //             alert(`Times up! Final Score is ${this.score}`)
    //         }
    //     }, 1000);

    //     // if(this.timer < 1){
    //     //     clearTimeout(countDownTimer);
    //     // }
    // }

    countdown() {
        this.countdownID = setInterval(() => {
            this.timer -= 1
            this.#setTimer(this.timer)
            if (this.timer == 0) {
                // this.countdown()
                document.getElementById('start').disabled = false
                this.stop();
                alert(`Times up! Final Score is ${this.score}`);}
        }, 1000);

        // if(this.timer < 1){
        //     clearTimeout(countDownTimer);
        // }
    }

    stop(){
        console.log('stop')
        clearInterval(this.countdownID);
        this.peekabooFlag = false
        document.getElementById('start').disabled = false;
        document.getElementById('stop').disabled = true;
    }

    // private methods
    // random hole generator
    #randHole(holes){
        const id = Math.floor(Math.random() * holes.length);
        const hole = holes[id]

        // cannot reappear or clash with another mole
        if(hole.classList.value.match(/mole/i)){
           return this.#randHole(holes)
        }
        // add to array?
        return hole
    }

    #randTime (min, max){
        return Math.round(Math.random() * (max - min) + min);
    }

    #setTimer (time){
        // console.log(time)
        document.getElementById('countdown').textContent = time;
    }

    #updateScore(){
        document.getElementById('score').textContent = this.score;
    }

}


let game;

// const mole = document.querySelectorAll('.mole');
// const countdown = document.getElementById('countdown');
// const score = document.getElementById('score');

const start = () => {
    const holes = document.querySelectorAll('.hole');
    const level = document.getElementById('level').value;
    const levelConfigs = difficultyConfig[level];
    game.peekabooFlag = true;
    game.timer = 30;
    game.score = 0;
    game.noOfMoles = levelConfigs.moles;
    game.minSpeed = levelConfigs.minSpeed;
    game.maxSpeed = levelConfigs.maxSpeed;
    game.height = levelConfigs.height;
    game.width = levelConfigs.width;
    document.getElementById('countdown').textContent = game.timer;
    document.getElementById('score').textContent = game.score;

    if (game.noOfMoles > (Math.round((25 / 100) * (game.height * game.width)))) {return console.error('Number of moles exceed 25% limit!')}
    let i= 0
    while
        (i < game.noOfMoles) {
        i++
        game.peekaboo(holes, levelConfigs.maxSpeed, levelConfigs.minSpeed )
        // console.log(i)
    }
    game.countdown();

    //default buttons
    document.getElementById('start').disabled = true
    document.getElementById('stop').disabled = false
    document.getElementById('stop').addEventListener('click', stop)

    // listening to all hole clicks
    document.querySelectorAll('.hole').forEach((hole) => hole.addEventListener('click', (e) => {game.whack(e)}))
}

const stop = () => {
    game.stop();
}

const levelHandler = () => {
    // grab grize values in element data-attribute attribute
    // const selected = document.getElementById('level').options[document.getElementById('level').selectedIndex].getAttribute('data-attribute');
    // const height = selected && selected.split(':') && selected.split(':')[0] || 3;
    // const width = selected && selected.split(':') && selected.split(':')[1] || 3;
    const gridSize = game.createGrid(game.height, game.width); // this should return an array
    // console.log('h', height)
    // console.log('w', width)
   // console.log('gs',gridSize) // this is undefined?
    const html = game.displayGrid(gridSize);
  //  console.log('html', html)
    game.level = document.getElementById('level').value
    if(game.width >3){
        document.getElementById('grid').classList.add('col'+width) 
    }
    document.getElementById('grid').innerHTML = html;
   

}


// initiate Game on DOM ready to avoid racing conditions
document.addEventListener('DOMContentLoaded',() => {
    const level = document.getElementById('level').value;
    const levelConfigs = difficultyConfig[level];
    game = new Game(30, levelConfigs.moles, level);
    game.height = levelConfigs.height;
    game.width = levelConfigs.width;
    document.getElementById('countdown').textContent = game.timer;
    if (game.width > 3) {
        document.getElementById('grid').classList.add('col' + levelConfigs.width)
    }
    
    const initialgridSize = game.createGrid(levelConfigs.height, levelConfigs.width);
    const html = game.displayGrid(initialgridSize);
    
    document.getElementById('grid').innerHTML = html;

    // level drop down listener
    document.getElementById('level').addEventListener('change', levelHandler)
    document.getElementById('start').addEventListener('click', start)

    const cursor = document.querySelector(".cursor img")
    window.addEventListener("mousemove", (e) => {
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';
    })
}, false);



