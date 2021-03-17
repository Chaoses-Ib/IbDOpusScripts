; DialogJumpToListerPath
; Description: When in file dialog, focus on the edit control, and press Ctrl+E to jump to the last actived folder of listers. (AHK v2)
; Author: Chaoses Ib
; Version: 210310
; Git: https://github.com/Chaoses-Ib/IbDOpusScripts

#If WinActive("ahk_class #32770") ;File dialog

^e::
RunWait A_ProgramFiles . "\GPSoftware\Directory Opus\dopusrt.exe /info " . A_Temp . "\DOpus_pathlist.txt,paths"
paths := FileRead(A_Temp . "\DOpus_pathlist.txt")
RegExMatch(paths, '<path active_lister="1" [^>]* tab_state="1">([^<]*)' , Match)
if(!Match)
	return
Send "{Text}" . Match[1] . "`n"
return