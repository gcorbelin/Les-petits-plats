function searchSubject() {
  const observers = [];

  function subscribe(observer) {
    observers.push(observer);
  }

  function unsubscribe(observer) {
    for (let i = 0; i < observers.length; i += 1) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
      }
    }
  }

  function fire(datas) {
    for (let i = 0; i < observers.length; i += 1) {
      observers[i].update(datas);
    }
  }

  return { subscribe, unsubscribe, fire };
}

export default searchSubject;
