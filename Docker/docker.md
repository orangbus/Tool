# Docker入门与实践

安装docker

```
# manjaro
sudo pacman -S docker
# centos
sudo yum install docker
```

## 容器的基本操作

- 启动docker

  ```
  systemctl start/stop/restart docker
  ```

- 启动容器

```	
docker run IMAGE [command]　//在新容器中执行命令
docker start -it IMAGE
docker stop/kill IMAGE
docker rm IMAGEID   #sudo docker rmi 
```

- 交互式容器

  ```
  docker run -it IMAGE /bin/bash
  docker run --name=orangbus -i -t IMAGE /bin/bash
  ```

- 查看容器

  ```
  docker ps [-A][-l]
  docker inspect IMAGE  //查看容器配置信息
  ```

## 守护容器  －后台一直运行

```
docker run --name=lnmp -p 80:80 -it IMAGE /bin/bash

//退出容器，容器依然在后台运行
ctrl+p  ctrl+q 

//进入一个已经在运行的后台容器
docker attach IMAGEID  
```

- 进入一个已经创建过的容器

  ```
  sudo docker container start id/aliasName
  ```

- 启用守护式容器

  ```
  docker run -d IMAGE [command]
  ```

- 查看容器运行状况

  ```
  docker logs
  docker top
  ```

- 在运行中的容器中启动新进程

  ```
  docker exec [-d -i -t] IMAGE
  ```

## 部署静态网站

```
sudo docker port imagename  #查看端口映射
sudo docker inspect imagename  #查看容器ip

sudo docker start -i imagename  #进入一个曾经创建的容器
sudo docker exec imagename nginx/lnmp
```

## 镜像获取与推送

- 查找镜像

  ```
  sudo docker search imageName
  ```

## 构建镜像

```
sudo docker commit  #通过容器
sudo docker build 	#通过Dockerfile文件构建
```

## Dockerfile使用

