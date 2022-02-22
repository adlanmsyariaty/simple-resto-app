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

function convertMenu(foods) {
  // code here
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

function filterMenu(foods) {
  // code here
    let filterArr = [];
    for (let i = 0; i < foods.length; i++) {
        if (foods[i][1] !== undefined) {
            foods[i][1] = Number(foods[i][1])
            filterArr.push(foods[i])
        }
    }
    return filterArr;
}

function statusMenu(foods) {
  // code here
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

function statisticMenu(foods) {
  // code here
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

function generateMenu(foods) {
  // code here
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

console.log(generateMenu(foods))

// Silahkan tulis kode kamu untuk Manipulasi DOM disini
function customize() {
    const result = generateMenu(foods)
    const xpn = document.getElementById("expensiveCount");
    if (result.statistic.expensive === undefined) {
        xpn.innerHTML = 0;
    } else {
        xpn.innerHTML = result.statistic.expensive;
    }
    const std = document.getElementById("standardCount");
    std.innerHTML = result.statistic.standard;
    if (result.statistic.standard === undefined) {
        std.innerHTML = 0;
    } else {
        std.innerHTML = result.statistic.standard;
    }
    const chp = document.getElementById("cheapCount");
    chp.innerHTML = result.statistic.cheap;
    if (result.statistic.cheap === undefined) {
        chp.innerHTML = 0;
    } else {
        chp.innerHTML = result.statistic.cheap;
    }
}

// RENDER DI BROWSER
// selectors
const menuList = document.querySelector('.menu-list')

// ABAIKAN code dibawah ini
function render() {
  // get todo list
  let menuObject = generateMenu(foods)
  // put all task to html
  for (let i = 0; i < menuObject.menu.length; i++) {
    // create div
    const menu = document.createElement('div')
    menu.classList.add('menu')
    // create list
    const newMenu = document.createElement('li')
    newMenu.innerText = `${menuObject.menu[i].name} -- ${new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(menuObject.menu[i].price)}`
    newMenu.classList.add('menu-item')
    menu.appendChild(newMenu)

    // create completed button
    const infoButton = document.createElement('button')
    infoButton.innerHTML = menuObject.menu[i].status[0].toUpperCase() + menuObject.menu[i].status.substring(1)
    if (infoButton.innerHTML === 'Cheap') {
      infoButton.classList.add('cheap-btn')
    } else if (infoButton.innerHTML === 'Standard') {
      infoButton.classList.add('standard-btn')
    } else {
      infoButton.classList.add('expensive-btn')
    }
    menu.appendChild(infoButton)
    // append to todoList
    menuList.appendChild(menu)
  }
}
render()
customize()

// Uncomment baris ini untuk melakukan testing
// Comment juga semua code yang berhubungan dengan DOM untuk menjalankan testing
// module.exports = {
//   convertMenu,
//   filterMenu,
//   statusMenu,
//   statisticMenu,
//   generateMenu
// }
