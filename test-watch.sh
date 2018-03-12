#!/bin/bash

clear
echo "watching $(pwd) => make test"
fswatch -o src spec | xargs -n 1 -I {} ./yarn test
