# 素linux常用命令汇总

## Centos7-防火墙及端口操作

- 查看本机端口打开情况

  ```
  netstat -aptn
  netstat -nupl (UDP类型的端口)
  netstat -ntpl (TCP类型的端口)

  telnet ip  端口号  //方式测试远程主机端口是否打开
  telnet 127.0.0.1 80
  ```


- 开通某个端口：`/etc/sysconfig/iptables` 不是`/etc/sysconfig/iptables-config` , 其实把实例复制下来改一下端口就可以了
  ```
  -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
  ```

- 重启防火墙iptables使配置生效

  ```
  systemctl status/restart/stop firewalld   //状态、重启、关闭
  ```

- Centos默认使用Firewall，如果想使用`iptables` 

  ```
  systemctil disable firewalld  //关闭Firewall
  yum install -y iptables-services  //安装iptables
  systemctl start/stop/restart iptables   //开启Iptables

  systemctl enable iptables.service  //开机启动
  ```

- 查看本机网络及ip信息

  ```
  ip addr  
  ```


  ## 两种服务启动命令

  ```
  service nginx start/restart/stop
  systemctl start/restart/stop nginx
  ```

  ## 开机启动某个服务

  ```
  chkconfig nginx on
  ```

  ## 进程操作

  ```
  ps aux | grep nginx
  ```

## 环境变量

​	环境变量配置文件：`/etc/profile` 全局有效  `~/home/.zhsrc` 针对当前用户有效

```
echo $PATH
export PATH=$PATH:/usr/local/php/bin
```

## 软件安装

- RPM包安装：

  ```
  rpm ivh package.rpm
  ```

- deb包：直接双击打开即可安装

  ```

  ```

- 

# Centos7--lnmp 之Yum安装

> 1. ** 配置防火墙 **，开启80端口、3306端口，添加到默认的22端口规则的下面。
>
> ```
> vi /etc/sysconfig/iptables
>  #允许80端口通过防火墙
> -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
> #允许3306端口通过防火墙
> -A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT 
> #保存退出
> ：wq
> #重启防火墙iptables使配置生效
> /etc/init.d/iptables restart  
> ```

- nginx

  > nginx -t  //检查nginx配置文件是否有错误

  ```
  #安装nginx
  	yum install nginx 
  #启动
  	service nginx start
  #设置开机启动
  	chkconfig nginx on
  #重启设置
  	/etc/init.d/nginx restart
  ```

- mysql

  - Download and add the repository, then update.

    ```
    wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
    sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
    yum update
    ```

  - install mysql

    ```
    sudo yum install mysql-server
    sudo systemctl start mysqld
    ```

  - set mysql passwd

    ```
    #初始化命令，按步骤选择。
    mysql_secure_installation  
    # 是否设定root密码，当然设置了，输入Y回车
    Set root password? [Y/n] Y                                    
    # 输入root密码
    New password:                  
    # 再次输入root密码，MySQL5.6.6增加了密码强度验证插件validate_password，密码要求比较严格，需要特殊字符和大小字符，可以关闭这个插件
    Re-enter new password:                                       
    # 是否删除匿名用户，删除，输入Y回车
    Remove anonymous users? [Y/n] Y                      
    # 是否删禁止root用户远程登录，当然禁止，输入Y回车
    Disallow root login remotely? [Y/n] Y                     
    # 是否删除测试数据库test，看个人喜好
    Remove test database and access to it? [Y/n]      
    # 刷新权限，输入Y回车
    Reload privilege tables now? [Y/n] Y 
    #初始化完毕

    #停止
    /etc/init.d/mysqld stop   
    #启动
    /etc/init.d/mysqld start  
    #重启
    service mysqld restart
    ```



- php

  ```
  sudo yum install epel-release yum-utils
  sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm

  sudo yum-config-manager --enable remi-php72

  sudo yum install php php-common php-opcache php-mcrypt php-cli php-gd php-curl php-mysqlnd

  sudo yum install php-fpm

  php -v 
  ```

- 配置nginx支持php

  - 用户设置
  - php支持  `/etc/nginx/` 

  ```
  server {

      # . . . other code

      location ~ \.php$ {
          try_files $uri =404;
          fastcgi_pass unix:/run/php-fpm/www.sock;
          fastcgi_index index.php;
          fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
          include fastcgi_params;
      }
  }
  ```

**重启所有服务** `sudo systemctl restart nginx mysqld php-fpm` 

#### 备注

nginx日志：/var/log/nginx/error.log

权限设置：chown nginx.nginx/usr/share/nginx/html/ -R
MySQL数据库目录是：/var/lib/mysql
权限设置：chown mysql.mysql -R /var/lib/mysql
PHP主目录 /etc/php.d/
PHP配置文件 /etc/php.ini
PHP模块位置 /usr/lib/php/ 或者 /usr/lib64/php/PHP模块位置 /usr/lib/php/ 或者 /usr/lib64/php/

Ps:参考blog：https://www.jianshu.com/p/69a289dc5441

​				https://www.linode.com/docs/databases/mysql/how-to-install-mysql-on-centos-7/



# Centos7--lnmp编译安装

- nginx

- mysql



- php

懒得弄了。直接上laradock，请查看docker文件


## 推荐网站

- https://linuxize.com/


