# Manjaro安装后需要的那些骚操作

- 假设你已经安装了，如何没有的话就去 [Manjaro官网](https://manjaro.org/) 下载一个  `KDE Edition` 版本，找一个专门刻录linux系统的软件([Rufus](https://rufus.ie/en_IE.html))刻录到U盘上（不要用常规刻录window的软件刻录，当然年轻爱折腾请随意），开机F12 or F2 ，选择U盘启动即可安装成功了。
## 设置中国源
```
sudo pacman-mirrors -i -c China -m rank && pacman -Syyu
sudo vim /etc/pacman.conf  //打开后添加下面的【结尾】随便一个源，看自己喜欢了
sudo pacman -S archlinuxcn-keyring
```
  ```
  ##个人使用
 [archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
  ```
  - 更多的源访问：github: https://github.com/archlinuxcn/mirrorlist-repo
  
- composer中国源

  ```
  composer config -g repo.packagist composer https://packagist.laravel-china.org
  ```
  
  or
  
  ```
  composer config -g repo.packagist composer https://packagist.phpcomposer.com
  ```
  
  

## 终端美化

无特殊说明都在 ～ 目录操作 ： `cd ~` 

### [zsh](https://github.com/robbyrussell/oh-my-zsh) 

有时候 一些linux发行版提示：zsh没有安装，那么：

``` 
sudo apt-get install zsh
```

详细的教程直接看官网说明，大概步骤：

1、install zsh for select anyone ：

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

```
wget: sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
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

### 配置自动提示　-－　[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

```
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

在`~/.zshrc` 中添加

```
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

tip:你可以在 `.zshrc` 文件末尾添加一下别名，这样就可以不用每次桥很长的命令

```
alias cls="clear && ls"
alias RM="rm -R" //删除文件夹
alias www="cd /home/wwwroot/"
alias dst="sudo systemctl start docker"
alias drest="sudo systemctl restart docker"
```

Ps:没有效果的话重启一下终端就可以了。

### 命令助手：[Tldr](https://github.com/tldr-pages/tldr) 

安装

```
npm install -g tldr
```

使用方法：看这张图你因该就明白了

![](https://github.com/tldr-pages/tldr/blob/master/screenshot.png)  

### 终端复用：Tmux

使用手册可以使用tldr查看

```
tldr tmux
```

参考手册：http://louiszhai.github.io/2017/09/30/tmux/

## vim配置推荐

直接使用别人配置的吧：https://github.com/meetbill/Vim

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

  Ｐｓ：搜狗拼音安装错误处理

  １、`sduo pacman -S fcitx-sogoupinyin` 提示找不到安装包

  　　`/etc/pacman.conf` 源文件有问题，可以尝试换一个源

  2、安装成功后只能在部分应用上打字

  　　`\～.xprofile` 文件配置不正确

- Markdown编辑器（个人认为最好用的markdown编辑器）

  ```
  sudo pacman -S typora
  ```

- Vscode:visual-studio-code-bin

  ![](https://code.visualstudio.com/assets/home/home-screenshot-linux.png) 

  ```
  yay -S visual-studio-code-bin
  ```

  这个给大家推荐一个vscode插件同步插件：[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) 

  一图胜千言（图片来自官方说明）

  ![](https://tmr.js.org/p/fa3b8081/source.gif)    

- virtualbox

  ![](https://www.virtualbox.org/graphics/vbox_logo2_gradient.png)　

  ```
  sudo pacman -S virtualbox //也可以在软件管理中搜索安装
  ```

  ｐｓ：安装需要对应自己的内核版本，比如：

  ​	bash: `username -a`  可以看到：Linux orangbus 4.19.8-2-MANJARO

  ​	那么你在安装 virtualbox 的时候就需要选择：virtualbox-419-xxxxxxx的版本安装

  推荐一篇参考教程：https://www.jianshu.com/p/ef1f58ff84d7

# linux通用shadowsock-qt5 浏览器（chrome）上Google

- 安装shadowsock-qt5 

  ```
  # Manjaro
  sudo pacman -S shadowsock-qt5  //不一定有效，
  【推荐】可以在软件管理中搜索shadowsock-qt5 
  ```

  ps: 确保你的ＳＳＲ可以没问题，【注意查看自己的本地代理地址】，插件中会用到

  ![](https://github.com/orangbus/Tool/blob/master/images/shadowsock.png?raw=true)

- 安装插件：Proxy SwitchySharp

  Ｐｓ: 【代理地址】设置成【代理设置的本地代理地址】，也就是上图本地代理地址：127.0.0.1:1080，【插件切换配置代理】

![](https://github.com/orangbus/Tool/blob/master/images/Proxy%20SwitchySharp.png?raw=true)

# Manjaro theme for KDE

可直接在设置中搜索安装
观感：Arc Dack
桌面主题：arc dack
图标：papirus-dark
窗口装饰：Breezemite dark

需要Dock的可以在软件管理中搜索：`Plank`  主题安装,然后在开始菜单搜索dock即可

![](https://github.com/orangbus/Tool/blob/master/images/manjaroDesk.png?raw=true)

最后介绍几个无聊有趣的命令：http://www.aqee.net/post/10-funny-liunx-command.html

其他自己看着玩吧！
