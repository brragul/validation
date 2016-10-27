$("document").ready(function(){
	var myjson,t,tc;
	$.getJSON("data/video.json", function(json) {
			myjson = json;
			$.each(json,function(k,v){
				$(".dropdown-menu").append('<li><a href="#">'+k+'</a></li>');
			});
		});
	$("body").on('click','.dropdown ul li',function(e){
		 t = e.target.childNodes["0"].data;
		 tc = myjson[t];
		$(".dropdown-toggle").html(t);
	});
	
	$("#getJSON").click(function(){
		$("#myTable").html(displayReq(tc));
	});
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