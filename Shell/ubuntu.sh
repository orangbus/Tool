#!/usr/bin/env bash
source ./Scripts/Color.sh

function install_zh() {
    sudo apt-get install zsh
    bash ./Utils/zsh.sh
    chsh -s /bin/zsh
    git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions --depth 1
    cat ./config/zshrc-alias.txt >> ~/.zshrc
    source ~/.zshrc
    blue ">> zsh install successful for ubuntu"
}