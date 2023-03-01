import comboboxInit from "../utils/combobox.js";

function searchSubject() {
  let observers = [];

  function subscribe(observer) {
    observers.push(observer);
  }

  function unsubscribe(observer) {
    observers = observers.filter((obs) => obs !== observer);
  }

  function fire(datas) {
    observers.forEach((obs) => {
      obs.update(datas);
    });
  }

  return { subscribe, unsubscribe, fire };
}

export default searchSubject;
