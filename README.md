# Manjaro安装后需要的那些骚操作

![](https://github.com/orangbus/Tool/blob/master/images/orangbus.png?raw=true) 

- 假设你已经安装了，如果没有的话就去 [Manjaro官网](https://manjaro.org/) 下载一个  `KDE Edition` 版本，找一个专门刻录linux系统的软件([Rufus](https://rufus.ie/en_IE.html))刻录到U盘上（不要用常规刻录window的软件刻录，当然年轻爱折腾请随意），开机F12 or F2 ，选择U盘启动即可安装成功了。(最后发现还是manjaro-gnome好用，哈哈！！！)
- 如何你觉得本教程还不错欢迎分享 Star.
## 设置中国源

> 肉体扶墙可跳过，在我天朝还是配置一下

选择一个响应快速的源

```
sudo pacman-mirrors -i -c China -m rank   
```
之后在添加一 个`archlinuxcn` 中国源

```
# sudo vim /etc/pacman.conf 
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

以上基本OK了，如果你你喜欢其他的源也可以追加上去

```
# Tencent
# sudo vim /etc/pacman.d/mirrorlist
[archlinuxcn] 
Server = https://mirrors.cloud.tencent.com/archlinuxcn/$arch
```

```
# Aliyun镜像源
# sudo vim /etc/pacman.d/mirrorlist
Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch
```

更新下系统

```
sudo pacman -Syyu && sudo pacman -S archlinuxcn-keyring
```

  - 如果你使用Laradock **(推荐)**  ：[Alpine Linux 源使用文档](https://mirrors.ustc.edu.cn/help/alpine.html) 

  - 更多的源访问：github: https://github.com/archlinuxcn/mirrorlist-repo

- Aliyun镜像源：<https://developer.aliyun.com/mirror>

- Tencent镜像源：https://mirrors.cloud.tencent.com/

- 清华大学开源镜像站:<https://mirrors.tuna.tsinghua.edu.cn/> 

- [composer中国源](https://pkg.phpcomposer.com/) 

  ```
  composer config -g repo.packagist composer https://packagist.phpcomposer.com
  // or select one is ok
  composer config -g repos.packagist composer https://php.cnpkg.org
  ```

- nodejs

  ```
  sudo pacman -S nodejs
  sudo pacman -S npm //有时候npm命令失效可以这样一下，简单粗暴
  ```

- cnpm

  ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  cnpm sync connect
  ```

- php

  ```
  sudo pacman -S php
  sudo pacman -S mysql
  ```

至于其他嘛，看自己的需求安装，一般情况下很多东西Manjaro都配置好了，而且是最新的。

## 终端美化

无特殊说明都在 ～ 目录操作 ： `cd ~` 

### [zsh](https://github.com/robbyrussell/oh-my-zsh) 

有时候 一些linux发行版提示：zsh没有安装，那么：

``` 
sudo pacman -S zsh
# Ubuntu debain
sudo apt-get install zsh
```

详细的教程直接看官网说明，大概步骤：

1、install zsh for select anyone ：

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
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

### 配置自动提示:[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) 

```
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

在`~/.zshrc` 中添加

```
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

tip:你可以在 `.zshrc` 文件末尾添加一下别名，这样就可以不用每次桥很长的命令

```
# ============= Base =============================
alias cls="clear && ls"
alias RM='rm -rf'
alias ll='ls -alh'
# ============== docker ==========================
alias dc='docker-compose'
alias dca='dc up -d nginx phpmyadmin'
alias dcps='docker-compose ps'
alias dcres='docker-compose restart && dcps'
alias dcn='docker-compose restart nginx && dcps'
alias dcd='dc down'
# ============ Docker Code Dir =====================
alias ld="cd $HOME/Code/laradock"
alias ldca="ld && dca"
alias ldps="ld && dcps"
alias ldn="ld && dcn"
alias ldd="ld && dcd"
alias ldres="ld && dcres"
alias web="cd $Home/Code/web"
# ============= zsh-autosuggestions ===============
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

Ps:没有效果的话重启一下终端就可以了。（**更多Docker技巧请查看Docker文件夹）**

## 如何安装软件?

Arch终端推荐有三种方式：`pacman` 、`yay`、 `yaourt`

```
sudo pacman -S yay yaourt //pacman默认就有
```

图形化界面安装： `Octopi` 、`pamac`

```
sudo pacman -S pamac 
```

安装工具 `pacman -S packageName` or `yaourt -S packageName` 

```bash
sudo pacman -S atom git vim　typora wget yarn phpstorm webstorm
```

# 软件推荐

## PhpStorm

```
yaourt phpstorm
yay -S phpstorm
```

![phpstorm](https://github.com/orangbus/Tool/blob/master/images/phpstorm.jpeg?raw=true)  

Phpstorm激活：Google一下吧，一般都有一大堆。

如果你懒得找，可以使用无限期试用，当我们第一次安装的时候，点击免费试用30天，30天到期之后删除一下文件即可

```
sudo rm -rf ~/.PhpStorm2019.3/config/eval
sudo rm -rf ~/.WebStorm2019.3/config/eval
# 其他软件也一样
```

## [WeChat](https://github.com/geeeeeeeeek/electronic-wechat) 

```
yay electronic-wechat #选 1 -> q -> y
```

![](https://cloud.githubusercontent.com/assets/7262715/14876747/ff691ade-0d49-11e6-8435-cb1fac91b3c2.png) 

```
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
cd electronic-wechat
npm install && npm start
```

下次启动的时候只需要到 wechat目录下执行：`npm start` 即可.

## Chrome Or Google

![](https://github.com/orangbus/Tool/blob/master/images/chrome.jpeg?raw=true)   

```
sudo pacman -S chromium
sudo pacman -S google-chrome
```

## OBS

![](https://github.com/orangbus/Tool/blob/master/images/obs.png?raw=true) 

```
sudo pacman -S obs-studio
```

## 网易云

![](https://github.com/orangbus/Tool/blob/master/images/music.png?raw=true)

```
sudo pacman -S netease-cloud-music
```

## 搜狗输入法

```
sudo pacman -S fcitx-sogoupinyin
sudo pacman -S fcitx-im
sudo pacman -S fcitx-configtool
yaourt -S fcitx-qt4

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

3、搜狗输入法异常！请删除.config/SogouPY 并重启的情况

​	安装下qt4就解决了。

​	`yaourt -S fcitx-qt4` //建议安装一下

4、如果想要安装搜狗皮肤，直接到搜狗皮肤官网下载自己喜欢的皮肤，选中下载的皮肤右键【用 搜狗拼音】打开即可，没有生效重启就有了。

5、安装 部分软件后无法输入中文-环境变量设置

一般来说到了这步，fcitx在绝大部分的软件中是可以正常使用的。只是在`wps`、`Qt`、`jetbrains全家桶`、`deepin-TIM`、`deepin-wechat` `deepin.com.qq.im` 等软件中无法使用中文输入。
 针对以上软件，在下列对应文件中单独添加如下环境变量：【引号是英文状态下输入的，中文无效】

```bash
export XMODIFIERS="@im=fcitx"
export GTK_IM_MODULE="fcitx"
export QT_IM_MODULE="fcitx"
```

------

deepin-wine系列的举例如下：
 TIM：/opt/deepinwine/apps/Deepin-TIM/run.sh
 微信：/opt/deepinwine/apps/Deepin-WeChat/run.sh

------

WPS：
 /usr/bin/wps
 /usr/bin/wpp
 /usr/bin/et

------

Jetbrain系列举例如下：（最好切换到相应的目录查看文件是否存在）

- Goland:

  ```
  sudo vim /opt/goland/bin/goland.sh
  ```

- phpstorm

  ```
  sudo vim /opt/phpstorm/bin/phpstorm.sh
  ```

- webstorm

  ```
  sudo vim /opt/webstorm/bin/webstorm.sh
  ```

如果出现问题的软件不再我所述范围内的话，可以先尝试寻找其运行的sh文件，如果找不到，再尝试在/usr/bin文件夹中寻找。

## Typora

个人认为最好用的markdown编辑器之一

![](https://github.com/orangbus/Tool/blob/master/images/typora.png?raw=true) 

```
sudo pacman -S typora
```

个人比较喜欢的vue主题：http://theme.typora.io/theme/Vue/

安装主题：首先下载主题包并解压，解压后有一个【vue文件】和【vue.css】，然后打开typora>theme>open theme folder，把【vue文件夹】【vue.css】复制到【主题目录】的同级目录即可。

## [you-get](https://github.com/soimort/you-get/wiki/%E4%B8%AD%E6%96%87%E8%AF%B4%E6%98%8E) 视频下载神器 

首先安装pip，更多安装方法参考[菜鸟](https://www.runoob.com/w3cnote/python-pip-install-usage.html) 

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
sudo python3 get-pip.py    # 运行安装脚本。
```

部分 Linux 发行版可直接用包管理器安装 pip，如 Debian 和 Ubuntu：

```bash
sudo apt-get install python3-pip
# 测试
pip3 -v
```

安装 You-get

```
pip3 install you-get 
```

## 命令助手：[Tldr](https://github.com/tldr-pages/tldr) 

```
npm install -g tldr
```

使用方法：看这张图你因该就明白了

![](https://github.com/orangbus/Tool/blob/master/images/tldr.png?raw=true)  

## 终端复用：Tmux

```bash
sudo pacman -S tmux
```

使用手册可以使用tldr查看

```
tldr tmux
```

参考手册：http://louiszhai.github.io/2017/09/30/tmux/

## Download Tool

![](https://github.com/orangbus/Tool/blob/master/images/uget.png?raw=true) 

```
sudo pacman -S uget
```

## motrix

软件管理里面搜索：motrix 

## gitkraken -Git管理工具

![](https://www.gitkraken.com/img/og/og-image.jpg) 

```
sudo pacman -S gitkraken
```

## Vscode:visual-studio-code-bin

![](https://code.visualstudio.com/assets/home/home-screenshot-linux.png) 

```
yay -S visual-studio-code-bin
```

这个给大家推荐一个vscode插件同步插件：[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) 

一图胜千言（图片来自官方说明）

![](https://tmr.js.org/p/fa3b8081/source.gif)    

## Atom

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572533179529&di=6f4b94f9693c57b9a2b115ebe09c8f9b&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3770765544%2C794836474%26fm%3D214%26gp%3D0.jpg)  

```
sudo pacman -S atom
```

## FinalShell

可能有点多余，但是有时候就是需要，哈哈

## FileZilla

可能有点多余，但是有时候就是需要,因为文件管理里面就可以连接下载,哈哈

## Virtualbox

![](https://www.virtualbox.org/graphics/vbox_logo2_gradient.png)　

```
sudo pacman -S virtualbox 
//也可以在软件管理中搜索安装[推荐]
```

ｐｓ：安装需要对应自己的内核版本，比如：

​	bash: `username -a`  可以看到：Linux orangbus 4.19.8-2-MANJARO

​	那么你在安装 virtualbox 的时候就需要选择：virtualbox-419-xxxxxxx的版本安装

推荐一篇参考教程：https://www.jianshu.com/p/ef1f58ff84d7

也可以看看**virtualbox与lnmp的那些事** 

## Vagrant

```
sudo pacman -S vagrant
```

vagrant 报unknown filesystem type 'vboxsf' 解决方案

```
vagrant plugin install vagrant-vbguest
vagrant destroy && vagrant up
```

## TeamViewer

![](https://github.com/orangbus/Tool/blob/master/images/TeamViewer.png?raw=true) 

```
sudo pacman -S teamviewer
```

## WPS

![](data:image/png;base64,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) 

```
sudo pacman -S wps-office
sudo pacman -S ttf-wps-fonts
```

## 深度截图

![](data:image/jpeg;base64,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) 

```
sudo pacman -S deepin-screenshot
```

## [Flameshot](https://flameshot.js.org) 截图神器

![](https://github.com/orangbus/Tool/blob/master/images/flameshot.png?raw=true)

```
sudo pacmna -S flameshot
```

## qq & tim

Tim: deepin.com.qq.im

QQ : deepin.com.qq.office (软件管理搜索)

推荐使用 **deepin终端** 和 **看图工具** ，直接在软件管理里面搜索： `deepin` 慢慢找



另外推荐大家一个大佬的东西 `App-image` :使用AppImage格式分发Linux桌面应用程序，让所有常见发行版的用户运行它。 一次打包，到处运行。 覆盖所有主流桌面系统。

- 官网：https://appimage.org/
- WIke：https://github.com/AppImage/AppImageKit/wiki

看官网的介绍就已经被大佬折服了，哈哈，有兴趣的小伙伴可以去看看。

可以看看H-Player:  https://github.com/ZyqGitHub1/h-player-v2

## vim配置推荐

暂时没有推荐的，不知道有没有小伙伴推荐下。 

## 邮箱 MailSpring

软件管理搜索安装: MailSpring

![](https://getmailspring.com/static/img/hero_graphic_linux@2x.png) 

MailSpring: https://getmailspring.com/

## 科学上网参考Google文件夹

支持: chrome浏览器 | window | manjaro | Mac没用过

### git clone 代理

```
//  1080 改为自己的 socks5 监听端口
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global https.https://github.com.proxy socks5://127.0.0.1:1080

// 1080 改为自己的 http 监听端口
git config --global http.https://github.com.proxy http://127.0.0.1:1080
git config --global https.https://github.com.proxy http://127.0.0.1:1080
```

[给 github clone 加速:](https://struggleblog.com/2018/07/13/accelerate_github_clone/)https://struggleblog.com/2018/07/13/accelerate_github_clone/

## Manjaro theme for KDE

可直接在设置中搜索安装

| 观感     | Arc Dack        |
| -------- | --------------- |
| 桌面主题 | arc dack        |
| 图标     | papirus-dark    |
| 窗口装饰 | Breezemite dark |

需要Dock的可以在软件管理中搜索：`Plank`  主题安装,然后在开始菜单搜索dock即可

![](https://github.com/orangbus/Tool/blob/master/images/manjaroDesk.png?raw=true)

---

轮子地址：<https://yaro97.github.io/2018/05/28/manjaro-xfce安装记录>

## 辅助工具-Gnome-twea-tool

- 安装

  ```
  sudo pacman -S gnome-tweak-tool 
  sudo pacman -S chrome-gnome-shell 
  ```

- 打开Chrome浏览器安装一个扩展：[GNOME Shell integration](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep) 

- 打开这个网站搜索你想要的插件安装即可：https://extensions.gnome.org/

![](https://github.com/orangbus/Tool/blob/master/images/gome.png?raw=true)

| 名称                                   | 作用                          |
| -------------------------------------- | ----------------------------- |
| Caffeine                               | 防止自动挂起                  |
| Clipboard Indicator                    | 一个剪贴板                    |
| Coverflow Alt-Tab                      | 更好的窗口切换                |
| Dash to Dock                           | 把dash栏变为一个dock          |
| Night Light Slider                     | 调节gnome夜间模式的亮度情况   |
| Proxy Switcher                         | 代理插件                      |
| Simple net speed                       | 网速监测                      |
| Random Wallpaper                       | 自动切换壁纸                  |
| Status Area Horizontal Spacing         | 让顶栏更紧凑                  |
| TopIcons Plus                          | 把托盘图标放到顶栏            |
| Window Is Ready - Notification Remover | 去除烦人的window is ready提醒 |
| system-monitor                         | 系统监视器                    |

最后介绍几个无聊有趣的命令：http://www.aqee.net/post/10-funny-liunx-command.html

## 福利彩蛋

如果你已经按照上面的教程配置了差不多了，是不是感觉还差点什么呢？

【好看的二次元壁纸？】加群获取。

不知道有没有和我一样，想运行一点window软件呢？有的话那就操练起来

```
sudo pacman -S wine
```

wine: 允许linux运行window的程序，比如说Deepin封装的Deepin-qq就是这么干的，给大家举两个例子吧。

- [PanDownload](https://pandownload.com/) 

  很多老司机都知道这是一款被网络传疯的百度网盘下载神器（曾今），当年刚认识他的时候一天就下载了60G网盘文件。当我们从官网下载了这块软件之后解压，找到启动文件选择【wine】打开就可以直接在linux下运行了。

- [速盘](https://speedpan.com/) （付费）

  当你只是偶尔想快速下载百度网盘的资料时，但是又不想就此乖乖的给老王充值一个超级VIP，那么这块软件就是你的不二之选，价格也比较亲民，有这方面需要的小伙伴可以去看看。

- PotPlayer

  为什么我会推荐这款软件呢？

  1、除了可以播放主流的视频格式的视频外，他还可以倍速播放视频，我也是看了网上的推荐然后使用他的，用了之后发现顺手是顺手，但是感觉80%的功能都用不上，有没有小伙伴手把手教一下这80%的功能的额外使用。

  2、可以导入视频源观看视频，比如你想看看CCTV的新闻呀什么的，只要导入`DPL` 源文件即可观看，如果想要该源文件可加群下载【使用方法：直接将下载好的源文件拖进播放器即可】。

  3、一款值得推荐的软件如果不能解决一个大的或者两个小的需求问题，那我也懒得去折腾。

# Docker-LNMP

- 安装Docker

  ```
  sudo pacman -S docker
  ```

- 安装Dockercompose

  ```
  curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
  
  chmod +x /usr/local/bin/docker-compose
  ```

  测试安装是否成功：

  ```
  docker -v
  docker-compose -version
  ```

- 建立 Docker 组加入当前用户：

  ```
  sudo groupadd docker
  sudo usermod -aG docker $USER
  ```

   开机启动docker：

  ```
  sudo systemctl enable docker 
  sudo systemctl start docker
  ```

- 有时候pull image 的时候很慢可以添加国内源

  ```
  {
      "registry-mirrors": [
      "https://kfwkfulq.mirror.aliyuncs.com",
      "https://2lqq34jg.mirror.aliyuncs.com",
      "https://pee6w651.mirror.aliyuncs.com",
      "https://registry.docker-cn.com",
      "http://hub-mirror.c.163.com"
      ]
  }
  ```

## Laradock

Wike: http://laradock.io/

快速开始：

- 克隆Laradock

  ```
  git clone https://github.com/Laradock/laradock.git --depth 1 
  # --depth 1 意思是clone最后一次提交，这样clone会快一点
  ```

- 自定义配置

  ```
  cd laradock
  cp env-example .env
  ```

- 运行容器

  ```
  docker-compose up -d nginx mysql phpmyadmin redis  
  # 【本地开发】建议以下操作，一个一个的慢慢启动
  docker-compose up -d php-ftp
  docker-compose up -d nginx
  docker-compose up -d mysql
  docker-compose up -d phpmyadmin
  ```

- 连接数据库

  ```
  DB_HOST=mysql //记得是：mysql, 不是127.0.0.1
  REDIS_HOST=redis
  ```

Ps: `.env` 文件是基本的配置文件，大家可以根据自己的需求更改配置，需要注意的是，如果默认安装了mysql:8.0,但是我想安装mysql:5.6怎么办？

```
vim .env
# 找到mysql，然后【MYSQL_VERSION=5.6】直接写版本就可以
# 保存退出
ESC
:/mysql
```

最后需要build一下，并且删除之前的mysql缓存数据

```
# cd laradock
rm -rf ~/.laradock
docker-compose build mysql
docker-compose up -d nginx mysql phpmyadmin
```

如果在我天朝使用Laradock,在启动容器之前修改以下配置修改为`true`

```
CHANGE_SOURCE=true
```

如果你部署于你的生产环境服务器中,请参照官方文档修改相关配置,保证服务器安全.

## 写在最后

> 特喜欢 Laradock 官方仓库上的一句话 `Use Docker First And Learn About It Later`,可能你并不清楚 Docker 是什么，更不知道 Laradock 是什么，当然我也一样并不是很了解 Docker，但是就像 Laradock 作者写的这句话先用它，然后再去学习它。

# Manjaro问题

- 系统无法开机或者进入不了图形界面

  很多次系统安装配置好了，但是开机的时候蒙了，竟然黑屏了，啥也没有，我以为卡住了，等了30分钟也没有启动，后来得知，原来我手贱开启了 `移除不需要的依赖` ，

  若果你开启了：1、把移除的依赖全部装回来。2、重装系统。

  【软件管理】【首选项】【高级】下面的 `移除不需要的依赖` <span style="color:red;">不能开启，不能开启，不能开启！！！<span>

- 软件管理有些你推荐的软件搜索不到。

  打开【软件管理】【首选项】【AUR】`启用AUR支持` 即可，软件你用的不是我基本配置的源，请跟换源。

- Manjaro更新后，中文显示为方框

  ```
  sudo pacman -S wqy-microhei
  ```
  
- 有时候我们更新系统的时候无法更新？（没有特殊需要，别XJB更新）

  1. 软件冲突：

     尝试卸载掉其中的一个然后在执行跟新操作，只要不是删除系统的核心文件就可以，加入是`/etc/` 下的某个文件引起的，做好是将冲突的文件重命名一下。

     ![](https://github.com/orangbus/Tool/blob/master/images/1.png?raw=true)  

  2. 缺少相关的依赖

     根据提示安装相关的依赖即可，

     问：我用`pacman -S xxx ` 安装相关的依赖提示没有找到相关的依赖？

     答：`pacman` 不行可以尝试 `yay` `yaourt` 进行安装，一般都能解决
     
  3. 如果没有大的需求,不要随便使用`sudo pacman -Syyu` 更新系统
  
     之前把电脑所有需要的配置都配置好了,感觉还是缺点什么,于是就`pacman -Syyu` 结果之前很多配置就被默认配置覆盖了,而且由于很多软件都是最新的,有些需要相互依赖的软件还没有即使更新,最直接的就是virtualbox崩溃了.
     
  4. 跳过检测更新
  
     ```
     sudo pacman -Syyu -dd
     ```
  
     

---

淘宝券（欢迎大家支持）：<https://orangbus.cn>

biliBiliUp:  <<https://space.bilibili.com/32604448>

个人笔记：<http://orangbus.github.io>

个人图库：<http://img.orangbus.cn>

个人博客：<https://orangbus.gitee.io>

 Vip解析：<http://v.orangbus.cn>

交流群：[511300462](https://jq.qq.com/?_wv=1027&k=5WA1dVy) 

如需转载，注明作者和出处即可,整理不易，忘见谅 .

<p style="text-align:center">人生的美妙之处在于未来的不知可！</p>

