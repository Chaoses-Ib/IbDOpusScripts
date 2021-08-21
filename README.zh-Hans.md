# IbDOpusScripts
语言：[English](README.md)，[简体中文](README.zh-Hans.md)  
一些 [Directory Opus](https://www.gpsoft.com.au/) 的脚本。

## 脚本
* [AutoExtract](AutoExtract.js)（自动解压）  
对于选中的压缩包，如果根目录内文件多于一个，就解压到子文件夹；如果只有一个，就直接解压到当前目录。
* [CloseTabOrLister](CloseTabOrLister.js)（关闭标签页）  
关闭当前标签页，如果只剩一个，就直接关闭窗口。（只作参考用途，更好的实现方式是勾选 配置/文件夹标签/选项 下的“关闭最后一个标签时同时关闭窗口”。）
* [DialogJumpToListerPath](DialogJumpToListerPath.ahk)（对话框跳转）  
在文件对话框的编辑框中按 Ctrl+E，跳转到 DOpus 最近激活的文件夹。如果 Ctrl+E 用不了，输入“//cur ”来触发。（需要 AutoHotkey v2）
* [EventWatchers](EventWatchers)（查看脚本事件）  
触发脚本事件时输出事件信息，有助于脚本开发。
* [ObjectViewers](ObjectViewers)（查看脚本对象）  
输出脚本对象信息，有助于脚本开发。
* [PasteInto](PasteInto.js)（粘贴进去）  
把文件粘贴进每个选中的文件夹。
* [SizeColByEverything](SizeColByEverything/README.zh-Hans.md)（Ev 尺寸列）  
为 DO 添加一个 Size 列，通过 Everything 获取文件和文件夹的大小。（只作参考用途，请使用 [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt) 的尺寸列替代。）

## 重命名脚本
见 [重命名脚本](Rename%20Scripts/README.zh-Hans.md)。

## 相关推荐
* [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)
* [laoqiuqiu/DOpus-Script](https://github.com/laoqiuqiu/DOpus-Script)