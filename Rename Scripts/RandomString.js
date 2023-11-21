// RandomString
// Description: Replace `{randomString}` in the new name to random strings.
// Author: @Chaoses-Ib
// Version: 231121
// Homepage: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnGetNewName(getNewNameData)
{
    return getNewNameData.newname_stem_m.
        replace(/\{randomString\}/g, function() {
            // 8 is the length of the random string
            return randomString62(8)
        })
        + getNewNameData.newname_ext_m
}

function randomString62(len){
    // Chars used to generate the random string
    var table = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    var str = ""
    for (i = 0; i < len; i++){
        str += table.charAt(randomInt(0, table.length - 1))
    }
    return str
}

function randomInt(min, max){
    return Math.round(min + Math.random() * (max - min))  // Not max-min+1
}