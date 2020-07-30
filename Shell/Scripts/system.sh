#!/usr/bin/env bash
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
# 判断不同的操作系统
SYSTEM_NAME=`uname -a`

UBUNTU="ubuntu"
CENTOS="centos"
DEBIAN="debian"
ARCH="arch"
MANJARO="manjaro"

# zsh
installAzh(){
	if [ -f $HOME/.zshrc ]; then
	    red "你已安装zsh，如果需要重新安装请执行： rm \$HOME/.zshrc"
	    exit
	fi
	red "安装zsh"
	sudo pacman -S zsh
	sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
	chsh -s /bin/zsh
	red "配置自动提示"
	git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
	echo "source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> $HOME/.zshrc
	source $HOME/.zshrc
	red "安装成功！"
}
installAzh
