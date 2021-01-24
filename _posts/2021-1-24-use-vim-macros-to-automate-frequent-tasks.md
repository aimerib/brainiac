---
title: Use Vim macros to automate frequent tasks
date: '2021-01-24T22:57:14.884Z'
tags:
- vim
- zettelkasten
- zettel
---
Originally from: [Use Vim Macros](https://www.redhat.com/sysadmin/use-vim-macros)

In Vim, a macro is a feature that allows you to record a sequence of commands that you use to perform a given task. You then execute that macro many times to repeat the same job in an automated way.

Macros make tedious and repeatable tasks manageable by executing the task only once, then using Vim's power to automate it. Macros improve your workflow and are a great time saver.

In this article, we'll explore the concept of Vim macros by applying it to a practical example.

The problem
Suppose that you receive a CSV file containing a list of hosts in your network from a hypothetical monitoring system. You want to convert it to the /etc/hosts format to enable local name resolution for the hosts.

The original file is this:

```shell
$ cat hosts.csv 
Description,Hostname,IPAddress,FQDN
"OCP Master Node 1",ocpmaster01,192.168.0.20,ocpmaster01.home.ca
"OCP Master Node 2",ocpmaster02,192.168.0.21,ocpmaster02.home.ca
"OCP Master Node 3",ocpmaster03,192.168.0.22,ocpmaster03.home.ca
"OCP Worker Node 1",ocpnode01,192.168.0.30,ocpnode01.home.ca
"OCP Worker Node 2",ocpnode02,192.168.0.31,ocpnode02.home.ca
"OCP Worker Node 3",ocpnode03,192.168.0.32,ocpnode03.home.ca
"Ansible Host 1",ansibleh01,192.168.0.144,ansibleh01.home.ca
"Ansible Host 2",ansibleh02,192.168.0.145,ansibleh02.home.ca
```

The expected output is this:

```
192.168.0.20    ocpmaster01.home.ca    ocpmaster01    #OCP Master Node 1
192.168.0.21    ocpmaster02.home.ca    ocpmaster02    #OCP Master Node 2
192.168.0.22    ocpmaster03.home.ca    ocpmaster03    #OCP Master Node 3
192.168.0.30    ocpnode01.home.ca    ocpnode01    #OCP Worker Node 1
192.168.0.31    ocpnode02.home.ca    ocpnode02    #OCP Worker Node 2
192.168.0.32    ocpnode03.home.ca    ocpnode03    #OCP Worker Node 3
192.168.0.144    ansibleh01.home.ca    ansibleh01    #Ansible Host 1
192.168.0.145    ansibleh02.home.ca    ansibleh02    #Ansible Host 2
```

To obtain the expected output, you need to edit the input by switching the position of some fields, deleting the quotation marks, and inserting Tab or comment characters (#) appropriately. Let's use Vim macros to handle this task.

Solve the problem and record the macro
The basic workflow of a Vim macro consists of recording your commands and keystrokes while doing the edits required to solve the problem on the first line, saving the command sequence to a register, and then replaying the macro to do the same on the remaining lines.

To record a macro and save it to a register, type the key q followed by a letter from a to z that represents the register to save the macro, followed by all commands you want to record, and then type the key q again to stop the recording.

```vim
q<register><commands>q
```

For example, to record a basic macro that inserts a new line and save it to register a, use this sequence:

```vim
qao<ESC>q
```

While this macro is not useful, it exemplifies the sequence required to record any other macros.

Recording macros in Vim is an exercise in logic and using Vim commands appropriately. Keep in mind that you want this macro to be repeatable on other lines, even if the input varies somewhat. For example, it's best to use the command dw to delete a word rather than repeating the command x to remove characters, because the number of characters in the word could vary from line to line.

Now, let's record a macro that converts the first line of our CSV file to the required format and save it on register h. Start by placing the cursor anywhere on the first line we want to change in the file:

"OCP Master Node 1",ocpmaster01,192.168.0.20,ocpmaster01.home.ca
Then, start recording the macro by pressing q and h to save it to register h:

```vim
qh
```

While you're recording the macro the status line at the bottom shows this message:

`recording @h`

Next, it's a good practice to move your character to a known position, so the macro works the same way independently of where the cursor was located when the macro started. Let's use the beginning of the line as the start point by pressing 0:

```vim
0
```

This first field is the description, which becomes the comment at the end of the line in the output. While you're in there, replace the quotation mark " character with the comment character #, so we don't need to do this when we move this field to the line's end later:

```vjm
r#
```

Next, delete the next quotation mark by moving the cursor to it using the f command and pressing x to remove it:

```vim
f"x
```

At this point, your first line looks like this:

#OCP Master Node 1,ocpmaster01,192.168.0.20,ocpmaster01.home.ca
Next, move the cursor one position to the right using l, and delete the entire hostname until the next comma:

```vim
ldf,
```

Remember, when you delete text in Vim, you also copy it. Now, let's paste it at the end of the line. Insert text at the end by using A and inserting a comma, then press <ESC>p to paste the hostname:

```vim
A,<ESC>p
```

Now the fields are almost in the desired order. Let's move the comment to the end of the line. Do this by moving the cursor back to the beginning with 0, and deleting the entire comment to the next comma with df,:

```vim
0df,
```
Then, move the cursor to the end of the line with $, paste the text with p, and delete the final comma with x:

```vim
$px
```

All the fields are now in the desired position, and your line looks like this:

192.168.0.20,ocpmaster01.home.ca,ocpmaster01,#OCP Master Node 1
Finally, replace all the commas with a Tab character by using the s command:

```vim
:s/,/\t/g<ENTER>
```

The line matches the desired output:

192.168.0.20    ocpmaster01.home.ca     ocpmaster01     #OCP Master Node 1
Finish your macro by moving the cursor to the next line by pressing j so you can repeatedly use the macro. Finally, stop the recording by pressing q:

```vim
jq
```

You recorded a macro, and it's ready to use. Let's see how you can check it next.

View and load macros
Because macros are saved into Vim registers, you can view saved macros by using the command :reg to see the content of all registers:

```vim
:reg
--- Registers ---
""   ,
"h   0r#f"xldf,A,^[p0df,$px:s/,/\t/g^Mj
"-   ,
...
```

You can also check the specific register, in our case register h, by providing it as a parameter to the :reg command:

```vim
:reg h
--- Registers ---
"h   0r#f"xldf,A,^[p0df,$px:s/,/\t/g^Mj
```

Using both methods, you can see the content of register h matches the macro we recorded before. Notice that the special characters like ESC and ENTER were replaced with the Vim representation ^[ and ^M respectively.

You can also load macros into registers. First, copy the macro content and paste it to an empty line in the buffer. Then replace special characters with their Vim representation by using Ctrl+v+<ESC> and Ctrl+v+<ENTER> in Insert mode. Then copy the macro content in the desired register, for example, register h with this command:

```vim
"hy$
```

Next, let's replay the macro to update the remaining lines in the file.

Replay macros
After you record the macro and verify its contents, use the macro to perform the same edits on the remaining lines.

To replay the macro once, move the cursor to the next line and press @h where h represents the register on which you saved the macro.

Notice that the macro automatically moves the cursor to the next line as required. This allows you to repeat its execution. To repeat the macro execution, press @@.

Finally, you can repeat the macro on all remaining lines by using Vim number<COMMAND> syntax. For example, to execute the macro on the five remaining lines, press 5@@ or 5@h.

This works well if you know exactly how many times you want to execute the macro. If you want to run the macro in all lines until the end of the file instead, regardless of how many lines exist, use this syntax:

```vim
:%:normal @h
```

All the lines in the file now match the expected output. To complete the changes, delete the title line at the beginning.

What's next?
Vim macros are a powerful resource that allows you to extend Vim's functionality and execute complex tasks quickly.

You can see the benefits of running a macro in a file with eight lines. Imagine if you were required to do something similar in a file with hundreds or thousands of entries. You can even test this by copying these eight lines and pasting them hundreds of times and then re-applying the macro.

If you are using macros on a file with thousands of lines, take a look at the set lazyredraw command to improve performance. This setting prevents Vim from redrawing the screen for each iteration of the macro.

Creating Vim macros requires you to think and execute tasks in an optimized way. It's a good exercise when using Vim to think about how to perform tasks in a way that makes them repeatable and allows you to convert them to macros when necessary.

By doing this, you become more proficient with Vim and, in return, you benefit from more advanced features to improve your workflow and save time.