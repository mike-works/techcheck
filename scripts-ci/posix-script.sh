echo "TEST_SUITE=$TEST_SUITE"
if [ "$TEST_SUITE" == "SHELL" ]; then
  test/posix.sh
elif [ "$TEST_SUITE" == "LINT" ]; then
  npm run lint:ts
elif [ "$TEST_SUITE" == "UNIT" ]; then
  node_modules/.bin/mocha -o test/mocha.opts
elif [ "$TEST_SUITE" == "ACCEPTANCE" ]; then
  node dist/index.js
else
  echo "no TEST_SUITE defined"
  exit 1
fi