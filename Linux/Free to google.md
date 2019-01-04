> Home:https://tunsafe.com/
## 1. Download the TunSafe source code
```
$ git clone https://github.com/TunSafe/TunSafe.git
$ cd TunSafe
```
## 2. Install compiler environment
Linux
```
$ sudo apt-get install clang-6.0 
```
FreeBSD
```
$ sudo pkg install gcc7
```
## 3. Build and install TunSafe
```
$ make
$ sudo make install
```
## 4.Tun on
```
sudo tunsafe start -d TunSafe.conf
tunsafe show 
-----------------------------
 sudo tunsafe stop tun0
```
