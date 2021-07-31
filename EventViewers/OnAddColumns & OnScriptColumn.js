//EventViewers.OnAddColumns & OnScriptColumn
//Author: Chaoses Ib
//Version: 210731
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnAddColumns(addColData){
    DOpus.Output("OnAddColumns")  //no output?

    var col = addColData.AddColumn()
    col.name = "MyScriptColumn"
    col.method = "OnMyScriptColumn"
    col.label = "MyScriptColumn.label"
    col.header = "MyScriptColumn.header"
    col.autogroup = true
}

function OnMyScriptColumn(scriptColData){
    DOpus.Output("OnMyScriptColumn: " + +new Date() + ", " + scriptColData.item.name)
    scriptColData.value =
        (scriptColData.item.is_dir ? "d" : "f")
        + (scriptColData.item.is_reparse ? "r" : "")
        + (scriptColData.item.is_symlink ? "s" : "")
        + (scriptColData.item.is_junction ? "j" : "")
}