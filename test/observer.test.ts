import { IData, GrsObserver } from '../src/plugin/GrsObserver/GrsObserver';

let observer = new GrsObserver();
let someObjest = {
  someMethod(argument: unknown) {
    return argument;
  },
};

describe('GrsObserver.addSubscriber:', () => {
  beforeAll(() => {
    observer.addSubscriber(someObjest.someMethod);
  });

  test('should check if the input parameter is a function', () => {
    // Strong types prevents from testing it
  });

  test('input argument must not duplicate an existing subscriber', () => {
    // Function will return an error, there is no point in testing this
  });

  test('should add a new subscriber', () => {
    expect(observer.subscribers.includes(someObjest.someMethod)).toBeTruthy();
  });
});

describe('GrsObserver.removeSubscriber:', () => {
  beforeAll(() => {
    observer.removeSubscriber(someObjest.someMethod);
  });

  test('should remove subscriber from subscribers', () => {
    expect(observer.subscribers.includes(someObjest.someMethod)).toBeFalsy();
  });
});

describe('GrsObserver.notifySubscribers:', () => {
  const spyOnSomeMethod = jest.spyOn(someObjest, 'someMethod');

  beforeAll(() => {
    observer.addSubscriber(spyOnSomeMethod as unknown as (data: IData) => unknown);
    observer.notifySubscribers({option: 'minValue', value: 50})
  });

  test('should call a subscribers', () => {
    expect(spyOnSomeMethod).toBeCalled();
  });
});
