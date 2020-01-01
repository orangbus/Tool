#!/usr/bin/env bash
# Author:Orangbus
# WebSite:https://orangbus.cn
# Github: https://github.com/orangbus

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