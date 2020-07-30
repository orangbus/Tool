#!/usr/bin/env bash
# Author:Orangbus
# WebSite:https://orangbus.cn
# Github: https://github.com/orangbus

# 设置字体颜色函数
function blue(){
    echo -e "\033[34m\033[01m $1 \033[0m"
}
function green(){
    echo -e "\033[32m\033[01m $1 \033[0m"
}
function greenbg(){
    echo -e "\033[43;42m\033[01m $1 \033[0m"
}
function red(){
    echo -e "\033[31m\033[01m $1 \033[0m"
}
function redbg(){
    echo -e "\033[37;41m\033[01m $1 \033[0m"
}
function yellow(){
    echo -e "\033[33m\033[01m $1 \033[0m"
}
function white(){
    echo -e "\033[37m\033[01m $1 \033[0m"
}

. ./Scripts/zsh_install.sh

echo "=================================================="
echo "1. install zsh for Arch|manjaro"
#echo "2.install Applications"
#echo "3. Config cnpm composer-china"

read -p "plaese select:" SELECTED
case SELECTED in
1) zsh_install
  ;;
*)
  echo "welcome next use,bye!!!"
  exit
  ;;
esac