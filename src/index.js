import "./index.html";
import "./index.scss";
import { mult, sum } from "./modules/calc";
import ancientsData from "./data/ancients";
import greenCards from "./data/mythicCards/green";
import blueCards from "./data/mythicCards/blue";
import brownCards from "./data/mythicCards/brown";

const ancients = document.querySelector(".ancients");
const gameCards = document.querySelectorAll(".game-card");

const fillCards = (stageArr) => {
  gameCards.forEach((item, index) => {
    item.textContent = stageArr[index];
  });
};

const fillStage = (ancient) => {
  let stage = [];
  for (let value in ancient) {
    if (typeof ancient[value] === "object") {
      stage.push(
        ancient[value].greenCards,
        ancient[value].brownCards,
        ancient[value].blueCards
      );
    }
  }
  return stage;
};

const takeStages = (selectedHero) => {
  for (let ancient of ancientsData) {
    if (ancient.id === selectedHero) {
      let stageArr = fillStage(ancient);
      fillCards(stageArr);
    }
  }
};

ancients.addEventListener("click", (e) => {
  console.log(e.target.id);
  takeStages(e.target.id);
});

const imgWrap = document.querySelector(".card-result");
const img = new Image();
img.src = greenCards[1].cardFace;
// img.src = ancientsData[1].cardFace;
imgWrap.append(img);

const ul = document.querySelector("ul");
console.log(ul);
// ul.style.background = `url('${ancientsData[1].cardFace}')`;
