#!/bin/bash

clear
echo "watching $(pwd) => flow error"
fswatch -o src | xargs -n 1 -I {} ./node_modules/.bin/flow
