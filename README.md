# IbDOpusScripts
Languages: [English](README.md), [简体中文](README.zh-Hans.md)  
Some scripts for [Directory Opus](https://www.gpsoft.com.au/).

## Scripts
* [AutoExtract](AutoExtract.js)  
Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
* [CloseTabOrLister](CloseTabOrLister.js)  
If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. A better way to implement it is to turn on "Lister closes when last tab closes" under Preferences/Folder Tabs/Options.)
* [DialogJumpToListerPath](DialogJumpToListerPath.ahk)  
When in file dialog, focus on the editor, and press Ctrl+E to jump to the last actived folder of listers. If Ctrl+E not work, type "//cur " to trigger it. (Need AutoHotkey v2)
* [EventViewers](EventViewers)  
Output script event information. Useful for developing scripts.
* [PasteInto](PasteInto.js)  
Paste files into every selected folder.
* [SizeColByEverything](SizeColByEverything/README.zh-Hans.md)  
Add a size column which retrieves sizes of files and folders from Everything. (This script is for reference only. Use [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)'s Size column instead.)

## Rename Scripts
See [Rename Scripts](Rename%20Scripts/README.md).

## See Also
* [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)
* [laoqiuqiu/DOpus-Script](https://github.com/laoqiuqiu/DOpus-Script)