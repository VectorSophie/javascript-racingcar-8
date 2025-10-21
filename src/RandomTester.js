import { Random } from '@woowacourse/mission-utils';

const results = Array(10).fill(0); // for counting results

const ITERATIONS = 10000;
for (let i = 0; i < ITERATIONS; i++) {
  const num = Random.pickNumberInRange(0, 9);
  results[num]++;
}

console.log('Random.pickNumberInRange(0, 9) 분포');
results.forEach((count, i) => {
  const percent = ((count / ITERATIONS) * 100).toFixed(2);
  console.log(`${i}: ${count} (${percent}%)`);
});
