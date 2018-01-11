#!/bin/bash

if [ "$TEST_SUITE" == "SHELL" ]; then
  echo "Skipping npm install for SHELL suite"
elif [ "$TEST_SUITE" == "ACCEPTANCE" ]; then
  echo "Skipping npm install for ACCEPTANCE suite"
else
  $(which npm) install
fi
# if ($NO)