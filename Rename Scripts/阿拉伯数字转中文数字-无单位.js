// 阿拉伯数字转中文数字-无单位
// 作者：@Chaoses-Ib
// 版本：220626
// 仓库：https://github.com/Chaoses-Ib/IbDOpusScripts

// 从命令进行调用：
// Rename PRESET="阿拉伯数字转中文数字-无单位" SCRIPTARG upperCase:false

function OnGetCustomFields(getFieldData)
{
    getFieldData.fields.onlyFirstNumber = true
    getFieldData.field_labels('onlyFirstNumber') = '只转换第一段数字'

    getFieldData.fields.upperCase = false
    getFieldData.field_labels('upperCase') = '大写中文数字'
}

function OnGetNewName(getNewNameData)
{
    var regex = getNewNameData.custom.onlyFirstNumber ? /[0-9]+/ : /[0-9]+/g
    var numTable = getNewNameData.custom.upperCase ? '零壹贰叁肆伍陆柒捌玖' : '零一二三四五六七八九'

    return getNewNameData.newname_stem_m.replace(regex, function(number){
        return number.replace(/[0-9]/g, function(digit){ return numTable[digit] })
    }) + getNewNameData.newname_ext_m
}