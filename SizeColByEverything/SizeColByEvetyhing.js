//SizeColByEvetyhing
//Description: Add a size column which retrieves sizes of files and folders from Everything. (This script is for reference only. Use [IbDOpusExt](https://github.com/Chaoses-Ib/IbDOpusExt)'s Size column instead.)
//Author: Chaoses Ib
//Version: 210807
//Git: https://github.com/Chaoses-Ib/IbDOpusScripts

var cacheQuery = "";
var cacheMap = DOpus.Create().Map();

var path = "C:\\Program Files\\Everything\\IPC\\Everything64.dll"
var DWX = new ActiveXObject("DynamicWrapperX");
DWX.Register(path, "Everything_SetSearchW", "i=w");
DWX.Register(path, "Everything_SetRequestFlags", "i=u");
DWX.Register(path, "Everything_QueryW", "i=l", "r=l");
DWX.Register(path, "Everything_GetNumResults", "r=u");
DWX.Register(path, "Everything_GetResultSize", "i=up", "r=l");
DWX.Register(path, "Everything_GetResultFileNameW", "i=u", "r=w");
//DWX.Register(path, "Everything_SetSort", "i=u");
//DWX.Register(path, "Everything_GetLastError", "r=u");

function OnInit(initData)
{
	initData.name = "SizeColFromEverything";
	initData.version = "1.0";
	initData.copyright = "混沌 Ib";
	initData.desc = "";
	initData.default_enable = true;
	initData.min_version = "12.0";
	
	var col = initData.AddColumn();
	col.name = "Size_ev";
	col.method = "OnSize_ev";
	col.label = "Size (ev)";
	col.justify = "left";
	col.autogroup = true;
	col.type = "size";
}

function OnSize_ev(scriptColData)
{
	var tabPath = String(scriptColData.tab.path);
	if(cacheQuery != tabPath) evQuery(tabPath);
	if(cacheMap.exists(scriptColData.item.name))
		scriptColData.value = cacheMap(scriptColData.item.name);
}

function evQuery(tabPath){
		DOpus.Output("Init");
	cacheMap.clear(); //最短存活
	DWX.Everything_SetSearchW('infolder:"' + tabPath +'"');
		//DOpus.Output('infolder:"' + tabPath +'"')
	DWX.Everything_SetRequestFlags(1+16);
	if(!DWX.Everything_QueryW(1)) return;
	
	var num = DWX.Everything_GetNumResults();
		//DOpus.Output(DWX.Everything_GetLastError() + ", " + num);
	var size_addr = DWX.MemAlloc(16); //最短存活
	for(var i=0; i<num; i++){
		var name = DWX.Everything_GetResultFileNameW(i);
		DWX.Everything_GetResultSize(i, size_addr);
		cacheMap(name) = DWX.NumGet(size_addr, 0, "q");
	}
	DWX.MemFree(size_addr);
	cacheQuery = tabPath;
}