# How to use ?

百度寻找千百遍，蓦然回首，那人就在 google。

推荐一个百度重定向去除脚本，个人使用感觉挺好的，有需要的小伙伴抓紧上车

Github: <https://github.com/langren1353/GM_script>

##  Google.tar.bz2

解压缩

```
tar xjf google.tar.bz2 -C Path-to-you-dir（/home/app/google）
```

- 方法一：

1. 打开Google浏览器的扩展：chrome://extensions/ ，点击右上角 `开启开发者模式` 
2. 点击左上角`加载已解压的扩展程序` ，选择刚刚解压的文件夹即可。

- 方法二 

  直接解压文件里的 `谷歌访问助手.crx` 拖进 `chrome://extensions/` 进行安装。

## Ghelper.tar.bz2

解压缩

```
tar xjf Ghelper.tar.bz2 -C Path-to-you-dir  //解压缩
tar -tvjf Ghelper.tar.bz2 //查看压缩文件
# 压缩xx.tar.bz2文件
tar cjfv ZipName.tar.bz2 sourceFiles
# 将当前目录下的   App 文件夹打包
tar cjfv app.tar.bz2 App
```

使用方法同上

Q: 为什么使用  `xxx.tar.bz2` 感觉没有见过的格式？

W: 使用  `.bz2` 可以把文件大大的压缩，一方面下载的时候可以快一点，另一方面就是推荐大家使用吧（个人建议）  

##  SwitchySharp : 浏览器代理助手

详细请看：<https://github.com/orangbus/tool> 如何上google教程。

---

> 学习以下内容请牢记我天朝核心价值观
>
> 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善

我的桌面系统是 `Manjaro-gome` ，其他linux发行版请参考使用。

## linux客户端使用shadowsock-qt5（SSR）科学上网

- 安装shadowsock-Qt5 (先看看长啥样)

  ![](https://github.com/orangbus/Tool/blob/master/images/shadowsock.png?raw=true) 

  ```
  # Arch manjro
  sudo pacman -S shadowsock-qt5  //不一定有效
  ```

  **【推荐】** 可以在软件管理中搜索 `shadowsock-qt5 ` 

  - 确保你的SSR配置没问题
  - 填写本地代理地址的时候请记住你填写的**端口** ，系统代理和插件代理的时候会用到。

方法1、安装插件：（[Proxy SwitchySharp](https://www.switchysharp.com/install.html) ）本目录下也提供下载。--仅浏览器科学上网

![](https://github.com/orangbus/Tool/blob/master/images/1080.png?raw=true) 

![](https://github.com/orangbus/Tool/blob/master/images/Proxy%20SwitchySharp.png?raw=true) 

方法2、使用**Ghelper** 插件代理。--仅浏览器科学上网

![](https://github.com/orangbus/Tool/blob/master/images/ipport.png?raw=true) 

方法3、系统代理 。--支持终端代理

​        最近在折腾linux系统的时候发现，原来你只要安装了了`shadowsock-qt5` 并成功配置好 SSR 之后，打开【设置】【代理】找到【代理】，选择 shadowsock , 地址填`127.0.0.1` 端口：`1080` （上面你自己配置的本地代理端口）,然后打开 Google.com 神奇的就打开了，虽然我以前也配置过，不知道什么原因上不了Google，但是最近折腾的时候又可以的，亲测【deepin】【Manjaro-gnome】系统方法可行。

![](https://github.com/orangbus/Tool/blob/master/images/system.png?raw=true)

- 终端代理

  ```
  export http_proxy=socks5://127.0.0.1:1080
  # 可以添加到 .bashrc
  alias ssron="export ALL_PROXY=socks5://127.0.0.1:1080"
  alias ssroff="unset ALL_PROXY"
  ```

- git clone 代理

  ```
  //  1080 改为自己的 socks5 监听端口
  git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
  git config --global https.https://github.com.proxy socks5://127.0.0.1:1080
  ```

  参考：https://struggleblog.com/2018/07/13/accelerate_github_clone/ 

  https://blog.kelu.org/tech/2017/06/19/setting-socks5-proxy.html

## linux客户端使用V2ray科学上网

1、安装V2rayA：https://github.com/mzz2017/V2RayA

```
yay v2raya
sudo systemctl start v2raya //启动v2raya
```

更多安装方式请参考该项目作者的介绍

2、打开webGui配置v2ray信息：https://v2raya.mzz.pub/

需要注意的是，webGUI里面的【设置】【地址与端口】配置的是**本地代理的端口** ，也就是说在使用**Ghelper** 插件进行代理科学上网的时候，代理地址是：127.0.0.1，端口：**本地代理的端口** 

![](https://github.com/orangbus/Tool/blob/master/images/v2rayport.png?raw=true)  

至此你就可以使用v2ray进行科学上网了。

如何你能找到任何

# 我遇到的问题

1、我所有东西配置好了，但是我还是不能使用 v2ray 科学上网？

- 检查端口是否冲突了
- 可以安装 `shadowsocks-qt5` 调试一下可不可以科学上网，假如我只是配置了 `http` 端口转发，没有`socks` ，那么`socks5` 选项最好不要填，空摆着就可以。
- 16字真言：不行就分，喜欢就买，多喝点水，重启试试。



如果你有更好的推荐，并且能找到任何联系我们的方式，请加入我们，当然不加入也无所谓。