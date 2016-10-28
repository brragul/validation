var equal = '',
	missing = '',
	mismatch = '',
	html = '';
	
var json = {
	r : undefined,
	get g(){
		return this.r;
	},
	set s(x){
		this.r =x;
	}
};
$('document').ready(function(){
  $('body').on('click','#compare',function(){
	$('#myTable').empty();
    var radio =  $('input[name=variable]:checked').val();
	var a = $('#txtArea1').val(),
	b = $('#txtArea2').val(),
    objA = (json.g != undefined)?json.g:((radio=='CDV')?splitAndReturnObjectCDV(a):splitAndReturnObjectEP(a));
	objB = (radio=='CDV')?splitAndReturnObjectCDV(b):splitAndReturnObjectEP(b);
	compare(objA,objB);
	html = buildHtml();
	$('#myTable').html(html);
	emptyVariables();
});
	
});

function compare(x,y){
	for(var key in x){
		var xV = x[key];
		var yV = y[key];
        if(xV){
            xV = xV.replace('<','&lt;');
            xV = xV.replace('>','&gt;');
        }
		if(yV == undefined && xV != undefined){
			var temp = '<tr style="background-color:red;"><td>'+key+'</td><td>'+xV+'</td><td>'+yV+'</td></tr>';
			missing += temp;
			continue;
		}
		if(xV === yV){
			var temp = '<tr><td>'+key+'</td><td>'+xV+'</td><td>'+yV+'</td></tr>';
			equal += temp;
		}else{
			var temp = '<tr style="background-color:lightblue;"><td>'+key+'</td><td>'+xV+'</td><td>'+yV+'</td></tr>';
			mismatch += temp;
		}
	}
}

function buildHtml(){
	var header = '<tr><th>Variable</th><th>Expected Values</th><th>Actual Values</th></tr>'
	var h = '<table>'+header+missing+mismatch+equal+'</table>'
	return h;
}


function splitAndReturnObjectEP(line){
    var i=0,
    obj = {},
    s= line.split(/[\r\n]/g);
    for(;i<s.length;i++){
        var arr = s[i].trim().split('	');
        if(/^((c|v)\d{1,})$/.test(arr[0])){
            if(arr[0].indexOf('c')==0){
                arr[0] = arr[0].replace('c','prop');
            }else{
                arr[0] = arr[0].replace('v','eVar');
            }
            obj[arr[0]] = arr[1];
        }else{
            if(arr[0].indexOf('/')>-1){
                var tmp = arr[0].split('/');
                for(var t in tmp){
                    obj[tmp[t].trim()]=arr[1];
                }
            }else{
                obj[arr[0].trim()]=arr[1];
            }
        }
        
        
    }
    return obj;
}

function splitAndReturnObjectCDV(line){
	var i=0,
	obj = {},
	s= line.split(/[\r\n]/g);
	var prefix = '';
	for(;i<s.length;i++){
		if(s[i].trim()==='')continue;
		var arr = s[i].trim().split(/(\t|=)/);
		
		if(/\.$/.test(arr[0])){
			var tmp = arr[0].replace('.','');
			if(tmp === 'c')
			continue;
			prefix = prefix + arr[0];
			continue;
		}
		
		if(/^\./.test(arr[0])){
			var tmp = arr[0].replace('.','');
			if(tmp === 'c')
			continue;
			var re= tmp+'.';
			prefix = prefix.replace(re,'');
			continue;
		}
		var left = prefix+arr[0].trim();
		obj[left] = arr[2];
		
	}
	
	return obj;
	
}

function emptyVariables(){
	equal = '';
	missing = '';
	mismatch = '';
	html = '';
}

