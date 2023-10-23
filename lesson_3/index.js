// 1. Сделать функцию, которая будет позволять вызывать себя последовательно для
// суммирования и/или при выводе и/или математической операции вернет конечный
// результат fucn(2)(3)(5) = 10

function sum() {
  return Array.from(arguments).reduce((acum, num) => {
    return acum + num;
  }, 0);
}

console.log(sum(1, 2)); //=>3, Последовательно складывает все числа которые мы
// передаем в параметры;

function curry(cb) {
  return function curried(...args) {
    if (args.length >= cb.length) {
      return cb.apply(this, args);
    } else {
      return function (...args2) {
        return function () {}.apply(this, args.concat(args2));
      };
    }
  };
}

const func = curry(sum);

console.log(func(2, 3, 4));

// 2. Преобразовать строку в объект, разделяя свойства по точке.
const str = "one.two.three.four.five";

function fromStrToObj(str) {
  const arr = str.split(".");
  let obj = {};
  let i = arr.length - 1;

  while (i >= 0) {
    // создаем свойство newProp со значением {}
    let newProp = {};
    // по индексу присваиваем ему то что на данный момент есть в obj
    newProp[arr[i]] = obj;
    // Меняем значение
    obj = newProp;
    i--;
  }
  // просто для того что бы в консоли корректно отображался результат:)
  return JSON.stringify(obj, null, 2);
}

console.log(fromStrToObj(str));
