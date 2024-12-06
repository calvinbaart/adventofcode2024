import { readFileSync } from "node:fs";
import * as _ from "lodash";

const [rules, updates] = processData();

function processData(): [{[key: number]: number[][]}, number[][]] {
    const data = readFileSync("./data/day5.txt", { encoding: "utf-8" }).split("\r\n");
    const rules: number[][] = [];
    const updates: number[][] = [];

    for (const line of data) {
        if (line.includes("|")) {
            rules.push(line.split("|").map(x => parseInt(x)));
            continue;
        }

        if (line.length == 0) {
            continue;
        }

        updates.push(line.split(",").map(x => parseInt(x)));
    }

    return [_.groupBy(rules, (item) => item[0]), updates];
}

function validate(update: number[], returnIndex: boolean = false): boolean|[number, number] {
    for (const index in update) {
        const item = update[index];
        const itemRules = rules[item] ?? [];

        for (const rule of itemRules) {
            const otherIndex = update.indexOf(rule[1]);

            if (otherIndex == -1 || otherIndex > +index) {
                continue;
            }

            if (returnIndex) {
                return [+index, otherIndex];
            }

            return false;
        }
    }

    return true;
}

function part1() {
    let total = 0;

    for (const update of updates) {
        if (!validate(update)) {
            continue;
        }

        const middleNumber = update[Math.floor(update.length / 2)];
        total += middleNumber;
    }

    console.log(total);
}

function fix(update: number[]): number[] {
    const [from, to] = validate(update, true) as [number, number];

    const temp = update[to];
    update[to] = update[from];
    update[from] = temp;

    if (!validate(update)) {
        return fix(update);
    }

    return update;
}

function part2() {
    let total = 0;

    for (const update of updates) {
        if (validate(update)) {
            continue;
        }

        const fixed = fix(update);
        const middleNumber = fixed[Math.floor(fixed.length / 2)];
        total += middleNumber;
    }

    console.log(total);
}

part1();
part2();