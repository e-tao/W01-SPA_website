import "../css/styles.css";
import layout from "../hbs/layout.hbs";


const appEl = document.getElementById("app");
appEl.innerHTML = layout();

console.log("hello Bob!");