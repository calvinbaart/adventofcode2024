import { readFileSync } from "node:fs";

interface Vector2
{
    x: number;
    y: number;
}

const [board, boardSize] = processBoard();

function processBoard(): [string, Vector2] {
    const data = readFileSync("./data/day4.txt", { encoding: "utf-8" }).split("\r\n");
    const width = data[0].length;
    const height = data.length;

    return [data.join(""), { x: width, y: height }];
}

function check(word: string, position: Vector2, direction: Vector2): boolean {
    for (let i = 0; i < word.length; i++) {
        if (position.x < 0 || position.y < 0 || position.x >= boardSize.x || position.y >= boardSize.y) {
            return false;
        }

        if (board[(position.y * boardSize.y) + position.x] != word[i]) {
            return false;
        }

        position.x += direction.x;
        position.y += direction.y;
    }

    return true;
}

function part1() {
    let occurrences = 0;

    for (let x = 0; x < boardSize.x; x++) {
        for (let y = 0; y < boardSize.y; y++) {
            // Straight
            occurrences += check("XMAS", { x, y }, { x: 1, y: 0 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: -1, y: 0 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: 0, y: 1 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: 0, y: -1 }) ? 1 : 0;

            // Diagonal
            occurrences += check("XMAS", { x, y }, { x: -1, y: -1 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: 1, y: -1 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: -1, y: 1 }) ? 1 : 0;
            occurrences += check("XMAS", { x, y }, { x: 1, y: 1 }) ? 1 : 0;
        }
    }

    console.log(occurrences);
}

function part2() {
    let occurrences = 0;

    for (let x = 0; x < boardSize.x; x++) {
        for (let y = 0; y < boardSize.y; y++) {
            let check1 = check("MAS", { x, y }, { x: 1, y: 1 });
            let check2 = check("MAS", { x: x + 2, y }, { x: -1, y: 1 });
            let check3 = check("MAS", { x, y: y + 2 }, { x: 1, y: -1 });
            let check4 = check("MAS", { x: x + 2, y: y + 2 }, { x: -1, y: -1 });

            if ([check1, check2, check3, check4].filter(x => x).length >= 2) {
                occurrences++;
            }
        }
    }

    console.log(occurrences);
}

part1();
part2();