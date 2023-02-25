import comboboxInit from "../utils/combobox.js";

function searchSubject() {
  let observers = [];

  function subscribe(observer) {
    observers.push(observer);
  }

  function unsubscribe(observer) {
    for (let i = 0; i < observers.length; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
      }
    }
  }

  function fire(datas) {
    for (let i = 0; i < observers.length; i++) {
      observers[i].update(datas);
    }
    comboboxInit();
  }

  return { subscribe, unsubscribe, fire };
}

export default searchSubject;
