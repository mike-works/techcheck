echo "TEST_SUITE=$TEST_SUITE"
if [ "$TEST_SUITE" == "SHELL" ]; then
  test/posix.sh
elif [ "$TEST_SUITE" == "LINT" ]; then
  npm run lint:ts
elif [ "$TEST_SUITE" == "UNIT" ]; then
  nvm exec $TRAVIS_NODE_VERSION node_modules/.bin/mocha -o test/mocha.opts && ./node_modules/.bin/travis-deploy-once -b 11 "./node_modules/.bin/semantic-release"
elif [ "$TEST_SUITE" == "ACCEPTANCE" ]; then
  source ~/.nvm/nvm.sh
  nvm install stable
  nvm use stable
  npm install
  npm run build
  node dist/index.js || echo "done"
else
  echo "no TEST_SUITE defined"
  exit 1
fi