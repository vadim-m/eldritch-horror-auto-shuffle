import "./index.html";
import "./index.scss";
import { mult, sum } from "./modules/calc";
import ancientsData from "./data/ancients";
import greenCards from "./data/mythicCards/green";
import blueCards from "./data/mythicCards/blue";
import brownCards from "./data/mythicCards/brown";

const ancients = document.querySelector(".ancients");
const gameCards = document.querySelectorAll(".game-card");
const shuffleBtn = document.querySelector(".shuffle-btn");
const cardBtn = document.querySelector(".card-backside");
shuffleBtn.disabled = true;

// заполнили схему
const fillScheme = (stageArr) => {
  gameCards.forEach((item, index) => {
    item.textContent = stageArr[index];
  });
};

// заполнили массив всех нужных карт на игру
const fillAllStages = (ancient) => {
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

// заполнили конкретный стейдж рандомными картами и для рандома отсортировали их по последней цифре
const fillStage = (stage, greenCards, brownCards, blueCards) => {
  const arr1 = addGreenCard(stage[0], greenCards);
  const arr2 = addBrownCard(stage[1], brownCards);
  const arr3 = addBlueCard(stage[2], blueCards);

  return [arr1, arr2, arr3].flat().sort(function (a, b) {
    if (a.id.slice(-1) > b.id.slice(-1)) {
      return 1;
    }
    if (a.id.slice(-1) < b.id.slice(-1)) {
      return -1;
    }
    return 0;
  });
};

// получили сумму карт
const getCardAmount = (color) => {
  const cardsNodes = document.querySelectorAll(`.game-card--${color}`);
  const cards = Array.from(cardsNodes);
  const result = cards.reduce((acc, item) => {
    return acc + +item.textContent;
  }, 0);
  return result;
};

// функция для рандома числа
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// получаем массив рандомных карточек
const getCardsArrayByColor = (color, num) => {
  const copyGreenCards = [...greenCards];
  const copyBrownCards = [...brownCards];
  const copyBlueCards = [...blueCards];

  const resulCardsArr = [];

  if (color === "green") {
    for (let i = 0; i < num; i++) {
      const randomNum = getRandomIntInclusive(0, copyGreenCards.length);
      const randomCard = copyGreenCards.splice(randomNum, 1);
      resulCardsArr.push(...randomCard);
    }
  } else if (color === "brown") {
    for (let i = 0; i < num; i++) {
      const randomNum = getRandomIntInclusive(0, copyBrownCards.length);
      const randomCard = copyBrownCards.splice(randomNum, 1);
      resulCardsArr.push(...randomCard);
    }
  } else if (color === "blue") {
    for (let i = 0; i < num; i++) {
      const randomNum = getRandomIntInclusive(0, copyBlueCards.length);
      const randomCard = copyBlueCards.splice(randomNum, 1);
      resulCardsArr.push(...randomCard);
    }
  }

  return [...resulCardsArr];
};

const addGreenCard = (count, greenCards) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomNum = getRandomIntInclusive(0, greenCards.length);
    const item = greenCards.splice(randomNum, 1);
    result.push(...item);
  }

  return result;
};

const addBrownCard = (count, brownCards) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomNum = getRandomIntInclusive(0, brownCards.length);
    const item = brownCards.splice(randomNum, 1);
    result.push(...item);
  }

  return result;
};

const addBlueCard = (count, blueCards) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomNum = getRandomIntInclusive(0, blueCards.length);
    const item = blueCards.splice(randomNum, 1);
    result.push(...item);
  }

  return result;
};

// наполняем колоду
const fillDeck = (stagesArr) => {
  // количество карт (число) на все этапы по цветам
  const greenAmountCards = getCardAmount("green");
  const browmAmountCards = getCardAmount("brown");
  const blueAmountCards = getCardAmount("blue");

  // массивы рандомных карт (объектов) по цветам в суммарном для игры количетсве
  const arrOfRndGreenCards = getCardsArrayByColor("green", greenAmountCards);
  const arrOfRndBrownCards = getCardsArrayByColor("brown", browmAmountCards);
  const arrOfRndBlueCards = getCardsArrayByColor("blue", blueAmountCards);

  // количество карт (число) по цветам в этапах
  const firstStage = [stagesArr[0], stagesArr[1], stagesArr[2]];
  const secondStage = [stagesArr[3], stagesArr[4], stagesArr[5]];
  const thirdStage = [stagesArr[6], stagesArr[7], stagesArr[8]];

  // заполняем stage 1
  const filledFirstStage = fillStage(
    firstStage,
    arrOfRndGreenCards,
    arrOfRndBrownCards,
    arrOfRndBlueCards
  );
  // заполняем stage 1
  const filledSecondStage = fillStage(
    secondStage,
    arrOfRndGreenCards,
    arrOfRndBrownCards,
    arrOfRndBlueCards
  );
  // заполняем stage 1
  const filledThirdStage = fillStage(
    thirdStage,
    arrOfRndGreenCards,
    arrOfRndBrownCards,
    arrOfRndBlueCards
  );

  return [
    ...filledFirstStage,
    ...filledSecondStage,
    ...filledThirdStage,
  ].flat();
};

const imgWrap = document.querySelector(".card-result");
const img = new Image();
imgWrap.append(img);
let counter = 0;
let deck;

cardBtn.addEventListener("click", (e) => {
  if (counter < deck.length) {
    img.src = deck[counter].cardFace;
    counter++;
  }
});

const startPreparing = (selectedHero) => {
  for (let ancient of ancientsData) {
    if (ancient.id === selectedHero) {
      let stagesArr = fillAllStages(ancient);
      fillScheme(stagesArr);
      deck = fillDeck(stagesArr);
      counter = 0;
      shuffleBtn.disabled = false;
    }
  }
};

const addActiveClass = (item) => {
  const targetClass = item.classList[0];
  document.querySelectorAll(`.${targetClass}`).forEach((item) => {
    item.classList.remove("active");
  });

  item.classList.add("active");
};

ancients.addEventListener("click", (e) => {
  addActiveClass(e.target);
  startPreparing(e.target.id);
});

console.log(`То, что смог реализовать:

  1. На выбор предоставляется минимум одна карта древнего (максимум 4) +5-20 баллов(по 5 за каждого древнего)
  3. Карты замешиваются согласно правилам игры +40 баллов

  ------------------------------------------------------

  Если будут вопросы - телега https://t.me/vadim_mm
`);
