import "./index.html";
import "./index.scss";
import { mult, sum } from "./modules/calc";
import ancientsData from "./data/ancients";

const imgWrap = document.querySelector(".card-result");
const img = new Image();
img.src = ancientsData[1].cardFace;
imgWrap.append(img);

const ul = document.querySelector("ul");
console.log(ul);
// ul.style.background = `url('${ancientsData[1].cardFace}')`;
