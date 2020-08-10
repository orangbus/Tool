#!/usr/bin/env bash

thinkphp6(){
    echo "# 安装composer"
    sudo apt-get install composer
    composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
    read -p "请输入应用名字:" APP
    composer create-project topthink/think APP
    echo "# 安装成功!!!!"
}

thinkphp6