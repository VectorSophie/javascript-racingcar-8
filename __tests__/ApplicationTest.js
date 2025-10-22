import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
  describe("예외 테스트", () => {
    test("이름을 입력하지 않음", async () => {
      mockQuestions([""]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 이름을 입력해야 합니다.");
    });

    test("이름이 5자 초과", async () => {
      mockQuestions(["pobijun"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 이름은 5자 이하만 가능합니다.");
    });

    test("빈 이름 포함", async () => {
      mockQuestions(["pobi,,jun"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 이름을 입력해야 합니다.");
    });

    test("시도 횟수가 숫자가 아님", async () => {
      mockQuestions(["pobi,woni", "abc"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 숫자를 입력해야 합니다.");
    });

    test("시도 횟수가 1 미만", async () => {
      mockQuestions(["pobi,woni", "0"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수는 1 이상이어야 합니다.");
    });

    test("시도 횟수가 정수가 아님", async () => {
      mockQuestions(["pobi,woni", "3.5"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수는 정수여야 합니다.");
    });
  });
});
