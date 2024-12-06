import { readFileSync } from "node:fs";

const data = readFileSync("./data/day2.txt", { encoding: "utf-8" })
    .split("\r\n")
    .map(x => x.split(" ").map(y => parseInt(y)));

function isSafe(data: number[], useProblemDampener: boolean = false, problemDampenerIndex = 0): boolean
{
    let increasing = false;
    let valid = true;
    let adjustedData = [...data];

    if (useProblemDampener && problemDampenerIndex >= adjustedData.length) {
        return false;
    }

    if (useProblemDampener) {
        adjustedData = [...adjustedData.slice(0, problemDampenerIndex), ...adjustedData.slice(problemDampenerIndex + 1)];
    }

    for (let i = 0; i < adjustedData.length - 1; i++) {
        let current = adjustedData[i];
        let next = adjustedData[i + 1];
        let amount = Math.abs(next - current);
        let isIncreasing = current > next;

        if ((i != 0 && isIncreasing != increasing) || amount < 1 || amount > 3) {
            valid = false;
            break;
        }

        increasing = isIncreasing;
    }

    if (!valid && useProblemDampener) {
        return isSafe(data, useProblemDampener, problemDampenerIndex + 1);
    }

    return valid;
}

function part1() {
    let totalSafe = 0;

    for (const item of data) {
        if (!isSafe(item)) {
            continue;
        }
    
        totalSafe++;
    }
    
    console.log(totalSafe);
}

function part2() {
    let totalSafe = 0;

    for (const item of data) {
        if (!isSafe(item, true)) {
            continue;
        }
    
        totalSafe++;
    }
    
    console.log(totalSafe);
}

part1();
part2();