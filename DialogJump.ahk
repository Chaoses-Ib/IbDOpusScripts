; DialogJump
; Description: When in the editor of the file dialog, press Ctrl+G to jump to the last activated folder of listers. If Ctrl+G does not work, type "//cur " to trigger it. (AHK v2)
; Author: Chaoses Ib
; Version: 220519.2
; Git: https://github.com/Chaoses-Ib/IbDOpusScripts

dopusrt := GetDOpusRT()

DOpus_SendPath(){
    global dopusrt
    if (dopusrt == "")
        dopusrt := GetDOpusRT()

    if (A_IsAdmin) {
        ; running DOpusRT as elevated can't get the result
        FileDelete(A_Temp "\DOpus_pathlist.txt")
        RunAsUnelevated(dopusrt, "/info " A_Temp "\DOpus_pathlist.txt,paths")
        while !FileExist(A_Temp "\DOpus_pathlist.txt") {
            Sleep(20)
        }
    } else {
        RunWait dopusrt " /info " A_Temp "\DOpus_pathlist.txt,paths"
    }
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
^g::DOpus_SendPath()
#HotIf

#Hotstring EndChars `n `t
:OX://cur::DOpus_SendPath()

GetDOpusRT(){
    try
        return StrReplace(WinGetProcessPath("ahk_exe dopus.exe"), "dopus.exe", "dopusrt.exe")
    catch TargetError
        ; WinGetProcessPath requires the target to have a window
        return ""
    
    ;return A_ProgramFiles . "\GPSoftware\Directory Opus\dopusrt.exe"
}

; From Bluesmaster, https://www.autohotkey.com/board/topic/72812-run-as-standard-limited-user/?p=670991
RunAsUnelevated(prms*){
    ComObject("Shell.Application").Windows.FindWindowSW(0, 0, 8, 0, 1 ).Document.Application.ShellExecute(prms*)
}