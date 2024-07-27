// OpenFolderAndSelectItemsEx
// Description: Given a file path, open its parent folder (or Git root) and show the file in VS Code.
// Version: 240727
// Author: @Chaoses-Ib
// Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

var path = WScript.Arguments(0);

dir = fs.GetParentFolderName(path);

var shell = new ActiveXObject("WScript.Shell");
shell.CurrentDirectory = dir;
var exec = shell.Exec("git rev-parse --show-toplevel");
WScript.Echo(exec.Status);
WScript.Echo(exec.ExitCode);
var gitRoot = exec.StdOut.ReadLine();
WScript.Echo(gitRoot);
WScript.Echo(exec.Status);
WScript.Echo(exec.ExitCode);

var gitDir;
var exec = shell.Exec("cmd /c cd /d " + dir + " && git rev-parse --show-toplevel 2>nul");
while (!exec.StdOut.AtEndOfStream) {
    gitDir = exec.StdOut.ReadLine();
    if (gitDir) break;
}

// 如果 Git 目录未找到，则使用参数文件的父目录
if (!gitDir) {
    gitDir = dir;
}

// 打开目录使用 VSCode
if (fs.FolderExists(gitDir)) {
    shell.Run("code \"" + gitDir + "\"", 0);
} else {
    WScript.Echo("目录不存在：" + gitDir);
    WScript.Quit(1);
}
