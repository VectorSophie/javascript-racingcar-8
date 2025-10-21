export function validateCarNames(names) {
  if (!names || names.length === 0) {
    throw new Error('이름을 입력해야 합니다.');
  }

  names.forEach((name) => {
    if (name.length === 0) {
      throw new Error('빈 이름은 허용되지 않습니다.');
    }
    if (name.length > 5) {
      throw new Error('이름은 5자 이하만 가능합니다.');
    }
  });
}

export function validateTryCount(count) {
  if (isNaN(count)) {
    throw new Error('숫자를 입력해야 합니다.');
  }
  if (!Number.isInteger(count)) {
    throw new Error('시도 횟수는 정수여야 합니다.');
  }
  if (count < 1) {
    throw new Error('시도 횟수는 1 이상이어야 합니다.');
  }
}
