function OnInit(scriptInitData)
{
    scriptInitData.name = "SmartThumbnailSize";
    scriptInitData.desc = DOpus.strings.Get('description');
    scriptInitData.version = "0.2";
    scriptInitData.copyright = "Chaoses Ib";
    scriptInitData.url = "https://github.com/Chaoses-Ib/IbDOpusScripts";
    scriptInitData.default_enable = true;

    var config_desc = DOpus.Create().Map();
    scriptInitData.config.DefaultThumbnailSize = 256;
    config_desc("DefaultThumbnailSize") = DOpus.strings.Get('defaultThumbnailSize');
    scriptInitData.config.NumberOfImagesToDetect = 3;
    config_desc("NumberOfImagesToDetect") = DOpus.strings.Get('numberOfImagesToDetect');
    scriptInitData.config_desc = config_desc;

    var cmd = scriptInitData.AddCommand();
    cmd.name = "SmartThumbnailSize";
    cmd.desc = DOpus.strings.Get('description');
    cmd.method = "OnSmartThumbnailSize";
    cmd.template = "SIZE/N";
}

function adjustThumbnailSize(tab, size) {
    if (tab.format.view == "thumbnails") {
        var files = tab.files;

        // Get the median area and the correspoding width and height
        var images = [];
        for (var e = new Enumerator(files); !e.atEnd(); e.moveNext()) {
            var file = e.item();
            if (file.metadata == "image" || file.metadata == "video") {
                images.push(file.metadata.image);
                if (images.length >= Script.config.NumberOfImagesToDetect)
                    break;
            }
        }

        var width = 1, height = 1;
        if (images.length > 0) {
            images.sort(function (a, b) {
                return a.picwidth * a.picheight - b.picwidth * b.picheight;
            });
            median = images[Math.floor(images.length / 2)];
            width = median.picwidth;
            height = median.picheight;
        }

        // Set the thumbnail size
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
            <string id="defaultThumbnailSize" text="Default thumbnail size" />
            <string id="numberOfImagesToDetect" text="Determine the thumbnail size by detecting how many image files" />
        </strings>
        <strings lang="chs">
            <string id="description" text="根据文件夹中的图片自动调整缩略图比例。" />
            <string id="defaultThumbnailSize" text="默认缩略图尺寸" />
            <string id="numberOfImagesToDetect" text="通过检测多少个图片文件来决定缩略图尺寸" />
        </strings>
    </resource>
</resources>