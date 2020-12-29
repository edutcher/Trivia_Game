const gameArea = document.getElementById('gameArea');
const questText = document.createElement('h1');
questText.setAttribute('id', 'questText');
const questArea = document.createElement('div');
const btnRow1 = document.createElement('div');
const btnRow2 = document.createElement('div');
const questNum = document.getElementById('questNum');
const scoreArea = document.getElementById('scoreArea');
var btns = [];
var tips = [];

// Reset tooltip when mouse leaves
function outFunc(whatBtn) {
    tips[whatBtn].textContent = "Answer";
    tips[whatBtn].style.backgroundColor = '#555';
}

for (var i = 0; i < 4; i++) {
    const newBtn = document.createElement('button');
    newBtn.classList.add('btn', 'btn-purp', 'p-3', 'col-4', 'tool');
    newBtn.setAttribute('id', 'btn' + i);
    newBtn.setAttribute('onmouseout', 'outFunc(' + i + ')');

    const newTip = document.createElement('span');
    newTip.classList.add('tiptext');
    newTip.setAttribute('id', 'tip' + i);
    newTip.textContent = 'Answer';
    tips.push(newTip);
    btns.push(newBtn);

    btns[i].appendChild(tips[i]);
}

const catArray = ['Lovecraft', 'Coding', 'Movies', 'Music', 'Geography', 'History', 'Sports', 'Space', 'Religion'];
var chosenCats = [];
var questArray = [];
var currentQ = 0;
var randomQ = 0;
var casualType = true;
var score = 0;
var gameOver = false;

function destroyGameArea() {

    gameArea.style.transition = 'opacity .5s ease-in-out';
    gameArea.style.opacity = 0;

    setTimeout(function() {
        gameArea.textContent = " ";
    }, 600);
}

function startTimer() {
    var timerInterval = setInterval(function() {
        score++;

        scoreArea.textContent = "Score: " + score;

        if (gameOver) {
            clearInterval(timerInterval);
        }

    }, 1000);
}

function showResults() {
    questText.textContent = 'Your score was ' + score;

    btns[0].textContent = 'Play again?';
    btns[0].setAttribute('onclick', 'choseMode()');

    btns[1].style.opacity = 0;
    btns[2].style.opacity = 0;
    btns[3].style.opacity = 0;

    currentQ = 0;
    score = 0;

    questNum.textContent = "";
    scoreArea.style.opacity = 0;
    scoreArea.textContent = "";
}

function answer(whatBtn, ans) {
    if (casualType) {
        if (ans === questArray[randomQ].correct) {
            score += 10;
            tips[whatBtn].textContent = 'Correct!';
            tips[whatBtn].style.backgroundColor = "green";
        } else {
            tips[whatBtn].textContent = 'Wrong';
            tips[whatBtn].style.backgroundColor = 'red';
        }
    }

    if (!casualType) {
        if (ans !== questArray[randomQ].correct) {
            score += 15;
        }
    }


    questArray.splice(randomQ, 1);

    if (currentQ === 20) {
        gameOver = true;
        showResults();
    }

    if (!gameOver) {
        nextQ();
    }
}

function nextQ() {
    currentQ++;
    questNum.textContent = "Question #" + currentQ;
    scoreArea.textContent = "Score: " + score;
    randomQ = Math.floor(Math.random() * questArray.length);

    questText.textContent = questArray[randomQ].question;

    var tempAns = Array.from(questArray[randomQ].answers);

    for (var i = tempAns.length - 1; i >= 0; i--) {
        var tempRand = Math.floor(Math.random() * tempAns.length);
        btns[i].textContent = tempAns[tempRand];
        tempAns.splice(tempRand, 1);
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (btns[i].textContent === questArray[randomQ].answers[j]) {
                btns[i].setAttribute('onclick', 'answer(' + i + ', ' + j + ')');
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        btns[i].appendChild(tips[i]);
    }


}

function playGame() {
    destroyGameArea();

    gameOver = false;
    scoreArea.style.opacity = 1;

    questText.classList.add('pt-5')
    questArea.classList.add('col-12', 'text-center');
    questArea.appendChild(questText);

    btnRow1.classList.add('col-12', 'text-center');
    btnRow2.classList.add('col-12', 'text-center');

    btns[1].style.opacity = 1;
    btns[2].style.opacity = 1;
    btns[3].style.opacity = 1;

    btnRow1.appendChild(btns[0]);
    btnRow1.appendChild(btns[1]);
    btnRow2.appendChild(btns[2]);
    btnRow2.appendChild(btns[3]);

    var questFrag = document.createDocumentFragment();

    questFrag.appendChild(questArea);
    questFrag.appendChild(btnRow1);
    questFrag.appendChild(btnRow2);

    setTimeout(function() {
        gameArea.appendChild(questFrag);
        gameArea.style.opacity = 1;
    }, 600)

    if (!casualType) {
        startTimer();
    }

    nextQ();
}

function getQs() {

    const whatChecked = document.querySelectorAll('input');

    questArray = [];

    questArray = questArray.concat(genQs);

    for (var i = 0; i < chosenCats.length; i++) {
        var currentID = whatChecked[i].getAttribute('id');

        if (whatChecked[i].checked === true) {
            switch (currentID) {
                case "Movies":
                    questArray = questArray.concat(movieQs);
                    break;
                case "Music":
                    questArray = questArray.concat(musicQs);
                    break;
                case "Coding":
                    questArray = questArray.concat(codingQs);
                    break;
                case "Lovecraft":
                    questArray = questArray.concat(lovecraftQs);
                    break;
                case "Space":
                    questArray = questArray.concat(spaceQs);
                    break;
                case "History":
                    questArray = questArray.concat(historyQs);
                    break;
                case "Geography":
                    questArray = questArray.concat(geoQs);
                    break;
                case "Religion":
                    questArray = questArray.concat(religionQs);
                    break;
                case "Sports":
                    questArray = questArray.concat(sportsQs);
                    break;
            }
        } else {
            for (var j = 0; j < chosenCats.length; j++) {
                if (chosenCats[j] === currentID) {
                    chosenCats.splice(j, 1);
                }
            }
        }
    }
    playGame();
}

function choseMode() {
    const lightning = document.createElement('div');
    const casual = document.createElement('div');
    const lightHead = document.createElement('h1');
    const casualHead = document.createElement('h1');
    const lightBtn = document.createElement('button');
    const casualBtn = document.createElement('button');

    lightning.classList.add('split', 'left');
    casual.classList.add('split', 'right');

    lightHead.classList.add('splitHead');
    casualHead.classList.add('splitHead');

    lightHead.style.textShadow = "3px 3px #262F8A";
    lightHead.style.color = "black";

    casualHead.style.textShadow = '2px 2px black';
    casualHead.style.color = "rgba(28, 122, 28, 1)"

    lightBtn.classList.add('splitBtn');
    casualBtn.classList.add('splitBtn');

    lightBtn.setAttribute('onclick', 'choseCats(0)');
    casualBtn.setAttribute('onclick', 'choseCats(1)');


    lightHead.textContent = 'Lightning Mode';
    casualHead.textContent = 'Casual Mode';

    lightBtn.textContent = 'Play';
    casualBtn.textContent = 'Play';


    lightning.addEventListener('mouseenter', () => gameArea.classList.add('hover-left'));
    lightning.addEventListener('mouseleave', () => gameArea.classList.remove('hover-left'));

    casual.addEventListener('mouseenter', () => gameArea.classList.add('hover-right'));
    casual.addEventListener('mouseleave', () => gameArea.classList.remove('hover-right'));

    const modeFrag = document.createDocumentFragment();

    lightning.appendChild(lightHead);
    lightning.appendChild(lightBtn);

    casual.appendChild(casualHead);
    casual.appendChild(casualBtn);

    modeFrag.appendChild(lightning);
    modeFrag.appendChild(casual);

    gameArea.appendChild(modeFrag);
}

function choseCats(gameChoice) {
    destroyGameArea();

    gameOver = false;

    if (gameChoice === 1) {
        casualType = true;
    } else {
        casualType = false;
    }

    const catDiv = document.createElement('div');

    const catHead = document.createElement('h2');
    const checkRow = document.createElement('div');
    const checkRow2 = document.createElement('div');
    const choseCatBtn = document.createElement('button');
    const rerollBtn = document.createElement('button');

    catHead.setAttribute('id', 'catHead');
    catHead.textContent = 'Chose your Catagories';
    catHead.classList.add('my-5');

    checkRow.classList.add('row', 'col-12', 'text-center');
    checkRow2.classList.add('row', 'col-12', 'text-center');

    choseCatBtn.textContent = 'Play!'
    choseCatBtn.classList.add('btn', 'btn-purp', 'mx-2', 'p-2', 'mt-5', 'px-3');
    choseCatBtn.setAttribute('onclick', 'getQs()');

    rerollBtn.textContent = 'Reroll'
    rerollBtn.classList.add('btn', 'btn-purp', 'mx-2', 'p-2', 'mt-5', 'px-3');
    rerollBtn.setAttribute('onclick', 'choseCats()');

    var divArray = [];
    var checkArray = [];
    var catTitles = [];

    for (var i = 0; i <= 6; i++) {
        const newDiv = document.createElement('div');
        const newCheck = document.createElement('input');
        const newTitle = document.createElement('h6');
        newDiv.classList.add('col-2', 'mx-4', 'my-5');
        newCheck.setAttribute('type', 'checkbox');
        newCheck.checked = true;
        newTitle.classList.add('d-inline', 'clearfix', 'mx-2');
        divArray.push(newDiv);
        checkArray.push(newCheck);
        catTitles.push(newTitle);
    }

    var tempArray = Array.from(catArray);
    chosenCats = [];

    for (var i = 6; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * tempArray.length);
        var tempPull = tempArray.splice(randIndex, 1);
        var tempString = tempPull.toString();
        chosenCats.push(tempString);
    }

    for (var i = 0; i < 3; i++) {
        catTitles[i].textContent = chosenCats[i];
        checkArray[i].setAttribute('id', chosenCats[i]);
        divArray[i].appendChild(checkArray[i]);
        divArray[i].appendChild(catTitles[i]);
        checkRow.appendChild(divArray[i]);
        catTitles[i + 3].textContent = chosenCats[i + 3];
        checkArray[i + 3].setAttribute('id', chosenCats[i + 3]);
        divArray[i + 3].appendChild(checkArray[i + 3]);
        divArray[i + 3].appendChild(catTitles[i + 3]);
        checkRow2.appendChild(divArray[i + 3]);

    }

    const spaceRow = document.createElement('div');
    spaceRow.classList.add('row', 'py-5');

    catDiv.classList.add('text-center', 'col-12', 'choseArea');
    catDiv.appendChild(catHead);
    catDiv.appendChild(spaceRow);
    catDiv.appendChild(checkRow);
    catDiv.appendChild(checkRow2);
    catDiv.appendChild(rerollBtn);
    catDiv.appendChild(choseCatBtn);

    setTimeout(function() {
        gameArea.appendChild(catDiv);
        gameArea.style.opacity = 1;
    }, 600)
}

choseMode();