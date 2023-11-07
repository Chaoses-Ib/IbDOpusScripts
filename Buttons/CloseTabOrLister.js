//CloseTabOrLister
//Description: If there's only one tab, close the lister, otherwise close current tab. (This script is for reference only. Starting with DOpus v12.2.6, one can implement this feature by turning on "Lister closes when last tab closes" under `Preferences/Folder Tabs/Options`.)
//Author: Chaoses Ib
//Version: 231107
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