---
title: Vim Splits
date: '2021-01-24T21:50:56.263Z'
tags:
- zettelkasten
- zettel
- vim
---
Faster and More Naturally 

Originally posted here: [VIM Splits - Move Faster And More Naturally](https://thoughtbot.com/blog/vim-splits-move-faster-and-more-naturally)

Most of us are Vim users and have tweaked our favorite editor for speed and convenience. See  [thoughtbot’s dotfiles](https://github.com/thoughtbot/dotfiles/blob/master/vimrc) .
One of my favorite tools is the window split. Here is a quick splits overview and configurations to use them more effectively.

### The basics
Create a vertical split using :vsp and horizontal with :sp.
By default, they duplicate the current buffer. This command also takes a filename:
```vim
:vsp ~/.vimrc
```
You can specify the new split height by prefixing with a number:
```vim
:10sp ~/.zshrc
```
Close the split like you would close vim:
```vim
:q
```

### Easier split navigations
We can use different key mappings for easy navigation between splits to save a keystroke. So instead of ctrl-w then j, it’s just ctrl-j:
```vim
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
```

### More natural split opening
Open new split panes to right and bottom, which feels more natural than Vim’s default:
```vim
set splitbelow
set splitright
```

### Resizing splits
Vim’s defaults are useful for changing split shapes:
```vim
"Max out the height of the current split
ctrl + w _


"Max out the width of the current split
ctrl + w |

"Normalize all split sizes, which is very handy when resizing terminal
ctrl + w =
```

### More split manipulation
```vim
"Swap top/bottom or left/right split
Ctrl+W R

"Break out current window into a new tabview
Ctrl+W T

"Close every window in the current tabview but the current one
Ctrl+W o
```

### Please :help me
As with everything in Vim, for more information, check the well-written helpfiles. In Vim, `:help` splits.