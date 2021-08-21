//ObjectViewers.DOpus
//Author: Chaoses Ib
//Version: 210821
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnClick(clickData){
    DOpus.Output(
        "language: " + DOpus.language  // Same as the * in /home\Language\*.dll
        + "\nGetQualifiers(): " + DOpus.GetQualifiers()
        + "\nGetClipFormat(): " + DOpus.GetClipFormat()
        + "\nGetClip(): '''" + DOpus.GetClip() + "'''"
    )   
}