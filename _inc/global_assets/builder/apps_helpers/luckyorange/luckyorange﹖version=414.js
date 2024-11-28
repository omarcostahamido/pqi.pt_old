
$('document').ready(function() {
	//$.removeCookie('omw_app_subscriberdiscount', { path: '/' }); 
	
	 		 $.ajax({
					type: "GET",
		       		url: "/_inc/global_assets/builder/apps_helpers/luckyorange/luckyorange.php?lang="+$('html').attr("iso"),
					data: "",
					dataType:"json",
					success: function(msg){
						if (msg.status==1) {
								$("head").append(Base64.decode(msg.html));
						}
					},
					error: function(XMLHttpObj, erroCode) {
					}
			});
});