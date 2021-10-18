document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button') 
    const width= 10



//the shapes
const lTetromino =[
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1,width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]

]

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]

]

const tTetromino = [
    [1,width,width+1, width+2],
    [1,width+1,width+2,width*2+1],
    [width, width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
]

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
   
    
]

const iTetromino = [
    [1,width+1,width*2+1],
    [width, width+1,width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width,width+1,width+2,width+3]


]

const theTetrominoes = [iTetromino,oTetromino,tTetromino, zTetromino,lTetromino]


let currentPosition = 4
let currentRotation = 0

//randomly select a tetro and rotate
let random = (Math.random()*theTetrominoes.length)


let current = theTetrominoes[random][currentRotation]


//draw the tetro
function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

//undraw the tetro
function undraw(){
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
}


//make tetro move down the page
timerID == setInterval(moveDown, 1000)

//move dwn func
function moveDown(){
    undraw()//removes the shape
    currentPosition +=width
    draw()//draws the shape
    freeze()
}

//freeze func
function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetro
        random = Math.floor(Math.random()* theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        current = 4
        draw()
    }
}


//move the tetro lft when condition is met
function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index =>(currentPosition + index) % width ===0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition +=1
}
draw()
}


})