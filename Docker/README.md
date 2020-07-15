# Laradock从入门到爱不释手

 ## 一键脚本安装

  ```bash
curl -fsSL get.docker.com -o get-docker.sh && sudo sh get-docker.sh --mirror Aliyun
  ```

参考教程：

https://docs.docker.com/install/linux/docker-ce/debian/

https://yeasy.gitbooks.io/docker_practice/install/centos.html

## 手动安装Docker安装Docker

- ```bash
  sudo pacman -S docker
  ```

- 安装Dockercompose

  ```bash
  curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
  
  chmod +x /usr/local/bin/docker-compose
  ```

  Debian-Alpine源：https://mirrors.ustc.edu.cn/help/debian.html（如果如法下载，请更换Alpine源）

  ```bash
  sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && sudo apt-get update
  ```

  测试安装是否成功：

  ```bash
  docker -v
  docker-compose -version
  ```

- 建立 Docker 组加入当前用户：

  ```bash
  sudo groupadd docker
  sudo usermod -aG docker $USER
  ```

   开机启动docker：

  ```bash
  sudo systemctl enable docker 
  sudo systemctl start docker
  ```

- 有时候pull image 的时候很慢可以添加国内源

  ```json
  ＃　sudo vim /etc/docker/daemon.json
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

没有生效就重启一下：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Laradock

Wike: http://laradock.io/

快速开始：

- 克隆Laradock

  ```bash
  git clone https://github.com/Laradock/laradock.git --depth 1 
  # --depth 1 意思是clone最后一次提交，这样clone会快一点
  ```

- 自定义配置

  ```bash
  cd laradock
  cp env-example .env
  ```

- 运行容器

  ```bash
  docker-compose up -d nginx mysql phpmyadmin redis  
  # 【本地开发】建议以下操作，一个一个的慢慢启动
  docker-compose up -d php-ftp
  docker-compose up -d nginx
  docker-compose up -d mysql
  docker-compose up -d phpmyadmin
  ```

- 连接数据库

  ```bash
  DB_HOST=mysql //记得是：mysql, 不是127.0.0.1
  REDIS_HOST=redis
  ```

Ps: `.env` 文件是基本的配置文件，大家可以根据自己的需求更改配置，需要注意的是，如果默认安装了mysql:8.0,但是我想安装mysql:5.6怎么办？

```bash
vim .env
# 找到mysql，然后【MYSQL_VERSION=5.6】直接写版本就可以
# 保存退出
ESC
:/mysql
```

最后需要build一下，并且删除之前的mysql缓存数据

```bash
# cd laradock
rm -rf ~/.laradock  #很重要
docker-compose build mysql
docker-compose up -d nginx mysql phpmyadmin
```

```
docker-compose build mysql
rm -rf ~/.laradock   //很重要，很重要，很重要，不然mysql无法启动，我也是折腾了一周才知道的，可能学艺不精。
```

如果在我天朝使用Laradock,在启动容器之前修改以下配置修改为`true`

```bash
CHANGE_SOURCE=true
```

如果你部署于你的生产环境服务器中,请参照官方文档修改相关配置,保证服务器安全.

> ## 如何进入单个服务

```bash
docker-compose exec nginx bash
```

> ## 如何配置SSL

```
listen 443 ssl; 
ssl_certificate /usr/local/nginx/ssl/app.crt; # 改为自己申请得到的 crt 文件的名称
ssl_certificate_key /usr/local/nginx/ssl/app.key; # 改为自己申请得到的 key 文件的名称
ssl_session_timeout 5m;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
ssl_prefer_server_ciphers on;	
```

> ## 个人别名

```bash
# vim ~/.bashrc
alias cls="clear && ls"
alias RM='rm -rf'
alias dc='docker-compose'
alias dca='dc up -d nginx phpmyadmin'
alias dcps='docker-compose ps'
alias dcres='docker-compose restart && dcps'
alias dcn='docker-compose restart nginx && scps'
alias dcd='dc down'
```

立刻生效执行：`source ~/.zshrc` 

## 扩展应用

> 这里的扩展应用是基于Laradock添加的，其实也很简单，如果你想单独放在自己的项目文件中，按需复制就可以。

请自行在laradock目录下创建一下空文件夹

```bash
mkdir -p wordpress 
```

按需复制一下文件到Laradock下面的`.env` 末尾

```.env
# httpbin
HTTPBIN_PORT=8085

# wordPress
WORDPRESS_PORT=8086
WORDPRESS_HTML=./wordpress

# nextCloud
NEXTCLOUD_PORT=8087
```

按需复制一下文件到Laradock下面的`.docker-compose.yaml` 末尾

```yaml
### httpin ##########################################################
    httpbin:
      container_name: httpbin
      image: kennethreitz/httpbin
      ports:
      - "${HTTPBIN_PORT}:80"
### rancher #################################################
    rancher:
      container_name: laradock_rancher
      image: rancher/rancher:stable
      ports:
      - 8085:80
      - 8086:443
      volumes:
      - /home/orangbus/Code/laradock/rancher:/var/lib/rancher/

## wordPress 生产环境请自行修改数据库账号密码
    wordpress:
      container_name: wordpress
      image: wordpress
      environment:
        WORDPRESS_DB_HOST: mysql
        WORDPRESS_DB_USER: root
        WORDPRESS_DB_PASSWORD: root
        WORDPRESS_DB_NAME: wordpress
      volumes:
        - ${WORDPRESS_HTML}:/var/www/html
      ports:
      - "${WORDPRESS_PORT}:80"
      depends_on:
        - mysql
        - nginx
        - php-fpm
      networks:
        - frontend
        - backend
```

Tip：如果报错或者无法启动，请自行检查端口是否冲突了，或者你在复制上面的配置文件时，文件格式缩进问题，以后我可能会拉取一个官网的分支将上面的应用加入进去。

## 写在最后

> 特喜欢 Laradock 官方仓库上的一句话 `Use Docker First And Learn About It Later`,可能你并不清楚 Docker 是什么，更不知道 Laradock 是什么，当然我也一样并不是很了解 Docker，但是就像 Laradock 作者写的这句话先用它，然后再去学习它。

## Laradock折腾心得

不知道大家在安装laradock的时候是否和我一样的心累呢，下载总结下自己在安装laradock的时候遇到的坑吧。

1、下载源代码。

如果下载源代码比较慢的话建议克隆最后一次提交的代码

```
git clone https://github.com/Laradock/laradock.git --depth 1
```

2、下载镜像。

- 最好把下载源替换为中国的，比如阿里云
- 将`.env` 里面有一项配置【CHANGE_SOURCE=true】设置为 `true` 

3、第一次启动容器的顺序。

这个只是个人建议，应为我们启动一个基本的LNMP项目的时候，laradock的启动顺序是

```bash
docker-compose up -d nginx php mysql phpmyadmin
# php-fpm -> nginx -> mysql -> phpmyadmin
```

所以有时候这样启动的时候会卡死或者下载失败，我们可以单个慢慢的启动，比如这样

```bash
# alias dc = "docker-compose"
dc up -d php-fpm
dc up -d nginx 
dc up -d mysql
dc up -d phpmyadmin
```

这样可以避免下载到一般由于网络原因卡死了，后期即使启动了，但是存在各种问题，数据库打不来，连不上等问题。





