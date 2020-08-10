#!/usr/bin/env bash
#os=`cat /etc/os-release`
OS=$(lsb_release -si)

# 检查系统发行版本
checkOsType() {
	case $OS in
	"CentOS")
		echo "CentOS"
		;;
	"ManjaroLinux")
		echo ${OS:0:7}
		;;
	"Ubuntu|Debian")
		echo "Debian"
		;;
	*)
		echo $OS
		;;
	esac
}
checkOsType

