$("document").ready(function(){
	$("body").on('click','#getXML',function(){
		$.getJSON("data/test.json", function(json) {
			//var obj = json.
			//console.log(json.Clip_Start_Call.pageName);
			$.each(json,function(k,v){
				var html = "";
			});
		});
		
	});
});


function displayReq(){
	var header = '<tr><th>Variable</th><th>Expected Values</th></tr>';
	
	var h = '<table>'+header+col+'</table>';
	return h;
}