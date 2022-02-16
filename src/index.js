import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";
import headerTemplate from "./hbs/header.hbs";
import navTemplate from "./hbs/nav.hbs";
import leftTemplate from "./hbs/main-left.hbs";
import rightTemplate from "./hbs/main-right.hbs";
import footerTemplate from "./hbs/footer.hbs";
import retirementPage from "./hbs/retirement.hbs";
import aboutPage from "./hbs/about.hbs";
import header from "./js/header";
import nav from "./js/nav";
import footer from "./js/footer";
import calculate from "./js/retirement";

const newsKey = "201db791a3msh158353c883f6f50p199751jsnd1cec647662f";
const dataKey = "38A132B9FA6F4FFDA8B655D9EC9594AE";

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
    "home": { title: "Welcome Home", content: leftTemplate() },
    "retirement": { title: "Shepherd's Retirement", content: retirementPage() },
    "about": { title: "About the website", content: aboutPage() }
};

let active;
let initArray = ['msft', 'aapl', 'tsla', 'amzn', 'f'];


let navigate = function (page) {
    stockNews(undefined)
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
    if (page === "home") {
        //stockData();
        //stockNews();
    } else if (page === 'retirement') {
        let calbtn = document.getElementById('calculate');
        calbtn.addEventListener('click', calculate);
    }

    let menuItems = document.querySelectorAll("ul#nav>li");
    menuItems.forEach(function (el) {
        el.addEventListener("click", function () {
            //console.log("clicked");
            navigate(el.dataset.nav);
        });
    });
};

navigate("home");

async function stockData() {
    //console.log(initArray);
    let fetchResArray = [];
    let resultsArray = [];
    let jsonData;
    let results;

    for (let i = 0; i < initArray.length; i++) {
        let fetchRes = await fetch(`https://api.aletheiaapi.com/StockData?symbol=${initArray[i].trim()}&summary=true`, { "method": "GET", "headers": { "key": dataKey, "Accept-Version": "2" } });

        fetchResArray.push(fetchRes);
        results = await Promise.all(fetchResArray);
    }

    for (let i = 0; i < results.length; i++) {
        resultsArray.push(results[i].json());
    }

    jsonData = await Promise.all(resultsArray);
    console.log(jsonData);

    mainLEl.innerHTML = leftTemplate(jsonData);
    addClick();
    addStock();

}

async function stockNews(selected) {
    let selection = selected;

    let fetchUrl;
    if (selection !== undefined) {
        console.log("selection not false");
        fetchUrl = "https://seeking-alpha.p.rapidapi.com/news/v2/list-by-symbol?id=" + selection.trim() + "&until=0&since=0&size=4&number=1"
    } else {
        console.log("selection false");
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
            initArray.push(stockSymbolTxt.value);
            if (errorMsg != undefined) {
                errorMsg.style.display = 'none';
            }
            stockData();
        } else {
            errorMsg.innerHTML = "error: add empty string to the watch list."
        }
    })
}

function addClick() {
    //console.log("adding click");
    let table = document.getElementById("share-data");
    let symbol = document.getElementsByClassName("symbol");
    for (let a = 0; a < symbol.length; a++) {
        symbol.item(a).style.cursor = "pointer";
    }
    let selectedStock;
    for (let i = 1, x = table.rows.length; i < x; i++) {
        for (let j = 0, y = 1; j < y; j++) {
            table.rows[i].cells[j].addEventListener("click", function () {
                selectedStock = this.innerHTML;
                stockNews(selectedStock);
                //console.log(selectedStock);
            });
        }
    }
}







// async function newUser() {
//     let response = await fetch("https://randomuser.me/api/?results=2");
//     let data = await response.json();
//     console.log(data);
//     mainREl.innerHTML = rightTemplate(data);
// }

// newUser();


