import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";
import headerTemplate from "./hbs/header.hbs";
import navTemplate from "./hbs/nav.hbs";
import mainTemplate from "./hbs/main.hbs";
import footerTemplate from "./hbs/footer.hbs";
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
navEl.innerHTML = navTemplate(nav);
mainEl.innerHTML = mainTemplate();
footerEl.innerHTML = footerTemplate(footer);



