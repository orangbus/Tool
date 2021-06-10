# Ｖｉｍ从入门到放弃系列

> 配置一个属于你自己的ｖｉｍＩＤＥ编辑器

假设你已经会简单的操作 Linux 系统了。默认当前目录是`~` 家目录，不懂执行　`cd ~` 　从新配置请跳过　“个人再用插件推荐”

## 安装ＶＩＭ

Centos

```
sudo yum install vim
```

Manjaro / arch

```
sudo pacman -S vim
```

## 插件管理(Vundle)安装

> github:https://github.com/VundleVim/Vundle.vim
>
> 安装就跳过了，不会安装就别折腾了，不是歧视的意思，只是可能你接触　linux　时间不长，等你熟悉了再来玩这些扫操作的东西，这样可以节约你的时间，非得折腾官方有文档。

---

挑一点重点：

vim的配置文件都是在自己家目录下的`.vimrc` 文件中（没有自行新建一个`touch .vimrc`）,Vundle官方列出一份基本的配置信息，当你在复制的时候可能全部都注释了，所以需要你手动把　备注有rquired　的配置打开

## Vim 插件安装

插件搜索安装操作：首先打开　vim　

```
:PluginInstall PluginName  //安装
:PluginSearch PluginName   //搜索
```

##　安装插件管理工具Vundle

Vundel : https://github.com/VundleVim/Vundle.vim

```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

编辑 `.vinrc` 文件，这是一个隐藏文件，可执行　`la -a` 查看，没有的话就新建一个：`touch .vimrc`  , 然后添加一下内容：

```
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" Git plugin not hosted on GitHub
Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help //插件管理操作命令
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
```

```
vim .vimrc //自己添加以上配置（官方给的）
esc
:eq
vi test.py
:PluginInstall
```

- 网上搬运了一份配置

```
syntax enable
set background=dark
colorscheme solarized
复制代码一些基本设置
"==========================================  
"General  
"==========================================  
" history存储长度。  
set history=1000         
"检测文件类型  
filetype on  
" 针对不同的文件类型采用不同的缩进格式    
filetype indent on                 
允许插件    
filetype plugin on  
启动自动补全  
filetype plugin indent on  
"兼容vi模式。去掉讨厌的有关vi一致性模式，避免以前版本的一些bug和局限  
set nocompatible        
set autoread          " 文件修改之后自动载入。  
set shortmess=atI       " 启动的时候不显示那个援助索马里儿童的提示  

" 取消备份。  
"urn backup off, since most stuff is in SVN, git et.c anyway...  
set nobackup  
set nowb  
set noswapfile  
  
"贴时保持格式  
set paste  
"- 则点击光标不会换,用于复制  
set mouse-=a           " 在所有的模式下面打开鼠标。  
set selection=exclusive    
set selectmode=mouse,key  
  
" No annoying sound on errors  
" 去掉输入错误的提示声音  
set noerrorbells  
set novisualbell  
set t_vb=  
set tm=500    
  
"==========================================  
" show and format  
"==========================================  
"显示行号：  
set number  
set nowrap                    " 取消换行。  
"为方便复制，用<F6>开启/关闭行号显示:  
nnoremap <F6> :set nonumber!<CR>:set foldcolumn=0<CR>  

"括号配对情况  
set showmatch  
" How many tenths of a second to blink when matching brackets  
set mat=2  
  
"设置文内智能搜索提示  
" 高亮search命中的文本。  
set hlsearch            
" 搜索时忽略大小写  
set ignorecase  
" 随着键入即时搜索  
set incsearch  
" 有一个或以上大写字母时仍大小写敏感  
set smartcase  
  
" 代码折叠  
set foldenable  
" 折叠方法  
" manual    手工折叠  
" indent    使用缩进表示折叠  
" expr      使用表达式定义折叠  
" syntax    使用语法定义折叠  
" diff      对没有更改的文本进行折叠  
" marker    使用标记进行折叠, 默认标记是 {{{ 和 }}}  
set foldmethod=syntax  
" 在左侧显示折叠的层次  
"set foldcolumn=4  
  
set tabstop=4                " 设置Tab键的宽度        [等同的空格个数]  
set shiftwidth=4  
set expandtab                " 将Tab自动转化成空格    [需要输入真正的Tab键时，使用 Ctrl+V + Tab]  
" 按退格键时可以一次删掉 4 个空格  
set softtabstop=4  
  
set ai "Auto indent  
set si "Smart indent  
  
"==========================================  
" status  
"==========================================  
"显示当前的行号列号：  
set ruler  
"在状态栏显示正在输入的命令  
set showcmd  
  
" Set 7 lines to the cursor - when moving vertically using j/k 上下滚动,始终在中间  
set so=7    
"set cursorline              " 突出显示当前行    
"  Improved C++ STL syntax highlighting
Plugin 'STL-improved'

" recommend fetch it from https://github.com/tczengming/autoload_cscope.vim.git which support c and cpp
Plugin 'tczengming/autoload_cscope.vim'

Plugin 'CmdlineComplete'
Plugin 'xptemplate'

"  Ultimate auto completion system for Vim
Plugin 'neocomplcache'

Plugin 'genutils'
Plugin 'lookupfile'

" Fast file navigation
Plugin 'wincent/Command-T'

" Preview the definition of variables or functions in a preview window
Plugin 'autopreview'

" Echo the function declaration in the command line for C/C++
Plugin 'echofunc.vim'

" Under linux need exec 'dos2unix ~/.vim/bundle/QFixToggle/plugin/qfixtoggle.vim'
Plugin 'Toggle'

Plugin 'Color-Sampler-Pack'
Plugin 'txt.vim'
Plugin 'mru.vim'
Plugin 'YankRing.vim'
Plugin 'tpope/vim-surround.git'
Plugin 'DoxygenToolkit.vim'
Plugin 'tczengming/headerGatesAdd.vim'
Plugin 'ShowMarks'
Plugin 'Lokaltog/vim-powerline'

作者：卡巴拉的树
链接：https://juejin.im/post/5a38c37f6fb9a0450909a151
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
