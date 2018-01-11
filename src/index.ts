import Checker from './checker';
import Evaluator from './evaluator';

(async function() {
  let e = new Evaluator({});

  let status = await e.evaluate();
  console.log('status=', status);
})();
