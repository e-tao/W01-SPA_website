import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";
import headerTemplate from "./hbs/header.hbs";
import navTemplate from "./hbs/nav.hbs";
import leftTemplate from "./hbs/main-left.hbs";
import rightTemplate from "./hbs/main-right.hbs";
import footerTemplate from "./hbs/footer.hbs";
import aboutPage from "./hbs/about.hbs";
import header from "./js/header";
import nav from "./js/nav";
import footer from "./js/footer";

const appEl = document.getElementById("app");
appEl.innerHTML = layoutTemplate();

const headerEl = document.querySelector("header");
const navEl = document.querySelector("nav");
const mainREl = document.querySelector("main");
const footerEl = document.querySelector("footer");

headerEl.innerHTML = headerTemplate(header);
mainREl.innerHTML = rightTemplate();
footerEl.innerHTML = footerTemplate(footer);

const mainLEl = document.getElementById("main-left");

const pages = {
    "home": { title: "Welcome Home", content: leftTemplate() },
    "about": { title: "About the website", content: aboutPage() }
};

let active;
let selectedStock;

let navigate = function (page) {
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
    const key = "38A132B9FA6F4FFDA8B655D9EC9594AE";

    let sFetch1 = await fetch("https://api.aletheiaapi.com/StockData?symbol=msft&summary=true", { "method": "GET", "headers": { "key": key, "Accept-Version": "2" } });
    let sFetch2 = await fetch("https://api.aletheiaapi.com/StockData?symbol=aapl&summary=true", { "method": "GET", "headers": { "key": key, "Accept-Version": "2" } });
    let sFetch3 = await fetch("https://api.aletheiaapi.com/StockData?symbol=tsla&summary=true", { "method": "GET", "headers": { "key": key, "Accept-Version": "2" } });
    let sFetch4 = await fetch("https://api.aletheiaapi.com/StockData?symbol=amzn&summary=true", { "method": "GET", "headers": { "key": key, "Accept-Version": "2" } });
    let sFetch5 = await fetch("https://api.aletheiaapi.com/StockData?symbol=f&summary=true", { "method": "GET", "headers": { "key": key, "Accept-Version": "2" } });

    let fetchRes = await Promise.all([sFetch1, sFetch2, sFetch3, sFetch4, sFetch5]);
    let jsonData = await Promise.all([fetchRes[0].json(), fetchRes[1].json(), fetchRes[2].json(), fetchRes[3].json(), fetchRes[4].json()]);
    mainLEl.innerHTML = leftTemplate(jsonData);
    addClick();
}

//stockData();

function addClick() {
    let table = document.getElementById("share-data");
    for (let i = 1, x = table.rows.length; i < x; i++) {
        for (let j = 0, y = 1; j < y; j++) {
            table.rows[i].cells[j].addEventListener("click", function () {
                selectedStock = this.innerHTML;
                //console.log(selectedStock);
            });
        }
    }
}





// async function newUser() {
//     let response = await fetch("https://randomuser.me/api/");
//     let data = await response.json();
//     console.log(data.results);
//     mainLEl.innerHTML = leftTemplate(data.results);
// }




