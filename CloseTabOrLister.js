//CloseTabOrLister
//Description: If there's only one tab, close the lister, otherwise close current tab.
//Author: Chaoses Ib
//Version: 210310
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