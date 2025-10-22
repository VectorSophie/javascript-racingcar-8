import { Console, Random } from '@woowacourse/mission-utils';
import { Car } from './Car.js';

export class RacingGame {
  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
  }

  play(tryCount) {
    for (let i = 0; i < tryCount; i++) {
      this.cars.forEach((car) => {
        const randomNumber = Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) car.move(); // GTE 4
      });
      this.printRound(); 
    }
  }

  printRound() {
    this.cars.forEach((car) => {
      Console.print(`${car.name} : ${'-'.repeat(car.position)}`);
    });
    Console.print('');
  }

  getWinners() {
    const maxDistance = Math.max(...this.cars.map((c) => c.position));
    return this.cars
      .filter((car) => car.position === maxDistance)
      .map((car) => car.name);
  }
}
