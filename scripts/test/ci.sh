#!/bin/bash
TEST_SUITE=SHELL ./scripts-ci/posix-script.sh
TEST_SUITE=LINT ./scripts-ci/posix-script.sh
TEST_SUITE=UNIT ./scripts-ci/posix-script.sh
TEST_SUITE=ACCEPTANCE ./scripts-ci/posix-script.sh