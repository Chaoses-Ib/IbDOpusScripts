// EncodingConvert
// Authors: @Chaoses-Ib, @laoqiuqiu
// Version: 220619
// Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

var encodings = ['utf-8', 'gbk', 'big5', 'shift-jis', 'euc-kr'];

function OnGetNewName(getNewNameData)
{
    return encodingConvert(encodings[getNewNameData.custom.srcEncoding], encodings[getNewNameData.custom.dstEncoding], getNewNameData.newname);
}

function OnGetCustomFields(getFieldData)
{
    // Default: gbk, shift-jis
    srcCombo = DOpus.Create.Vector(1, DOpus.strings.Get('utf-8'), DOpus.strings.Get('gbk'), DOpus.strings.Get('big5'), DOpus.strings.Get('shift-jis'), DOpus.strings.Get('euc-kr'));
    getFieldData.fields.srcEncoding = srcCombo;
    getFieldData.field_labels('srcEncoding') = DOpus.strings.Get('srcEncoding');
    
    dstCombo = DOpus.Create().Vector(srcCombo);
    dstCombo(0) = 3;
    getFieldData.fields.dstEncoding = dstCombo;
    getFieldData.field_labels('dstEncoding') = DOpus.strings.Get('dstEncoding');
}

function encodingConvert(srcEncoding, dstEncoding, string) {
    // Encodings: https://docs.microsoft.com/en-us/previous-versions/exchange-server/exchange-10/ms526296(v=exchg.10)

    var stream = new ActiveXObject('Adodb.Stream');
    stream.Open();
    stream.Charset = srcEncoding;
    stream.WriteText(string);
    stream.Position = 0;
    stream.Charset = dstEncoding;
    var result = stream.ReadText();
    stream.Close();
    return result;
}

==SCRIPT RESOURCES
<resources>
    <resource type="strings">
        <strings lang="english">
            <string id="srcEncoding" text="Source encoding" />
            <string id="dstEncoding" text="Destination encoding" />
            <string id="utf-8" text="UTF-8" />
            <string id="gbk" text="GBK (Simplified Chinese)" />
            <string id="big5" text="Big5 (Traditional Chinese)" />
            <string id="shift-jis" text="Shift-JIS (Japanese)" />
            <string id="euc-kr" text="EUC-KR (Korean)" />
        </strings>
        <strings lang="chs">
            <string id="srcEncoding" text="源编码" />
            <string id="dstEncoding" text="目标编码" />
            <string id="utf-8" text="UTF-8" />
            <string id="gbk" text="GBK（简体中文）" />
            <string id="big5" text="Big5（繁体中文）" />
            <string id="shift-jis" text="Shift-JIS（日语）" />
            <string id="euc-kr" text="EUC-KR（韩语）" />
        </strings>
    </resource>
</resources>