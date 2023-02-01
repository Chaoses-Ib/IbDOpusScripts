function OnInit(scriptInitData)
{
    scriptInitData.name = "SmartThumbnailSize";
    scriptInitData.desc = DOpus.strings.Get('description');
    scriptInitData.version = "0.1";
    scriptInitData.copyright = "Chaoses Ib";
    scriptInitData.url = "https://github.com/Chaoses-Ib/IbDOpusScripts";
    scriptInitData.default_enable = true;

    var config_desc = DOpus.Create().Map();
    scriptInitData.config.DefaultThumbnailSize = 256;
    config_desc("DefaultThumbnailSize") = "Default thumbnail size";
    scriptInitData.config_desc = config_desc;

    var cmd = scriptInitData.AddCommand();
    cmd.name = "SmartThumbnailSize";
    cmd.desc = DOpus.strings.Get('description');
    cmd.method = "OnSmartThumbnailSize";
    cmd.template = "SIZE/N";
}

function adjustThumbnailSize(tab, size) {
    var files = tab.files;
    var width, height;
    for (var e = new Enumerator(files); !e.atEnd(); e.moveNext()) {
        var file = e.item();
        if (file.metadata == "image" || file.metadata == "video") {
            width = file.metadata.image.picwidth;
            height = file.metadata.image.picheight;
            break;
        }
    }
    if (!e.atEnd()) {
        var cmd = DOpus.Create().Command();
        cmd.SetSourceTab(tab);
        if (width > height) {
            height = Math.round(height * size / width);
            width = size;
        } else {
            width = Math.round(width * size / height);
            height = size;
        }
        cmd.RunCommand("Show THUMBNAILSIZE source," + width + "," + height);
    }
}

function OnSmartThumbnailSize(scriptCommandData) {
    adjustThumbnailSize(
        scriptCommandData.func.sourcetab,
        scriptCommandData.func.argsmap.exists("SIZE") ? scriptCommandData.func.argsmap("SIZE") : Script.config.DefaultThumbnailSize
    );
}

function OnDisplayModeChange(displayModeChangeData) {
    if (displayModeChangeData.mode == "thumbnails") {
        adjustThumbnailSize(displayModeChangeData.tab, Script.config.DefaultThumbnailSize);
    }
}

function OnAfterFolderChange(afterFolderChangeData) {
    if (afterFolderChangeData.result) {
        adjustThumbnailSize(afterFolderChangeData.tab, Script.config.DefaultThumbnailSize);
    }
}

==SCRIPT RESOURCES
<resources>
    <resource type="strings">
        <strings lang="english">
            <string id="description" text="Automatically adjust the thumbnail ratio according to the images in the folder." />
        </strings>
        <strings lang="chs">
            <string id="description" text="根据文件夹中的图片自动调整缩略图比例。" />
        </strings>
    </resource>
</resources>