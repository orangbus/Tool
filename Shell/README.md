# 个人常用Shell脚本

```bash
#!/bin//bash env

function install_php() {
    sduo pacman -S php;
}

function git_init() {
    ssh-keygen;
}

function install_laravel() {
    composer config -g repo.packagist composer https://packagist.phpcomposer.com
    composer global require laravel/installer
    echo "laravel installed ok!"
    echo "now you can run bash: laravel new App"
}

function install_guake() {
    sudo pacman -S guake;
}

function install_youGet() {
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py;
    sudo python3 get-pip.py
}

function install_finalShell() {
    rm -f finalshell_install_linux.sh;
    wget www.hostbuf.com/downloads/finalshell_install_linux.sh;
    chmod +x finalshell_install_linux.sh;
    ./finalshell_install_linux.sh;
    echo "安装路径:/usr/lib/FinalShell/";
    echo "配置文件路径:/home/$USER/.finalshell/";
    rm -f finalshell_install_linux.sh;
    echo "install ok!";
}

function install_tweak() {
    sudo pacman -S gnome-tweak-tool;
    sudo pacman -S chrome-gnome-shell;
    echo "extensions_url: https://extensions.gnome.org"
}

```

