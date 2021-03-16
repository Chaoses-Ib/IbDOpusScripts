//PasteInto
//Description: Paste files into every selected folder.
//Author: Chaoses Ib
//Version: 210316
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnClick(clickData)
{
	var cmd = clickData.func.command
	cmd.deselect = false
	
	var dirs = clickData.func.sourcetab.selected_dirs
	if (dirs.count == 0) {
		DOpus.Output("No item selected")
		return
	}
	for (var e = new Enumerator(dirs); !e.atEnd(); e.moveNext()) {
		//DOpus.Output(e.item().realpath)
		cmd.SetSource(e.item().realpath)  //Not Dest
		cmd.RunCommand("Clipboard PASTE")
	}
}