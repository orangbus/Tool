# 一起聊聊 linux 安装 Virtualbox 错误的那些事

[TOC]

> 本地环境：manjaro 18.0 
>
> 内核：4.19 （这个重要，可以使用 `uname -a` 查看 ）

## 如何正确的在manjaro 安装 Virtualbox

​	假设你的内核和我一样是`4.19` 的，那么你下载安装的Virtualbox的版本也是　`linux419-xxx` 版本的，否则你懂的。

![](/home/orangbus/Tool/images/virtualbox.png)

## 本地宿主机如何链接虚拟机

​	当我们在虚拟机上安装了一个 centos　系统，往往是通过ｓｓｈ或者相关图形工具链接的，如何获取虚拟机的ｉｐ进行链接操作呢？ (假设你已经成功安装virtualbox ,并成功安装了一个centos 系统)

- 虚拟网络设置为【桥接】
- 获取虚拟机ｉｐ地址：`ip addr`
- 终端链接虚拟机的centos 系统：　`ssh 用户名＠ｉｐ地址`　>> `ssh root@192.168.1.10`



## 文件共享

​	文件共享的关键在于安装【设备 -> 增强工具】,然后挂载(mount -t vboxsf share /home/centosshare)。但是我们在安装【增强工具】的时候一直安装不了，接下来我们动手吧？

VirtualBox安装CentOS后，再安装增强功能就可以共享文件夹、粘贴板以及鼠标无缝移动，主要步骤如下：

```
yum -y update
yum -y install g++gcc gcc-c++ make kernel-* 	#主要是在安装增强工具提示没有安装这些软件
yum -y install bzip2* 	# 增强工具用的是bzip2压缩
reboot  	# 重启虚拟机

```

​	点击 VirtualBox菜单栏中的【设备】->【分配光驱】->【选择虚拟盘】->【定位到 VirtualBox安装目录】->【选择 VBoxGuestAdditions.iso】，这时可能会提示一些信息，不用理会，点击【强制释放】，不要点击【取消】

​	挂载光驱到 tmp 目录 !!!核心步骤!!!

```
mount /dev/cdrom /tmp/　　#这时会提示目录挂载成功且为ready-only
cp -r /tmp/ /mnt/　　　　　 #把挂载目录复制到另外一个文件夹，这样才能执行写操作

# 修改/mnt/tmp/目录下所有文件为可写权限

 cd /mnt/tmp
 ./VBoxLinuxAdditions.run　　#执行安装
```

​	提示安装成功，再重启系统，大功告成！

​	其实还有一个更简单的方法：先把 VBoxGuestAdditions.iso 解压到本地一个文件夹中，通过FTP上传到Linux环境，然后执行【./VBoxLinuxAdditions.run】命令，效果一样！

 [参考文档](https://www.jb51.net/article/132206.htm) 

## 【杂谈】我踩过的那些坑





