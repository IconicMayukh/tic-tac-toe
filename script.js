const selectBox = document.querySelector('.select-box');
const selectXBtn = document.querySelector('.playerX');
const selectOBtn = document.querySelector('.playerO');
const playBoard = document.querySelector('.play-board');
const resultBox = document.querySelector('.result-box');
const xturn = document.querySelector('.Xturn');
const oturn = document.querySelector('.Oturn');
const btn = document.querySelector('.btn');
const allBox = document.querySelectorAll('.play-area section span');


window.onload = ()=>{  //once the window is loaded

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick" , "clickedBox(this)");
        
    }
    selectXBtn.addEventListener('click', ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        xturn.classList.add('playing');
    })
    selectOBtn.addEventListener('click', ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show')
        oturn.classList.add('playing')
    })
}


function clickedBox(element){
    if(xturn.classList.contains('playing')){
        if(!checkWinner()){
            if(element.innerHTML ==  ''){
                element.innerHTML = `<i class='bx bx-x'></i>`;
                xturn.classList.remove('playing');          //handing over the class 'playing' to the other player
                oturn.classList.add('playing');
                
                element.setAttribute("name" , "X");     //setting a attribute in name to decide for the winner
                
            }
        }
    }
    
    if(oturn.classList.contains('playing')){
        if(!checkWinner()){                         //checking if the winner already decided or not
            if(element.innerHTML ==  ''){                            //checking for empty spaces
                element.innerHTML = `<i class='bx bx-circle'></i>`;             
                oturn.classList.remove('playing');
                xturn.classList.add('playing');
                
                element.setAttribute("name" , "O");        //setting a attribute in name to decide for the winner       
            }
        }
        checkWinner();          //it is needed as after the winning of player O, the compiler waits for another Box-click without this line
    }  

}

let a,b,c;

function getClass(x,y,z){
    a = document.querySelector(`.box${x}`).getAttribute('name');    //by passing the box number as classname, we are getting the name attribute
    b = document.querySelector(`.box${y}`).getAttribute('name');    //and if we get same name attribute along the desired combination of winning, the game ends
    c = document.querySelector(`.box${z}`).getAttribute('name');
    if(a==b && a==c && a!=null){
        return true;
    }
}


function checkWinner(){
    if( getClass(1,2,3) || getClass(4,5,6) || getClass(7,8,9) || getClass(1,4,7) || getClass(2,5,8) || getClass(3,6,9) || getClass(1,5,9) || getClass(3,5,7)){
        // console.log(a);                        // passing the winning combinations and checking for the winning player

        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            resultBox.querySelector('.win-text').innerHTML = `Player ${a} won the game`;
        },500)
        return true;
    }
    draw();                                             //if not won, then checking for draw
    return false;
}

let tied;
function draw(){
    for (let i = 1; i < 10; i++) {
        if(document.querySelector(`.box${i}`).getAttribute('name') == null){
            tied = false;
            break;
        }
        tied = true;   
    }
    if(tied){
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            resultBox.querySelector('.win-text').innerHTML = `Match has been drawn`;
        },500)
    }
}


btn.onclick = ()=>{
    window.location.reload();                   // reloading the window on replay button click
}