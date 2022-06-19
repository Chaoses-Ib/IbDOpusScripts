# IbDOpusScripts
Languages: [English](README.md), [简体中文](README.zh-Hans.md)  
Some scripts for [Directory Opus](https://www.gpsoft.com.au/) ([中文介绍](https://github.com/Chaoses-Ib/DirectoryOpus)).

## Scripts
* [AutoExtract](AutoExtract.js)  
Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
* [DialogJump](DialogJump.ahk)  
When in the editor of the file dialog, press Ctrl+G to jump to the last activated folder of listers. If Ctrl+G does not work, type "//cur " to trigger it. (Download the executable file from [Releases](../../releases) if you do not have [AutoHotkey v2](https://www.autohotkey.com/v2/))
* [Output](Output.ouc)  
Add Output command, which is able to output text to script log.  
e.g. `Output "sourcepath: {sourcepath}"`
* [PasteInto](PasteInto.js)  
Paste files into every selected folder.

### Develop
* [EventWatchers](EventWatchers)  
Output script event information when the event is triggered.
* [ObjectViewers](ObjectViewers)  
Output script object information.

### Others
* [CloseTabOrLister](CloseTabOrLister.js)  
If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. A better way to implement it is to turn on "Lister closes when last tab closes" under Preferences/Folder Tabs/Options.)
* [SizeColByEverything](SizeColByEverything/README.zh-Hans.md)  
Add a size column which retrieves sizes of files and folders from Everything. (This script is for reference only. Use [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)'s Size column instead.)

## Rename Scripts
* [PercentDecode](Rename%20Scripts/PercentDecode.js)  
  Decode percent-encoding (URL encoding).
* [EncodingConvert](Rename%20Scripts/EncodingConvert.js)
* [中英混排加空格](Rename%20Scripts/中英混排加空格.js)  
  在汉字和英文单词间添加空格。

## See Also
* [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)
* [laoqiuqiu/DOpus-Script](https://github.com/laoqiuqiu/DOpus-Script)