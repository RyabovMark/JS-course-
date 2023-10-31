// Написать функцию которая создаст очереди в следующем порядке:
// 1. Макрозадача
//  1.1 микрозадача
//  1.2 Рендер задача (например изменение стилей)
// 2. Макрозадача
//  2.1 микрозадача
//  2.2 микрозадача
// 3. Макрозадача
//  3.1 микрозадача
//  3.2 Рендер задача (например изменение содержание элемента)

// Наполнение стека происходит
// по следующей цепочке:
// 1. Задачи promise
// 2. Микрозадачи setTimeout AJAX
// 3. Рендер

function changeContent() {
  const heading = document.querySelector("h1");
  heading.innerText = "Новый текст";
  console.log("content has been changed");
}

function changeStyle() {
  const p = document.querySelector("p");
  p.style.color = "red";
  console.log("styles have been changed");
}

function taskQueue() {
  setTimeout(async () => {
    await Promise.resolve().then(() => {
      console.log("promise resolve");
    });
    changeContent();
  }, 2000);
  setTimeout(() => {
    Promise.resolve()
      .then(() => console.log("promise resolve2"))
      .then(() => console.log("promise resolve3"));
  }, 2000);
  setTimeout(async () => {
    await Promise.resolve().then(() => {
      console.log("promise resolve4");
    });
    changeStyle();
  }, 2000);
}

taskQueue();


// Доб. Задача на собственный метод map
Array.prototype.myMap = function (cb) {
  //Проверка на массив
  if (!Array.isArray(this)) {
    throw new Error("this is not an Array");
  }
  //Проверка на длину массива равную 0
  if (this.length === 0) {
    return [];
  }
  //Исключаем ложные значения
  let index = 0;
  let truthful = [];
  for (let i = 0; i < this.length; i++) {
    const el = this[i];
    const bolEl = Boolean(el);
    if (bolEl) {
      truthful[index] = el;
      index++;
    }
  }
  //Преобразуем труфи массив
  let maped = [];
  for (let i = 0; i < truthful.length; i++) {
    const el = truthful[i];
    const newEl = cb(el, i, truthful);
    maped[i] = newEl;
  }
  //Возвращаем данные
  return maped;
};

const arr = [1, undefined, null, false, 2, 3, 4];
console.log(arr.myMap((el) => el * 2))