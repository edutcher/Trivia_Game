const gameArea = document.getElementById('gameArea');
const catArray = ['Lovecraft', 'Coding', 'Movies', 'Music', 'Geography', 'History', 'Sports', 'Space', 'Religion'];
var chosenCats = [];

function destroyGameArea() {

    gameArea.style.transition = 'opacity 1s ease-in-out';
    gameArea.style.opacity = 0;

    setTimeout(function() {
        gameArea.textContent = " ";
    }, 1000);
}

function getQs(gameType) {

    const whatChecked = document.querySelectorAll('input');

    var questArray = [];

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

    // if (gameType === 0) {
    //     playTimed();
    // } else {
    //     playCasual();
    // }
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

function choseCats(gameType) {
    destroyGameArea();

    const catDiv = document.createElement('div');

    const catHead = document.createElement('h2');
    const checkRow = document.createElement('div');
    const checkRow2 = document.createElement('div');
    const choseCatBtn = document.createElement('button');
    const rerollBtn = document.createElement('button');

    catHead.textContent = 'Chose your Catagories';
    catHead.classList.add('my-5');

    checkRow.classList.add('row', 'col-12', 'text-center');
    checkRow2.classList.add('row', 'col-12', 'text-center');

    choseCatBtn.textContent = 'Play!'
    choseCatBtn.classList.add('btn', 'btn-purp', 'mx-2', 'p-2', 'mt-5', 'px-3');
    choseCatBtn.setAttribute('onclick', 'getQs()');

    rerollBtn.textContent = 'Reroll'
    rerollBtn.classList.add('btn', 'btn-purp', 'mx-2', 'p-2', 'mt-5', 'px-3');
    rerollBtn.setAttribute('onclick', 'choseCats(' + gameType + ')');

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
    }, 1000)
}

choseMode();