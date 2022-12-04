// Game variable and constants

let direction= {x:0,y:0};
let food= {x:3,y:6}
const foodSound= new Audio("../music/food.mp3");
const gameOverSound= new Audio("../music/gameover.mp3");
const moveSound= new Audio("../music/move.mp3");
const musicSound= new Audio("../music/music.mp3");
let speed=3;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:12,y:14},
];
if(localStorage.getItem("hiScore")==null){

    localStorage.setItem("hiScore","0");
}

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

function isCollide(snakeArr){
    for(let i=2;i<snakeArr.length;i++){
    if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y)
    return true;
    }
    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 || snakeArr[0].y<=0 || snakeArr[0].y>=18){

        return true;
    }
}

function gameEngine(){
    // console.log(localStorage.getItem("hiScore"));
    document.querySelector("#score>span").innerHTML=score;
    document.querySelector("#hiscore>span").innerHTML=localStorage.getItem("hiScore");
    //update snake and food

    // if snake collides
    if(isCollide(snakeArr))
    {
    gameOverSound.play();
    musicSound.pause(); 
    direction={x:0,y:0};
    alert("Game over, Press any key to play again!");
    snakeArr=[{x:13,y:15}];
    score=0;
}

    // if snake eat the food,increment score and regenerate food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodSound.play();
        score++;
        if(score> parseInt(localStorage.getItem("hiScore"))){
            localStorage.setItem("hiScore",JSON.stringify(score));
        }
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

// console.log( parseInt(localStorage.getItem("hiScore")));
window.requestAnimationFrame(main); //game loop

document.addEventListener("keydown",(e)=>{
    musicSound.play();
    direction={x:0,y:1};
    switch(e.key){
        case "ArrowUp":
            moveSound.play();
            console.log("Arrowup");
            direction={x:0,y:-1};            
            break;
        case "ArrowDown":
            moveSound.play();
            console.log("Arrowdown");
            direction={x:0,y:1}
            break;
        case "ArrowLeft":
            moveSound.play();
            console.log("Arrowleft");
            direction={x:-1,y:0}
            break;
        case "ArrowRight":
            moveSound.play();
            console.log("Arrowright");
            direction={x:1,y:0}
            break;
    }
})