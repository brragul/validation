$("document").ready(function(){
	var myjson,t,tc,newobj,jsontotext,
	clear = function(){
		$('#txtArea1').remove();
		$('#checkReq').remove();
		$('#reqName').remove();
		$('#myTable').remove();
		$('#createLink').remove();
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
		$("#myTable").html(displayReq(tc));
	});
	$('#insertNewReq').click(function(){
		clear();
		$('#insertTextArea').append('<input id="reqName" type="text" placeholder="Type Requirement Name"></input><br>');
		$('#insertTextArea').append('<textarea rows="20" cols="60" id="txtArea1"></textarea>');
		$('#insertTextArea').append('<button id="checkReq">Review Requirement</button>');
	});
	
	
	
	$('#insertTextArea').on('click','#checkReq',function(){
		$('body').append('<p id="myTable"></p>');
		var txt = $('#txtArea1').val();
		newobj = splitAndReturnObjectCDV(txt);
		$("#myTable").html(displayReq(newobj));
		var nm = $('#reqName').val();
		var o={};
		o[nm] =  newobj
		myjson= $.extend(myjson,o);
		$('#checkReq').remove();
		$('#insertTextArea').append('<button id="createLink">Done Create Link</button>');
	});
	$('#insertTextArea').on('click','#createLink',function(){
		jsontotext = JSON.stringify(myjson);
		$('#downloadlink').attr('style','display: block');
		var link = document.getElementById('downloadlink');
		link.href = makeTextFile(jsontotext);
		
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


function displayReq(o){
	var header = '<tr><th>Variable</th><th>Expected Values</th></tr>',col;
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