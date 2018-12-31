"use strict";

const isEven = n => n % 2 === 0;
const manhattanDistance = (p, q) => Math.abs(p.x - q.x) + Math.abs(p.y - q.y);

const part1 = rounds => {
    let size = Math.ceil(Math.sqrt(rounds));

    if (isEven(size)) {
        size++
    }

    const board = Array(size).fill(0).map(() => Array(size).fill(0));

    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);

    const p = { x: x, y: y };

    let direction = "down";

    for (let i = 1; i < rounds; i++) {
        board[y][x] = i;

        if (direction === "down" && board[y][x + 1] === 0) {
            x++;
            direction = "right";
        } else if (direction === "right" && board[y - 1][x] === 0) {
            y--;
            direction = "up";
        } else if (direction === "up" && board[y][x - 1] === 0) {
            x--;
            direction = "left";
        } else if (direction === "left" && board[y + 1][x] === 0) {
            y++;
            direction = "down";
        } else if (direction === "left") {
            x--;
        } else if (direction === "down") {
            y++;
        } else if (direction === "right") {
            x++;
        } else {
            y--;
        }
    }

    const q = { x: x, y: y };

    return manhattanDistance(p, q);
}

const getNeighbours = (board, x, y) => {
    const neighbours = [];
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    for (let i = 0; i < dy.length; i++) {
        const p = { x: x + dx[i], y: y + dy[i] };

        if (0 <= p.x && p.x < board[p.y].length && 0 <= p.y && p.y < board.length) {
            neighbours.push(board[p.y][p.x]);
        }
    }

    return neighbours;
}

const part2 = rounds => {
    let size = Math.ceil(Math.sqrt(rounds));

    if (isEven(size)) {
        size++
    }

    const board = Array(size).fill(0).map(() => Array(size).fill(0));

    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);

    let direction = "down";

    for (let i = 1; true; i++) {
        if (i == 1) {
            board[y][x] = 1
        } else {
            board[y][x] = getNeighbours(board, x, y).reduce((a, b) => a + b);
        }

        if (board[y][x] > rounds) {
            return board[y][x];
        }

        if (direction === "down" && board[y][x + 1] === 0) {
            x++;
            direction = "right";
        } else if (direction === "right" && board[y - 1][x] === 0) {
            y--;
            direction = "up";
        } else if (direction === "up" && board[y][x - 1] === 0) {
            x--;
            direction = "left";
        } else if (direction === "left" && board[y + 1][x] === 0) {
            y++;
            direction = "down";
        } else if (direction === "left") {
            x--;
        } else if (direction === "down") {
            y++;
        } else if (direction === "right") {
            x++;
        } else {
            y--;
        }
    }
}

console.log("Part one: " + part1(361527));
console.log("Part two: " + part2(361527));
