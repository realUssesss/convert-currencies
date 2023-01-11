const courses = {};

const elementUSD = document.querySelector('[data-value= "USD"]');
const elementEUR = document.querySelector('[data-value= "EUR"]');
const elementKZT = document.querySelector('[data-value= "KZT"]');

const getCur = async function getCurrence() {
  const required = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = required.json();
  const result = await data;

  courses.USD = result.Valute.USD;
  courses.EUR = result.Valute.EUR;
  courses.KZT = result.Valute.KZT;

  console.log(courses);

  elementUSD.textContent = courses.USD.Value.toFixed(3) + "~";
  elementEUR.textContent = courses.EUR.Value.toFixed(3) + "~";
  elementKZT.textContent = courses.KZT.Value.toFixed(3) + "~";

  if (courses.USD.Value < courses.USD.Previous) {
    elementUSD.classList.add("top");
  } else elementUSD.classList.add("bottom");

  if (courses.EUR.Value < courses.EUR.Previous) {
    elementEUR.classList.add("top");
  } else elementEUR.classList.add("bottom");

  if (courses.KZT.Value < courses.KZT.Previous) {
    elementKZT.classList.add("top");
  } else elementKZT.classList.add("bottom");
};

getCur();

setInterval(getCur, 5000);

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

const inp = (input.oninput = () => {
  result.value = (
    parseFloat(input.value) / courses[select.value].Value
  ).toFixed(2);
});

const sel = (select.oninput = () => {
  result.value = (
    parseFloat(input.value) / courses[select.value].Value
  ).toFixed(2);
});
