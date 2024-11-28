$('document').ready(function() {
	 //$.removeCookie('omw_app_infosplash', { path: '/' }); 
	 //if (! $.cookie('omw_app_infosplash')) {
	 		 $.ajax({
					type: "GET",
		       		url: "/_inc/global_assets/builder/apps_helpers/infosplash/infosplash.php?lang="+$('html').attr("iso"),
					data: "",
					dataType:"json",
					success: function(msg){
						if (msg.status==1) {
								setTimeout(function(){
									$("body").css("overflow","hidden");
									var el = $( Base64.decode(msg.html) ).css("opacity",0).prependTo("#builder-sections");
									TweenMax.to($(el), .2, {opacity:1, onComplete:
												function(){
												}
										});

									$("body").on("click",".omw_app_infosplash a", function(e){
										$.cookie('omw_app_infosplash', 'viewed', {  path: '/' });
										e.preventDefault();
										TweenMax.to($(el), .2, {opacity:0, onComplete:
												function(){
													$(el).remove();
													$("body").css("overflow","auto");
												}
										});
										window.location.href = $(this).attr("href");
									});

									$("body").on("click",".omw_app_infosplash_close", function(e){
										e.preventDefault();
										$.cookie('omw_app_infosplash', 'viewed', { path: '/' });
										TweenMax.to($(el), .2, {opacity:0, onComplete:
												function(){
													$(el).remove();
													$("body").css("overflow","auto");
												}
										});
									})

								},2000);
						}
					},
					error: function(XMLHttpObj, erroCode) {
					}
			});
	//} // END COOKIE NOT VIEWED


	// $.ajax({
	// 				type: "POST",
	// 	       		url: "/_inc/global_assets/builder/apps_helpers/infosplash/voucherdiscount.php?lang="+$('html').attr("iso"),
	// 				data: "",
	// 				dataType:"json",
	// 				success: function(msg){
	// 					if (msg.status==1) {
	// 							setTimeout(function(){
	// 								$("body").css("overflow","hidden");
	// 								var el = $( Base64.decode(msg.html) ).css("opacity",0).prependTo("#builder-sections");
	// 								TweenMax.to($(el), .2, {opacity:1, onComplete:
	// 											function(){
	// 											}
	// 									});

	// 								$("body").on("click",".omw_app_infosplash_voucher_"+msg.id+" a", function(e){
	// 									$.cookie('omw_app_infosplash_'+msg.id, 'viewed', {  path: '/' });
	// 									e.preventDefault();
	// 									TweenMax.to($(el), .2, {opacity:0, onComplete:
	// 											function(){
	// 												$(el).remove();
	// 												$("body").css("overflow","auto");
	// 											}
	// 									});
	// 									window.location.href = $(this).attr("href");
	// 								});

	// 								$("body").on("click",".omw_app_infosplash_close", function(e){
	// 									e.preventDefault();
	// 									$.cookie('omw_app_infosplash_voucher_'+msg.id, 'viewed', {  path: '/' });
	// 									TweenMax.to($(el), .2, {opacity:0, onComplete:
	// 											function(){
	// 												$(el).remove();
	// 												$("body").css("overflow","auto");
	// 											}
	// 									});
	// 								})

	// 							},500);
	// 					}
	// 				},
	// 				error: function(XMLHttpObj, erroCode) {
	// 				}
	// 		});

	

});