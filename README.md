# Manjaro安装后需要的那些骚操作

- 假设你已经安装了，如何没有的话就去 [Manjaro官网](https://manjaro.org/) 下载一个  `KDE Edition` 版本，找一个专门刻录linux系统的软件([Rufus](https://rufus.ie/en_IE.html))刻录到U盘上（不要用常规刻录window的软件刻录，当然年轻爱折腾请随意），开机F12 or F2 ，选择U盘启动即可安装成功了。
## 中国源
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

  4、配置自动提示　-－　[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

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

## vim配置推荐

- https://github.com/meetbill/Vim

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

- virtualbox

  ![](data:image/jpeg;base64,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)　

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

  ![](/home/orangbus/Tool/images/shadowsock.png)

- 安装插件：Proxy SwitchySharp

  Ｐｓ: 【代理地址】设置成【代理设置的本地代理地址】，也就是上图本地代理地址：127.0.0.1:1080，【插件切换配置代理】

![](/home/orangbus/Tool/images/Proxy SwitchySharp.png)

# Manjaro theme for KDE

可直接在设置中搜索安装
观感：Arc Dack
桌面主题：arc dack
图标：papirus-dark
窗口装饰：Breezemite dark

需要Dock的可以在软件管理中搜索：`Plank`  主题安装,然后在开始菜单搜索dock即可

![](/home/orangbus/Tool/images/manjaroDesk.png)

最后介绍几个无聊有趣的命令：http://www.aqee.net/post/10-funny-liunx-command.html

其他自己看着玩吧！
