let gameseq=[];
let userseq=[];
let score=0;


let btns=["btn1","btn2","btn3","btn4"]


let started=false;
let level=0;
let h2=document.querySelector("h2");




document.addEventListener("keydown",function(){
    if(started==false){
        // console.log("game has started");
        started=true

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}
function levelUp(){
    level++;
    h2.innerText=`Level: ${level}`;


    //random button choose
    randomIdx=Math.floor(Math.random()*4);
    let randcolor=btns[randomIdx];
    gameseq.push(randcolor)
    // console.log(gameseq)
    let randBtn=document.querySelector(`.${randcolor}`)
    btnFlash(randBtn);
}
function checkAns(){
    let idx = userseq.length - 1; 
    if (userseq[idx] !== gameseq[idx]) {
        // wrong move
        h2.innerText = `GAME OVER! Score: ${score}. Press any key to start...`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
        return;
    }

    // if user finished full sequence correctly
    if (userseq.length === gameseq.length) {
        score++;
        userseq = [];
        setTimeout(levelUp, 800); // wait a bit before next level
    }
}


function btnPress(){
    if (!started) return; // button click won't work till game start
    let btn=this;
    btnFlash(btn);

    for(let thisbtn of btns){
        if(btn.classList.contains(thisbtn)){
            userseq.push(thisbtn);
        }
    }
    // console.log(userseq)
    checkAns();
}

let allbtns=document.querySelectorAll(".btn")
for(btn of allbtns){
    btn.addEventListener("click",btnPress)
}


function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
    score=0;
}