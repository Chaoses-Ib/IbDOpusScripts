//EventWatchers.OnActivateTab
//Author: Chaoses Ib
//Version: 210821
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnActivateTab(activateTabData){
    DOpus.Output(activateTabData.oldtab.displayed_label + " -> " + activateTabData.newtab.displayed_label + ", " + activateTabData.qualifiers)
}