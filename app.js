document.addEventListener('DOMContentLoaded', () => {
    
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button') 
    const width= 10
    let nextRandom = 0
    let timerId 
    let score = 0
    const colors =[
        'orange','red','green','purple','blue'
    ]


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
        squares[currentPosition + index].style.backgroundColor =colors[random]
    })
}

//undraw the tetro
function undraw(){
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''

    })
}


//make tetro move down the page
//timerID == setInterval(moveDown, 1000)



//assign func to key
function control(e){
    if(e.keycode ==37){
        moveLeft()
    } else if (e.keycode ===38){
        rotate()
    } else if(e.keycode ===39){
        moveRight()
    }else if(e.keycode ===40){
        moveDown
    }
}
document.addEventListener('keyup', control)


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
        random= nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        current = 4
        draw()
        displayShape()
        addScore()
        gameOver()
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



//move tetro right
function moveRight(){
    undraw()
    const isAtRightEdge = current.some(index =>(currentPosition + index) % width === width - 1)


    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1

    }
    draw()
}


//rotate the tetro
function rotate(){
    undraw()
    currentRotation ++

    if (currentRotation === current.length){
        //if the shape is 4 goes back to 0
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}




//show the next tetro
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
const displayIndex = 0


// tetro without rot
const upNextTetrominoes =[
    [1, displayWidth+1, displayWidth*2+1,2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]



//display the shape in mini grid
function displayShape(){
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}




// function to start
startBtn.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId)
        timerId=null
    }else{
        draw()
        timerId = setInterval(moveDown,1000)
        nextRandom =Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})



//add score
function addScore(){
    for(let i =0;i<199;i+=width){
        const row =[i,i+1,i+2,i+3,i+4, i+5,i+6,i+7,i+8,i+9]

        if(row.every(index => squares[index].classList.contains('taken'))){
            score+=10
            scoreDisplay.innerHTML =score
            row.foreach(index => {
                squares[index.classList.remove('taken')]
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor =''
            })
            const squaresRemoved = squares.splice(i,width)
            squares = squaresRemoved.concat(squares)
            squares.foreach(cell => grid.appendChild(cell))
        }
    }
}



//game over function
function gameOver(){
    if(current.some(index =>squares[currentPosition + index].classList.contains('taken'))){
        scoreDisplay.innerHTML ='END'
        clearInterval(timerId)
    }
}



})