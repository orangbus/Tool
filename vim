" .vimrc - Vim configuration file.
"
" Copyright (c) 2010 orangbus All Rights Reserved.
"
" Maintainer: orangbus <orangbus@163.com>
"    Created: 2014-01-01
" LastChange: 2018-04-22
" pathogen
execute pathogen#infect()
" GENERAL SETTINGS{{{
" To use VIM settings, out of VI compatible mode.
set nocompatible
" Enable file type detection.
filetype plugin indent on
" Syntax highlighting.
" 允许用指定语法高亮配色方案替换默认方案
syntax on
" mycolor 选择框
"hi Pmenu    ctermbg=yellow ctermfg=black
hi Pmenu    ctermbg=grey ctermfg=black
hi PmenuSel ctermbg=green  ctermfg=grey
hi CursorLine cterm=underline
hi Folded ctermbg=none ctermfg=darkgrey
" Other settings.
set   autoindent
set   autoread
set   autowrite
set   background=dark
set   backspace=indent,eol,start
set nobackup
set   cindent
set   cinoptions=:0
" 高亮显示当前行/列
set   cursorline
set   cursorcolumn
set   completeopt=longest,menuone
set   expandtab
set   fileencodings=utf-8,gb2312,gbk,gb18030
set   encoding=utf-8
set   fileformat=unix
set   foldenable
set   foldmethod=marker
set   guioptions-=T
set   guioptions-=m
set   guioptions-=r
set   guioptions-=l
set   helpheight=10
set   helplang=cn
set   hidden
set   history=100
" 高亮显示搜索结果
set   hlsearch
set   ignorecase
set   incsearch
set   laststatus=2
set   statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [POS=%l,%v][%p%%]\ %{strftime(\"%d/%m/%y\ -\ %H:%M\")}
set   mouse=c
set   number
set   pumheight=10
set   ruler
set   scrolloff=5
set   shiftwidth=4
set   showcmd
set   smartindent
set   smartcase
set   tabstop=4
set   termencoding=utf-8
"set   textwidth=80
set   whichwrap=h,l
set   wildignore=*.bak,*.o,*.e,*~
set   wildmenu
set   wildmode=list:longest,full
set nowrap
"}}}
" AUTO COMMANDS: {{{
" auto expand tab to blanks
"autocmd FileType c,cpp set expandtab
" Restore the last quit position when open file.
autocmd BufReadPost *
    \ if line("'\"") > 0 && line("'\"") <= line("$") |
    \     exe "normal g'\"" |
    \ endif
"}}}
" SHORTCUT SETTINGS: {{{
" Set mapleader
let mapleader=","
" Space to command mode.
nnoremap <space> :
vnoremap <space> :
" Switching between buffers.
nnoremap <C-h> <C-W>h
nnoremap <C-j> <C-W>j
nnoremap <C-k> <C-W>k
nnoremap <C-l> <C-W>l
inoremap <C-h> <Esc><C-W>h
inoremap <C-j> <Esc><C-W>j
inoremap <C-k> <Esc><C-W>k
inoremap <C-l> <Esc><C-W>l
" "cd" to change to open directory.
let OpenDir=system("pwd")
nmap <silent> <leader>cd :exe 'cd ' . OpenDir<cr>:pwd<cr>
"}}}
" PLUGIN SETTINGS: {{{
"CompletePlugin
    source ~/.vim/vimrc-completeplugin.vim
"UltiSnips(Compatible with YouCompleteMe)
    let g:UltiSnipsExpandTrigger="<c-k>"
    let g:UltiSnipsJumpForwardTrigger="<c-k>"
    let g:UltiSnipsJumpBackwardTrigger="<c-j>"
" NERDTree.vim
let g:NERDTreeWinPos="right"
let g:NERDTreeWinSize=25
let g:NERDTreeShowLineNumbers=1
"let g:NERDTreeQuitOnOpen=1
" cscope.vim
if has("cscope")
    set csto=1
    set cst
    set nocsverb
    if filereadable("cscope.out")
        cs add cscope.out
    endif
    set csverb
endif
" VimGDB.vim
if has("gdb")
        set asm=0
        let g:vimgdb_debug_file=""
        run macros/gdb_mappings.vim
endif
" LookupFile setting
let g:LookupFile_TagExpr='"./tags.filename"'
let g:LookupFile_MinPatLength=2
let g:LookupFile_PreserveLastPattern=0
let g:LookupFile_PreservePatternHistory=1
let g:LookupFile_AlwaysAcceptFirst=1
let g:LookupFile_AllowNewFiles=0
" plugin shortcuts
function! RunShell(Msg, Shell)
        echo a:Msg . '...'
        call system(a:Shell)
        echon 'done'
endfunction
nmap  <F2> :TlistToggle<cr>
nmap  <F3> :NERDTreeToggle<cr>
nmap  <F4> :MRU<cr>
nmap  <F5> <Plug>LookupFile<cr>
nmap  <F9> :call RunShell("Generate tags", "ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .")<cr>
nmap <F10> :call HLUDSync()<cr>
nmap <F11> :call RunShell("Generate filename tags", "~/.vim/shell/genfiletags.sh")<cr>
nmap <F12> :call RunShell("Generate cscope", "cscope -Rb")<cr>:cs add cscope.out<cr>
nmap <leader>sa :cs add cscope.out<cr>
nmap <leader>ss :cs find s <C-R>=expand("<cword>")<cr><cr>
nmap <leader>sg :cs find g <C-R>=expand("<cword>")<cr><cr>
nmap <leader>sc :cs find c <C-R>=expand("<cword>")<cr><cr>
nmap <leader>st :cs find t <C-R>=expand("<cword>")<cr><cr>
nmap <leader>se :cs find e <C-R>=expand("<cword>")<cr><cr>
nmap <leader>sf :cs find f <C-R>=expand("<cfile>")<cr><cr>
nmap <leader>si :cs find i <C-R>=expand("<cfile>")<cr><cr>
nmap <leader>sd :cs find d <C-R>=expand("<cword>")<cr><cr>
nmap <leader>zz <C-w>o
nmap <leader>gs :GetScripts<cr>
"}}}
" NEW FILE: {{{
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"create a .c,.h,.sh,.java file,automatic insert a title 
autocmd BufRead,BufNewFile *.{md,mdown,mkd,mkdn,markdown,mdwn} set filetype=markdown
autocmd BufNewFile *.py,*.cpp,*.[ch],*.sh,*.java,*.{md,mdown,mkd,mkdn,markdown,mdwn} exec ":call SetTitle()" 
autocmd FileType python set omnifunc=pythoncomplete#Complete
"define a funtion[SetTitle]automatic a title
func SetTitle() 
        ".sh file 
        if &filetype == 'sh' 
                call setline(1,"\#!/bin/bash") 
                call append(line("."), "\#########################################################################") 
                call append(line(".")+1, "\# File Name: ".expand("%")) 
                call append(line(".")+2, "\# Author: orangbus") 
                call append(line(".")+3, "\# mail: orangbus@163.com") 
                call append(line(".")+4, "\# Created Time: ".strftime("20%y-%m-%d %H:%M:%S")) 
                call append(line(".")+5, "\#########################################################################") 
                call append(line(".")+6, "") 
        endif
        if &filetype == 'cpp'
                call setline(1, "/*************************************************************************") 
                call append(line("."), "        > File Name: ".expand("%")) 
                call append(line(".")+1, "      > Author: orangbus") 
                call append(line(".")+2, "      > Mail: orangbus@163.com ") 
                call append(line(".")+3, "      > Created Time: ".strftime("20%y-%m-%d %H:%M:%S")) 
                call append(line(".")+4, " ************************************************************************/") 
                call append(line(".")+5, "")
                call append(line(".")+6, "#include<iostream>")
                call append(line(".")+7, "using namespace std;")
                call append(line(".")+8, "")
        endif
        if &filetype == 'c'
                call setline(1, "/*************************************************************************") 
                call append(line("."), "        > File Name: ".expand("%")) 
                call append(line(".")+1, "      > Author: orangbus") 
                call append(line(".")+2, "      > Mail: orangbus@163.com ") 
                call append(line(".")+3, "      > Created Time: ".strftime("20%y-%m-%d %H:%M:%S")) 
                call append(line(".")+4, " ************************************************************************/") 
                call append(line(".")+5, "")
                call append(line(".")+6, "#include<stdio.h>")
                call append(line(".")+7, "")
        endif
        if &filetype == 'python'
            call setline(1, "\#!/usr/bin/python")  
                call setline(2, "\#coding=utf8")  
            call setline(3, "\"\"\"")  
                call setline(4, "\# Author: orangbus")  
                call setline(5, "\# Created Time : ".strftime("20%y-%m-%d %H:%M:%S"))  
                call setline(6, "")  
                call setline(7, "\# File Name: ".expand("%"))  
                call setline(8, "\# Description:")  
            call setline(9, "")  
            call setline(10, "\"\"\"")  
        endif
        if &filetype == 'markdown'
            call setline(1, "\---")  
        call setline(2, "layout: post")
        call setline(3, "title:")  
        call setline(4, "subtitle:")  
        call setline(5, "date: ".strftime("20%y-%m-%d %H:%M:%S"))  
        call setline(6, "category:") 
        call setline(7, "author: orangbus") 
        call setline(8, "tags:") 
        call setline(9, "   -") 
        call setline(10, "\---") 
        endif
        "create a file，automatic position the end of file
        autocmd BufNewFile * normal G
endfunc 


"}}}
" SETTINGS: {{{
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set report=0
set completeopt=longest,menu
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


"}}}
" KEY: {{{
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map w :w!<cr>
vmap <C-c> "+y
"C，C++ //compile
map <F7> :call CompileRunGcc()<CR>
func! CompileRunGcc()
        exec "w"
        if &filetype == 'c'
                exec "!gcc % -o %<"
                exec "! ./%<"
        elseif &filetype == 'cpp'
                exec "!g++ % -o %<"
                exec "! ./%<"
        elseif &filetype == 'sh'
                :!./%
        elseif &filetype == 'py'
                exec "!python %"
                exec "!python %<"
        endif
endfunc
"C,C++ //debug
map <F8> :call Rungdb()<CR>
func! Rungdb()
        exec "w"
        exec "!gcc % -g -o %<"
        exec "!gdb ./%<"
endfunc


"}}}
" file browse: {{{
" ----bingo
let g:winManagerWindowLayout='FileExplorer|TagList'
nmap wm :WMToggle<cr>

"}}}
" CTags{{{
"2014-7-13
let Tlist_Sort_Type = "name"    
let Tlist_Compart_Format = 1    
let Tlist_Exist_OnlyWindow = 1  
let Tlist_File_Fold_Auto_Close = 0  
""autocmd FileType h,cpp,cc,c set tags+=D:\tools\cpp\tags  
let Tlist_Show_One_File=1
set tags=tags
set autochdir
let Tlist_Ctags_Cmd = '/usr/bin/ctags' 
let Tlist_Show_One_File = 1
let Tlist_Exit_OnlyWindow = 1 
let g:Tlist_Auto_Update=1
""let Tlist_Process_File_Always=1
let Tlist_WinWidth=25
let g:Tlist_Enable_Fold_Column=0
""let g:Tlist_Auto_Highlight_Tag=1
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"}}}
" 实用设置{{{
"""""""""""""""""""""""""""""""""""""""""""""""""""
"实用设置

"当打开vim且没有文件时自动打开NERDTree
autocmd vimenter * if !argc() | NERDTree | endif
" 只剩 NERDTree时自动关闭
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | endif
"}}}
