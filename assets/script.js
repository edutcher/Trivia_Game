const gameArea = document.getElementById('gameArea');
const catArray = ['H.P. Lovecraft', 'Programming', 'Movies', 'Music', 'Geography', 'History', 'Sports', 'Space', 'Religion'];

function destroyGameArea() {

    gameArea.style.transition = 'opacity 1s ease-in-out';
    gameArea.style.opacity = 0;

    setTimeout(function() {
        gameArea.textContent = " ";
    }, 1000);
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
    choseCatBtn.classList.add('btn', 'btn-success', 'mx-2', 'p-2', 'mt-5', 'px-3');
    choseCatBtn.setAttribute('onclick', 'getQs()');

    rerollBtn.textContent = 'Reroll'
    rerollBtn.classList.add('btn', 'btn-success', 'mx-2', 'p-2', 'mt-5', 'px-3');
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
    var chosenCats = [];

    console.log(tempArray);
    console.log(catArray);

    for (var i = 6; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * tempArray.length);
        var tempPull = tempArray.splice(randIndex, 1);
        chosenCats.push(tempPull);
    }

    for (var i = 0; i < 3; i++) {
        catTitles[i].textContent = chosenCats[i];
        checkArray[i].setAttribute('id', '#' + chosenCats[i]);
        divArray[i].appendChild(checkArray[i]);
        divArray[i].appendChild(catTitles[i]);
        checkRow.appendChild(divArray[i]);
        catTitles[i + 3].textContent = chosenCats[i + 3];
        checkArray[i + 3].setAttribute('id', '#' + chosenCats[i + 3]);
        divArray[i + 3].appendChild(checkArray[i + 3]);
        divArray[i + 3].appendChild(catTitles[i + 3]);
        checkRow2.appendChild(divArray[i + 3]);

    }

    catDiv.classList.add('text-center', 'col-12', 'choseArea');
    catDiv.appendChild(catHead);
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