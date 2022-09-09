//EventWatchers.OnViewerEvent
//Author: Chaoses Ib
//Version: 210821
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnViewerEvent(viewerEventData){
    info = "OnViewerEvent: " + viewerEventData.event
    if (viewerEventData.viewer.current)
        info += ", " + viewerEventData.viewer.current.name
    
    if (viewerEventData.event == "load"){
        //info += ", " + viewerEventData.item.name  //the same as viewerEventData.viewer.current.name
        info += ", " + (viewerEventData.viewer.index + 1) + "/" + viewerEventData.viewer.files.count
    }
    else if (viewerEventData.event == "click" || viewerEventData.event == "dblclk" || viewerEventData.event == "mclick")
        info += ", (" + viewerEventData.x + ", " + viewerEventData.y + ", " + viewerEventData.w + ", " + viewerEventData.h + ")"
    
    DOpus.Output(info)
}