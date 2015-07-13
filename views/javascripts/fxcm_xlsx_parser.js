/**
 * Created by Terry on 2015/7/3.
 */


var X = XLSX;
var tgContent = {};

function anaylsis(workbook) {
    var result = {};

    var ws = workbook.Sheets['综合账号结算报告'];

    result.broker = 'FXCM';
    result.type = 'fxcm_ts_xlsx';

    result.accountName = ws['B5'].v;
    result.accountNumber = ws['B10'].v;
    result.address = ws['A9'].v;
    result.transactions = [];
    result.pl = 0;

    if (ws['A14'].v === '单据号码') {
        var i =0;
        var n = 15;
        while (ws['A'+n].v !== '总和:') {
            var transaction = {};
            //var open = {};
            //var close = {};
            transaction.ticket = ws['A'+n].v;
            transaction.currency = ws['B'+n].v;
            transaction.volume = ws['C'+n].v;
            transaction.lots = transaction.volume/100000;
            transaction.openTime = new Date(ws['D'+n].v.replace('上午','AM').replace('下午','PM'));
            transaction.closeTime = new Date(ws['D'+(n+1)].v.replace('上午','AM').replace('下午','PM'));

            transaction.openType = ws['M'+n].v;
            transaction.closeType = ws['M'+(n+1)].v;

            console.log('rownum : ' + n);
            if(ws['E'+n].t === 's') {
                transaction.direction = 'buy';
                transaction.openPosition = ws['F'+n].v;
                transaction.closePosition = ws['E'+(n+1)].v;
                transaction.netPL = countGap(transaction.closePosition,transaction.openPosition);
            } else {
                transaction.direction = 'sell';
                transaction.openPosition = ws['E'+n].v;
                transaction.closePosition = ws['F'+(n+1)].v;
                transaction.netPL = countGap(transaction.openPosition,transaction.closePosition);
            }

            transaction.grossPL = transaction.netPL*transaction.lots*10;

            result.pl += transaction.grossPL;
            console.log(result.pl+'           '+transaction.netPL+'*'+transaction.lots+'*10');

            result.transactions.push(transaction);

            n += 2;
            i++;
        }
    }

    result.amount = i;

    return result;

    //return JSON.stringify(result);
}

function countGap(a,b) {
    var s_a = (a*10000).toFixed(0).toString();
    var s_b = (b*10000).toFixed(0).toString();

    var n_a;
    var n_b;
    if (a<0) {
        n_a = parseInt(s_a.substring(0,4));
        n_b = parseInt(s_b.substring(0,4));
    } else {
        n_a = parseInt(s_a.substring(0,5));
        n_b = parseInt(s_b.substring(0,5));
    }

    return n_a-n_b;
}

function process_wb(wb) {
    var output = anaylsis(wb);
    $.extend(tgContent, output);

/*
    if(out.innerText === undefined) out.textContent = output;
    else out.innerText = output;
    if(typeof console !== 'undefined') console.log("output", new Date());
*/
}



var xlf = document.getElementById('exampleInputFile');
function handleFile(e) {
    tgContent = {};

    var files = e.target.files;
    var f = files[0];
    {
        var reader = new FileReader();
        tgContent.fileName = f.name;
        reader.onload = function(e) {
            if(typeof console !== 'undefined') console.log("onload", new Date());
            var data = e.target.result;
            var wb;
            //var arr = fixdata(data);
            wb = X.read(data, {type: 'binary'});
            process_wb(wb);
        };

        reader.readAsBinaryString(f);
    }

    document.getElementById('tgFileName').value = f.name;

    tgContent.name = document.getElementById('tgName').value;
}

function submit() {
    var form = document.getElementById('newTGForm');

    var input = document.createElement("input");
    input.type = 'hidden';
    input.name = 'tg';
    input.value = JSON.stringify(tgContent);


    form.appendChild(input);
    form.submit();
}


document.getElementById('tgSelector').onchange = handleFile;
//todo find out why $('tgSelector') doesn't work
//todo need to disable and enable 导入按钮
//todo find out how to clear modal dialogue content.

/*
function post() {
    var temp = document.createElement("form");
    temp.action = '/TG’;
    temp.method = "put";
    temp.style.display = "none";

    var params = document.createElement("input");
    params.name = 'TG';
    params.value = result;

    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

//调用方法 如
post('pages/statisticsJsp/excel.action', {html :prnhtml,cm1:'sdsddsd',cm2:'haha'});
*/


