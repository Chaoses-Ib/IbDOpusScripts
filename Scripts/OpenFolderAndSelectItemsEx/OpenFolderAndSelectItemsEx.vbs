' OpenFolderAndSelectItemsEx
' Description: Given a file path, open its parent folder (or Git root) and show the file in VS Code.
' Version: 240727
' Author: @Chaoses-Ib
' Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

Set WshShell = CreateObject("WScript.Shell")
strVbsPath = WScript.ScriptFullName
strVbsDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(strVbsPath)
strBatFile = strVbsDir & "\OpenFolderAndSelectItemsEx.bat"

WshShell.Run chr(34) & strBatFile & chr(34) & " " & chr(34) & WScript.Arguments(0) & chr(34), 0

Set WshShell = Nothing
