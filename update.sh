#!/bin/bash

git add .
read -p "Please input you commit: " msg
git commit -m $msg
git push https://github.com/orangbus/Tool.git master

echo "==== complate ok ! ===="
