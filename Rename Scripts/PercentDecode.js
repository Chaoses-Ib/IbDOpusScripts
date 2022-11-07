// PercentDecode
// Description: Decode percent-encoding (URL encoding).
// Author: @Chaoses-Ib
// Version: 221107
// Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnGetCustomFields(getFieldData)
{
    getFieldData.fields.replaceAtWithPercentU = true
    getFieldData.field_labels('replaceAtWithPercentU') = DOpus.strings.Get('replaceAtWithPercentU')
}

function OnGetNewName(getNewNameData)
{
    var s = getNewNameData.newname_stem_m;

    if (getNewNameData.custom.replaceAtWithPercentU)
        s = s.replace(/@([0-9a-fA-F])/g, '%u$1');

    if (s.indexOf('%u') != -1)
        return unescape(s);
    else
        return decodeURIComponent(s);
}

==SCRIPT RESOURCES
<resources>
    <resource type="strings">
        <strings lang="english">
            <string id="replaceAtWithPercentU" text="Replace @hhhh with %uhhhh" />
        </strings>
        <strings lang="chs">
            <string id="replaceAtWithPercentU" text="替换 @hhhh 为 %uhhhh" />
        </strings>
    </resource>
</resources>