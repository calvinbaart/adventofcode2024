import { readFileSync } from "node:fs";

const data = readFileSync("./data/day1.txt", { encoding: "utf-8" })
    .split("\r\n")
    .map(x => x.split("   ").map(y => parseInt(y)));

function part1() {
    const leftData = data.map(x => x[0]).sort();
    const rightData = data.map(x => x[1]).sort();

    let totalDistance = 0;

    for (const index in leftData) {
        const left = leftData[index];
        const right = rightData[index];
        const distance = Math.abs(left - right);

        totalDistance += distance;
    }

    console.log(totalDistance);
}

function part2() {
    const leftData = data.map(x => x[0]);
    const rightData = data.map(x => x[1]);

    let totalSimilarity = 0;

    for (const index in leftData) {
        const left = leftData[index];
        const occurrences = rightData.filter(x => x == left).length;

        totalSimilarity += left * occurrences;
    }

    console.log(totalSimilarity);
}

part1();
part2();