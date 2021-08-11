//EventViewers.OnTabClick
//Author: Chaoses Ib
//Version: 210811
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnTabClick(tabClickData){
    DOpus.Output(tabClickData.tab.displayed_label + ", " + tabClickData.qualifiers)
}