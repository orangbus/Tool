#!/usr/bin/env bash

function zsh_install() {
    echo -e "Tip:";
    sudo pacman -S zsh
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    chsh -s /bin/zsh
    git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
    echo -e "\nsource ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc
    if [ $? == "0" ]; then
        echo "zsh install successfull !"
    fi
    read -p "Do you want to add some alias:[y/n]" VAL
    case VAL in
    y)
      cat ./alias.txt >> ~/.zshrc
      ;;
    *)
      exit
      ;;
    esac
}