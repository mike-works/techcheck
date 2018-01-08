#!/bin/bash
concurrently -k -p '[{name}]' -n 'TypeScript,Node' -c 'cyan.bold,green.bold' '$(which npm) run watch:ts' '$(which npm) run watch:node'