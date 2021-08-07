//EventViewers.OnScriptColumn Measure
//Author: Chaoses Ib
//Version: 210807
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnAddColumns(addColData){
    DOpus.Output("OnAddColumns")

    var col = addColData.AddColumn()
    col.name = "MyScriptColumn_Measure"
    col.method = "OnMyScriptColumn"
    col.label = "MyScriptColumn Measure"
    col.autogroup = true
}

function f(scriptColData){
    scriptColData.value =
        (scriptColData.item.is_dir ? "d" : "f")
        + (scriptColData.item.is_reparse ? "r" : "")
        + (scriptColData.item.is_symlink ? "s" : "")
        + (scriptColData.item.is_junction ? "j" : "")
}

function OnMyScriptColumn(scriptColData){
    vars = scriptColData.tab.vars
    if (!vars.Exists("Measure.count")){
        vars.Set("Measure.count", 0)
    }
    var count = vars.Get("Measure.count") + 1
    if (count == 1){
        vars.Set("Measure.total", scriptColData.tab.all.count)  //for the sake of performance
        time = +new Date()
        DOpus.Output(time + ", first, " + scriptColData.item.name)
        vars.Set("Measure.time", time)
    }

    f(scriptColData)
    
    var total = vars.Get("Measure.total")
    if (count >= total){
        time = +new Date()
        duration = time - vars.Get("Measure.time")
        DOpus.Output(time + ", last, "
            + duration + "ms/" + total + " = " + (duration/total).toFixed(2) + "ms, "
            + scriptColData.item.name)
        count = 0
    }
    vars.Set("Measure.count", count)
}