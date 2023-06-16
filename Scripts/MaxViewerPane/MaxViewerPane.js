function OnInit(scriptInitData)
{
    scriptInitData.name = "MaxViewerPane";
    scriptInitData.desc = DOpus.strings.Get('description');
    scriptInitData.version = "0.2";
    scriptInitData.copyright = "Chaoses Ib";
    scriptInitData.url = "https://github.com/Chaoses-Ib/IbDOpusScripts";
    scriptInitData.default_enable = true;

    var config_desc = DOpus.Create().Map();

    var exePath = DOpus.FSUtil.NewPath(scriptInitData.file);
    exePath.Parent();
    exePath.Add("MaxViewerPane");
    exePath.Add("MaxViewerPane.exe");
    scriptInitData.config.ExePath = String(exePath);
    config_desc("ExePath") = DOpus.strings.Get('exePath');

    scriptInitData.config_desc = config_desc;

    var cmd = scriptInitData.AddCommand();
    cmd.name = "MaxViewerPane";
    cmd.desc = DOpus.strings.Get('description');
    cmd.method = "OnMaxViewerPane";
}

function OnMaxViewerPane(scriptCommandData) {
    var lister = scriptCommandData.func.sourcetab.lister;
    var cmd = scriptCommandData.func.command;
    cmd.AddLine("@runmode:hide");
    cmd.AddLine(Script.config.ExePath
        + ' "' + lister.title
        + '" ' + lister.left
        + ' ' + lister.top
        + ' ' + lister.right
        + ' ' + lister.bottom
        );
    cmd.Run();
}

==SCRIPT RESOURCES
<resources>
    <resource type="strings">
        <strings lang="english">
            <string id="description" text="Maximize the viewer pane." />
            <string id="exePath" text="The path to MaxViewerPane.exe (You can download it from https://github.com/Chaoses-Ib/IbDOpusScripts/releases)" />
        </strings>
        <strings lang="chs">
            <string id="description" text="最大化查看器窗格。" />
            <string id="exePath" text="MaxViewerPane.exe 的路径（可从 https://github.com/Chaoses-Ib/IbDOpusScripts/releases 下载）" />
        </strings>
    </resource>
</resources>