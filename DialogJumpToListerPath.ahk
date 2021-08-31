; DialogJumpToListerPath
; Description: When in file dialog, focus on the editor, and press Ctrl+E to jump to the last actived folder of listers. If Ctrl+E not work, type "//cur " to trigger it. (AHK v2)
; Author: Chaoses Ib
; Version: 210831
; Git: https://github.com/Chaoses-Ib/IbDOpusScripts

dopusrt := StrReplace(WinGetProcessPath("ahk_exe dopus.exe"), "dopus.exe", "dopusrt.exe")  ;WinGetProcessPath requires the target to have a window
;A_ProgramFiles . "\GPSoftware\Directory Opus\dopusrt.exe"

DOpus_SendPath(){
	global dopusrt
	RunWait dopusrt " /info " A_Temp "\DOpus_pathlist.txt,paths"
	paths := FileRead(A_Temp "\DOpus_pathlist.txt")
	RegExMatch(paths, '<path active_lister="1" [^>]* tab_state="1">([^<]*)' , &Match)
	if(!Match)
		return
	
	clipboard := ClipboardAll()
	A_Clipboard := Match[1]
	Send "+{Insert}`n"  ;or ^v
	Sleep 200
	A_Clipboard := clipboard
	clipboard := ""
	
	;Send "{Text}" Match[1] "`n"
	;incompatible with some input methods (Sogou Pinyin)
}

#HotIf WinActive("ahk_class #32770")  ;File dialog
^e::DOpus_SendPath()
#HotIf

#Hotstring EndChars `n `t
:OX://cur::DOpus_SendPath()