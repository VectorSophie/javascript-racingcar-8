import { Console } from '@woowacourse/mission-utils';
import { RacingGame } from './RacingGame.js';
import { validateCarNames, validateTryCount } from './Validator.js';

class App {
  async run() {
    try{
      const inputNames = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
      const carNames = inputNames.split(',').map((name) => name.trim());
      validateCarNames(carNames);

      const inputTryCount = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');

      const tryCount = Number(inputTryCount); // using Number instead of operands
      validateTryCount(tryCount);

      Console.print('\n실행 결과');
      const game = new RacingGame(carNames);
      game.play(tryCount);

      const winners = game.getWinners();
      Console.print(`\n최종 우승자 : ${winners.join(', ')}`);

    } catch(error) {
      Console.print(error.message); // now use prefixes instead of hard coding them
      throw error;
    }
  }
}

export default App;
