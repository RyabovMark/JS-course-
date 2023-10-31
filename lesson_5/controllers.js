import FetchService from "./service_fetch.js";
import XmlService from "./service_xml.js";

class Controllers {
  constructor(url, method) {
    this.methods = {};

    if (method === "fetch") {
      this.methods = new FetchService(url);
    }
    if (method === "xml") {
      this.methods = new XmlService(url);
    }
  }

  async createElement(options) {
    try {
      const element = await this.methods.createElement({ ...options });
      console.log("Элемент создан: ", element);
    } catch (error) {
      console.error(error);
    }
  }

  async collection() {
    try {
      const data = await this.methods.getCollection();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getElement(id) {
    try {
      const data = await this.methods.getElement(id);
      console.log(`Элемент с id: ${id}:`, data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateElement(id, body) {
    try {
      const element = await this.methods.updateElement(id, { ...body });
      console.log(`Элемент с id: ${id} был изменен:`, element);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteElement(id) {
    try {
      const response = await this.methods.deleteElement(id);
      if (response) {
        console.log(`Элемент с id: ${response} был удален из коллекции`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

//Класс Controller позволяет быстро переключать между fetch и xml
const data = new Controllers("http://37.220.80.108/tasks", "xml");

data
  .collection()
  .then(() => data.getElement(700)) //Получаем элемент, который есть в коллекции
  .then(() => data.getElement(9999)) //Нет в коллекции, кейс на проверку
  // введенного id
  .then(() => data.updateElement(700, { name: "ItS kjbw12orks" })) //Изменяю
  // элемент коллекции
  .then(() => data.getElement(700)) //Проверяю изменения
  .then(() => data.updateElement(9999, { name: "ItS kjbworks" })) // Пытаюсь
  // обновить элемент которого нет в коллекции
  .then(
    () =>
      data.createElement({
        name: "1221",
        info: true,
        isImportant: true,
      }), //создаю элемент
  )
  .then(() => data.deleteElement()) //Удаляю элемент таблицы, для удобства -
  //  удаляет предпоследний элемент таблицы
  .then(() => data.deleteElement(9999)); //Пытаюсь удалить элемент которого нет в
// таблице
