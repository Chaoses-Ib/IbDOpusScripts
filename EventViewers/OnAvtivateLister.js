//EventViewers.OnActivateLister
//Author: Chaoses Ib
//Version: 210811
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

function OnActivateLister(activateListerData){
    DOpus.Output(activateListerData.lister.title + ", " + activateListerData.active + ", " + activateListerData.qualifiers)
}