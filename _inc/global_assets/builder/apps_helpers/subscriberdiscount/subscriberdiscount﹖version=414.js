function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
$('document').ready(function() {
	//$.removeCookie('omw_app_subscriberdiscount', { path: '/' }); 
	if (! $.cookie('omw_app_subscriberdiscount')) {
	 		 $.ajax({
					type: "GET",
		       		url: "/_inc/global_assets/builder/apps_helpers/subscriberdiscount/subscriberdiscount.php?lang="+$('html').attr("iso"),
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
									// EVENTS
									$("body").on("click",".omw_app_subscriberdiscount .pre_box_close svg", function(e){
								    	e.preventDefault();
								    	$.cookie('omw_app_subscriberdiscount', 'viewed', {  path: '/' });
										TweenMax.to($(el), .3, {opacity:0, onComplete:
											function(){
												$(el).remove();
												$("body").css("overflow","auto");
											}
										});
									});
									$("body").on("click",".omw_app_subscriberdiscount button", function(e){
											e.preventDefault();

											var objModal = '<div id="omw-tos-modal-confirm-subscription" uk-modal class="uk-flex-top omw-tos-container">';
											objModal +='<div class="uk-modal-dialog uk-margin-auto-vertical">';
											objModal +='<div class="uk-modal-body uk-modal-body-container uk-modal-body-container-subscriber-confirm-container omw-default-font" uk-overflow-auto>';
											objModal +=translations.i18n["trad94"]
											objModal +='</div>';
											objModal +='<div class="uk-modal-footer uk-text-right">';
											objModal +='<button class="uk-button uk-button-default omw-default-font uk-modal-close" type="button" style="margin-right:10px">'+translations.i18n["trad49"]+'</button>';
											objModal +='<button class="uk-button uk-button-primary omw-default-font omw-tos-modal-confirm-subscription-btn" type="button" trad='+translations.i18n["trad95"]+'>'+translations.i18n["trad95"]+'</button>';
											objModal +='</div>';
											objModal +='</div>';
											objModal +='</div>';


											if  (isEmail($("input#newsletter").val())) {
													
												  	if ($("#omw-tos-modal-confirm-subscription").length==0) {
								            		$("body").append(objModal);
								            		$(".omw-tos-modal-confirm-subscription-btn").on("click", function(){
							            					var myBtn = $(this);
							            					$(myBtn).html("<div uk-spinner='ratio: .5'></div>");


							            					// VALIDATE IF WE CAN SUBMIT ADD EMAIL OR RETURN EXISTING EMAIL
																			$.ajax({
																				type: "POST",
																	       		url: "/_inc/global_assets/builder/apps_helpers/subscriberdiscount/subscriberdiscount.php?lang="+$('html').attr("iso"),
																				data: "email="+$("input#newsletter").val(),
																				dataType:"json",
																				success: function(msg){
																					UIkit.modal("#omw-tos-modal-confirm-subscription").hide();
																					$(myBtn).html($(myBtn).attr("trad"));
																					if (msg.confirmation=="false") {
																						// CONFIRM NOT OK
																						swal({
																							  customClass:"sweetSubscriberAlert",
																			    			  title:"", 
																			    			  text: translations.i18n["trad25"],
																			    			  type: "error" 
																			    			 })
																					}
																					else {
																						// CONFIRM OK
																						swal({
																							  customClass:"sweetSubscriberAlert",
																			    			  title:"", 
																			    			  html: true,
																			    			  text: translations.i18n['trad69'],
																			    			  type: "success" 
																			    			 }, function(){
																			    			 		$.cookie('omw_app_subscriberdiscount', 'viewed', { expires: 3650, path: '/' });
																			    			 		TweenMax.to($(el), .3, {opacity:0, onComplete:
																										function(){
																											$(el).remove();
																											$("body").css("overflow","auto");
																										}
																									});
																			    			 })
																					}
																				},
																				error: function(XMLHttpObj, erroCode) {
																						}
																				});
									  										// VALIDATE IF WE CAN SUBMIT ADD EMAIL OR RETURN EXISTING EMAIL

														
										        });
						            	}
						            	$(".omw-tos-modal-confirm-subscription-btn").show();
						            	$("#omw-tos-modal-confirm-subscription .uk-modal-close").html(translations.i18n["trad49"]);
						            	$("#omw-tos-modal-confirm-subscription .uk-modal-body-container ").html(translations.i18n["trad94"]);
						            	UIkit.modal("#omw-tos-modal-confirm-subscription").show();
						            	return

													



											}
											else {
											swal({
												  customClass:"sweetSubscriberAlert",
								    			  title:"", 
								    			  text: translations.i18n['trad70'],
								    			  type: "error" 
								    			 })
											}
										});
								},1000);
						}
					},
					error: function(XMLHttpObj, erroCode) {
					}
			});
	} // END COOKIE NOT VIEWED*/
});