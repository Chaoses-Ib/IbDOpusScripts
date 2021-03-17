//PercentDecode
//Description: Decode percent-encoding (URL encoding).
//Author: Chaoses Ib
//Version: 210317
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnGetNewName(getNewNameData)
{
    return decodeURIComponent(getNewNameData.newname_stem_m);
}