# Manjaro安装后需要的那些骚操作

- 假设你已经安装了，如何没有的话就去 [Manjaro官网](https://manjaro.org/) 下载一个  `KDE Edition` 版本，找一个专门刻录linux系统的软件([Rufus](https://rufus.ie/en_IE.html))刻录到U盘上（不要用常规刻录window的软件刻录，当然年轻爱折腾请随意），开机F12 or F2 ，选择U盘启动即可安装成功了。
## 中国源
```
sudo pacman-mirrors -i -c China -m rank && pacman -Syyu
sudo vim /etc/pacman.conf  //打开后添加下面的随便一个源，看自己喜欢了
sudo pacman -S archlinuxcn-keyring
```
  ```
  ##个人使用
 Server = http://mirrors.tuna.tsinghua.edu.cn/manjaro/stable/$repo/$arch
  ```
  - 更多的源访问：github: https://github.com/archlinuxcn/mirrorlist-repo
  
- composer中国源

  ```
  composer config -g repo.packagist composer https://packagist.laravel-china.org
  ```


## 终端美化

无特殊说明都在 ～ 目录操作 ： `cd ~` 

- [zsh](https://github.com/robbyrussell/oh-my-zsh) 

  详细的教程直接看官网说明，大概步骤：

  1、clone zsh ：

  ```
  git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
  ```

  2、把zsh设置默认shell

  ```
  chsh -s /bin/zsh
  ```

  3、主题配置  `~ .zshrc` 没有新建一个 (  默认我觉得挺好看的 )

  ```
  vim .zshrc
  ZSH_THEME="robbyrussell"
  ```

  4、配置自动提示-zsh-autosuggestions

  ```
  git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
  ```

  在`~/.zshrc` 中添加

  ```
  source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
  ```

  tip:你可以在 `.zshrc` 文件末尾添加一下别名，这样就可以不用每次桥很长的命令

  ```
  alias cls="clear && ls"
  alias RM="rm -R" //删除文件夹
  alias www="cd /home/wwwroot/"
  ```

- 没有效果的话重启一下终端就可以了。<!--more-->

## 如何安装软件

安装工具 `pacman -S packageName` or `yaourt packageName` 

```bash
sudo pacman -S atom git vim　typora
```

```bash
yaourt phpstorm
```

Phpstorm激活：<http://idea.lanyus.com/> 

## 常用软件

- Wechat：https://github.com/geeeeeeeeek/electronic-wechat

  ![](https://cloud.githubusercontent.com/assets/7262715/14876747/ff691ade-0d49-11e6-8435-cb1fac91b3c2.png) 

   ```
  git clone https://github.com/geeeeeeeeek/electronic-wechat.git
  cd electronic-wechat
  npm install && npm start
   ```

  下次启动的时候只需要到 wechat目录下执行：`npm start` 即可.

- Chromium

  ![](https://github.com/chromium/chromium/raw/master/chrome/app/theme/chromium/product_logo_64.png) 

  ```
  sudo pacman -S chromium
  ```

- OBS

  ![](https://obsproject.com/assets/images/new_icon_small.png) 

  ```
  sudo pacman -S obs-studio
  ```

- 网易云

  ```
  sudo pacman -S netease-cloud-music
  ```

- 搜狗输入法

  ```
  sudo pacman -S fcitx-sogoupinyin
  sudo pacman -S fcitx-im
  sudo pacman -S fcitx-configtool
  
  sudo vi ~/.xprofile //添加一下内容
  －－－－－－－－－－－－－－－－－－
  export GTK_IM_MODULE=fcitx
  export QT_IM_MODULE=fcitx
  export XMODIFIERS=”@im=fcitx”
  －－－－－－－－－－－－－－－－－－
  没有生效的话注销一下系统就ＯＪＢＫ了
  ```

- Markdown编辑器（个人认为最好用的markdown编辑器）

  ```
  sudo pacman -S typora
  ```

- Vscode:visual-studio-code-bin

  ![](https://code.visualstudio.com/assets/home/home-screenshot-linux.png) 

  ```
  yay -S visual-studio-code-bin
  ```

最后介绍几个无聊有趣的命令：http://www.aqee.net/post/10-funny-liunx-command.html

其他自己看着玩吧！
