import Checker from './checker';
import Evaluator from './evaluator';
import 'es6-promise/auto';

(async function() {
  let e = new Evaluator({});

  let status = await e.evaluate();
  console.log('status=', status);
})();
