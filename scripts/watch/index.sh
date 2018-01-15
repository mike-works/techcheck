#!/bin/bash
./node_modules/.bin/concurrently  -p [{name}] -n BUILD,RUN "npm run build:watch" "./node_modules/.bin/nodemon dist/index.js -w dist/** -w techcheck.config.js -e \"js\"" 