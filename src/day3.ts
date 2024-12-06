import { readFileSync } from "node:fs";

const data = readFileSync("./data/day3.txt", { encoding: "utf-8" });

function part1() {
    const regex = /mul\((\d+),(\d+)\)/gm;

    let m;
    let result = 0;

    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        const lhs = parseInt(m[1]);
        const rhs = parseInt(m[2]);
        
        result += lhs * rhs;
    }

    console.log(result);
}

function part2() {
    const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/gm;

    let m;
    let result = 0;
    let enabled = true;

    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        switch (m[0]) {
            case "do()":
                enabled = true;
                break;

            case "don't()":
                enabled = false;
                break;

            default:
                if (!enabled) {
                    break;
                }

                const lhs = parseInt(m[1]);
                const rhs = parseInt(m[2]);

                result += lhs * rhs;
                break;
        }
    }

    console.log(result);
}

part1();
part2();