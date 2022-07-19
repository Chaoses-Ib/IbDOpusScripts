# IbDOpusScripts
Languages: [English](README.md), [简体中文](README.zh-Hans.md)  
Some scripts for [Directory Opus](https://www.gpsoft.com.au/) ([中文介绍](https://github.com/Chaoses-Ib/DirectoryOpus)).

## Buttons
- [Everything 搜索](EverythingSearch.zh-Hans.dcf)  
  通过 [Everything](https://www.voidtools.com/) 在当前文件夹下搜索文件。  
  ![](images/EverythingSearch.zh-Hans.png)

  默认热键 Ctrl+E。

## Scripts
- [AutoExtract](AutoExtract.js)  
Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
- [DialogJump](DialogJump.ahk)  
When in the editor of the file dialog, press Ctrl+G to jump to the last activated folder of listers. If Ctrl+G does not work, type "//cur " to trigger it. (Download the executable file from [Releases](../../releases) if you do not have [AutoHotkey v2](https://www.autohotkey.com/v2/))
- [Output](Output.ouc)  
Add Output command, which is able to output text to script log.  
e.g. `Output "sourcepath: {sourcepath}"`
- [PasteInto](PasteInto.js)  
Paste files into every selected folder.

### Develop
- [EventWatchers](EventWatchers)  
Output script event information when the event is triggered.
- [ObjectViewers](ObjectViewers)  
Output script object information.

### Others
- [CloseTabOrLister](CloseTabOrLister.js)  
If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. A better way to implement it is to turn on "Lister closes when last tab closes" under Preferences/Folder Tabs/Options.)
- [SizeColByEverything](SizeColByEverything/README.zh-Hans.md)  
Add a size column which retrieves sizes of files and folders from Everything. (This script is for reference only. Use [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)'s Size column instead.)

## Rename Scripts
- [PercentDecode](Rename%20Scripts/PercentDecode.js)  
  Decode percent-encoding (URL encoding). For example, `%E4%BD%A0%E5%A5%BD` can be decoded to `你好`.
- [EncodingConvert](Rename%20Scripts/EncodingConvert.js)  
  Mainly used to fix the character encoding of filenames. For example, you can fix the GBK-encoded `嬻偺嫬奅 椉媀幃` to Shift-JIS-encoded `空の境界 両儀式`.

  ![](Rename%20Scripts/images/EncodingConvert.zh-Hans.png)
- [中文数字转阿拉伯数字-WSQL](Rename%20Scripts/中文数字转阿拉伯数字-WSQL.vbs)  
  例如将 `一百二十三` 转换为 `123`。
- [阿拉伯数字转中文数字-WSQL](Rename%20Scripts/阿拉伯数字转中文数字-WSQL.vbs)  
  例如将 `123` 转换为 `一百二十三`。
- [阿拉伯数字转中文数字-无单位](Rename%20Scripts/阿拉伯数字转中文数字-无单位.js)  
  例如将 `123` 转换为 `一二三`。
- [中英混排加空格](Rename%20Scripts/中英混排加空格.js)  
  在汉字和英文单词之间添加空格，例如将 `你好world` 转换为 `你好 world`。

## See Also
- [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)
- [laoqiuqiu/DOpus-Script](https://github.com/laoqiuqiu/DOpus-Script)