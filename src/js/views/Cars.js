import { $, hide } from '../../utils/dom.js';
import { generateRandomNumbersUntil, range } from '../../utils/index.js';

const template = {
  forward: () => `
    <div class="forward-icon mt-2">⬇️️</div>
  `,
  spinner: () => `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `,
  car: (carName, idx) => `
  <div class="mr-2" data-car-name="${carName}-${idx}">
    <div class="car-player">${carName}</div>
  </div>
  `,
};

const removeChild = ($el) => {
  while ($el.hasChildNodes()) {
    $el.firstChild.remove();
  }
};

const MIN_NUMBER_TO_MOVE = 4;
const randomNumbers = (times, minNumberToMove = MIN_NUMBER_TO_MOVE) =>
  range(times)
    .map(() => generateRandomNumbersUntil())
    .map((n) => n >= minNumberToMove);

const generateRandomNumbers = (carNames, times) =>
  carNames.map((carName) => ({
    carName,
    forwards: randomNumbers(times),
  }));

const Cars = ($el, store) => {
  const render = () => {
    removeChild($el);
    const carNames = store.getState('carNames');

    $el.insertAdjacentHTML(
      'afterbegin',
      carNames.map((carName, idx) => template.car(carName, idx)).join('')
    );

    hide($el, false);
  };

  const mutateRandomNumbers = () => {
    const { carNames, times } = store.getState();
    store.setState({
      randomNumbers: generateRandomNumbers(carNames, times),
    });
  };

  const moveCar = ({ carName, forwards }, idx) => {
    const $car = $(`[data-car-name="${carName}-${idx}"]`, $el);
    const _template = forwards.filter(Boolean).map(template.forward).join('');

    $car.insertAdjacentHTML('beforeend', _template);
  };

  const renderForward = (randomNumbers) => randomNumbers.forEach(moveCar);

  const init = () => {
    hide($el, true);

    store.subscribe({ key: 'times', actions: [render, mutateRandomNumbers] });
    store.subscribe({
      key: 'init',
      actions: [() => hide($el, true)],
    });
    store.subscribe({
      key: 'randomNumbers',
      actions: [renderForward],
    });
  };

  init();
};

export default Cars;