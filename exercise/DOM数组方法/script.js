const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)

let data = [];


for(var i=0;i<5;i++)
getRandomUser()

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 2000000)
    };
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function doubleMoney() {
    data = data.map(user => {
        return {...user , money: user.money * 2};
    });
    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calculateWealth() {
    updateDOM();
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>总金额:<strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>消费者</strong> 消费金额</h2>'
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        console.log(element)
        main.appendChild(element);
    })
}