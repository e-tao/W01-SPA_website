import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";
import headerTemplate from "./hbs/header.hbs";
import navTemplate from "./hbs/nav.hbs";
import leftTemplate from "./hbs/main-left.hbs";
import rightTemplate from "./hbs/main-right.hbs";
import footerTemplate from "./hbs/footer.hbs";
import calculatorPage from "./hbs/calculator.hbs";
import dictionaryPage from "./hbs/dictionary.hbs"
import aboutPage from "./hbs/about.hbs";
import header from "./js/header";
import nav from "./js/nav";
import footer from "./js/footer";
import calculate from "./js/calculator";
import dictionary from "./js/dictionary";

const newsKey = "d9eeb81628msh2cd6c852fcdedfdp1bbcecjsna7a40cbc23ef";
//const newsKey = "4429f77179msh814d933e67b91fdp14167djsn3ad50564b911"; //if the above key is dead, pls use this new one.
const dataKey = "38A132B9FA6F4FFDA8B655D9EC9594AE"; //this one should have another 1000ish calls.

const appEl = document.getElementById("app");
appEl.innerHTML = layoutTemplate();

const headerEl = document.querySelector("header");
const navEl = document.querySelector("nav");
const footerEl = document.querySelector("footer");

headerEl.innerHTML = headerTemplate(header);
footerEl.innerHTML = footerTemplate(footer);

const mainLEl = document.getElementById("main-left");
const mainREl = document.getElementById("main-right");


const pages = {
    "home": { title: "Welcome - Daydreamer Investment", content: leftTemplate() },
    "calculator": { title: "Compound Interest Calculator", content: calculatorPage() },
    "dictionary": { title: "Investpedia Dictionary", content: dictionaryPage(dictionary) },
    "about": { title: "About the website", content: aboutPage() }
};

let active;
let initArray = ['msft', 'aapl', 'tsla', 'amzn', 'f'];
let diffArray = [];
let timestamp = new Date();
let updateData = false;

let navigate = function (page) {
    //stockNews(undefined)
    active = page;
    nav.forEach(function (el) {
        if (el.id == active) {
            el.class = "active";
        } else {
            el.class = "inactive";
        }
    });
    navEl.innerHTML = navTemplate(nav);
    mainLEl.innerHTML = pages[page].content;
    document.title = pages[page].title;
    if (page === "home") {
        initWatchlist();
        stockData();
        //stockNews();
    } else if (page === 'calculator') {
        let calbtn = document.getElementById('calculate');
        calbtn.addEventListener('click', calculate);
    }

    let menuItems = document.querySelectorAll("ul#nav>li");
    menuItems.forEach(function (el) {
        el.addEventListener("click", function () {
            navigate(el.dataset.nav);
        });
    });
};

navigate("home");

async function stockData() {
    let fetchResArray = [], resultsArray = [];
    let jsonData, results;

    if (localStorage.getItem('timestamp') === null) {
        localStorage.setItem('timestamp', timestamp.getDate());
    } else {
        let storeDate = localStorage.getItem('timestamp');
        let today = timestamp.getDate();

        if (today != storeDate) {
            updateData = true;
        }
    }

    if (localStorage.getItem("stockData") === null || updateData) {
        for (let i = 0; i < initArray.length; i++) {
            let fetchRes = await fetch(`https://api.aletheiaapi.com/StockData?symbol=${initArray[i].trim()}&summary=true`, { "method": "GET", "headers": { "key": dataKey, "Accept-Version": "2" } });
            fetchResArray.push(fetchRes);
            results = await Promise.all(fetchResArray);
        }

        for (let i = 0; i < results.length; i++) {
            resultsArray.push(results[i].json());
        }

        jsonData = await Promise.all(resultsArray);
        localStorage.setItem("stockData", JSON.stringify(jsonData));
    }
    else if (diffArray.length != 0) {
        let fetchRes = await fetch(`https://api.aletheiaapi.com/StockData?symbol=${diffArray[0].trim()}&summary=true`, { "method": "GET", "headers": { "key": dataKey, "Accept-Version": "2" } });

        diffArray = [];

        let addedStock = await fetchRes.json();
        jsonData = JSON.parse(localStorage.getItem("stockData"));
        jsonData[jsonData.length] = addedStock;
        localStorage.setItem("stockData", JSON.stringify(jsonData));
        jsonData = JSON.parse(localStorage.getItem("stockData"));
    }

    else {
        jsonData = JSON.parse(localStorage.getItem("stockData"));
    }

    mainLEl.innerHTML = leftTemplate(jsonData);
    addClick();
    addStock();
    removeStock();
    addChangeColor();
}

async function stockNews(selectedStock) {
    // let selection = selectedStock;
    // console.log(selectedStock);
    let fetchUrl;
    if (selectedStock !== undefined) {
        fetchUrl = "https://seeking-alpha.p.rapidapi.com/news/v2/list-by-symbol?id=" + selectedStock.trim() + "&until=0&since=0&size=4&number=1"
    } else {
        fetchUrl = "https://seeking-alpha.p.rapidapi.com/news/v2/list-trending?until=0&since=0&size=4";
    }

    let nFetch = await fetch(fetchUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "seeking-alpha.p.rapidapi.com",
            "x-rapidapi-key": newsKey
        }
    })
    let jsonData = await nFetch.json();
    mainREl.innerHTML = rightTemplate(jsonData.data);
}

function addStock() {
    let addBtn = document.getElementById("add-stock");
    let stockSymbolTxt = document.getElementById("stock-symbol");
    let errorMsg = document.getElementById("input-error")

    addBtn.addEventListener("click", () => {
        if (stockSymbolTxt.value != "") {
            if (!initArray.includes(stockSymbolTxt.value.toLowerCase().trim())) {
                initArray.push(stockSymbolTxt.value.toLowerCase().trim());
                diffArray.push(stockSymbolTxt.value.toLowerCase().trim());
                addToWatchlist();
            }

            if (errorMsg != undefined) {
                errorMsg.style.display = 'none';
            }
            stockData();
        } else {
            errorMsg.innerHTML = "error: add empty string to the watch list.";
        }
    })
}

function addClick() {
    let table = document.getElementById("share-data");
    let symbol = document.getElementsByClassName("symbol");
    let stockSymbolTxt = document.getElementById("stock-symbol");
    for (let a = 0; a < symbol.length; a++) {
        symbol.item(a).style.cursor = "pointer";
    }
    let selectedStock;
    for (let i = 1, x = table.rows.length; i < x; i++) {
        for (let j = 0, y = 1; j < y; j++) {
            table.rows[i].cells[j].addEventListener("click", function () {
                selectedStock = this.innerHTML;
                stockSymbolTxt.value = selectedStock;
                if (selectedStock !== undefined) {
                    //stockNews(selectedStock);
                }
            });
        }
    }
}

function addChangeColor() {
    let table = document.getElementById("share-data");
    for (let i = 1, x = table.rows.length; i < x; i++) {
        for (let j = 6, y = 7; j < y; j++) {
            if (Number(table.rows[i].cells[j].innerHTML) > 0) {
                table.rows[i].cells[j].innerHTML += '&nbsp;&#9650';
                table.rows[i].cells[j].style.color = "green";
            } else if (Number(table.rows[i].cells[j].innerHTML) < 0) {
                table.rows[i].cells[j].innerHTML += '&nbsp;&#9660;';
                table.rows[i].cells[j].style.color = "red";
            }
        }
    }
}

function initWatchlist() {
    if (localStorage.getItem("watchlist") === null) {
        localStorage.setItem("watchlist", JSON.stringify(initArray));
        //console.log(initArray);
    }
    else {
        initArray = JSON.parse(localStorage.getItem("watchlist"));
        //console.log(initArray);
    }
}

function addToWatchlist() {
    if (diffArray.length !== 0) {
        initArray = JSON.parse(localStorage.getItem('watchlist'))
        //console.log(initArray);
        initArray.push(diffArray[0]);
        localStorage.setItem("watchlist", JSON.stringify(initArray));
    }
}

function removeStock() {
    let rmBtn = document.getElementById("remove-stock");
    let stockSymbolTxt = document.getElementById("stock-symbol");
    let localWl = JSON.parse(localStorage.getItem('watchlist'));
    let localStk = JSON.parse(localStorage.getItem('stockData'));

    //console.log(localWl, localStk);

    rmBtn.addEventListener('click', () => {
        let selectedStock = stockSymbolTxt.value;

        for (let i = 0; i < localWl.length; i++) {
            if (localWl[i].toLowerCase().trim() == selectedStock.toLowerCase().trim()) {
                localWl.splice(i, 1);
            }
        }

        for (let j = 0; j < localStk.length; j++) {

            if (localStk[j].Symbol.toLowerCase().trim() == selectedStock.toLowerCase().trim()) {
                localStk.splice(j, 1);
            }
        }

        localStorage.setItem('watchlist', JSON.stringify(localWl));
        localStorage.setItem('stockData', JSON.stringify(localStk));
        stockData();
    })

}


