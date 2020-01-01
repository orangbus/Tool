#!/bin/bash
echo "===== welcome use github sync ===="
echo "Easy use :"
echo "Just replace gitUrl and input commit describe,then"
echo "bash ./update.sh"
echo "==== https://github.com/orangbus/Tool ===="


# Config
github="https://github.com/orangbus/Tool.git"
gitee="https://gitee.com/orangbus/Tool.git"

echo -e;

# laradock
function laradock()
{
    git clone https://github.com/Laradock/laradock.git
}

git add .
read -p "Please input you commit info: " msg
git commit -m $msg
if [ "$?"="0" ] 
then
    # git push $gitee master
    git push $github master
else
    echo "你输入的Commit信息有误，请重新输入"
    exit
fi

if [ "$?"="0" ] 
then
    echo "==== complate ok ! ===="
else
    echo "同步出错，请查看错误信息！"
fi

