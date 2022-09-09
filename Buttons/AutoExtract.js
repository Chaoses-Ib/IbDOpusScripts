@script jscript
//AutoExtract
//Description: Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
//Author: Chaoses Ib
//Version: 210310
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts
function OnClick(clickData)
{
    var tab = clickData.func.sourcetab;
    var fsutil = DOpus.FSUtil;
    var cmd = clickData.func.command;
    for (var eSel = new Enumerator(tab.selected); !eSel.atEnd(); eSel.moveNext())
    {
        var zipEnum = fsutil.ReadDir(eSel.item().RealPath);

        //There's no count field
        var count = 0;
        for(; !zipEnum.complete; zipEnum.Next)
            count++;
        //DOpus.Output(count);

        if(count < 2)
            cmd.RunCommand("Copy EXTRACT HERE");
        else
            cmd.RunCommand("Copy EXTRACT=sub HERE");
    }
    return;
}