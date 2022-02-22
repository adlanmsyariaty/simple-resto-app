function convertMenu(foods) { //RELEASE 0 CONVERT THE MENU
    let mainArray = [];
    let subArray = [];
    let foodName = '';
    for (let i = 0; i < foods.length; i++) {
        for (let j = 0; j < foods[i].length; j++) {
            if (foods[i][j] === '#') {
                subArray.push(foodName);
                foodName = '';
                continue;
            } else if (j === foods[i].length - 1) {
                foodName += foods[i][j];
                subArray.push(foodName);
            } else {
                foodName += foods[i][j];
            }
        }
        mainArray.push(subArray);
        subArray = [];
        foodName = '';
    }

    return mainArray;
}

function filterMenu(foods) { //RELEASE 1 FILTER THE MENU
    let filterArr = [];
    for (let i = 0; i < foods.length; i++) {
        if (foods[i][1] !== undefined) {
            filterArr.push(foods[i])
        }
    }
    return filterArr;
}

function statusMenu(foods) { //RELEASE 2 STATUS THE MENU
    for (let i = 0; i < foods.length; i++) {
        if (foods[i][1] > 30000) {
            foods[i].push('expensive');
        } else if (foods[i][1] >= 15000) {
            foods[i].push('standard');
        } else {
            foods[i].push('cheap');
        }
    }
    return foods;
}

function statisticMenu(foods) { //RELEASE 3 COUNTING THE MENU STATUS
    const stats = {}

    for (let i = 0; i < foods.length; i++) {
        if (stats[foods[i][2]] == undefined) {
            stats[foods[i][2]] = 1
        } else {
            stats[foods[i][2]]++;
        }
    }

    return stats;
}

function generateMenu(foods) { //RELEASE 4 ASSEMBLE ALL FUNCTION
    let convArray = convertMenu(foods);
    let filterArray = filterMenu(convArray);
    let statusArray = statusMenu(filterArray);
    let menuArray = []
    for (let i = 0; i < statusArray.length; i++) {
        menuArray.push({name: statusArray[i][0], price: statusArray[i][1], status: statusArray[i][2]});
    }

    return {
        statistic: statisticMenu(statusArray),
        menu: menuArray
    };
}

const foods = [
    'Nasi Goreng#20000',
    'Salmon Mentai',
    'Gado Gado#10000',
    'Kupat Tahu#41000',
    'Wagyu Steak',
    'Nasi Padang#25000',
    'Papeda#15000',
    'Ayam Rebus',
    'Tempe Goreng#5000',
    'Tahu Goreng#4000'
]
console.log(generateMenu(foods))

const result = generateMenu(foods)

for (const key in result.statistic) {
    if (key === 'standard') {
        newKey = 'Standard'
    } else if (key === 'cheap') {
        newKey = 'Cheap'
    } else if (key === 'expensive') {
        newKey = 'Expensive'
    }

    var div = document.createElement('div');
    div.textContent = newKey; //generate <div>cheap</div>
    const statistic = document.getElementById('statistic');
    statistic.appendChild(div); // locate <div>Mid standard</div> as a child of parent id = statistic
    div.setAttribute('class', 'box-statistic'); //<div class="box-statistic">Mid standard</div>
    var p = document.createElement('p');
    p.textContent = result.statistic[key]; //generate <p>Mid standard</p>
    div.appendChild(p);
    p.setAttribute('class', 'sum')
}

for (let i = 0; i < result.menu.length; i++) {
    var div = document.createElement('div');
    div.textContent = '';
    div.setAttribute('class', 'container-menu');
    const menu = document.getElementById('menu');
    menu.appendChild(div)

    var p = document.createElement('p');
    p.textContent = `${result.menu[i].name}--Rp ${(Number(result.menu[i].price)/1000).toFixed(3)},00`;
    p.setAttribute('class', 'menu');
    div.appendChild(p);

    if (result.menu[i].status === 'standard') {
        status = 'Standard'
    } else if (result.menu[i].status === 'cheap') {
        status = 'Cheap'
    } else if (result.menu[i].status === 'expensive') {
        status = 'Expensive'
    }

    var p = document.createElement('p');
    p.textContent = status;
    p.setAttribute('class', 'status');
    p.setAttribute('id', status);
    div.appendChild(p)
}

// const xpn = document.getElementById("xpn");
// xpn.innerHTML = result.statistic.expensive;

// const std = document.getElementById("std");
// std.innerHTML = result.statistic.standard;

// const chp = document.getElementById("chp");
// chp.innerHTML = result.statistic.cheap;

