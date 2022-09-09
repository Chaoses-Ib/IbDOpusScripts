//CloseTabOrLister
//Description: If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. A better way to implement it is to turn on "Lister closes when last tab closes" under Preferences/Folder Tabs/Options.)
//Author: Chaoses Ib
//Version: 210729
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnClick(clickData)
{
    var cmd = clickData.func.command;
    var tab = clickData.func.sourcetab;
    if(tab.lister.tabs.count == 1)
        cmd.RunCommand("Close")
    else
        cmd.RunCommand("Go TABCLOSE")
}