function OnInit(initData) {
    initData.name = 'ClipEdit';
    initData.version = '2023-06-14';
    initData.url = 'https://resource.dopus.com/t/clipedit-modify-the-clipboard/44636';
    initData.desc = 'Modify the clipboard';
    initData.default_enable = true;
    initData.min_version = '12.0';
}

function OnAddCommands(addCmdData) {
    var cmd = addCmdData.AddCommand();
    cmd.name = 'ClipEdit';
    cmd.method = 'OnClipEdit';
    cmd.template = '' +
        'alias/s,' +
        'aliasexpand/s,' +
        'envvar/s,' +
        'envvarexpand/s,' +
        'generic/s,' +
        'isodate/s,' +
        'nolog/s';
    cmd.hide = false;
    cmd.icon = 'script';
}

function OnClipEdit(scriptCmdData) {
    var cmd = scriptCmdData.func.command;
    var args = scriptCmdData.func.args;
    var fsu = DOpus.FSUtil();
    var wld = fsu.NewWild();

    cmd.deselect = false;

    if (DOpus.GetClipFormat() != 'text') return;

    var tmp = DOpus.GetClip();
    var vec = DOpus.Create().Vector();

    if (false);
    else if (args.alias) EditAlias();
    else if (args.aliasexpand) EditAliasExpand();
    else if (args.envvar) EditEnvvar();
    else if (args.envvarexpand) EditEnvvarExpand();
    else if (args.generic) EditGeneric();
    else if (args.isodate) EditIsodate();

    Log(tmp);
    DOpus.SetClip(tmp);

    // ====

    function EditAlias() {
        for (var e = new Enumerator(DOpus.aliases); !e.atEnd(); e.moveNext()) {
            var item = e.item();

			DOpus.Output(item);
            if (item.path.drive == 0) continue; // we skip /trash etc.
            if (String(item) == 'altstartup') continue;
            if (String(item) == 'commonaltstartup') continue;
            if (String(item) == 'commonfavorites') continue;
            if (String(item) == 'commonprogramfiles') continue;
            if (String(item) == 'commonprogramfilesx86') continue;
            if (String(item) == 'desktopdir') continue;
            if (String(item) == 'hostdocuments') continue;
            if (String(item) == 'hostmusic') continue;
            if (String(item) == 'hostpictures') continue;
            if (String(item) == 'hostvideos') continue;
            if (String(item) == 'skydrive') continue;
            vec.push_back(item);
        }

        BubbleSort('/'); // bubble sort aliases by *path* length to achieve maximum replacement

        for (var e = new Enumerator(vec); !e.atEnd(); e.moveNext()) {
            var item = e.item();
            var re = new RegExp(wld.EscapeString(item.path, 'r'), 'gmi');
            var al = '/' + item;
            tmp = tmp.replace(re, al);
        }
    }

    function EditEnvvar() {
        vec.push_back('%allusersprofile%');
        vec.push_back('%appdata%');
        vec.push_back('%commonprogramfiles%');
        vec.push_back('%commonprogramfiles(x86)%');
        vec.push_back('%comspec%');
        vec.push_back('%driverdata%');
        vec.push_back('%localappdata%');
        vec.push_back('%onedrive%');
        // vec.push_back('%onedriveconsumer%');
        vec.push_back('%programdata%');
        vec.push_back('%programfiles%');
        vec.push_back('%programfiles(x86)%');
        // vec.push_back('%programw6432%');
        vec.push_back('%public%');
        vec.push_back('%systemroot%');
        vec.push_back('%temp%');
        // vec.push_back('%tmp%');
        vec.push_back('%userprofile%');
        vec.push_back('%windir%');

        BubbleSort(''); // bubble sort variables by *path* length to achieve maximum replacement

        for (var e = new Enumerator(vec); !e.atEnd(); e.moveNext()) {
            var item = e.item();
            var re = new RegExp(wld.EscapeString(fsu.Resolve(item), 'r'), 'gmi');
            var al = item;
            tmp = tmp.replace(re, al);
        }
    }

    function EditAliasExpand() {
        for (var e = new Enumerator(DOpus.aliases); !e.atEnd(); e.moveNext()) {
            var item = e.item();
            if (item.path.drive == 0) continue; // we skip /trash etc.
            vec.push_back(item);
        }

        BubbleSort(''); // bubble sort aliases by *name* length to achieve maximum replacement

        for (var e = new Enumerator(vec); !e.atEnd(); e.moveNext()) {
            var item = e.item();
            var re = new RegExp('/' + item, 'gmi');
            var al = fsu.Resolve('/' + item);
            tmp = tmp.replace(re, al);
        }
    }

    function EditEnvvarExpand() {
        vec.push_back('%allusersprofile%');
        vec.push_back('%appdata%');
        vec.push_back('%commonprogramfiles%');
        vec.push_back('%commonprogramfiles(x86)%');
        vec.push_back('%comspec%');
        vec.push_back('%driverdata%');
        vec.push_back('%localappdata%');
        vec.push_back('%onedrive%');
        vec.push_back('%onedriveconsumer%');
        vec.push_back('%programdata%');
        vec.push_back('%programfiles%');
        vec.push_back('%programfiles(x86)%');
        vec.push_back('%programw6432%');
        vec.push_back('%public%');
        vec.push_back('%systemroot%');
        vec.push_back('%temp%');
        vec.push_back('%tmp%');
        vec.push_back('%userprofile%');
        vec.push_back('%windir%');

        // BubbleSort(''); // sorting not needed here

        for (var e = new Enumerator(vec); !e.atEnd(); e.moveNext()) {
            var item = e.item();
            var re = new RegExp(wld.EscapeString(item, 'r'), 'gmi');
            var al = fsu.Resolve(item);
            tmp = tmp.replace(re, al);
        }
    }

    function EditGeneric() {
        tmp = tmp.replace(/’|‘/gm, '\'');
        tmp = tmp.replace(/„|“|”|»|«/gm, '"');
        tmp = tmp.replace(/…/gm, '...');
        // tmp = tmp.replace(/,/gm, ' ');
        // tmp = tmp.replace(/(_|\')/gm, ' ');
    }

    function EditIsodate() {
        tmp = tmp.replace(/(\d|\d\d)\.(\d|\d\d)\.(19|20)(\d\d)/g, '$3$4-$2-$1');
        tmp = tmp.replace(/(19|20)(\d\d)-(\d)-(\d|\d\d)/g, '$1$2-0$3-$4');
        tmp = tmp.replace(/(19|20)(\d\d)-(\d\d)-(\d)(\D|$)/g, '$1$2-$3-0$4');
    }

    function BubbleSort(prefix) {
        for (var i = 0; i < vec.count - 1; i++) {
            for (var j = i + 1; j < vec.count; j++) {
                var k = String(fsu.Resolve(prefix + vec(i))).length;
                var l = String(fsu.Resolve(prefix + vec(j))).length;
                if (k >= l) continue;
                vec.exchange(i, j);
            }
        }
    }

    function Log(str) {
        if (args.nolog) return;
        cmd.RunCommand('Set UTILITY=otherlog');
        DOpus.Output('\n' + str);
    }
}