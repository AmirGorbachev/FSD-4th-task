interface IGrsObserver {}

interface IObservers extends Array<any> {
  [index: number]: () => void;
}

class GrsObserver implements IGrsObserver {
  observers: IObservers;

  constructor() {
    this.observers = [] as IObservers;
  }

  addObserver(func: () => any) {
    if (typeof func !== 'function') {
      throw new Error('Observer must be a function');
    }
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === func) {
        throw new Error('Observer already in the list');
      }
    }
    this.observers.push(func);
  }

  removeObserver(func: () => any) {
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === func) {
        this.observers.splice(i, 1);
        return;
      }
    }
    throw new Error('Could not find observer in list of observers');
  }

  notifyObservers(data: any) {
    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    let observersSnapshot = this.observers.slice(0);
    for (let i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
      observersSnapshot[i](data);
    }
  }
}

export { IGrsObserver, GrsObserver };
