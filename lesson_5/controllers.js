import FetchService from "./service_fetch.js";
import XmlService from "./service_xml.js";

class Controllers {
  constructor(url, method) {
    this.method = method;
    if (this.method === "fetch") {
      this.methods = new FetchService(url);
    }
    if (this.method === "xml") {
      this.methods = new XmlService(url);
    }
  }

  createElement(obj) {}

  async Collection() {}

  getElement(id) {}

  updateElement(id) {}

  deleteElement(id) {}
}

Object.assign(Controllers.prototype, XmlService.prototype);
const data = new Controllers("http://37.220.80.108/tasks", "fetch");

console.log(data.Collection());
