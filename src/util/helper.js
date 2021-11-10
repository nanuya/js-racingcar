export const qs = (selector, scope = document) => {
  if (!selector) throw 'no selector';

  return scope.querySelector(selector);
};

export const qsAll = (selector, scope = document) => {
  if (!selector) throw 'no selector';

  return Array.from(scope.querySelectorAll(selector));
};

export const on = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
};

export const delegate = (target, eventName, selector, handler) => {
  const emitEvent = (event) => {
    const potentialElements = qsAll(selector, target);
    for (const potentialElement of potentialElements) {
      if (potentialElement === event.target) {
        return handler.call(event.target, event);
      }
    }
  };

  on(target, eventName, emitEvent);
};

export const createElement = (element) => {
  if (!element) throw 'no element';

  return document.createElement(element);
};

export const getRandom = () => {
  return Math.floor(Math.random() * 9);
};