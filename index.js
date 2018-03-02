const getAnswer = (i, ind) => {
    return String.fromCharCode(((i >>> ((ind - 1)* 2)) & 3) + 65);
};
const adjacent = (s1, s2) => {
    return parseInt(Math.abs(s1.charCodeAt(0) - s2.charCodeAt(0))) === 1;
}

const mappings = [];
mappings[2] = {A: 'C', B: 'D', C: 'A', D: 'B'};
mappings[3] = {A: 3, B: 6, C: 2, D: 4};
mappings[4] = {A: [1, 5], B: [2, 7], C: [1, 9], D: [6, 10]};
mappings[5] = {A: 8, B: 4, C: 9, D: 7};
mappings[6] = {A: [2, 4], B: [1, 6], C: [3, 10], D: [5, 9]};
mappings[7] = {A: 'C', B: 'B', C: 'A', D: 'D'};
mappings[8] = {A: 7, B: 5, C: 2 , D: 10};
mappings[9] = {A: 6, B: 10, C: 2, D: 9};
mappings[10] = {A: 3, B: 2, C: 4, D: 1};
for (let i = 0; i < (1<<20); i++) {
    // Q2
    if (mappings[2][getAnswer(i, 2)] !== getAnswer(i, 5)) {
        continue;
    }

    // Q3
    const a3 = {};
    a3.A = getAnswer(i, mappings[3].A);
    a3.B = getAnswer(i, mappings[3].B);
    a3.C = getAnswer(i, mappings[3].C);
    a3.D = getAnswer(i, mappings[3].D);
    const A3 = getAnswer(i, 3);
    let v = null;
    for (let k in a3) {
        if (k !== A3) {
            v = a3[k];
            break;
        }
    }
    let c = 0;
    for (let k in a3) {
        if (a3[k] === v) {
            c++;
        }
    }
    if (c !== 3) {
        continue;
    }

    // Q4
    const A4 = getAnswer(i, 4);
    let valid = true;
    for (let k in mappings[4]) {
        if (k === A4) {
           if (getAnswer(i, mappings[4][k][0]) !== getAnswer(i, mappings[4][k][1])) {
              valid = false;
              break;
           }
        } else {
            if (getAnswer(i, mappings[4][k][0]) === getAnswer(i, mappings[4][k][1])) {
                valid = false;
                break;
            }
        }
    }
    if (!valid) {
        continue;
    }

    // Q5
    const A5 = getAnswer(i, 5);
    if (getAnswer(i, mappings[5][A5]) !== A5) {
        continue;
    }
    valid = true;
    for (let k in mappings[5]) {
        if (k !== A5) {
            if (getAnswer(i, mappings[5][k]) === A5) {
                valid = false;
                break;
            }
        }
    }
    if (!valid) {
        continue;
    }

    // Q6
    const A6 = getAnswer(i, 6);
    const A8 = getAnswer(i, 8);
    c = 0;
    valid = true;
    for (let k in mappings[6]) {
        const q1 = mappings[6][k][0];
        const q2 = mappings[6][k][1];
        if (getAnswer(i, q1) === A8 && getAnswer(i, q2) === A8) {
            c++;
            if (k !== A6) {
                valid = false;
            } 
        }
    }
    if (!valid || c !== 1) {
        continue;
    }
    
    // Q7
    const counters = {};
    for (let q = 1; q <= 10; q++) {
        const a = getAnswer(i, q);
        counters[a] = (counters[a] || 0) + 1;
    }
    let minA = null;
    let minV = null;
    let maxA = null;
    let maxV = null;
    for (let k in mappings[7]) {
        const v = counters[k] || 0;
        if (minV === null || minV > v) {
            minA = k;
            minV = v;
        }
        if (maxV === null || maxV < v) {
            maxA = k;
            maxV = v;
        }
    }
    // unique of the min answer
    c = 0;
    for (let k in mappings[7]) {
        const v = counters[k] || 0;
        if (v === minV) {
            c++;
        }
    }
    if (c !== 1) {
        continue;
    }
    if (mappings[7][getAnswer(i, 7)] !== minA) {
        continue;
    }

    // Q8
    const a8 = {};
    a8.A = getAnswer(i, mappings[8].A);
    a8.B = getAnswer(i, mappings[8].B);
    a8.C = getAnswer(i, mappings[8].C);
    a8.D = getAnswer(i, mappings[8].D);
    const A1 = getAnswer(i, 1);
    valid = true;
    for (let k in mappings[8]) {
        if (k === A8) {
            if (adjacent(A1, a8[k])) {
                valid = false;
                break;
            }
        } else {
            if (!adjacent(A1, a8[k])) {
                valid = false;
                break;
            }
        }
    }
    if (!valid) {
        continue;
    }

    // Q9
    const condition1 = getAnswer(i, 1) === getAnswer(i, 6);
    const A9 = getAnswer(i, 9);
    valid = true;
    for (let k in mappings[9]) {
        const condition2 = getAnswer(i, mappings[9][k]) === getAnswer(i, 5);
        if (k === A9) {
           if (condition1 === condition2) {
            valid = false;
            break;
           }
        } else {
            if (condition1 !== condition2) {
                valid = false;
                break;
            }
        }
    }
    if (!valid) {
        continue;
    }

    // Q10
    const diff = counters[maxA] - counters[minA];
    if (mappings[10][getAnswer(i, 10)] !== diff) {
        continue;
    }
    console.log(i);
    for (var q = 1; q <= 10; q++) {
        console.log(`${q} ${getAnswer(i, q)}`);
    }
}

