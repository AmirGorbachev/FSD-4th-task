interface IGrsObserver {
  subscribers: IObservers;
  addSubscriber(func: () => unknown): void;
  removeSubscriber(func: () => any): void;
  notifySubscribers(data?: any): void;
}

interface IObservers extends Array<any> {
  [index: number]: () => void;
}

class GrsObserver implements IGrsObserver {
  subscribers: IObservers;

  constructor() {
    this.subscribers = [] as IObservers;
  }

  addSubscriber(func: () => unknown) {
    console.log(func)
    if (typeof func !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    for (let i = 0, ilen = this.subscribers.length; i < ilen; i += 1) {
      let observer = this.subscribers[i];
      if (observer === func) {
        throw new Error('Subscriber already in the list');
      }
    }
    this.subscribers.push(func);
  }

  removeSubscriber(func: () => any) {
    for (let i = 0, ilen = this.subscribers.length; i < ilen; i += 1) {
      let observer = this.subscribers[i];
      if (observer === func) {
        this.subscribers.splice(i, 1);
        return;
      }
    }
    throw new Error('Could not find Subscriber in list of Subscribers');
  }

  notifySubscribers(data?: any) {
    console.log('notify');
    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    let subscribersSnapshot = this.subscribers.slice(0);
    for (let i = 0, ilen = subscribersSnapshot.length; i < ilen; i += 1) {
      subscribersSnapshot[i](data);
    }
  }
}

export { IGrsObserver, GrsObserver };
