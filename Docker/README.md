# 如何利用Laradock部署Web项目

> ## 安装Docker+docker-compose

**安装教程：**https://docs.docker.com/install/linux/docker-ce/debian/

​                      https://yeasy.gitbooks.io/docker_practice/install/centos.html

 一键安装脚本：

```
curl -fsSL get.docker.com -o get-docker.sh && sudo sh get-docker.sh --mirror Aliyun
```

 建立 Docker 组加入当前用户：

```
sudo groupadd dockersudo usermod -aG docker $USER
```

 开机启动docker：

```
sudo systemctl enable docker &&sudo systemctl start docker
```

docker-compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```

Debian-Alpine源：https://mirrors.ustc.edu.cn/help/debian.html（如果如法下载，请更换Alpine源）

```
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && sudo apt-get update
```

> ## 安装Laradock

Laradock 文档: http://laradock.io/

```
git clone https://github.com/Laradock/laradock.git
cp env-example .env 
// 所有的配置基本都在 .env 里面了，按需配置
```

启动

```
docker-compose up -d nginx mysql phpmyadmin
```

> 重点：如果你更改了 .env 里面的文件，一定要 docker-compose build [Appname]

举例：我原本安装了mysql8.0版本，当时我现在需要更换为mysql5.6版本

```
cd laradock
vim .env
ESC :/mysql //更改mysql版本为:5.6
:wq
```

```
docker-compose build mysql
rm -rf ~/.laradock   //很重要，很重要，很重要，不然mysql无法启动，我也是折腾了一周才知道的，可能学艺不精。
```

> ## 如何进入单个服务

```
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

```
vim ~/.bashrc
```

```
alias RM='rm -rf'
alias dc='docker-compose'
alias dcps='docker-compose ps'
alias dcres='docker-compose restart && dcps'
alias dcn='docker-compose restart nginx && scps'
```

