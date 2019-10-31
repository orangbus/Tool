#!/bin/bash
echo "===== welcome use github sync ===="
echo "Easy use :"
echo "Just replace gitUrl and input commit describe,then"
echo "bash ./update.sh"
echo "==== https://github.com/orangbus/Tool ===="

git add .
read -p "Please input you commit info: " msg
git commit -m $msg
git push https://github.com/orangbus/Tool.git master

echo "==== complate ok ! ===="
