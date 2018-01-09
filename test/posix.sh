#!/bin/bash
rm -rf tmp
mkdir tmp

ERRORS=0
function assertInFile() {
  
  found=$(find "$1" -exec grep "$2" {} \;)
  if [ -z "$found" ];
  then
    echo "  🛑 Checking $1 for $2"
    (( ERRORS++ ))
  else
    echo "  ✅ Checking $1 for $2"
  fi;
}

echo "Testing normal node.js detection"
DEBUG_SHELL=true bootstrap/bootstrap.sh > tmp/out-posix-normal.txt
assertInFile tmp/out-posix-normal.txt "Node path found: "
assertInFile tmp/out-posix-normal.txt "Node version found: v"
assertInFile tmp/out-posix-normal.txt "Node.js v"
assertInFile tmp/out-posix-normal.txt "Downloading"

echo "Testing missing node"
DEBUG_SHELL=true TECHCHECK_NODE_CMD=fifyfofum bootstrap/bootstrap.sh > tmp/out-posix-nonode.txt
assertInFile tmp/out-posix-nonode.txt "ERROR: No node.js found on this system!"
assertInFile tmp/out-posix-nonode.txt "Go to https://nodejs.org and follow installation instructions"

echo "Testing unsatisfactory node version"
DEBUG_SHELL=true TECHCHECK_MIN_NODE_VERSION='99.0.0' bootstrap/bootstrap.sh > tmp/out-posix-badversion.txt
assertInFile tmp/out-posix-badversion.txt "is too old."


if [[ "$ERRORS"=="0" ]]; then
  echo ">> All tests passed!"
  exit 0
else
  echo ">> $ERRORS error(s) detected!"
  exit 1
fi