## rclone 

> 官网：https://rclone.org

### 安装

```bash
sudo pacman -S rclone
# 检查安装时候成功
rclone -v
```

### 新建一个 onedrive网盘

```bash
rclone config
```

看着提示来吧，实在看不懂就百度一下，反正不知道怎么输入的就直接回车。官方案例：

```
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> n
name> remote
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
[snip]
XX / Microsoft OneDrive
   \ "onedrive"
[snip]
Storage> onedrive
Microsoft App Client Id
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_id>
Microsoft App Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret>
Edit advanced config? (y/n)
y) Yes
n) No
y/n> n
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> y
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth  // 这个链接需要授权，复制到浏览器打开
Log in and authorize rclone for access
Waiting for code...
Got code
Choose a number from below, or type in an existing value
 1 / OneDrive Personal or Business
   \ "onedrive"
 2 / Sharepoint site
   \ "sharepoint"
 3 / Type in driveID
   \ "driveid"
 4 / Type in SiteID
   \ "siteid"
 5 / Search a Sharepoint site
   \ "search"
Your choice> 1
Found 1 drives, please select the one you want to use:
0: OneDrive (business) id=b!Eqwertyuiopasdfghjklzxcvbnm-7mnbvcxzlkjhgfdsapoiuytrewqk
Chose drive to use:> 0
Found drive 'root' of type 'business', URL: https://org-my.sharepoint.com/personal/you/Documents
Is that okay?
y) Yes
n) No
y/n> y
--------------------
[remote]
type = onedrive
token = {"access_token":"youraccesstoken","token_type":"Bearer","refresh_token":"yourrefreshtoken","expiry":"2018-08-26T22:39:52.486512262+08:00"}
drive_id = b!Eqwertyuiopasdfghjklzxcvbnm-7mnbvcxzlkjhgfdsapoiuytrewqk
drive_type = business
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
```

### 挂载 Ondrive 网盘到本地

- 查看新建的网盘

  ```bash
  rclone config show
  ```

- 挂载网盘到本地

  ```bash
  # rclone mount 网盘名称：网盘里面的文件夹 本地绝对路径
  rclone mount onedrive:video /home/orangbus/Onedrive
  ```

  参数说明：

  **网盘名称**：新建网盘的时候你输入的网盘名称

  ```
  e) Edit existing remote
  n) New remote
  d) Delete remote
  r) Rename remote
  c) Copy remote
  s) Set configuration password
  q) Quit config
  e/n/d/r/c/s/q> n
  name> onedrive  //这里的名字
  ```

  **网盘里面的文件夹：**  假如你的网盘目录下有一个`video` 的文件夹，你想把这个文件夹挂载到本地（其他文件夹挂载类似）

  ```
  rclone mount onedrive:video 本地绝对路径
  ```

  **本地绝对路径:** 在本地新建一个文件夹，用来挂载网盘，最好是绝对路径

  ```
  /home/orangbus/Onedrive
  ```

- 复制本地文件到网盘中

  如果想把某个文件或者文件夹备份到我的网盘中

  ```bash
  rclone copy /home/orangbus/localFile.zip onedrive:document
  ```

## 快速启动

对于我来说，我不想要时时挂载，那么我们可以自己设置一个linux别名快速启动

```bash
cd -
vim .zshrc
### 末尾添加下面一行命令即可
alias rclonerun="rclone mount onedrive:video /home/orangbus/Onedrive"
#################
source ~/.zshrc
```

## 开机自启

先新建`systemd`配置文件，适用`CentOS 7`、`Debian 8+`、`Ubuntu 16+`。

再使用命令：

```
#将后面修改成你上面手动运行命令中，除了rclone的全部参数
command="mount DriveName:Folder LocalFolder --copy-links --no-gzip-encoding --no-check-certificate --allow-other --allow-non-empty --umask 000"
#以下是一整条命令，一起复制到SSH客户端运行
cat > /etc/systemd/system/rclone.service <<EOF
[Unit]
Description=Rclone
After=network-online.target

[Service]
Type=simple
ExecStart=$(command -v rclone) ${command}
Restart=on-abort
User=root

[Install]
WantedBy=default.target
EOF
```

开始启动：

```bash
systemctl start rclone
```

设置开机自启：

```bash
systemctl enable rclone
```

其他命令：

```bash
重启：systemctl restart rclone
停止：systemctl stop rclone
状态：systemctl status rclone
```

如果你想挂载多个网盘，那么将`systemd`配置文件的`rclone.service`改成`rclone1.service`即可，重启动什么的同样换成`rclone1`。

# rclone常用命令参数

## 查看帮助：

```bash
rclone --help
# 查看功能选项

rclone help flags
# 查看所有参数选项

rclone help backends
# 查看支持的所有网盘
```

## Rclone 设置

```bash
rclone config - 进入交互式配置选项，进行添加、删除、管理网盘等操作。
rclone config file - 显示配置文件的路径，一般配置文件在 ~/.config/rclone/rclone.conf
rclone config show - 显示配置文件信
```

## 命令语法

```bash
# 本地到网盘
rclone [功能选项] <本地路径> <网盘名称:路径> [参数] [参数] ...
# 网盘到本地
rclone [功能选项] <网盘名称:路径> <本地路径> [参数] [参数] ...
# 网盘到网盘
rclone [功能选项] <网盘名称:路径> <网盘名称:路径> [参数] [参数] .
```

## 常用功能选项

```bash
rclone config   // 以控制会话的形式添加rclone的配置，配置保存在.rclone.conf文件中。    
rclone copy   // 将文件从源复制到目的地址，跳过已复制完成的。    
rclone mount   //载    
rclone sync   // 将源数据同步到目的地址，只更新目的地址的数据。    
rclone move   // 将源数据移动到目的地址。    
rclone delete   // 删除指定路径下的文件内容。    
rclone purge   // 清空指定路径下所有文件数据。    
rclone mkdir   // 创建一个新目录。    
rclone rmdir   // 删除空目录。    
rclone check   // 检查源和目的地址数据是否匹配。    
rclone ls   // 列出指定路径下所有的文件以及文件大小和路径。    
rclone lsd   // 列出指定路径下所有的目录/容器/桶。    
rclone lsl   // 列出指定路径下所有文件以及修改时间、文件大小和路径。    
rclone md5sum   // 为指定路径下的所有文件产生一个md5sum文件。    
rclone sha1sum   // 为指定路径下的所有文件产生一个sha1sum文件。    
rclone size   // 获取指定路径下，文件内容的总大小。    
rclone version   // 查看当前版本。    
rclone cleanup   // 清空remote。    
rclone dedupe   // 交互式查找重复文件，进行删除/重命名操作

rclone copy - 复制
rclone move - 移动，如果要在移动后删除空源目录，请加上 --delete-empty-src-dirs 参数
rclone sync - 同步：将源目录同步到目标目录，只更改目标目录。
rclone size - 查看网盘文件占用大小。
rclone delete - 删除路径下的文件内容。
rclone purge - 删除路径及其所有文件内容。
rclone mkdir - 创建目录。
rclone rmdir - 删除目录。
rclone rmdirs - 删除指定灵境下的空目录。如果加上 --leave-root 参数，则不会删除根目录。
rclone check - 检查源和目的地址数据是否匹配。
rclone ls - 列出指定路径下的所有的文件以及文件大小和路径。
rclone lsl - 比上面多一个显示上传时间。
rclone lsd 列出指定路径下的目录
rclone lsf - 列出指定路径下的目录和文件
```

## 常用参数

```bash
-n = --dry-run - 测试运行，用来查看 rclone 在实际运行中会进行哪些操作。
-P = --progress - 显示实时传输进度，500mS 刷新一次，否则默认 1 分钟刷新一次。
--cache-chunk-size SizeSuffi - 块的大小，默认5M，理论上是越大上传速度越快，同时占用内存也越多。如果设置得太大，可能会导致进程中断。
--cache-chunk-total-size SizeSuffix - 块可以在本地磁盘上占用的总大小，默认10G。
--transfers=N - 并行文件数，默认为4。在比较小的内存的VPS上建议调小这个参数，比如128M的小鸡上使用建议设置为1。
--config string - 指定配置文件路径，string为配置文件路径。
--ignore-errors - 跳过错误。比如 OneDrive 在传了某些特殊文件后会提示Failed to copy: failed to open source object: malwareDetected: Malware detected，这会导致后续的传输任务被终止掉，此时就可以加上这个参数跳过错误。但需要注意 RCLONE 的退出状态码不会为0。
```


## 文件过滤

```bash
-exclude - 排除文件或目录。
--include - 包含文件或目录。
--filter - 文件过滤规则，相当于上面两个选项的其它使用方式。包含规则以 + 开头，排除规则以 - 开头。

文件类型过滤
比如 --exclude "*.bak"、--filter "- *.bak"，排除所有 bak 文件。也可以写作。
比如 --include "*.{png,jpg}"、--filter "+ *.{png,jpg}"，包含所有 png 和 jpg 文件，排除其他文件。
--delete-excluded 删除排除的文件。需配合过滤参数使用，否则无效。

目录过滤
目录过滤需要在目录名称后面加上 /，否则会被当做文件进行匹配。以 / 开头只会匹配根目录（指定目录下），否则匹配所目录。这同样适用于文件。
--exclude ".git/" 排除所有目录下的.git 目录。
--exclude "/.git/" 只排除根目录下的.git 目录。
--exclude "{Video,Software}/" 排除所有目录下的 Video 和 Software 目录。
--exclude "/{Video,Software}/" 只排除根目录下的 Video 和 Software 目录。
--include "/{Video,Software}/**" 仅包含根目录下的 Video 和 Software 目录的所有内容。

文件大小过滤
默认大小单位为 kBytes ，但可以使用 k ，M 或 G 后缀。
--min-size 过滤小于指定大小的文件。比如 --min-size 50 表示不会传输小于 50k 的文件。
--max-size 过滤大于指定大小的文件。比如 --max-size 1G 表示不会传输大于 1G 的文件。
```
