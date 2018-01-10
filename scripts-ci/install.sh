#!/bin/bash

if [ "$TEST_SUITE" == "SHELL" ]; then
  echo "Skipping npm install"
else
  $(which npm) install
fi
# if ($NO)