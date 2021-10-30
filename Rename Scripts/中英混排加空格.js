// 中英混排加空格
// 在汉字和英文单词间添加空格
// 作者：混沌 Ib
// 版本：211030
// 仓库：https://github.com/Chaoses-Ib/IbDOpusScripts

function OnGetNewName(getNewNameData)
{
    var name = getNewNameData.newname_stem_m
    
    var dict = [ '[a-z\\-0-9]{2}', 'C\\+\\+', '[CF]#' ]
    for (var i = 0; i < dict.length; i++) {
        name = name.replace(new RegExp('([〇㐀-鿭-礼])(' + dict[i] + ')', 'ig'), '$1 $2')
        name = name.replace(new RegExp(dict[i] + '(?=[〇㐀-鿭-礼])', 'ig'), '$& ')
    }
    
    return name + getNewNameData.newname_ext_m
}