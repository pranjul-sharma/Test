var logg;
var searchText;

function userLogin(){
	console.log("I am getting called");
	alert("I am getting called");
}
function suggestDomain(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp  = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){		
		if (this.readyState == 4 && this.status == 200){
			var responseSec = document.getElementById("suggestions");	
			//TODO write some html code here
			suggestions.innerHTML = "";
			var responseArr = JSON.parse(this.responseText);
			console.log("response array length suggestion: "+this.responseText);
			console.log("response array length suggestion: "+responseArr);

			var responseKeys = Object.keys(responseArr);
			var suggestStr='<span class="info">Available domains</span><br>';
			for(var i = 0;i < responseKeys.length ;i++){
				if((responseArr[responseKeys[i]]['status']).toLowerCase() == 'available'){
					suggestStr += "<tr>"+
									"<td>"+responseKeys[i]+"</td>"+
									"<td><button class=\"btn btn-secondary login\" id=\"suggestbtn"+i+"\">Book Now!</button>"+
									"</td>"+
								"</tr>";
				}
			}	
			console.log("again in suggestion\n");
			var appendStr = "<div class=\"table-responsive\">"+
											"<table class=\"table\">"+
												"<tbody>"+
													suggestStr+
												"</tbody>"+
											"</table>"+
										"</div>";


			responseSec.innerHTML = appendStr;
			var btns = new Array();
			for(var i = 0; i < responseKeys.length; i++){
				var idTag = "suggestbtn"+i+"";
				console.log(idTag);
				btns[i] = document.getElementById(idTag);
				btns[i].addEventListener("onclick",userLogin);
			}
			$(".loader").hide();
		}
	};
	xmlhttp.open("GET",'app/suggestDomain.php?searchdomain='+searchText,true);
	xmlhttp.send();
}

function searchDomain(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp  = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){		
		if (this.readyState == 4 && this.status == 200){
			var responseSec = document.getElementById("response");		
			var arr = JSON.parse(this.responseText);
			console.log("arr: "+arr);
			var searchTextArr = searchText.split(".");
			searchText = searchTextArr.length == 1 ? searchText + ".com" : searchText;
			var keys = Object.keys(arr);
			var arrMain = arr[keys[0]];
			console.log("arrmain: "+arrMain);
			var showStr;
			if(arrMain['status'].toLowerCase() == 'available'){
				showStr = "<h3>"+searchText + "<small class=\"text-muted\"> is available.</small></h3>";
			} else {
				showStr = "<h3>"+searchText + "<small class=\"text-muted\"> is already taken.</small></h3>";
			}
			//TODO write some html code here
			var divText = "<div class=\"row\">"+
							"<div class=\"col-md-7\">"+
								showStr+
							"</div>"+
							"<div class=\"col-md-5\">"+
								"<button class=\"btn btn-primary login\" id=\"bookbtn\">Book Now!</button>"+
							"</div>"+
						"</div>";
			responseSec.innerHTML = divText;			
			var btn = document.getElementById("bookbtn");
			btn.addEventListener("onclick",userLogin);
		}
	};
	xmlhttp.open("GET",'app/searchDomain.php?searchdomain='+searchText,true);
	xmlhttp.send();

}

window.onload = function(){
	var input1= document.getElementById("searchdomain");
	$(".loader").hide();
	document.forms[0].addEventListener("submit",function(event){
		event.preventDefault();
		$(".loader").show();
		searchText = input1.value;
		searchDomain();
		suggestDomain();
	});



}

$(function(){
	$(".loader").hide();

	$(".login").click(function(){
		console.log("btn click");
		var id = $(this).attr('id');
		alert("login using "+id);
	});

	// $("#bookBtn").click(function(){
	// 	console.log("btn click");
	// 	var id = $(this).attr('id');
	// 	alert("login using "+id);
	// });
});