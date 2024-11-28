$('document').ready(function() {
//	$.removeCookie('omw_app_splashblocker', { path: '/' }); 
	if (! $.cookie('omw_app_splashblocker')) {
	 		 $.ajax({
					type: "GET",
		       		url: "/_inc/global_assets/builder/apps_helpers/splashblocker/splashblocker.php?lang="+$('html').attr("iso"),
					data: "",
					dataType:"json",
					success: function(msg){
						if (msg.status==1) {
								setTimeout(function(){
									var el = $( Base64.decode(msg.html) ).css("opacity",0).prependTo("#builder-sections");
									$("body").css("overflow","hidden");
									TweenMax.to($(el), .3, {opacity:1, onComplete:
												function(){
												}
									});
									$("body").on("click",".omw_app_splashblocker .btnAceitar", function(e){
									    	e.preventDefault();
									    	$.cookie('omw_app_splashblocker', 'viewed', {  path: '/' });
									    	TweenMax.to($(el), .3, {opacity:0, onComplete:
												function(){
													$(el).remove();
													$("body").css("overflow","auto");
												}
											});
									});
								},1000);
						}
					},
					error: function(XMLHttpObj, erroCode) {
					}
			});
	} // END COOKIE NOT VIEWED*/
});