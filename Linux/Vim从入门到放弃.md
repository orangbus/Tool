# Ｖｉｍ从入门到放弃系列

> 配置一个属于你自己的ｖｉｍＩＤＥ编辑器

## 安装ＶＩＭ

Centos

```
sudo yum install vim
```

Manjaro / arch

```
sudo pacman -S vim
```

## 插件管理(Vundle)安装

> github:https://github.com/VundleVim/Vundle.vim
>
> 安装就跳过了，不会安装就别折腾了，不是歧视的意思，只是可能你接触　linux　时间不长，等你熟悉了再来玩这些扫操作的东西，这样可以节约你的时间，非得折腾官方有文档。

---

挑一点重点：

vim的配置文件都是在自己家目录下的`.vimrc` 文件中（没有自行新建一个`touch .vimrc`）,Vundle官方列出一份基本的配置信息，当你在复制的时候可能全部都注释了，所以需要你手动把　备注有rquired　的配置打开

## Vim 插件安装

