## 容器的基本操作

- 启动容器

```	
docker run IMAGE [command]　//在新容器中执行命令
docker start -i IMAGE
docker stop/kill IMAGE
docker rm IMAGEID
```

- 交互式容器

  ```
  docker run -i -t IMAGE /bin/bash
  docker run --name=orangbus -i -t IMAGE /bin/bash
  ```

- 查看容器

  ```
  docker ps [-A][-l]
  docker inspect IMAGE  //查看容器配置信息
  ```

## 守护容器  －后台一直运行

```
docker run -i -t IMAGE /bin/bash
ctrl+p  ctrl+q
docker attach IMAGEID
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

