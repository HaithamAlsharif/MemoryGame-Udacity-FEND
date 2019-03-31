let iList = document.getElementsByTagName('i');
let arrOfClassNames = [];
let arrOfShuffledClassNames = [];
let resetButton = document.getElementsByClassName('fa-repeat');
let allCards = document.getElementsByClassName('card');
let opened = [];
let winningCards = 0;
let match = false;
let movesSpan = document.getElementsByClassName('moves');
let timerSpan = document.getElementsByClassName('timer');
let timerCount = 0;
let timeSync;
let moves = 0;
let deck = document.getElementsByClassName('deck');
let winningPage = document.getElementById('winningPage')
let stars = document.getElementsByClassName('fa-star')
let starIndex = 0;
let wrongMoves = 0;
let timerFlag = false;
let winFlag = false;

let resetFlag = false;

for (var className of iList) {
    if (className.classList[1] !== 'fa-star' && className.classList[1] !== 'fa-repeat')
        arrOfClassNames.push(className.classList[1])
}
arrOfShuffledClassNames = shuffle(arrOfClassNames);

function createCard(shuffledClass) {
    let linode = document.createElement('li');
    linode.classList.add('card');
    // linode.classList.add('show')
    let inode = document.createElement('i');
    linode.appendChild(inode);
    inode.classList.add('fa');
    inode.classList.add(shuffledClass)
    return linode
}



function cardsSetup(arr) {
    let deck = document.getElementsByClassName('deck');
    deck[0].innerHTML = ''

    for (item of arr) {
        const card = createCard(item);
        deck[0].appendChild(card);
    }
}

function CardFlipMechanism() {
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener('click', function () {
            this.classList.add('show');
            this.classList.add('open');
            this.classList.add('preventClick')

                incrementCounter();
                    resetFlag = false;
            if (!timerFlag && !resetFlag) {
                timeFunc();
                timerFlag = true;
            }
            if (opened.length < 2) {
                opened.push(this);
                if (opened.length == 2 && opened[0].childNodes[0].classList[1] == opened[1].childNodes[0].classList[1]) {
                    match = true;
                } else {
                    match = false;
                }
            }

            if (opened.length == 2 && match) {
                opened[0].classList.add('match');
                opened[0].classList.add('preventClick');
                opened[1].classList.add('match');
                opened[1].classList.add('preventClick');
                winningCards += 2;
                opened = [];
                if (winningCards == 16) {
                    winFlag = true;
                    win(moves);
                    setTimeout(function(){
                        if(confirm("Do you want to play again ?")){
                            window.location.reload();
                        }else{
                            return;
                        };
                    },1000);
                }
            }

            if (opened.length == 2 && !match) {
                setTimeout(function () {
                    opened[0].classList.remove('open');
                    opened[0].classList.remove('show');
                    opened[0].classList.add('preventClick');
                    opened[1].classList.remove('show');
                    opened[1].classList.remove('open');
                    opened[1].classList.add('preventClick');
                    opened = [];

                }, 400);

                setTimeout(function () {
                    for (card of allCards) {
                        card.classList.remove('preventClick');
                    }
                }, 500)
            }

            if (!match) {
                wrongMoves += 1;
                starMechanism(wrongMoves);
            }
        });
    };
};

function win(moves) {
    deck[0].innerHTML = '';
    deck[0].style.display = 'none'
    resetButton[0].style.display = 'none'
    movesSpan[1].innerHTML = moves;
    winningPage.style.display = "block";
}

function timeFunc() {

        setInterval(function () {
            if(!winFlag && !resetFlag){
                timerCount += 1;
                timerSpan[0].innerHTML = timerCount;
            }
        }, 1000);
        if(!resetFlag){
            timerSpan[0].innerHTML = timerCount; 
        }
}


// reset button functionality
function reset() {
    resetFlag = true;
    timerSpan[0].innerHTML = 0;
    timerCount = 0;

    for(card of allCards){
        if(card.classList.contains('preventClick')){
            card.classList.remove('preventClick');
        }
    }

    for (card of allCards) {
        card.classList.remove('show');
        card.classList.remove('open');
        card.classList.remove('match');
    };

    for (star of stars) {
        star.classList.remove('fa-star-o');
    }

    movesSpan[0].innerHTML = 0;
}
resetButton[0].addEventListener('click', reset);


//moves counter
function incrementCounter() {
    moves++;
    movesSpan[0].innerHTML = moves;
}


function starMechanism(wrongMoves) {
    if (wrongMoves % 10 == 0 && starIndex < stars.length-1) {
        stars[starIndex].classList.add('fa-star-o');
        starIndex++;
    }
}


// running the scripts
cardsSetup(arrOfShuffledClassNames);
CardFlipMechanism();
starMechanism();


//////////////////////

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}