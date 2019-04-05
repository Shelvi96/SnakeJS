var d = 0;
var tableSize = 16;
var appleX = -1, appleY = -1;
var snakeLen = 0;
var table = document.getElementById("snakeTableDiv");
var position = [];

function createSnakeTable() {
    var elem = document.getElementById("welcome");
    elem.style.display = "none";
    elem = document.getElementById("lost");
    elem.style.display = "none";
    elem = document.getElementById("counter");
    elem.style.display = "block";

    table.style.display = "block";

    const myTable = document.createElement('table');
	table.innerText = "";
    references =[];
    for (let i=0; i<tableSize; i++) {    
        const row = document.createElement("tr");
        myTable.append(row);
        for  (var j=0; j<tableSize; j++) {
            let td =document.createElement("td");
            row.append(td);
        }
    }

    table.append(myTable);

    drawSneak();
    dropApple();

    handle = setInterval(moveRight, 200);
}

function changeColor(posX, posY, color) {
    var tr = table.getElementsByTagName('tr')[posY],
        td = tr.getElementsByTagName('td')[posX];
    td.style.backgroundColor = color;
}

function deletePrevApple() {
    if (appleX != -1 && appleY != -1)
        changeColor(appleX, appleY, "#DEB887");
}

function isSnake(posX, posY) {
    for(var i = 0; i < snakeLen; ++i) {
    if (position[i][0] == posX && position[i][1] == posY)
        return true;
    }
    return false;
}

function isSnake1(posX, posY) {
    for (var i = 1; i < snakeLen; ++i) {
        if (position[i][0] == posX && position[i][1] == posY)
            return true;
    }
    return false;
}

function dropApple() {
    do {
        appleX = parseInt(Math.random() * tableSize);
        appleY = parseInt(Math.random() * tableSize);
    }
    while (isSnake(appleX, appleY));

    changeColor(appleX, appleY, "red");
}

function drawSneak() {
    position = [];
    var headTR = parseInt(Math.random() * (tableSize-4) + 2);
    var headTD = parseInt(Math.random() * (tableSize-4) + 2);
    changeColor(headTD, headTR, "darkgreen");
    changeColor(headTD-1, headTR, "green");
    changeColor(headTD - 2, headTR, "green");

    position.push([headTD, headTR]);
    position.push([headTD-1, headTR]);
    position.push([headTD - 2, headTR]);

    snakeLen = 3;   
}

var tailX = -1, tailY = -1;

function checkApple() {  
    if (position[0][0] == parseInt(appleX) && position[0][1] == parseInt(appleY)) {
        position.push([tailX, tailY]);
        snakeLen++;
        changeColor(tailX, tailY, "green");

        dropApple();
    }
}

function checkSnake() {
    if (isSnake1(position[0][0], position[0][1])) {
        var i = 1;
        while (position[i][0] != position[0][0] || position[i][1] != position[0][1])
            ++i;

        var sz = snakeLen;
        for (var j = i+1; j < sz; ++j) {
            changeColor(position[snakeLen - 1][0], position[snakeLen - 1][1], "#DEB887");
            position.pop();
            snakeLen--;
        }
        position.pop();
        snakeLen--;
    }
}

function move() {
    tailX = position[snakeLen - 1][0], tailY = position[snakeLen - 1][1];
    changeColor(position[0][0], position[0][1], "green");
    changeColor(position[snakeLen - 1][0], position[snakeLen - 1][1], "#DEB887");
    for (var i = snakeLen - 1; i > 0; --i) {
        position[i][0] = position[i - 1][0];
        position[i][1] = position[i - 1][1];
    }
    document.getElementById("counter").innerText = "Wynik: " + snakeLen;
}

function moveRight() {
    if (position[0][0] < tableSize - 1 && position[1][0] - 1 != position[0][0]) {
        move();
        position[0][0] += 1;
        changeColor(position[0][0], position[0][1], "darkgreen");

        checkApple();
        checkSnake();
    }
    else {
        endGame();
    }
}

function moveLeft() {
    if (position[0][0] > 0 && position[1][0] + 1 != position[0][0]) {
        move();
        position[0][0] -= 1;
        changeColor(position[0][0], position[0][1], "darkgreen");

        checkApple();
        checkSnake();
    }
    else {
        endGame();
    }
}

function moveDown() {
    if (position[0][1] < tableSize - 1 && position[1][1] - 1 != position[0][1]) {
        move();
        position[0][1] += 1;
        changeColor(position[0][0], position[0][1], "darkgreen");

        checkApple();
        checkSnake();
    }
    else {
        endGame();
    }
}

function moveUp() {
    if (position[0][1] > 0 && position[1][1] + 1 != position[0][1]) {
        move();
        position[0][1] -= 1;
        changeColor(position[0][0], position[0][1], "darkgreen");

        checkApple();
        checkSnake();

    }
    else {
        endGame();
    }
}

document.onkeydown = checkKey;

var handle;
var prevKey = 39;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38' && prevKey != 40 && prevKey != 38) {
        prevKey = 38;
        moveUp();
        clearInterval(handle);
        handle = setInterval(moveUp, 200);
    }
    else if (e.keyCode == '40' && prevKey != 40 && prevKey != 38) {
        prevKey = 40;
        moveDown();
        clearInterval(handle);
        handle = setInterval(moveDown, 200);
    }
    else if (e.keyCode == '37' && prevKey != 39 && prevKey != 37) {
        prevKey = 37;
        moveLeft();
        clearInterval(handle);
        handle = setInterval(moveLeft, 200);
    }
    else if (e.keyCode == '39' && prevKey != 39 && prevKey != 37) {
        prevKey = 39;
        moveRight();
        clearInterval(handle);
        handle = setInterval(moveRight, 200);
    }
    else if (e.keyCode == '32') {
        clearInterval(handle);
        createSnakeTable();
    }
}

function endGame() {
    table.style.display = "none";

    var elem = document.getElementById("welcome");
    elem.style.display = "none";
    elem = document.getElementById("lost");
    elem.style.display = "block";
    elem = document.getElementById("counter");
    elem.style.display = "none";

    document.getElementById("score").innerText = "Score: " + snakeLen;

    clearInterval(handle);
    prevKey = 39;
}
