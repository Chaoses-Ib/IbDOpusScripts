function OnInit(scriptInitData) {
    scriptInitData.name = "TabColorizer";
    scriptInitData.desc = DOpus.strings.Get("description");
    scriptInitData.version = "0.1.1";
    scriptInitData.copyright = "Chaoses Ib";
    scriptInitData.url = "https://github.com/Chaoses-Ib/IbDOpusScripts";
    scriptInitData.default_enable = true;

    updateLabels(scriptInitData);
}

function updateLabels(scriptInitData) {
    var colorGroupsPath = DOpus.FSUtil.Resolve("/dopusdata\\ConfigFiles\\colorgroups.oxc");

    var doc = new ActiveXObject("Msxml2.DOMDocument.6.0");
    doc.async = false;
	doc.resolveExternals = false;
	doc.validateOnParse = false;
	doc.load(String(colorGroupsPath).replace(/\\/g, "/"));

    var colorgroups = doc.getElementsByTagName("colorgroups")[0];
    var groups = colorgroups.getElementsByTagName("groups")[0].childNodes;

    var labelNames = DOpus.Create().Vector(groups.length);
    var labelFgs = DOpus.Create().Vector(groups.length);
    var labelBgs = DOpus.Create().Vector(groups.length);
    var labelSelFgs = DOpus.Create().Vector(groups.length);
    var labelSelBgs = DOpus.Create().Vector(groups.length);
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        labelNames[i] = group.getAttribute("name");
        labelFgs[i] = group.getAttribute("fg");
        labelBgs[i] = group.getAttribute("bg");
        labelSelFgs[i] = group.getAttribute("sel_fg");
        labelSelBgs[i] = group.getAttribute("sel_bg");
        //DOpus.Output("Added label: " + labelNames[i]);
    }
    
    scriptInitData.Vars.Set("labelNames", labelNames);
    scriptInitData.Vars.Set("labelFgs", labelFgs);
    scriptInitData.Vars.Set("labelBgs", labelBgs);
    scriptInitData.Vars.Set("labelSelFgs", labelSelFgs);
    scriptInitData.Vars.Set("labelSelBgs", labelSelBgs);
}

function colorizeTab(tab, newTab) {
    var item = DOpus.FSUtil.GetItem(tab.path);
    var itemLabels = item.Labels();
    if (itemLabels.length == 0) {
        if (!newTab) {
            // Tab.color is read-only
            var cmd = DOpus.Create().Command();
            cmd.SetSourceTab(tab);
            cmd.RunCommand("Go TABCOLOR=reset");
        }
        return;
    }

    var labelNames = Script.Vars.Get("labelNames");
    var labelFgs = Script.Vars.Get("labelFgs");
    var labelBgs = Script.Vars.Get("labelBgs");
    var labelSelFgs = Script.Vars.Get("labelSelFgs");
    var labelSelBgs = Script.Vars.Get("labelSelBgs");
    //DOpus.Output(labelNames.length);

    for (var i = 0; i < itemLabels.length; i++) {
        var label = itemLabels[i];
        for (var i = 0; i < labelNames.length; i++) {
            if (labelNames(i) == label) {
                var color = chooseColor(labelFgs(i), labelBgs(i), labelSelFgs(i), labelSelBgs(i));
                if (color != "none") {
                    // Tab.color is read-only
                    var cmd = DOpus.Create().Command();
                    cmd.SetSourceTab(tab);
                    cmd.RunCommand("Go TABCOLOR " + labelFgs(i));
                    return;
                }
                break;
            }
        }
    }
}

function chooseColor(fg, bg, selFg, selBg) {
    if (fg != "none")
        return fg;
    else if (bg != "none")
        return bg;
    else if (selFg != "none")
        return selFg;
    else if (selBg != "none")
        return selBg;
    else
        return "none";
}

function OnOpenTab(openTabData) {
    if (openTabData.tab.path != "") {
        colorizeTab(openTabData.tab, true);
    }
}

function OnAfterFolderChange(afterFolderChangeData) {
    if (afterFolderChangeData.result) {
        colorizeTab(afterFolderChangeData.tab, false);
    }
}

==SCRIPT RESOURCES
<resources>
    <resource type="strings">
        <strings lang="english">
            <string id="description" text="Colorize the folder tab with the color of its label." />
        </strings>
        <strings lang="chs">
            <string id="description" text="使用文件夹标记的颜色对文件夹标签进行染色。" />
        </strings>
    </resource>
</resources>