$("document").ready(function(){
	var myjson,t,tc,newobj,jsontotext,appnd={};
	clear = function(){
		$('#txtArea1').remove();
		$('#checkReq').remove();
		$('#reqName').remove();
		$('#myTable').remove();
		$('#createLink').remove();
		$('#addQueue').remove();
	};
	$.getJSON("data/video.json", function(json) {
			myjson = json;
			$.each(json,function(k,v){
				$(".dropdown-menu").append('<li><a href="#">'+k+'</a></li>');
			});
		});
	$("body").on('click','.dropdown ul li',function(e){
		
		 t = e.target.childNodes["0"].data;
		 tc = myjson[t];
		 json.s = tc;
		$(".dropdown-toggle").html(t);
	});
	
	$("#getJSON").click(function(){
		$("#myTable").html(displayReq(tc,t));
	});
	$('#insertNewReq').click(function(){
		clear();
		$('#insertTextArea').append('<br><input id="reqName" type="text" placeholder="Type Requirement Name"></input><br><br>');
		$('#insertTextArea').append('<textarea rows="20" cols="60" id="txtArea1" placeholder="Copy paste from requirements here"></textarea>');
		$('#insertTextArea').append('<button id="checkReq">Review Requirement</button>');
	});
	
	
	
	$('#insertTextArea').on('click','#checkReq',function(){
		$('body').append('<p id="myTable"></p>');
		var txt = $('#txtArea1').val();
		newobj = splitAndReturnObjectCDV(txt);
		var nm = $('#reqName').val();
		$("#myTable").html(displayReq(newobj,nm));
		
		$('#checkReq').remove();
		$('#insertTextArea').append('<button id="createLink">Done Create Link</button>');
		$('#insertTextArea').append('<button id="addQueue">Add to Queue</button>');
	});
	$('#insertTextArea').on('click','#addQueue',function(){
		var nm = $('#reqName').val();
		appnd[nm] =  newobj
		myjson= $.extend(myjson,appnd);
	});
	$('#insertTextArea').on('click','#createLink',function(){
		jsontotext = JSON.stringify(myjson);
		$('#downloadlink').attr('style','display: block');
		var link = document.getElementById('downloadlink');
		link.href = makeTextFile(jsontotext);
		alert('Requirement added!');
		
	});
	
	var textFile = null,
	makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };
	//$('body').on('click','#downloadlink',function(){
		
	//});
	
});


function displayReq(o,nm){
	var header = '<tr><th>Variable</th><th>Expected Values</th></tr>',col='<tr>Requirement Name: '+nm+'</tr>';
	for(var obj in o)
	{
		if(o[obj].indexOf(">")>-1||o[obj].indexOf("<")>-1){
			o[obj] = o[obj].replace('>','&gt;')
			o[obj] = o[obj].replace('<','&lt;')
		}
	col += '<tr><td>'+obj+'</td><td>'+o[obj]+'</td></tr>';
	}
	var h = '<table>'+header+col+'</table>';
	return h;
}