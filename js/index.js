// Game variable and constants

let direction= {x:0,y:0};
let food= {x:3,y:6}
const foodSound= new Audio("../music/food.mp3");
const gameOverSound= new Audio("../music/gameover.mp3");
const moveSound= new Audio("../music/move.mp3");
const musicSound= new Audio("../music/music.mp3");
let speed=2;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:12,y:14},
];

// Game functions

function main(ctime){ //event loop
    window.requestAnimationFrame(main);
    // let time= new Date(ctime);
    // console.log();
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(){
    return false;
}

function gameEngine(){
    //update snake and food

    // if snake collides
    if(isCollide(snakeArr))
    {
    gameOverSound.play();
    musicSound.pause(); 
    direction={x:0,y:0};
    alert("Game over, Press any key to play again!");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
}

    // if snake eat the food,increment score and regenerate food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        score++;
        snakeArr.unshift({x:snakeArr[0].x+direction.x,y:snakeArr[0].y+direction.y});
        a=2;
        b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Move snake
    for(i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x+=direction.x;
    snakeArr[0].y+=direction.y;


    //display the snake and food

    //display snake
    let gameBoard=document.getElementById("board");
    gameBoard.innerHTML='';
    for(let b in snakeArr){
        // console.log(b);
        snakeBody=document.createElement("div");
        snakeBody.style.gridRowStart=snakeArr[b].y;
        snakeBody.style.gridColumnStart=snakeArr[b].x;
        // console.log(b.x);
        // console.log(b.y);
        if(b==0){
            snakeBody.classList.add("head");
        }
        else snakeBody.classList.add("snakeBody");
        gameBoard.appendChild(snakeBody);
    }

    //display food
    let Food=document.createElement("div");
    Food.style.gridRowStart=food.y;
    Food.style.gridColumnStart=food.x;
    Food.classList.add("food");
    gameBoard.appendChild(Food);
}



// Game Logic
window.requestAnimationFrame(main); //game loop

document.addEventListener("keydown",(e)=>{
    direction={x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrowup");
            direction={x:0,y:-1};            
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            direction={x:0,y:1}
            break;
        case "ArrowLeft":
            console.log("Arrowleft");
            direction={x:-1,y:0}
            break;
        case "ArrowRight":
            console.log("Arrowright");
            direction={x:1,y:0}
            break;
    }
})