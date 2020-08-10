#!/usr/bin/env bash

# finalshell
function finalshell() {
    rm -f finalshell_install_linux.sh
    wget www.hostbuf.com/downloads/finalshell_install_linux.sh
    chmod +x finalshell_install_linux.sh
    ./finalshell_install_linux.sh
    echo "安装路径: /usr/lib/FinalShell/";
    echo "配置文件路径: /home/\$USER/.finalshell/";
}