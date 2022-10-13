# IbDOpusScripts
Languages: [English](README.md), [简体中文](README.zh-Hans.md)  
Some scripts for [Directory Opus](https://www.gpsoft.com.au/) ([中文介绍](https://github.com/Chaoses-Ib/DirectoryOpus)).

## Buttons
- [AutoExtract](Buttons/AutoExtract.js)  
  Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
- [Everything 搜索](Buttons/EverythingSearch.zh-Hans.dcf)
  
  ![](Buttons/images/EverythingSearch.zh-Hans.png)  
  通过 [Everything](https://www.voidtools.com/) 在当前文件夹下搜索文件。

  在首次使用时需要先点击“设置 Everything 路径”进行初始化。默认热键 Ctrl+E。
- [控制面板-雨](Buttons/控制面板-雨.dcf)  
  ![](Buttons/images/控制面板-雨.png)

  作者：雨浪飘零
- [PasteInto](Buttons/PasteInto.dcf)

  ![](Buttons/images/PasteInto.png)  
  Paste files into every selected folder.

- [系统管理-雨](Buttons/系统管理-雨.dcf)  
  ![](Buttons/images/系统管理-雨.png)

  作者：雨浪飘零
- ~~[CloseTabOrLister](Buttons/CloseTabOrLister.js)~~  
  If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. A better way to implement it is to turn on "Lister closes when last tab closes" under `Preferences/Folder Tabs/Options`.)

## Commands
- [GetColumnValue](Commands/GetColumnValue.ouc)  
  Get the value of the specified column to `glob:$result`.

  For example:
  ```cmd
  // The syntax is the same as the "New name" in the Advanced Rename dialog
  GetColumnValue "* {md5sum}"
  Clipboard SET {$glob:$result}
  @set glob:$result
  ```
  Corresponding result:
  ```
  .gitignore 3b121da4db64aa59864e9ed46fa68d0a
  LICENSE.txt dda85d3253cbd75fd74cceb14c1d8b02
  ```
- [Output](Commands/Output.ouc)  
  Output text to script log.  
  
  e.g. `Output "sourcepath: {sourcepath}"`
- [ReplacePath](Commands/ReplacePath.ouc)  
  Replace the current path.

  Switch between the same folders under C drive and D drive:
  ```cmd
  @ifpath:C:\*
  ReplacePath C:\ TO D:\
  @ifpath:D:\*
  ReplacePath D:\ TO C:\
  ```

  Switch between `Program Files` and `Program Files (x86)`:
  ```cmd
  @ifpath:*\Program Files(\*|)
  ReplacePath "\Program Files" TO "\Program Files (x86)"
  @ifpath:*\Program Files '(x86')(\*|)
  ReplacePath "\Program Files (x86)" TO "\Program Files"
  ```
- [Sleep](Commands/Sleep.ouc)  
  Sleep for the specified milliseconds.
  
  e.g. `Sleep 3000`

## Scripts
- [DialogJump](Scripts/DialogJump.ahk)  
  When in the editor of the file dialog, press Ctrl+G to jump to the last activated folder of listers. If Ctrl+G does not work, type "//cur " to trigger it. (Download the executable file from [Releases](../../releases) if you do not have [AutoHotkey v2](https://www.autohotkey.com/v2/))
- [EventWatchers](Scripts/EventWatchers)  
  Output script event information when the event is triggered.
- [ObjectViewers](Scripts/ObjectViewers)  
  Output script object information.
- ~~[SizeColByEverything](Scripts/SizeColByEverything/README.zh-Hans.md)~~  
  Add a size column which retrieves sizes of files and folders from Everything. (This script is for reference only. Use [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)'s Size column instead.)

## Rename Scripts
- [PercentDecode](Rename%20Scripts/PercentDecode.js)  
  Decode percent-encoding (URL encoding). For example, `%E4%BD%A0%E5%A5%BD` can be decoded to `你好`.
- [EncodingConvert](Rename%20Scripts/EncodingConvert.js)  
  Mainly used to fix the character encoding of filenames. For example, you can fix the GBK-encoded `嬻偺嫬奅 椉媀幃` to Shift-JIS-encoded `空の境界 両儀式`.

  ![](Rename%20Scripts/images/EncodingConvert.zh-Hans.png)  
  Support UTF-8, GBK, Big5, Shift-JIS and EUC-KR encodings.
- [繁体中文转简体](Rename%20Scripts/繁体中文转简体.js)  
  例如将 `邊緣行者` 转换为 `边缘行者`。
- [简体中文转繁体](Rename%20Scripts/简体中文转繁体.js)  
  例如将 `边缘行者` 转换为 `邊緣行者`。
- [中文数字转阿拉伯数字-WSQL](Rename%20Scripts/中文数字转阿拉伯数字-WSQL.vbs)  
  例如将 `一百二十三` 转换为 `123`。支持大写数字。
- [阿拉伯数字转中文数字-WSQL](Rename%20Scripts/阿拉伯数字转中文数字-WSQL.vbs)  
  例如将 `123` 转换为 `一百二十三`。支持大写数字。
- [阿拉伯数字转中文数字-无单位](Rename%20Scripts/阿拉伯数字转中文数字-无单位.js)  
  例如将 `123` 转换为 `一二三`。支持大写数字。
- [中英混排加空格](Rename%20Scripts/中英混排加空格.js)  
  在汉字和英文单词之间添加空格，例如将 `你好world` 转换为 `你好 world`。

## See Also
- [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)
- [laoqiuqiu/DOpus-Script](https://github.com/laoqiuqiu/DOpus-Script)