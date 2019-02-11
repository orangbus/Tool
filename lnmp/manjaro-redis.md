# linux install redis

> cd redis/src
>
> ./redis-server &

一、下载解压

```
wget http://download.redis.io/releases/redis-2.8.17.tar.gz
tar zxvf redis-2.8.17.tar.gz
```

**二、编译安装**

```
cd redis-2.8.17/
make
```

**三、Redis配置设置**

```
`## 拷贝配置和启动命令到快捷目录
sudo cp redis.conf /etc/ cd src/ 

## 启动命令在src目录
sudo cp redis-benchmark redis-cli redis-server /usr/bin/
```

上面是方便启动罢了。

**Redis配置设置**

```
vim /etc/redis.conf
```

将 daemonize 从 no 修改成 yes，运行为了守护进程。

（ps：vim 搜索文本 esc -- :/daemonize）

**四、启动Redis**

```
redis-server /etc/redis.conf
```

**五、 验证**

```
ps -ef | grep redis redis-cliping  response 'pong'
```

可以看到起进程。

# linux install redis--desktop-manage

manjaro: 软件管理里面直接搜索就可以了

