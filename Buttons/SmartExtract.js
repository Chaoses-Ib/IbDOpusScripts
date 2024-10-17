@script jscript
// SmartExtract
// Description: Extract selected archive to subfolder if there's more than one file under the root path, otherwise (only one file) extract it directly.
// Version: v0.3.1
// Author: @Chaoses-Ib, @Sanhuaitang
// Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

// Select extracted file/directory after extraction. Enabled by default, change to `false` to disable.
// 选中解压出的文件/目录。默认启用，改为 false 禁用
var selectExtractedFiles = true;

function OnClick(clickData)
{
    var tab = clickData.func.sourcetab;
    var fsutil = DOpus.FSUtil;
    var cmd = clickData.func.command;
    var eSel = new Enumerator(tab.selected);
    if (selectExtractedFiles) {
        cmd.RunCommand("Select NONE");
    }
    for (; !eSel.atEnd(); eSel.moveNext())
    {
        var item = eSel.item();

        // There's no count field
        var count = 0;
        var firstName;
        for(var zipEnum = fsutil.ReadDir(item.RealPath); !zipEnum.complete;) {
            var zipItem = zipEnum.Next;
            if (count == 0) {
                firstName = zipItem.name;
            }
            if (++count >= 2)
                break;
        }
        // DOpus.Output(count);
        if (count == 0) {
            continue;
        }

        cmd.ClearFiles();
        cmd.AddFile(eSel.item());

        var c;
        var name;
        if (count < 2) {
            c = "Copy EXTRACT HERE";
            name = firstName;
        }
        else {
            c = "Copy EXTRACT=sub HERE";
            name = item.name_stem;
        }
        // DOpus.Output(name);

        if (selectExtractedFiles) {
            // c += " AUTOSELECT=yes";
            // Doesn't work

            cmd.AddLine(c);
            cmd.AddLine("Select EXACT \"" + name + "\"");
            cmd.Run();
            cmd.Clear();
        } else {
            cmd.RunCommand(c);
        }
    }
}