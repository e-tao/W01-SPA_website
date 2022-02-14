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
const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");

headerEl.innerHTML = headerTemplate(header);
mainEl.innerHTML = rightTemplate();

const mainREl = document.getElementById("main-left");


footerEl.innerHTML = footerTemplate(footer);

const pages = {
    "home": { title: "Welcome Home", content: leftTemplate() },
    "about": { title: "About the website", content: aboutPage() }
};

let active;

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
    mainREl.innerHTML = pages[page].content;


    let menuItems = document.querySelectorAll("ul#nav>li");
    menuItems.forEach(function (el) {
        el.addEventListener("click", function () {
            //console.log("clicked");
            navigate(el.dataset.nav);
        });
    });
};


navigate("home");






const newsKey = "5GfnqumaqTKfDRV2pgckrhH3lwfH3zfYn1PA4C73";
const stockKey = "38A132B9FA6F4FFDA8B655D9EC9594AE";

const newsUrl = "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=5GfnqumaqTKfDRV2pgckrhH3lwfH3zfYn1PA4C73";
const stockUrl = "";


// let newsFetchReq = fetch(newsUrl);
// let newsFetchResult = await newsFetchReq;



