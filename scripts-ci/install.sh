#!/bin/bash

. ./bootstrap/semver.sh

NODE_VERSION=$($(which node) -v)
echo "NODE_VERSION=$NODE_VERSION"
semverGT $NODE_VERSION "4.0.0"
NODE_VERSION_CHECK_RESULT=$?
echo "NODE_VERSION_CHECK_RESULT=$NODE_VERSION_CHECK_RESULT"
if [ "$NODE_VERSION_CHECK_RESULT" == "1" ]; then
  $(which npm) install
else
  echo "Skipping npm install"
fi
# if ($NO)