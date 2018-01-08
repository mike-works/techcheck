#!/bin/bash
test/posix.sh && npm run lint:ts && node_modules/.bin/mocha -o test/mocha.opts