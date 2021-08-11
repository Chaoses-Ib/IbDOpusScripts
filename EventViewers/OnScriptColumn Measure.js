//EventViewers.OnScriptColumn Measure
//Author: Chaoses Ib
//Version: 210811
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
    var vars = scriptColData.tab.vars
    if (!vars.Exists("Measure.count")){
        vars.Set("Measure.count", 0)
    }
    var count = vars.Get("Measure.count") + 1
    vars.Set("Measure.count", count)
    if (count == 1){
        var time = +new Date()
        vars.Set("Measure.timeBegin", time)
        DOpus.Output(time + ", first, " + scriptColData.item.name)
    }

    f(scriptColData)
    
    var time = +new Date()
    vars.Set("Measure.timeLast", time)
}

function OnActivateLister(activateListerData){
    if(activateListerData.active == false){
        var tab = activateListerData.lister.activetab
        var vars = tab.vars
        if(vars.Exists("Measure.count")){
            var count = vars.Get("Measure.count")
            if(count != 0){
                var timeLast = vars.Get("Measure.timeLast")
                duration = timeLast - vars.Get("Measure.timeBegin")
                DOpus.Output(timeLast + ", " + duration + "ms/" + count + " = " + (duration/count).toFixed(2) + "ms")

                vars.Set("Measure.count", 0)
            }
        }
    }
}