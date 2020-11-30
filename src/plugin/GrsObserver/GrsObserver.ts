interface IData {
  option: string;
  value: number | boolean;
}

interface IGrsObserver {
  subscribers: IObservers;
  addSubscriber(func: (data: IData) => void | unknown): void;
  removeSubscriber(func: (data: IData) => void | unknown): void;
  notifySubscribers(data: IData | void): void;
}

interface IObservers extends Array<(data: IData | void) => void> {
  [index: number]: (data: IData | void) => void;
}

class GrsObserver implements IGrsObserver {
  subscribers: IObservers;

  constructor() {
    this.subscribers = [] as IObservers;
  }

  addSubscriber(func: (data: IData) => void | unknown): void {
    if (typeof func !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    for (let i = 0, ilen = this.subscribers.length; i < ilen; i += 1) {
      const observer = this.subscribers[i];
      if (observer === func) {
        throw new Error('Subscriber already in the list');
      }
    }
    this.subscribers.push(func as () => void);
  }

  removeSubscriber(func: (data: IData) => void | unknown): void {
    for (let i = 0, ilen = this.subscribers.length; i < ilen; i += 1) {
      const observer = this.subscribers[i];
      if (observer === func) {
        this.subscribers.splice(i, 1);
        return;
      }
    }
    throw new Error('Could not find Subscriber in list of Subscribers');
  }

  notifySubscribers(data: IData | void): void {
    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    const subscribersSnapshot = this.subscribers.slice(0);
    for (let i = 0, ilen = subscribersSnapshot.length; i < ilen; i += 1) {
      subscribersSnapshot[i](data);
    }
  }
}

export { IData, IGrsObserver, GrsObserver };
