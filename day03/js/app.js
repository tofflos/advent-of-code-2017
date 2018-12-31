"use strict";

const render = grid => {
    for (let y = 0; y < grid.length; y++) {
        let s = "";
        for (let x = 0; x < grid[y].length; x++) {
            s += grid[y][x].toString().padStart(3, " ") + " ";
        }
        console.log(s);
    }
    console.log("");
}

const distance = (p, q) => Math.abs(p.x - q.x) + Math.abs(p.y - q.y);

const play = rounds => {
    let size = Math.ceil(Math.sqrt(rounds));

    if (size % 2 === 0) {
        size++
    }

    const arr = Array(size).fill(0).map(() => Array(size).fill(0));

    let currentX = Math.floor(size / 2);
    let currentY = Math.floor(size / 2);

    const p = {
        x: currentX,
        y: currentY
    }

    let direction = "down";

    for (let i = 1; i < rounds; i++) {
        arr[currentY][currentX] = i;

        // render(arr);

        if (direction === "down" && arr[currentY][currentX + 1] === 0) {
            currentX++;
            direction = "right";
        } else if (direction === "right" && arr[currentY - 1][currentX] === 0) {
            currentY--;
            direction = "up";
        } else if (direction === "up" && arr[currentY][currentX - 1] === 0) {
            currentX--;
            direction = "left";
        } else if (direction === "left" && arr[currentY + 1][currentX] === 0) {
            currentY++;
            direction = "down";
        } else if (direction === "left") {
            currentX--;
        } else if (direction === "down") {
            currentY++;
        } else if (direction === "right") {
            currentX++;
        } else {
            currentY--;
        }

    }

    // render(arr)

    const q = {
        x: currentX,
        y: currentY
    }

    return distance(q, p);
}

console.log(play(361527));

const adjacent = (board, x, y) => {
    const arr = [];

    // var dx = [-1, 0, 1, 0]
    // var dy = [0, -1, 0, 1]

    // for (var i = 0; i < dy.length; i++) {
    //     x += dx
    //     y += dy

    //     if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
    //         arr.push(board[x][y])
    //     }
    // }

    // Top
    if (y > 0) {
        arr.push(board[y - 1][x]);
    }

    // Top Right
    if (y > 0 && x < board[y - 1].length - 1) {
        arr.push(board[y - 1][x + 1]);
    }

    // Right
    if (x < board[y].length - 1) {
        arr.push(board[y][x + 1]);
    }

    // Bottom Right
    if (y < board.length - 1 && x < board[y + 1].length - 1) {
        arr.push(board[y + 1][x + 1]);
    }

    // Bottom
    if (y < board.length - 1) {
        arr.push(board[y + 1][x]);
    }

    // Bottom Left
    if (y < board.length - 1 && x > 0) {
        arr.push(board[y + 1][x - 1]);
    }

    // Left
    if (x > 0) {
        arr.push(board[y][x - 1]);
    }

    // Top Left
    if (x > 0 && y > 0) {
        arr.push(board[y - 1][x - 1]);
    }

    return arr;
}

const play2 = rounds => {
    let size = Math.ceil(Math.sqrt(rounds));

    if (size % 2 === 0) {
        size++
    }

    const arr = Array(size).fill(0).map(() => Array(size).fill(0));

    let currentX = Math.floor(size / 2);
    let currentY = Math.floor(size / 2);

    let direction = "down";

    for (let i = 1; true; i++) {
        if (i == 1) {
            arr[currentY][currentX] = 1
        } else {
            arr[currentY][currentX] = adjacent(arr, currentX, currentY).reduce((a, b) => a + b);
        }

        if (arr[currentY][currentX] > rounds) {
            return arr[currentY][currentX];
        }

        // render(arr);

        if (direction === "down" && arr[currentY][currentX + 1] === 0) {
            currentX++;
            direction = "right";
        } else if (direction === "right" && arr[currentY - 1][currentX] === 0) {
            currentY--;
            direction = "up";
        } else if (direction === "up" && arr[currentY][currentX - 1] === 0) {
            currentX--;
            direction = "left";
        } else if (direction === "left" && arr[currentY + 1][currentX] === 0) {
            currentY++;
            direction = "down";
        } else if (direction === "left") {
            currentX--;
        } else if (direction === "down") {
            currentY++;
        } else if (direction === "right") {
            currentX++;
        } else {
            currentY--;
        }

    }
}

console.log(play2(361527));
