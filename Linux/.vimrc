"======== orangbus .vimrc ===============
"github:https://github.com/orangbus/tool
"About Me : Bili search: Orangbus
"======== orangbus.cn ===================

syntax on "语法高亮
syntax enable 
colorscheme desert "设置颜色

set number "设置行号
set history=1000 "设置历史记步
set nocompatible  "关闭vi兼容模式
set ruler "右下角显示光标的行列信息
set tabstop=4 "设置所有的Tab和缩进为4个空格
set wrap "自动换行
set hlsearch "搜索逐字符高亮
set encoding=utf-8 "设置编码
set autowrite "自动保存
set laststatus=2 "显示状态栏（默认值为1，表示无法显示状态栏）
set completeopt=longest,preview,menu "文件类型自动检测，代码智能补全

"用浅色高亮显示当前行"
autocmd InsertLeave * se nocul
autocmd InsertEnter * se cul

"============= 插件相关==================
filetype on " 检测文件类型 
