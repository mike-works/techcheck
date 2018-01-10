#!/bin/bash
concurrently -k -p '[{name}]' -n 'TypeScript' -c 'cyan.bold' '$(which npm) run watch:ts'