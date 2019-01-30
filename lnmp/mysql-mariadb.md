# ArchLinux/Manjaro 安装MySQL/MariaDB

1. 安装 与Ubuntu不同，arch默认已经不再支持MySQL（具体原因可以google查一下），但是可以安装MariaDB，其比MySQL的性能更好且操作基本相同。 输入下面命令安装：

```
systemctl stop mysqld    //停止mysql服务
sudo pacman -S mariadb libmariadbclient mariadb-clients    //安装mariadb
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
复制代码
```

2. 启动

```
systemctl start mariadb
mysql_secure_installation    //设置密码等管理操作
systemctl restart mariadb
复制代码
```

登录：

```
mysql -u root -p
```

链接：https://juejin.im/post/5a30a7796fb9a045204c348a

## manjaro install navicat

1、在MySQL官网http://www.navicat.com.cn/download/navicat-premium下载Linux安装包

２、将安装包移动到你想要的文件夹中

​	进入安装包目录，解压压缩包：

```
tar -zxvf  navicat120_premium_cs_x64.tar.gz
```

​	进入安装目录Navicat premium：，启动　

```
./start_navicat　＆
```

界面中文乱码问题：进入安装目录后，执行：vi  start_navicat

```
export LANG=" "改为export LANG="zh_CN.UTF-8"    //即可解决中文乱码问题
```

### 如何长期免费使用

​	之前一直找注册码，但是还是有点不靠谱，最后发现把 `home`下的一个 `.navicatxxx` 的一个文件删除就可以继续免费使用了，如果有大神有其他比较骚的操作记得告诉我。

```
cd 
rm -Rf .navicat64/ 
```

不一定是`.navicat64` 文件名，可以使用　`find .nav(tab键)　查找。`

参考链接：https://www.jianshu.com/p/12501bdcfaf8

