function choseMode() {
    const lightning = document.createElement('div');
    const casual = document.createElement('div');
    const lightHead = document.createElement('h1');
    const casualHead = document.createElement('h1');
    const lightBtn = document.createElement('button');
    const casualBtn = document.createElement('button');
    const gameArea = document.getElementById('gameArea')

    lightning.classList.add('split', 'left');
    casual.classList.add('split', 'right');

    lightHead.classList.add('splitHead');
    casualHead.classList.add('splitHead');

    lightBtn.classList.add('splitBtn');
    casualBtn.classList.add('splitBtn');

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

choseMode();