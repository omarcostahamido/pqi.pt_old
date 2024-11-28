
//PREVIEW BUILDEr
var updateAutoHeightAutoCenter;

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function callbackShoppingCart( cart ) {
	if ($("[module='shoppingcart'] .omw-cart-total").length > 0) $("[module='shoppingcart'] .omw-cart-total").html(cart.totalItems);
	if ($("[module='storeicons'] .iconsLibrary_item[rel='cart']").length > 0) $("[module='storeicons'] .iconsLibrary_item[rel='cart'] .iconsLibrary_iconBox span").html(cart.totalItems);
	if ($("[module='shoppingcart'] .omw-cart-amount").length > 0) $("[module='shoppingcart'] .omw-cart-amount").html(cart.totalPrice);
	
	// resume cart
	if ($("#omw_resume_cart").length > 0) {
		var cartUrl = cart.options.url;
		var cartTrad = cart.options.trad;
		
		var html ='<ol id="mini-cart-list" class="mini-products-list">';
		$.each(cart.items, function() {
			
			html +='<li class="item odd">';
			html +='<a class="product-image" title="'+(this.descricao)+'" href="'+this.url+'">';
			html +='<img width="50" height="50" alt="'+(this.descricao)+'" src="'+this.imagem+'"></a>';
			html +='</a>';
			html +='<div class="product-details">';
			
			html +='<p class="product-name">';
			html +='<a href="'+this.url+'">'+(this.descricao)+'</a>';
			html +='</p><strong>'+this.qtd+'</strong>x<span class="price">'+this.valor+'</span>';
			
			
			html +='</div>';
			html +='</li>';
			
		});
		html +="</ol>";
		
		html +='<div class="actions">';
		html +='<button class="button btn-inline" onclick="location.href=\'/'+cartUrl+'\'" title="'+cartTrad+'" type="button"><span>';
		html +='<span>'+cartTrad+'</span>';
		html +='</span></button></div>';
		
		$("#omw_resume_cart").html(html);
	}
}


updateAutoHeightAutoCenter = function() {
	if ($(".omw-column-autoheight-autocenter").length > 0) {
		$(".omw-column-autoheight-autocenter").each(function(index) {
			if ($(this).hasClass("omw-minHeight")) {

				var altura = $(this).css("min-height").replace("%","").replace("px","");
				if (altura < $(this).find(".omw-col-disposition").outerHeight()) {
					altura = $(this).find(".omw-col-disposition").outerHeight();
				}
			}
			else {
				var altura = $(this).find(".omw-col-disposition").outerHeight();
			}

			$(this).css("min-height",altura + "px");
		});
		
	}

};

var Builder = function() {
	//"use strict";
	
	
	
	var getSelectedObject = function() {
		return false;
	};
	
	var bindClickElements = function() {
		
		/* BEGIN OF INITIALIZES JS FUNCTIONS TO INCLUDE IN WEBSITE */

		$("#builder-sections").on("click",".omw-search > i", function() {
			
		});

		
		
	 var options = {
	 		loop:true,
	 		autoPlay:true,
	 		autoplayTimeout:1000,
	 		autoHeight:false,
	 		autoplayHoverPause:true,
	 		navigation:false,
	 		pagination : true,
   	    	paginationNumbers: false,
   	    	onRefreshed:function(e){
   	    		console.log("refresh")
   	    	},
   	    	onResize :function(){
   	    		console.log("resize")
   	    	},
	 		responsive:{
		        0:{
		            items:1
		        },
		        768:{
		            items:3
		        },
		        1024:{
		            items:6
		        }
		    }
	 };
		var $owl = $(".omw-brands.brandAnimation .omw-brands-container").addClass("owl-carousel")

		$owl.on('initialized.owl.carousel', function(event){ 
		   	//$(this).closest("[module='brands']").fadeTo( "fast" , 1);
		   	$(this).find("img").css("opacity","0");

		   	$(this).closest("[module='brands']").animate({
			    opacity: 1,
			  }, 500, function() {
			    var alturaMax=0;
			   	$(this).find(".owl-item").each(function(){
			   		// console.log($(this))
			   		// console.log($(this).height())
			   		if($(this).height()>alturaMax){
			   			alturaMax=$(this).height();
			   		}
			   		$(this).find(".brandsNivel1").css("height",alturaMax+"px");
			   	});
			   	$(this).find("img").css("opacity","1");
			  });
		});
		try{
			$owl.owlCarousel(options);
		}catch(err){}


		// $(".omw-brands-container-v2[data-animation='hasCarrossel']").each(function(){
		// 	var options = {
		// 		loop:true,
		// 		autoPlay:true,
		// 		dots:false,
		// 		nav:true,
		// 		autoplayTimeout:1000,
		// 		margin:parseInt($(this).attr("data-espacamento")),
		// 		autoplayHoverPause:true,
		// 		responsive:true,
		// 		responsive:{
		// 			0:{
		// 				items:1
		// 			},
		// 			768:{
		// 				items:Math.ceil(parseInt($(this).attr("data-numero_item"))/2)
		// 			},
		// 			1024:{
		// 				items:parseInt(parseInt($(this).attr("data-numero_item")))
		// 			}
		// 		}
		// 	}
		// 	console.log(options)
		// 	$(this).css("display","block");
		// 	var owl = $(this).owlCarousel(options);
		// });


		//ROW TO SLIDESHOW
		//if($(window).width()<=480){
		if($("html[ismobile]").length>0){
			var optionsRow = {
				loop:false,
				autoPlay:false,
				autoplayTimeout:1000,
				autoWidth:false,
				autoHeight:false,
				autoplayHoverPause:true,
				paginationNumbers: false,
				stagePadding: 24,

				navigation:false,
				pagination : false,
				nav:false,
				dots:false,

				onRefreshed:function(e){
					console.log("refresh")
				},
				onResize :function(){
					console.log("resize")
				},
				responsive:{
					0:{
						items:1
					},
					768:{
						items:1
					},
					1024:{
						items:1
					}
				}
			};
			$(".row_to_slideshow .section-options").remove();
			var $owlRow = $(".row_to_slideshow").addClass("owl-carousel")

			$owlRow.on('initialized.owl.carousel', function(event){ 
				
			});
			try{
				$owlRow.owlCarousel(optionsRow);
			}catch(err){}
		}
		//END ROW TO SLIDESHOW

		
		$( ".omw-brands" ).each(function( index ) {
			switch( $(this).parent().attr("omwversion") ){
				case "1":
					var altura = 0;
			 		var objbrands = $(this);
			 		objbrands.find("img").load( function(){
			 			if(altura<$(this).height()){
				 			altura = $(this).height();
			 				objbrands.find(".noAnimation").css({"height":altura });
			 				objbrands.find(".owl-item").css({"height":altura });
				 		}
			 			objbrands.find("img").css("visibility","visible");
			 			$owl.trigger('refresh.owl.carousel');
			 		});
				break;
				default:
					if (!$(this).hasClass("owl-carousel")) $(this).closest("[module='brands']").css("opacity",1);
					// var altura = 0;
			 	// 	var objbrands = $(this);
			 	// 	objbrands.find("img").load( function(){
			 	// 		if(altura<$(this).height()){
				 // 			altura = $(this).height();
			 	// 			objbrands.find(".noAnimation").css({"height":altura });
			 	// 			objbrands.find(".owl-item").css({"height":altura });
				 // 		}
			 	// 		objbrands.find("img").css("visibility","visible");
			 	// 		$owl.trigger('refresh.owl.carousel');
			 	// 		console.log(altura);
			 	// 	});
				break;
			}
		});

	//////////////////////////////////////
    // BEGIN: OMW FORM METATAGS HANDLER
	//////////////////////////////////////
    $.validator.messages.required = "";
	$.validator.messages.number = "";
	$.validator.messages.email = "";
	$.validator.messages.remote = "";
	$.validator.messages.equalTo = "";

    $.extend( $.validator.defaults, {
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			console.info(errors);
			if (errors) {
				var message = errors == 1
				? translations.i18n["trad14"]
				: translations.i18n["trad15"].replace("%errors%",errors);
				noty({
					text: message,
					type: 'error',
					layout:"topRight",
					timeout: 2000
				});
			}
		}
	});


   $(".omw-estimated-shipping-country").on("click", function(e){
   		e.preventDefault();
   		$(".omw-estimated-shipping-country-selector-container").toggle("fadeIn");
   });


   $(".omw-estimated-shipping-country-selector-container select").on("change", function(){
   	 	value = $(this).val();
   	 	cost = $(".omw-estimated-shipping-country-selector-container").attr("cost") * $(".addToBasket_quantity").val();
   	 	weight = $(".omw-estimated-shipping-country-selector-container").attr("weight");
   	 	$(".omw-estimated-shipping-country-selector-container").hide();

   	 	$.ajax({
			type: "POST",
			url: '/_inc/global_assets/builder/ajax/checkShippingPreview.php',
			data: "country=" + value + "&cost=" + cost+ "&weight=" + weight+ "&lang=" + $("html").attr("lang")+"&newDetail="+$('[module="productdetail"][tsplugin="6"]').length,
			dataType:"json",
			success: function(data){
				$(".omw-estimated-shipping-country").html(data.country);
				$(".omw-estimated-shipping-value").html(Base64.decode(data.carrierAndValue));
				$(".omw-shipping-preview-container-shipping-eta").html(Base64.decode(data.shippingInfoETA) );

				$(".wdp_estimated_time").html(Base64.decode(data.shippingInfoETA));
				$(".wdp_estimated_cost span").html(Base64.decode(data.carrierAndValue));

			},
			error: function(){
				
			}
		});
   });

   

   $(".omw-wishlist-tag,.detail_wishlist").on("click",function(e) {
   		e.preventDefault();
   		var pID = $(this).attr("rel");
   		var action = $(this).hasClass("active")?"remove":"add";
   		var obj = $(this);

   		
   		$.ajax({
			type: "POST",
			url: '/_inc/global_assets/builder/ajax/wishlist.php?lang=' + $("html").attr("iso"),
			data: "id=" + pID + "&action=" + action,
			dataType:"json",
			success: function(data){
				if (data.status=="error"){
					location.href=data.redirect;
				}
				else{

					if (data.action=="add"){
						$(obj).addClass("active");
						// GA4 GOOGLE ANALYTICS (GA4)
						if (typeof gtag === 'function') {
							gtag("event", "add_to_wishlist", {
								items: [
								{
									item_id: data.sku,
									item_name: data.title
								}
								]}
								);
							
						}
					}
					else{
						$(obj).removeClass("active");
					}
					$("[module='storeicons'] .iconsLibrary_box .iconsLibrary_item .iconsLibrary_iconBox span").html(data.items);
				}
				
			},
			error: function(){
				// console.log('failure send email');
				// formularioObj.find("button").html(htmlSumbit);
				// formularioObj.find("button").removeAttr("disabled");
			}
		});
   });


   $("[module='form'] form").each(function(e) {
		$(this).find("select").niceSelect(null);
		$(this).find("select").niceSelect("update");
		var formularioObj = $(this);


		 formularioObj.validate({
			  errorClass:"errorValidation",
			  errorElement:"span",
			  ignore: ":hidden",
			  errorPlacement: function(error, element) {
				    if (element.is('select.required:hidden')) {
				        error.insertAfter(element.next('.nice-select'));
				    } else {
				        error.insertAfter(element);
				    }        
				},
			  focusInvalid: true,
			  highlight: function(element, errorClass, validClass) {
					$(element).addClass("errorClass");
					if ($(element).is('select.required:hidden')) {
						$(element).parent().addClass("errorClass");
					}
			  },
			  unhighlight: function(element, errorClass, validClass) {
					$(element).removeClass("errorClass");
					if ($(element).is('select.required:hidden')) {
						$(element).parent().removeClass("errorClass");
					}
			  },
			  submitHandler: function(form) {
			  	
			  	var invalidUploadForm = false;
			  	var hasUploadButton = false;
			  	$(formularioObj).find(".omw-form-btn-upload").each(function(){
			  		hasUploadButton = true;
			  		if ($(this).hasClass("required") && $(this).attr("isuploading")=="true") {
			  			invalidUploadForm = true;
			  			$(this).addClass("errorClass");
			  		}
			  		else if ($(this).hasClass("required") && !$(this).attr("rel")) {
			  			invalidUploadForm = true;
			  			$(this).addClass("errorClass");
			  		}
			  		else if ($(this).hasClass("isuploading")=="true") {
			  			invalidUploadForm = true;
			  			$(this).addClass("errorClass");
			  		}
			  		else {
			  			$(this).removeClass("errorClass");
			  		}

			  	});
			  	if (invalidUploadForm) { return false}

			  	if (hasUploadButton) {
			  		var attachedFiles = Array();
			  		$(formularioObj).find(".omw-form-btn-upload").each(function(){
			  			if ($(this).attr("rel")!="" && $(this).attr("rel")!=undefined ) attachedFiles.push("http://" + location.hostname + $(this).attr("rel"));
			  		});
			  		if (attachedFiles.length>0) {
				  		attachedFiles = attachedFiles.join("<br>");
				  		$('<input>').attr({
						    type: 'hidden',
						    id: translations.i18n['trad98'],
						    name: translations.i18n['trad98'],
						    value:attachedFiles
						}).appendTo(form);
			  		}
			  	}

			  	var objModal = '<div id="omw-tos-modal-confirm-subscription-forms" uk-modal class="uk-flex-top omw-tos-container">';
                objModal +='<div class="uk-modal-dialog uk-margin-auto-vertical">';
                objModal +='<div class="uk-modal-body uk-modal-body-container uk-modal-body-container-subscriber-confirm-container omw-default-font" uk-overflow-auto>';
                objModal +=translations.i18n["trad96"]
                objModal +='</div>';
				objModal +='<div class="uk-modal-footer uk-text-right">';
                objModal +='<button class="uk-button uk-button-default omw-default-font uk-modal-close" type="button" >'+translations.i18n["trad49"]+'</button>';
                objModal +='<button class="uk-button uk-button-primary omw-default-font omw-tos-modal-confirm-subscription-btn" style="margin-left:10px" type="button">'+translations.i18n["trad95"]+'</button>';
                objModal +='</div>';
				objModal +='</div>';
            	objModal +='</div>';

            	if ($("#omw-tos-modal-confirm-subscription-forms").length==0) {
            		$("body").append(objModal);
            		$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn").on("click", function(){
            			$(this).html("<div uk-spinner='ratio: .5'></div>");
            			$.ajax({
						type: "POST",
						url: '/_inc/global_assets/builder/ajax/sendmail.php?lang=' + $("html").attr("iso"),
						data: $(form).serialize(),
						dataType:"html",
						success: function(data){

							if($(formularioObj).find("#tipoDestino").val()=="page"){
								if($(formularioObj).find("#destinationPage").val()!="" && $(formularioObj).find("#destinationPage").val()!="none"){
									// window.location.href = $(formularioObj).find("#destinationPage").val();
									window.location.href = window.location.origin+'/'+$("html").attr("iso")+'/'+$(formularioObj).find("#destinationPage").val();
								}else{
									$("#omw-tos-modal-confirm-subscription-forms .uk-modal-close ").html(translations.i18n["trad44"]);
									$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn").hide();
									$("#omw-tos-modal-confirm-subscription-forms .uk-modal-body-container ").html(translations.i18n["trad46"]);
								}
							}else{
								if(data!=false){
									$("#omw-tos-modal-confirm-subscription-forms .uk-modal-close ").html(translations.i18n["trad44"]);
									$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn").hide();
									$("#omw-tos-modal-confirm-subscription-forms .uk-modal-body-container ").html(data);

									$(formularioObj).find("input,textarea").each(function(){
										if ( $(this).attr("name")!="destinationEmail" && $(this).attr("name")!="destinationPage" && $(this).attr("name")!="tipoDestino" && $(this).attr("name")!="textoAgradecimentoHidden"&& $(this).attr("name")!="omw_form_settings" ){
											$(this).val("");
											$(this).prop('checked', false); 
										}
									});
									$(formularioObj).find("select").each(function(){
										$(this).val($(this).find("option:first").val());
										$(this).niceSelect("update");
									});
								}
							}
							// formularioObj.find("button").html(htmlSumbit);
							// formularioObj.find("button").removeAttr("disabled");
							$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn ").html(translations.i18n["trad95"]);
						},
						error: function(){
							// console.log('failure send email');
							// formularioObj.find("button").html(htmlSumbit);
							// formularioObj.find("button").removeAttr("disabled");
						}
					});
            		});
				}
				$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn ").html(translations.i18n["trad95"]);
            	$("#omw-tos-modal-confirm-subscription-forms .uk-modal-body-container ").html(translations.i18n["trad96"]);
            	$("#omw-tos-modal-confirm-subscription-forms .omw-tos-modal-confirm-subscription-btn").show();
            	$("#omw-tos-modal-confirm-subscription-forms .uk-modal-close ").html(translations.i18n["trad49"]);
            	UIkit.modal("#omw-tos-modal-confirm-subscription-forms").show();

				

			  	return false;
		  		
				
			  }
		});
	});

	$("[module='form'] form .omw-customField input").each(function(e) {
		if($(this).attr("tipoData")=="sim"){
			$(this).datepicker({
			    language: $("html").attr("iso"),
			    format: "yyyy-mm-dd",
			    autoclose: true
			});
		}
	});
	$("[module='loginfull'] form .lf_campo_dados input").each(function(e) {
		if($(this).attr("fieldtype")=="data" || $(this).attr("fieldtype")=="datanascimento"){
			$(this).datepicker({
			    language: $("html").attr("iso"),
			    format: "yyyy-mm-dd",
			    autoclose: true
			});
		}
	});

	$("[module='newsletter'] form").each(function(e) {
		var formularioObj = $(this);
		 formularioObj.validate({
			  errorClass:"errorValidation",
			  errorElement:"span",
			  focusInvalid: true,
			  highlight: function(element, errorClass, validClass) {
					$(element).addClass("errorClass");
			  },
			  unhighlight: function(element, errorClass, validClass) {
					$(element).removeClass("errorClass");
			  },
			  submitHandler: function(form) {
			  	var objModal = '<div id="omw-tos-modal-confirm-subscription" uk-modal class="uk-flex-top omw-tos-container">';
                objModal +='<div class="uk-modal-dialog uk-margin-auto-vertical">';
               objModal +='<div class="uk-modal-body uk-modal-body-container uk-modal-body-container-subscriber-confirm-container omw-default-font" uk-overflow-auto>';
                objModal +=translations.i18n["trad94"]
                objModal +='</div>';
				objModal +='<div class="uk-modal-footer uk-text-right">';
                objModal +='<button class="uk-button uk-button-default omw-default-font uk-modal-close" type="button" style="margin-right:10px">'+translations.i18n["trad49"]+'</button>';
                objModal +='<button class="uk-button uk-button-primary omw-default-font omw-tos-modal-confirm-subscription-btn" type="button">'+translations.i18n["trad95"]+'</button>';
                objModal +='</div>';
				objModal +='</div>';
            	objModal +='</div>';

            	if ($("#omw-tos-modal-confirm-subscription").length==0) {
            		$("body").append(objModal);
            		$(".omw-tos-modal-confirm-subscription-btn").on("click", function(){
            			$(this).html("<div uk-spinner='ratio: .5'></div>");
					  	
						$.ajax({
							type: "POST",
							url: '/_inc/global_assets/builder/ajax/ajax_newsletter.php',
							data: $(form).serialize(),
							dataType:"html",
							success: function(data){
								$(".omw-tos-modal-confirm-subscription-btn").hide();
								$("#omw-tos-modal-confirm-subscription .uk-modal-close").html(translations.i18n["trad44"]);
								if(data==true){
									$("#omw-tos-modal-confirm-subscription .uk-modal-body-container ").html(translations.i18n["trad24"]);
								}else if(data==false){
									$("#omw-tos-modal-confirm-subscription .uk-modal-body-container ").html(translations.i18n["trad25"]);
								}
								$("#omw-tos-modal-confirm-subscription .omw-tos-modal-confirm-subscription-btn ").html(translations.i18n["trad95"]);
							},
							error: function(){
								$("#omw-tos-modal-confirm-subscription .uk-modal-body-container ").html(translations.i18n["trad94"]);
								$("#omw-tos-modal-confirm-subscription .omw-tos-modal-confirm-subscription-btn").html(translations.i18n["trad95"]);
							}
						});
            		});
            	}
            	$(".omw-tos-modal-confirm-subscription-btn").show();
            	$("#omw-tos-modal-confirm-subscription .uk-modal-close").html(translations.i18n["trad49"]);
            	$("#omw-tos-modal-confirm-subscription .uk-modal-body-container ").html(translations.i18n["trad94"]);
            	UIkit.modal("#omw-tos-modal-confirm-subscription").show();
            	
				
			  	return false;
			  }
		});
	});
	// END: OMW FORM METATAGS HANDLER

	    var timer = .5;
 		var dinamicHeaderHeight = $("#builder-sections.live-preview .omw-header-dinamic").outerHeight();
 		if (dinamicHeaderHeight < 100 ) {
 			timer = 2;
 		 	dinamicHeaderHeight = 250;
	  	}
	  	

	  	if($(window).width()<980 && $("html").attr("facebookcanvas")=="false"){
	  		$("#builder-sections.live-preview .omw-header-dinamic").css("cssText",$("#builder-sections.live-preview .omw-header-dinamic").attr("style")+"opacity:1;z-index100;display:none !important;position:fixed;top:"+ -(dinamicHeaderHeight + 20) + "px");
	  	}else{
	  		$("#builder-sections.live-preview .omw-header-dinamic").css("cssText",$("#builder-sections.live-preview .omw-header-dinamic").attr("style")+"opacity:1;z-index100;display:block !important;position:fixed;top:"+ -(dinamicHeaderHeight + 20) + "px");
	  		$("#builder-sections.live-preview .omw-header-dinamic").addClass("mostraCab");
	  	}



	  	$("#builder-sections.live-preview .omw-header-dinamic").addClass("omw-dinamic");
	  	// BEGIN: SET DEFAULT POSITION FOR FIXED MENUS
	  	if ($("#builder-sections.live-preview .omw-fixed").length > 0 ) {
	  		if( $( "#builder-sections.live-preview .omw-fixed" ).css("display") != "none" ){
		  		$( "#builder-sections.live-preview .omw-fixed" ).each(function( obj ) {
		  				var fixedHeaderHeight = $(this).outerHeight( true );
		  				$(this).nextAll(".row").not(".omw-hide-smalldesktop").first().css({"margin-top":fixedHeaderHeight + "px"});
		  				$(this).css({"position":"fixed"});
		  		});
		  	}else{
				$(this).next(".row").css({"margin-top":"0px" });
			}
	  	}
	  	// END: SET DEFAULT POSITION FOR FIXED MENUS

	


	// if( $(".weasy_page_header").hasClass("weasy_page_header_float")===false ){
		
	// 	$(".weasy_page_header").next(".row").css({"margin-top": alturaHeader + "px" });
	// 	if( $(".weasy_page_header").hasClass("weasy_page_header_fixo")===true ){
	// 		$(".weasy_page_header").addClass("wph_fixo");
	// 	}
	// }else{
	// 	if( $(".weasy_page_header").hasClass("weasy_page_header_fixo")===true ){
	// 		$(".weasy_page_header").addClass("wph_fixo");
	// 	}
	// }

  	var scrollPositionObjectFixed = null;
  	$(window).on("scroll", function(e){

  			var scrollTop = $(window).scrollTop();

	  		
	  		// BEGIN: DINAMIC HEADERS
	  		if (scrollTop > $(window).height()/5) {
	  			TweenMax.to($("#builder-sections.live-preview  .omw-header-dinamic"), .4, {top:0, onComplete: function () {
				    //new WOW({boxClass:".wow"}).init();
				}});
	  		}
	  		else if (scrollTop < $(window).height()/5) {
	  			 TweenMax.to($("#builder-sections.live-preview  .omw-header-dinamic"), timer, {top:-(dinamicHeaderHeight + 5)});
	  		}
	  		// END: DINAMIC HEADERS

	  		// BEGIN: FIXED ELEMENTS WHEN ARRIVING TO 0
	  		if ($("#builder-sections.live-preview .omw-lockzerofixed").length > 0) {
	  			if( $( "#builder-sections.live-preview .omw-fixed" ).css("display") != "none" ){
		  			$( "#builder-sections.live-preview .omw-lockzerofixed" ).each(function( obj ) {
			  			var positionTopObject = $(this).offset().top;
			  			var objectHeight = $(this).height();
			  			var alturaMenuResponsivo=0;
		  				if($(".omw-responsive-bar").css('display') !== 'none'){
		  					alturaMenuResponsivo=50;
		  				}
			  			if ((positionTopObject -scrollTop <=alturaMenuResponsivo ) && scrollPositionObjectFixed==null) {
			  				scrollPositionObjectFixed = scrollTop;
			  				$(this).css({"position":"fixed","top":alturaMenuResponsivo+"px","left":0,"right":0,"z-index":"999999"});
			  				$(this).next(".row").css({"margin-top": objectHeight + "px" });
			  			}else if ((scrollPositionObjectFixed >  scrollTop  )) {
			  				scrollPositionObjectFixed = null;
			  				$(this).css({"position":"relative","top":"0","left":0,"right":0,"z-index":"999999"});
			  				$(this).next(".row").css({"margin-top":"0px" });
			  			}
			  			
			  		});
				}else{
					$(this).next(".row").css({"margin-top":"0px" });
				}
	  		}
	  		// END: FIXED ELEMENTS WHEN ARRIVING TO 0
  	});
	if ($("body").find(".live-preview").length > 0) {

			$("#popupMedia").on("click",function(e){
				// if(e.target.id!="popupImagem" && e.target.id!="fechaPopupMedia"){
				// 	console.log($(e.target))
				// 	// $("#popupImagem").trigger('pause');
				// 	// $("#popupMedia").removeClass("uk-open");
				// 	// setTimeout(function(){
				// 	// 	$("#popupMedia").removeClass("uk-flex");
				// 	// }, 300);
				// 	// $("#popupMedia").removeClass("uk-open");
				// 	// $("#popupMedia").removeClass("uk-flex");
				// }
				// if(e.target.id!="popupImagem"){
				// 	console.log("entrou no remover")
				// 	$("#popupImagem_base").html("");
				// 	$("body").removeClass("blockScroll");
				// }
			});
			$("#fechaPopupMedia").on("click",function(){
				$("#popupMedia").removeClass("uk-open");
				setTimeout(function(){
					$("#popupMedia").removeClass("uk-flex");
					$("#popupImagem_base").html("");
					$("body").removeClass("blockScroll");
				}, 300);
			});
			$(document).keyup(function(e) {
				if (e.key === "Escape") { // escape key maps to keycode `27`
					$("#popupMedia").removeClass("uk-open");
					setTimeout(function(){
						$("#popupMedia").removeClass("uk-flex");
						$("#popupImagem_base").html("");
						$("body").removeClass("blockScroll");
					}, 300);
				}
			});

			$("[module=links] a, [module=counterup] button, [module=button] button, [module=callToAction] button, [module=features] a.feature-link").each( function(){
				try{
					var href=$(this).attr("href");
					var module = $(this).closest("[module]").attr("module");
					if (module=="features") href = $(this).attr("url");


					if (href.indexOf("http://")<0) {
						var url = "http://" + href;
					}
					else if (href.indexOf("https://")<0) {
						var url = "http://" + href;
					}
					else var url = href;

					if ( href.toLowerCase().substring(0, 4) =="tel:"){
						var tel = href.split("tel:")[1];
						//location.href = "tel:" + tel;
						$(this).parent().attr("href", "tel:" + tel);

						$(this).attr("href", "tel:" + tel);
					}
					if ( href.toLowerCase().substring(0, 7) =="mailto:" || href.toLowerCase().substring(0, 14) =="http://mailto:"){
						var tel = href.split("mailto:")[1];
						//location.href = "tel:" + tel;
						$(this).parent().attr("href", "mailto:" + tel);
						$(this).attr("target", "_self");
						$(this).attr("href", "mailto:" + tel);

					}

				}
				catch(err){}
			});

			function GetVimeoIDbyUrl(url) {
			  var id = false;
			  $.ajax({
			    url: 'https://vimeo.com/api/oembed.json?url='+url,
			    async: false,
			    success: function(response) {
			      if(response.video_id) {
			        id = response.video_id;
			      }
			    }
			  });
			  return id;
			}

			function extractVideoID(url){
			    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			    var match = url.match(regExp);
			    if ( match && match[7].length == 11 ){
			        return match[7];
			    }else{
			        return "novideo";
			    }
			}
			
			$("[module=links] a, [module=counterup] button, [module=button] button, [module=callToAction] button, [module=features] a.feature-link").on("click", function(e){
				
				var href=$(this).attr("href");
				if (href=="") {
					return true;
				}
				var rel=$(this).attr("rel");
				try{
					if($(this).attr("rel")=="popup"){
						var array_rel=$(this).attr("url").split("[#]");
					}else{
						var array_rel=$(this).attr("rel2").split("[#]");
					}
				}catch(err){

				}
				var target = $(this).attr("target");
				var module = $(this).closest("[module]").attr("module");
				if (module=="features") href = $(this).attr("url");
				if (module=="links"){
					href = $(this).attr("url");
					rel=$(this).attr("url");
				}

				if(rel==undefined) rel="";

				if ( href.toLowerCase().substring(0, 7) =="mailto:" || href.toLowerCase().substring(0, 14) =="http://mailto:"){
					location.href=href;
					return true;
				}
				if(rel.toLowerCase().substring(0, 4) == "tel:") {
					e.preventDefault();
					location.href=rel;
					return true;
				}
				if(rel.toLowerCase().substring(0, 7) == "mailto:") {
					e.preventDefault();
					location.href=rel;
					return true;
				}

				if(href.toLowerCase() == "#popupmedia" || $(this).attr("rel")=="popup") {
					if(array_rel.length>1){
						if(array_rel[0]=="internal_imagem"){
							$("#popupImagem_base").html('<img id="popupImagem" style="float: left;" src="'+array_rel[1]+'" alt="">');
						}else if(array_rel[0]=="internal_video"){
							$("#popupImagem_base").html('<video style="float:left;" id="popupImagem" src="'+array_rel[1]+'" controls playsinline uk-video></video>');
						}else if(array_rel[0]=="external_video"){

							array_rel[1].match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
						    if (RegExp.$3.indexOf('youtu') > -1) {
						        // console.log(extractVideoID(array_rel[1]))
								$("#popupImagem_base").html('<iframe style="float:left;max-width:100%;" id="popupImagem" src="https://www.youtube.com/embed/'+extractVideoID(array_rel[1])+'" width="600" height="338" frameborder="0" uk-video></iframe>');
						    } else if (RegExp.$3.indexOf('vimeo') > -1) {
						        // console.log(GetVimeoIDbyUrl(array_rel[1]))
								$("#popupImagem_base").html('<iframe style="float:left;max-width:100%;" id="popupImagem" src="https://player.vimeo.com/video/'+GetVimeoIDbyUrl(array_rel[1])+'" width="600" height="338" frameborder="0" uk-video></iframe>');
						    }

							//$("#popupImagem_base").html('<iframe style="float:left;max-width:100%;" id="popupImagem" src="https://player.vimeo.com/video/'+GetVimeoIDbyUrl(array_rel[1])+'" width="1920" height="1080" frameborder="0" uk-video></iframe>');
							//$("#popupImagem_base").html('<iframe style="float:left;max-width:100%;" id="popupImagem" src="https://www.youtube.com/embed/'+extractVideoID("https://www.youtube.com/watch?v=csrtfr4UWkw&t=958s")+'" width="1920" height="1080" frameborder="0" uk-video></iframe>');
						}
					}
					e.preventDefault();
					$("#popupMedia").addClass("uk-flex");
					setTimeout(function(){
						$("#popupMedia").addClass("uk-open");
						$("body").addClass("blockScroll");
					}, 100);
					return true;
				}
				
				e.preventDefault();

				if (href[0]=="#") {
					// var position = $( href ).offset().top;
					// TweenLite.to(window, 1, {scrollTo:{y:position}, ease:Power2.easeOut,onComplete:function(){
					// }});
					location.href = href;
				}
				else if (rel == "external") {
					if (href.indexOf("javascript:")>=0) {
						var url = href;
					}
					else if (href.indexOf("http://")<0 && href.indexOf("https://")<0) {
						var url = "http://" + href;
					}
					else
						var url = href;
					
					if (target != "_blank") {
						location.href = url;
					}
					else {
						var win = window.open(url, '_blank');
					}
					
				}
				else {

					if ( href.substring(0, 7).toLowerCase() == "http://" || href.substring(0, 8).toLowerCase() == "https://" ) {

					}
					else {
						href = "/" + $("html").attr("iso") + "/" + href; 
						href = href.split( "/" + $("html").attr("iso") + "/" + $("html").attr("iso")).join( "/" + $("html").attr("iso"));
						href =href.split("//").join("/");
					}

					if (target != "_blank") {

						location.href = href;
					}
					else {
						var win = window.open(href, '_blank');
					}
				}
			});
	}


	$("[module='button'] .omw-custombutton a").on("click", function(e){
		
		var href=$(this).attr("href");
		if ( ! href.toLowerCase().substring(0, 4) == "tel:" || ! href.toLowerCase().substring(0, 7) == "mailto:"){
				e.preventDefault();
				//	return true;
		}
		
	});

	try{
		jQuery.fn.removeClassExcept = function (val) {
		    return this.each(function () {
		        $(this).removeClass().addClass(val);
		    });
		};

		$("body").on("click",".cbp-spmenu-vertical a",function(){
			var link = $(this).attr("href");
			var rel = $(this).attr("rel");
			if( (link!="" || link!=undefined) && (rel=="" || rel==undefined) ){
				$("#mascMenuResp").trigger("click");
			}
		});


		// if($("html").attr("ismenuv2")==1){
		if($("html").attr("ismenuv2")==1110){

			var arrayLinksMenu = [];
			if( $("[module='menu']").attr("tsplugin")!=1 || $('[module="categorias"][tsplugin="4"]').length>0){
				var tipoMenu = "normal";
				if($("[module='menu']").attr("tsplugin")==2){
					tipoMenu = "onepage";
				}
				var html = $("[module='menu'] .omw-menu").html();
				if(html != undefined || $(".omw-modulo-responsive-bar").length>0 || $('[module="categorias"][tsplugin="4"]').length>0){
					var htmlMega = $('[module="categorias"][tsplugin="4"]').html();
					if(html==undefined && htmlMega==undefined){
						$(".dl-menuwrapper").css("display","none");
					}

					if(html!=undefined || $('[module="categorias"][tsplugin="4"]').length>0){
						var htmlClean = $(html + " *").removeClassExcept("hideMenuMobile hideMenuAll");
						//html = "<ul>" + $(html + " *").removeClass().prop("outerHTML") + "</ul>";
						if($(htmlClean).length>0){
							html = "<ul>" + $(htmlClean).prop("outerHTML") + "</ul>";
						}
						var html = $(html).clone();


						/* ********************* */
						/* INICIO MENU RESP NOVO */
						/* ********************* */
						var html1 = html.clone();
						var aux=0;
						var htmlNewMenuResp="";
						$(html1).find("ul").each(function(){
							if($(this).hasClass("hsub")){
								$(this).attr("id","filho_"+aux);
								$(this).closest("li.has-sub").children("a").attr("rel","filho_"+aux)
								aux++;
							}
							if(!$(this).hasClass("hsub")){
								$(this).addClass("filhoBase");
							}
						})

						var arrayFilhos=[];
						$(html1).find("ul").each(function(){
							if($(this).hasClass("filhoBase")){
								var htmlFilhos = "<div class='filhoBase'>";
							}else{
								var htmlFilhos = "<div class='filho' id='"+$(this).attr("id")+"'><h3>"+$(html1).find("a[rel='"+$(this).attr("id")+"']").text()+"</h3>";
							}
							$(this).children("li").each(function(){
								//console.log($(this).children("a").attr("href"))
								var relNew="";
								var escondeMobile = "";
								if($(this).hasClass("hideMenuMobile") || $(this).hasClass("hideMenuAll")){
									escondeMobile="hideMenuMobile";
								}
								if($(this).children("a").attr("rel")!=undefined){
									relNew=" rel='"+$(this).children("a").attr("rel")+"'";
								}
								var link1="#";
								if($(this).children("a").attr("href")!="" && $(this).children("a").attr("href")!=null && $(this).children("a").attr("href")!=undefined){
									link1=$(this).children("a").attr("href");
								}
								//console.log(link1)
								htmlFilhos += "<a tipoMenu='"+tipoMenu+"' class='"+escondeMobile+"' href='"+link1+"' "+relNew+">"+$(this).children("a").text()+"</a>";
							});
							htmlFilhos += "</div>";
							arrayFilhos.push(htmlFilhos);
						})

					
						var htmlMenuFinal="";
						if($(htmlClean).length==0){
							htmlMenuFinal="<div class='filhoBase'></div>";
						}
						for(var mr=0; mr<arrayFilhos.length; mr++){
							htmlMenuFinal+=arrayFilhos[mr];
						}

						//$("#cbp-spmenu-s1.cbp-spmenu").html(htmlMenuFinal);
						$("#cbp-spmenu-s1.cbp-spmenu .respMenuIconBar").before(htmlMenuFinal);

						if($(".mm-option-title").length>0){
							if($(".mm-1-title-element").length>0){
								var textoPrimeiroMenu = $(".mm-option-title:first-child .mainMegamenu").text();
								 // $(".filhoBase").append('<a href="#" rel="categoriasMega" class="respMegamenuMain" target="_self">'+translations.i18n["trad103"]+'</a>');
								// $(".filhoBase").append('<a href="#" rel="categoriasMega" class="respMegamenuMain" target="_self">'+textoPrimeiroMenu+'</a>');
								if($('[tipomenu="normal"]').first().length>0){
									if (isFacebookApp()){
										$('[tipomenu="normal"]').first().before('<a href="'+translations.i18n["trad0"]+'">'+textoPrimeiroMenu+'</a>');
									}
									else{
										$('[tipomenu="normal"]').first().before('<a href="'+translations.i18n["trad0"]+'" rel="categoriasMega" class="respMegamenuMain" target="_self">'+textoPrimeiroMenu+'</a>');
									}
								}else{
									if (isFacebookApp()){
										$(".filhoBase").append('<a href="'+translations.i18n["trad0"]+'">'+textoPrimeiroMenu+'</a>');
									}
									else{
										$(".filhoBase").append('<a href="'+translations.i18n["trad0"]+'" rel="categoriasMega" class="respMegamenuMain" target="_self">'+textoPrimeiroMenu+'</a>');
									}
									
								}
							}
						}
						var aux=0;
						var aux2=0;
						var html_marcas_final="";
						var html_marcas_final1="";
						var html_marcas_final2="";
						//$(".mm-1-title-element, .mm-title-element").not(".marcasMainBox").each(function(){
							console.log("entrou aqui nandex 2")
						$(".mm-1-title-element").not(".marcasMainBox, .mainMegamenu2").each(function(){

							var link2="#";
							if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
								link2=$(this).closest("a").attr("href");
							}
							console.log("entrou aqui nandex")
							console.log(link2)
							if($(this).closest(".mm-1-option-title").find(".mm-1-option-sub .mm-1-subnivel-titulo").length>0){						
								html_marcas_final += "<a href='"+link2+"' rel='marca_"+aux+"'>"+$(this).text()+"</a>";
							}else{
								html_marcas_final += "<a href='"+link2+"'>"+$(this).text()+"</a>";
							}

							var hrefParent1=$(this).closest("a").attr("href");
							var nomeNivel1=$(this).text();

							if($(this).closest(".mm-1-option-title").find(".mm-1-option-sub .mm-1-subnivel-titulo").length>0){
								html_marcas_final1+="<div class='filho t_subnivel1' id='marca_"+aux+"'><h3>"+nomeNivel1+"</h3>";
								html_marcas_final1+="<a href='"+hrefParent1+"'>"+translations.i18n["trad105"]+"</a>";
								$(this).closest(".mm-1-option-title").find(".mm-1-option-sub .mm-1-subnivel-titulo").each(function(){
									var link3="#";
									if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
										link3=$(this).closest("a").attr("href");
									}
									if($(this).closest(".mm-1-subnivel").find(".mm-1-subnivel2-titulo").length>0){
										html_marcas_final1 += "<a href='"+link3+"' rel='marca2_"+aux2+"'>"+$(this).text()+"</a>";
									}else{
										html_marcas_final1 += "<a href='"+link3+"'>"+$(this).text()+"</a>";
									}
									var nomeNivel2=$(this).text();
									var hrefParent2=$(this).closest("a").attr("href");
									if($(this).closest(".mm-1-subnivel").find(".mm-1-subnivel2-titulo").length>0){
										html_marcas_final2+="<div class='filho t_subnivel2' id='marca2_"+aux2+"'><h3>"+nomeNivel2+"</h3>";
										html_marcas_final2+="<a href='"+hrefParent2+"'>"+translations.i18n["trad105"]+"</a>";
										$(this).closest(".mm-1-subnivel").find(".mm-1-subnivel2-titulo").each(function(){
											var link4="#";
											if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
												link4=$(this).closest("a").attr("href");
											}
											html_marcas_final2 += "<a href='"+link4+"'>"+$(this).text()+"</a>";
										})
										html_marcas_final2+="</div>";
										//$(".cbp-spmenu").append(html_marcas_nivel2);
									}
									aux2++;
								})
								html_marcas_final1+="</div>";
								//$(".cbp-spmenu").append(html_marcas_nivel1);
							}
							aux++;
						});

						var html_tags = "";
						var html_tags1 = "";
						
						if (!isFacebookApp()){
							if($(".marcasMainBox[rel='marcas']").length>0){
								// var clone = $(".marcasMainBox").clone();
								var clone = $(".marcasMainBox[rel='marcas']").clone();
								$(clone).find(".marcasMain").remove();
								html_tags += "<a href='#' tipomenu='normal' rel='marcasMobileBox'>"+$(clone).text()+"</a>";

								html_tags1+="<div class='filho t_subnivel1' id='marcasMobileBox'><h3>"+$(clone).text()+"</h3>";
								$(".marcasMainBox .mm-marcas-titulo").each(function(){
									var link2="#";
									if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
										link2=$(this).closest("a").attr("href");
									}
									html_tags1 += "<a href='"+link2+"'>"+$(this).text()+"</a>";
								});
								html_tags1+="</div>";
							}

							if($(".marcasMainBox[rel='promocoes']").length>0){
								
								var clone = $(".marcasMainBox[rel='promocoes']").clone();
								$(clone).find(".marcasMain").remove();
								html_tags += "<a href='#' tipomenu='normal' rel='promoMobileBox'>"+$(clone).text()+"</a>";

								html_tags1+="<div class='filho t_subnivel1' id='promoMobileBox'><h3>"+$(clone).text()+"</h3>";
								var auxF=0;
								$(".marcasMainBox[rel='promocoes'] .mm-marcas-titulo").each(function(){
									var link2="#";
									if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
										link2=$(this).closest("a").attr("href");
									}
									html_tags1 += "<a href='"+link2+"' rel='promo_"+auxF+"'>"+$(this).text()+"</a>";



									var nomeNivel2=$(this).text();
									var hrefParent2=$(this).closest("a").attr("href");
									if($(this).closest(".marcasMain").find(".mm-1-subnivel2-titulo[relpai='"+$(this).attr("rel")+"']").length>0){
										html_marcas_final2+="<div class='filho t_subnivel2' id='promo_"+auxF+"'><h3>"+nomeNivel2+"</h3>";
										html_marcas_final2+="<a href='"+hrefParent2+"'>"+translations.i18n["trad105"]+"</a>";
										$(this).closest(".marcasMain").find(".mm-1-subnivel2-titulo[relpai='"+$(this).attr("rel")+"']").each(function(){
											var link4="#";
											if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
												link4=$(this).closest("a").attr("href");
											}
											html_marcas_final2 += "<a href='"+link4+"'>"+$(this).text()+"</a>";
										})
										html_marcas_final2+="</div>";
										//$(".cbp-spmenu").append(html_marcas_nivel2);
									}
									auxF++;

								});
								html_tags1+="</div>";


							}
						}

						
						$(".mm-title-element, .mm-1-title-element.mainMegamenu2").not(".marcasMainBox").each(function(index){
							//if(index>0){
							if($(this).hasClass("mainMegamenu2")){
								var link2="#";
								if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
									link2=$(this).closest("a").attr("href");
								}
								html_tags += "<a href='"+link2+"'>"+$(this).text()+"</a>";
							}else{
								if(index>0){
									var link2="#";
									if($(this).closest("a").attr("href")!="" && $(this).closest("a").attr("href")!=null && $(this).closest("a").attr("href")!=undefined){
										link2=$(this).closest("a").attr("href");
									}
									html_tags += "<a href='"+link2+"'>"+$(this).text()+"</a>";
								}
							}
						});

						// MARCAS
						$("#cbp-spmenu-s1.cbp-spmenu").append("<div class='filho' id='categoriasMega'><h3>MENU</h3>"+html_marcas_final+"</div>");
						$("#cbp-spmenu-s1.cbp-spmenu").append(html_marcas_final1);
						$("#cbp-spmenu-s1.cbp-spmenu").append(html_marcas_final2);

						if($(".mm-option-title").length==0){
							// $(".filhoBase").append(html_marcas_final);
							if($('[tipomenu="normal"]').first().length>0){
								$('[tipomenu="normal"]').first().before(html_marcas_final);
							}else{
								$(".filhoBase").append(html_marcas_final);
							}
						}

						if($(".mm-1-title-element").length>0){
							// $(".filhoBase").append(html_tags);
							// $("#cbp-spmenu-s1.cbp-spmenu").append(html_tags1);
							if($('[tipomenu="normal"]').first().length>0){
								$('[tipomenu="normal"]').first().before(html_tags);
							}else{
								$(".filhoBase").append(html_tags);
							}
							$("#cbp-spmenu-s1.cbp-spmenu").append(html_tags1);
						}


						/* ******************* */
						/* FIM MENU RESPONSIVO */
						/* ******************* */

						$(html).find("*").removeClass().find("li").parent("ul:not(:first-child)").addClass("dl-submenu");
						$(html).children("ul").addClass("dl-menu");

						$(html).find("li").each(function(){
							if($(this).attr("rel")!=""){
								$(this).addClass($(this).attr("rel"));
							}
						});
						var output = $(html).html();
					}

					if(html==undefined && htmlMega!=undefined){
						html = '<ul params="" class="dl-menu"><li class=""><a href="/home" target="_self">Home</a></li></ul>';
						var output = $(html);
					}
					
					$(".dl-menuwrapper").remove("ul").append(output);
					// $( '.dl-menuwrapper' ).dlmenu({
					// 	backLabel: "Voltar",
					// 	animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' },
					// 	useActiveItemAsBackLabel:true
					// });
					var alturaMenu = ($(".dl-menu").height()+55);
					var alturaJanela = $(window).height();
					$("#builder-sections").addClass("temMenu");
					$(".dl-menu").css("max-height",(alturaJanela-55)+"px");
					$(".dl-menu").css("overflow-y","auto");
					$(".omw-responsive-bar .dl-menuwrapper ul.dl-menu>li").each(function(){
						var link = $(this).find("a").attr("href");
						arrayLinksMenu.push(link);
					});
					var temHome=0;
					for(var i=0; i<arrayLinksMenu.length;i++){
						if(arrayLinksMenu[i]!=undefined){
							var str1 = arrayLinksMenu[i].toLowerCase();
							var str2 = "/home";
							if(str1.indexOf(str2) != -1){
							    temHome=1;
							}
							var str3 = "/"+$("html").attr("iso")+"/home";
							if(str1.indexOf(str3) != -1){
							    temHome=1;
							}
						}
					}
					if(temHome==0){
						$("ul.dl-menu").prepend('<li class=""><a href="/home" target="_self">Home</a></li>');
					}
					if($(".mm-1-title-element").length>0){
						$("ul.dl-menu").append('<li class=""><a href="#" class="respMegamenuMain" target="_self">'+translations.i18n["trad103"]+'</a></li>');
					}
					var aux=0;
					$(".mm-1-title-element").not(".marcasMainBox").each(function(){
						var link = $(this).closest("a").attr("href");
						var html_base = '<li class=""><a href="'+link+'" class="respMegamenu" target="_self" rel="mob_'+aux+'">'+$(this).text()+'</a>';
						var html_lvlone = '<ul params class="dl-submenu">';
						var aux_index = 0;
						$(this).closest(".mm-1-option-title").find(".mm-1-option-sub .mm-1-subnivel-titulo").each(function(){
							var link = $(this).closest("a").attr("href");
							aux_index++;
							html_lvlone+='<li class=""><a href="'+link+'" class="respMegamenu" target="_self">'+$(this).text()+'</a>';

							var aux_index2 = 0;
							var html_lvltwo = '<ul params class="dl-submenu">';
							$(this).closest(".mm-1-subnivel").find(".mm-1-subnivel2-titulo").each(function(){
								//console.log($(this).text());
								aux_index2++;
								var link = $(this).closest("a").attr("href");
								html_lvltwo+='<li class=""><a href="'+link+'" class="respMegamenu" target="_self">'+$(this).text()+'</a></li>';
							});
							html_lvltwo+="</ul>";
							if(aux_index2>0){
								html_lvlone+=html_lvltwo;
							}
							html_lvlone+='</li>';

						});
						html_lvlone+="</ul>";
						if(aux_index>0){
							html_base+=html_lvlone;
						}
						html_base+="</li>";
						//console.log(html_base)


						$("ul.dl-menu").append(html_base);
					});
					// $( '.dl-menuwrapper' ).dlmenu({
					// 	backLabel: "Voltar",
					// 	animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' },
					// 	useActiveItemAsBackLabel:true
					// });

				}else{
					$(".omw-responsive-bar").addClass("omw-responsive-bar-hide");
				}
			}else{
				//O código para o menu 1 agora está no js do plugin			
			}
		}

	}catch(err){console.log(err);}


	// $(".omw-responsive-bar ul.dl-menu a[rel='section']").on("click",function(){
	// 	$(".dl-trigger").trigger("click");
	// });
	// $(".dl-trigger").on("click",function(){
	// 	if($(this).hasClass("open")){
	// 		$("body").addClass("bloqueiaBody");
	// 	}else{
	// 		$("body").removeClass("bloqueiaBody");
	// 	}
	// });

	
	// CUSTOM OMW SCRIPTS TO LOAD ON SCRIPT.JS
	if ($("#builder-sections.live-preview .omw-background-slideshow").length > 0) {
		
		$( "#builder-sections.live-preview .omw-background-slideshow" ).each(function( obj ) {
			//console.log("entrou imagens vegas original")
			try{
				var tipoFundo = "imagens";
				try{
					tipoFundo = $.parseJSON(Base64.decode($(this).attr("builder"))).backgroundType.value;
				}catch(err){
					tipoFundo = "imagens";
				}
				var arrayTmp = Array();
				var parallax=false;
				var builderSettings = $.parseJSON(Base64.decode($(this).attr("builder")));
				if(tipoFundo == "imagens"){
					var builderSettings1 = builderSettings.backgroundImages.value.split(",");
					$.each(builderSettings1, function(index, value){
						var dummyObj = {"src": value};
						arrayTmp.push(dummyObj);
						
					});
					try{
						if (builderSettings.backgroundAttachment.value=="parallax") parallax=true;
					}
					catch(err){}

				}else if(tipoFundo == "videos"){

					var builderSettings1 = (builderSettings.backgroundVideos)?builderSettings.backgroundVideos.value.split(","):"";
					var builderSettingsImageFundo = (builderSettings.backgroundVideoImage)?builderSettings.backgroundVideoImage.value.split(","):"";
					$.each(builderSettings1, function(index, value){
						var imgMobile = "";
						$.each(builderSettingsImageFundo, function(index, value){
							imgMobile=value;
						});
						if(value!=""){
							var dummyObj = {"src":imgMobile, "video":{src:[value],loop:true,mute:true}};
							arrayTmp.push(dummyObj);
						}else{
							var dummyObj = {"src":imgMobile};
							arrayTmp.push(dummyObj);
						}
					});
				}
				if(arrayTmp.length >1 && !parallax && tipoFundo != "videos"){
					try{
						$(this).vegas({
							timer:false,
						    slides: arrayTmp
						});
						updateAutoHeightAutoCenter();
					}
					catch(err){}
				}
				else{
					
					var safari=false;
					if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)  { 
						var safari = true;
					}
					
					$(this).filter("[parallax='true']:not('.vegas-container')").parallax({ 'coeff':0.5 });

				}


				if(arrayTmp.length >=1 && tipoFundo == "videos"){
					try{
						$(this).vegas({
							timer:false,
						    slides: arrayTmp
						});
						updateAutoHeightAutoCenter();
					}
					catch(err){}
				}

				//if($(document).width()>640){
					$.vegas.isVideoCompatible = function () {
					    // var devices = /(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i;
					    // return !devices.test(navigator.userAgent);

					    
					    return true;
					}
				//}


				// setTimeout(function(){
				// 	console.log($(".vegas-video"))
				// 	$(".vegas-video").attr("muted","true")
				// 	$(".vegas-video").attr("playsinline","playsinline")
				// 	$(".vegas-video").attr("webkit-playsinline","webkit-playsinline")
				// 	$(".vegas-video").attr("autoplay","true")
				// }, 1000);

				

			}catch(err){console.log(err);}
		});


	};

	// check omw-column-autoheight-autocenter
	updateAutoHeightAutoCenter();
			


	$('[module="menu"][tsplugin="2"] li').on("click", function(e){
		var hash = $(this).children("a").attr("href");

		if ($(this).children("a").attr("rel") != "section" && $(this).children("a").attr("rel")   ) {
			//location.href=hash;

		}
		else {

			// e.preventDefault();
			// try {
			// 	var position = $( $(this).children("a").attr("href") ).offset().top;
			// 	if ($("#builder-sections.live-preview .omw-lockzerofixed").length > 0) { 
			// 		position -=  $("#builder-sections.live-preview .omw-lockzerofixed").height();
			// 	}
			// 	if ($("#builder-sections.live-preview .omw-fixed").length > 0) { 
			// 		position -=  $("#builder-sections.live-preview .omw-fixed").height();
			// 	}
			// 	if ($("#builder-sections.live-preview .omw-header-dinamic").length > 0) { 
			// 		position -=  $("#builder-sections.live-preview .omw-header-dinamic").height();
			// 	}

			// 	TweenLite.to(window, 1, {scrollTo:{y:position}, ease:Power2.easeOut,onComplete:function(){
			// 	}});
			// }
			// catch(err){}
		}

	});

	// $('[module="menu"][tsplugin="3"] li').on("click", function(e){
	// 	var hash = $(this).children("a").attr("href").replace(/^.*?(#|$)/,'');
	// 	console.log("--> "+hash)
	// 	// if(hash!=""){
	// 	// 	e.preventDefault();
	// 	// 	try {
	// 	// 		var position = $( hash ).offset().top;
	// 	// 		TweenLite.to(window, 1, {scrollTo:{y:position}, ease:Power2.easeOut,onComplete:function(){}});
	// 	// 	}catch(err){}
	// 	// }
	// });


	 $('.omw-product-view-detail').flowtype({
					   minFont : 14,
					   maxFont : 25,
					   fontRatio : 10
					});
	 $('.omw-news-container-text').flowtype({
			   minFont : 14,
			   maxFont : 25,
			   fontRatio : 18
		   });



	$(".omw-campaign-tag").on("click",function(e) {
		e.preventDefault();

		 var posX = $(this).offset().left,
             posY = $(this).offset().top;
        
       
		$(".omw-product-campaign-container").remove();
		$("body").append("<div class='omw-product-campaign-container'>"+Base64.decode($(this).attr("campaign"))+"</div>");	
		
		if ( (e.pageX - $(".omw-product-campaign-container").width() / 2) + $(".omw-product-campaign-container").width() > $(window).width()   ){
			$(".omw-product-campaign-container").offset({top: e.pageY + 20});
	 	    $(".omw-product-campaign-container").offset({left: ($(window).width() / 2) - ($(".omw-product-campaign-container").width() / 2) });
	 	    $(".omw-product-campaign-container").fadeIn("fast", function(){
	 	    	$(".omw-product-campaign-container").bind( "clickoutside", function(event){
					
						$(".omw-product-campaign-container").remove();
				});
	 	    });
		}
		else{
			$(".omw-product-campaign-container").offset({top: e.pageY + 20});
	 	    $(".omw-product-campaign-container").offset({left: e.pageX - $(".omw-product-campaign-container").width() / 2 });
	 	    $(".omw-product-campaign-container").fadeIn("fast", function(){
	 	    	$(".omw-product-campaign-container").bind( "clickoutside", function(event){
					
						$(".omw-product-campaign-container").remove();
				});
	 	    });
		}
	});



	$( ".omw-map" ).each(function( index ) {
		
			var settings =  $.parseJSON(Base64.decode( $(this).attr("settings")));
			var showMarker = settings.showMarker;
			var showControls = settings.showControls;
			var blackAndWhite = settings.blackAndWhite;
			var mapType = settings.mapType;
			var allowDrag = settings.allowDrag;

			if(settings.staticmap=="true"){

				var styleArray = [
					{
						featureType: "all",
						stylers: [
						{ saturation: -80 }
						]
					}
					];

				var myLatLng = new google.maps.LatLng( settings.latitude,  settings.longitude );
				if (mapType=="map" || mapType==undefined) {
					var googleMapType = google.maps.MapTypeId.ROADMAP;
				}
				else {
						var googleMapType = google.maps.MapTypeId.SATELLITE;
				}

				if (allowDrag=="true" || allowDrag==undefined) {
						var allowDrag = true;
				}
				else {
						var allowDrag = false;
				}

				var mapOptions = {
					center: myLatLng,
					zoom:  settings.zoom,
					scrollwheel: allowDrag,
					draggable: allowDrag,
					disableDoubleClickZoom: true,
					disableDefaultUI:true,
					mapTypeId: googleMapType // SATELLITE
				};
				
				if (settings.blackAndWhite == "true") {
						mapOptions.styles = styleArray;
				}

				if (settings.showControls == "true") {
						mapOptions.disableDefaultUI = false;
				}
				var map = new google.maps.Map( document.getElementById( $(this).attr("id") ), mapOptions);

				if (settings.showMarker == "true") {
						if ( settings.iconImage == "") {
							var marker = new google.maps.Marker({ position: myLatLng,map: map});
						}
						else {
							var marker = new google.maps.Marker({ position: myLatLng,map: map,icon: settings.iconImage });
						}
				}
			}

	});
 			
		function resize() {
			// check floatingHeightAuto
			if ($(".omw-floating-autoheight").length > 0) {
				$(".omw-floating-autoheight").each(function(index) {
					var cloned = $(this).clone().css("position","relative").appendTo($("#builder-sections"));
					var height = $(cloned).height();
					var top = $(cloned).css("top").replace("px","").replace("%","");
					var bottom = $(cloned).css("bottom").replace("px","").replace("%","");
					$(cloned).remove();
					if (top < 0) height +=parseInt(top);
					if (bottom < 0) height +=parseInt(bottom);
					$(this).parent().closest(".row").css("height",height + "px");
				});
			}

			// check omw-column-autoheight
			if ($(".omw-column-autoheight").length > 0) {
			
				$(".omw-column-autoheight").each(function(index) {
					var altura = 0;
					$(this).find(".col").each(function(index2) {
						if ($(this).outerHeight() > altura) { 
							altura = $(this).outerHeight();
						}
					}); 
					$(this).find(".col").css("min-height",altura + "px");
				});
				
			}

			if($(".live-preview").length>0){
				var themetypeslide = $("html").attr("themetypeslide");
				if(themetypeslide=="slideshow_v2"){

					var htmlGuias = '<div id="guide_display_left" class="" style="left:0px;z-index:12;height:600px;top:0px;width:1px;border-right:2px dashed red;position:absolute;"></div>';
                    htmlGuias += '<div id="guide_display_right" class="" style="left:0px;z-index:12;height:600px;top:0px;width:1px;border-right:2px dashed red;position:absolute;"></div>';

                    $("#builder-sections").append(htmlGuias);

                    $(".omw-slideshow-plugin [module]:visible").each(function(){

						var larguraBox = $(this).closest("[module='slideshow']").attr("themetypeslideboxsize");
						var larguraSlide = $(this).closest("[module='slideshow']").outerWidth();
						// if($( window ).width()<larguraBox){
						// 	larguraBox=$( window ).width();
						// }
						if($( window ).width() <= 980){
							larguraBox = 320;
						}
						var posGuiaEsquerda = (parseInt(larguraSlide)-parseInt(larguraBox))/2;
						var posGuiaDireita = (parseInt(posGuiaEsquerda)+parseInt(larguraBox));
						$(this).closest("[module='slideshow']").find("#guide_display_left").css("left",posGuiaEsquerda+"px");
						$(this).closest("[module='slideshow']").find("#guide_display_right").css("left",posGuiaDireita+"px");

						var posModuloLeft = $(this).attr("percentxbuilder");
						var posModuloTop = $(this).attr("percentybuilder");
						var posModuloLeft_final = parseInt(posModuloLeft)+parseInt(posGuiaEsquerda);
						console.log("depois "+posModuloLeft+" - "+posModuloLeft_final)
						$(this).css("left", posModuloLeft_final+"px")

					});
				}
			}

			

			$(".omw-slideshow-plugin [module]:visible").each(function(){
				//console.log("nandex - "+$(this).closest("[module='slideshow']").attr("themetypeslide"))
				if($(this).closest("[module='slideshow']").attr("themetypeslide")!="slideshow_v2"){
					$(this).css({"left":"0"});
					$(this).css({"top":"0"});
					var containerW = parseFloat($(".omw-slideshow").width());
					var containerH = parseFloat($(".omw-slideshow-plugin:visible").height());

					var builderRes = parseFloat($(this).attr("slidebuilderres"));
					var builderHRes = $(".omw-slideshow-plugin:visible").height();

					var objW = parseFloat($(this).width());
					var objH = parseFloat($(this).height());

					var objLeftPos = parseFloat($(this).attr("percentx"));
					
					var objTopPos = parseFloat($(this).attr("percenty"));
					var objTopPosNoFullscreen = parseFloat($(this).attr("percenty"));
					
					if($(this).attr("aligncenter")=="true") {
		 				objLeftPos = Math.round( (containerW / 2) - ( objW  / 2 ) ) ;
		 				objTopPos = Math.round( (containerH / 2) - ( objH / 2 ) ) ;
					}
					else {
						if($(this).attr("aligncenter")=="alignleft") {
							objLeftPos=0;

						}
						else if($(this).attr("aligncenter")=="alignright") {
							objLeftPos=containerW - objW -1;
						}		
						else {
							
							if(containerW >= builderRes){
								objLeftPos = objLeftPos + ((containerW - builderRes) / 2);
								if (objLeftPos<=5) objLeftPos = 0;
								if (objLeftPos + objW >= containerW) objLeftPos = containerW - objW - 1;
							}else{
								objLeftPos = objLeftPos + ((containerW - builderRes) / 2);
								if (objLeftPos<=30) objLeftPos = 30;
								if (objLeftPos + objW >= containerW) objLeftPos = containerW - objW - 1;
							}

							if(containerH >= builderHRes){
								objTopPos = objTopPos + ((containerH - builderHRes) / 2);
								if (objTopPos<=5) objTopPos = 0;
								if (objTopPos + objH >= containerH) objTopPos = containerH - objH - 1;
							}else{
								objTopPos = objTopPos + ((containerH - builderHRes) / 2);
								if (objTopPos<=30) objTopPos = 30;
								if (objTopPos + objH >= containerH) objTopPos = containerH - objH - 1;
							}

						}
						
				    }


					$(this).css({"left": objLeftPos + "px" });
					
				    if ( ($(this).parent().parent().attr("style").indexOf("100vh")>=0) && (builderHRes>0)   ) {
				    	$(this).css({"top": objTopPos + "px" });
				    }else{
				    	if($(this).attr("slidebuilderhres")=="" && objTopPosNoFullscreen<=100 && objTopPosNoFullscreen>=0){ // VALIDAÇÃO PARA VER SE SAO SLIDESHOWS ANTIGOS QUE NAO TEM slidebuilderhres
				    		$(this).css({"top": objTopPosNoFullscreen + "%" });
				    	}else{
				    		$(this).css({"top": objTopPosNoFullscreen + "px" });
				    	}
				    }

			    }else{
					var larguraBox = $(this).closest("[module='slideshow']").attr("themetypeslideboxsize");
					var larguraSlide = $(this).closest("[module='slideshow']").outerWidth();
					// if($( window ).width()<larguraBox){
					// 	larguraBox=$( window ).width();
					// }
					if($( window ).width() <= 980){
						larguraBox = 320;
					}
					var posGuiaEsquerda = (parseInt(larguraSlide)-parseInt(larguraBox))/2;
					var posGuiaDireita = (parseInt(posGuiaEsquerda)+parseInt(larguraBox));
					$(this).closest("[module='slideshow']").find("#guide_display_left").css("left",posGuiaEsquerda+"px");
					$(this).closest("[module='slideshow']").find("#guide_display_right").css("left",posGuiaDireita+"px");

					var posModuloLeft = $(this).attr("percentxbuilder");
					var posModuloTop = $(this).attr("percentybuilder");
					var posModuloLeft_final = parseInt(posModuloLeft)+parseInt(posGuiaEsquerda);
					//console.log(posModuloLeft+" - "+posModuloLeft_final)
					$(this).css("left", posModuloLeft_final+"px")
				}

			});


			$( ".omw-brands" ).each(function( index ) {
		 		switch( $(this).parent().attr("omwversion") ){
					case "1":
						var altura = 0;
				 		var objbrands = $(this);
				 		objbrands.find("img").each(function( index2 ) {
				 			if(altura<$(this).height()){
					 			altura = $(this).height();
					 			objbrands.find(".noAnimation").css({"height":altura });
			 					objbrands.find(".owl-item").css({"height":altura });
					 		}
				 			objbrands.find("img").css("visibility","visible");
				 		});
					break;
				}
			});
			
			$("#optionsPanel").css({"height":$(window).height()+"px"});
			$("#optionsPanel-container").css({"height":($(window).height() - 80)+"px"});

			var disposicao = $("[module='newsletter']").find("button").css("clear");
			if(disposicao=="none"){
				if ( $(".omw-custom-newsletter").length >0  ) {
					 var inputPadding = 20;
					 $(".omw-custom-newsletter").each(function(index) {
					 	var parentColumnWidth = $(this).closest(".column").width();
					 	var inputWidth = $(this).children("input").width();
					 	var buttonWidth = parseInt($(this).children("button").width()) + (parseInt($(this).children("button").attr("customSize")) * 2)  ;

					 	var settings =  $.parseJSON(Base64.decode( $(this).attr("settings")));
					 	var componentWidth =  parseInt(settings.margin) +  parseInt($(this).children("input").attr("customSize")) + buttonWidth;
					 	if (componentWidth > parentColumnWidth ) {
					 		// mete um botao abaixo do input
					 		$(this).children("input").width(parentColumnWidth - inputPadding + "px");
					 		$(this).children("button").css("float","none");
					 		$(this).children("button").css("margin-top","1.6%");
					 		$(this).children("button").css("margin-left","0");
					 		if (parseInt(settings.radius) > 0 && parseInt(settings.margin) == 0 ) {
					 			$(this).children("button").css("border-radius", settings.radius + "px");
					 			$(this).children("input").css("border-radius", settings.radius + "px");
					 		}
					 	}
					 	else {
					 		// mete o botao à direita do input
							$(this).children("input").width($(this).children("input").attr("customSize") - inputPadding + "px");
					 		$(this).children("button").css("float","left");
					 		$(this).children("button").css("margin-top","0");

					 		$(this).children("button").css("margin-left",settings.margin + "px");	

					 		if (parseInt(settings.radius) > 0 && parseInt(settings.margin) == 0 ) {
					 			$(this).children("button").css({"border-top-left-radius":"0px","border-bottom-left-radius": "0px" });
					 			$(this).children("input").css({"border-top-right-radius":"0px","border-bottom-right-radius": "0px" });
					 		}

					 	}

					 });
				}
			}

			
		}
		function putModulesRespBar(){
      
			
			var controloModulosResp=0;
			var controloModulosResp2=0;
			var temLogin=0;
			var temPesquisa=0;
			var temLinguas=0;
			var temCarrinho=0;
			// $("[module='loginlite'],[module='currency'],[module='search'][tsplugin='1'],[module='idiomas'],[module='shoppingcart']").each(function(){
			$("[module='loginlite'],[module='currency'],[module='search'],[module='idiomas'],[module='shoppingcart']").each(function(){
				if($(".omw-responsive-bar").find("[module='"+$(this).attr("module")+"']").length==0){
					var htmlModulo = "";
					var objClonar = $(this).clone();
					objClonar.addClass("moduleCloned");
					objClonar.css("float","right");
					objClonar.css("margin","0");
					objClonar.css("clear","none");
					objClonar.css("z-index","999");
					objClonar.find("i").css("font-size","20px");
					if($(this).attr("module")=="loginlite"){
						temLogin++;
						if($("[module='menu']").attr("tsplugin")==1){
							objClonar.css("z-index","9999");
							objClonar.find(".morph-content i").css("font-size","");
							objClonar.find(".morph-content").css("line-height","normal");
							objClonar.find(".morph-button").css("height","50px");
							objClonar.find(".morph-button .omw-login-link div").css("display","none");
							objClonar.find(".morph-button .omw-login-link i").css("margin","0");
							objClonar.find(".morph-button .omw-login-link i").css("display","block");
							//htmlModulo="<a href='"+$(this).find("a.omw-login-link").attr("href")+"' class='responsiveBarPadding iconNewRespBar'>"+$(this).find("a.omw-login-link").text()+"</a>";
						}else{
							var estalogado = $(this).find("div[temlogin]").attr("temlogin");
							
							var tradBtn1 = translations.i18n["trad107"];
							var tradBtn1Css = "";
							var tradBtn2 = translations.i18n["trad108"];
							var tradBtn2Href = $(this).find("a.omw-login-link").attr("href")+"/"+translations.i18n["trad106"];
							if(estalogado==1){
								tradBtn1Css = "width:100% !important;";
								tradBtn1 = translations.i18n["trad2419"];
								tradBtn2 = translations.i18n["trad81"];
								tradBtn2Href = "logout";
							}

							htmlModulo="<div style='float:left;width:100%;'>";
							htmlModulo+="<a href='"+$(this).find("a.omw-login-link").attr("href")+"' class='responsiveBarPadding iconNewRespBarLogin' style='border-right:1px solid #f5f5f5;"+tradBtn1Css+"'>"+tradBtn1+"</a>";
							if(estalogado==0){
								htmlModulo+="<a href='"+tradBtn2Href+"' class='responsiveBarPadding iconNewRespBarLogin'>"+tradBtn2+"</a>";
							}
							htmlModulo+="</div>";
						}
					}
					if($(this).attr("module")=="search"){
						if($(this).attr("tsplugin")==1){
							objClonar.css("cssText", "float: right !important;");
							objClonar.css("display","block");
							objClonar.css("clear","none");
							objClonar.find("i").css("font-size","18px");
							objClonar.find("i").css("color","#fff");
							objClonar.css("position","relative");
							objClonar.find("i").removeClass("fa").removeClass("fa-search").html('<svg width="24" height="24" enable-background="new 0 0 26 26" id="Слой_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.9462891,1C9.4033203,1,4.8935547,5.5097656,4.8935547,11.0532227  c0,2.5022583,0.9248047,4.7885132,2.4428101,6.5498657l-6.1166382,6.1166382c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266l6.1165771-6.1165771  c1.7612305,1.5180054,4.0474243,2.442749,6.5494385,2.442749C20.4902344,21.1064453,25,16.5966797,25,11.0532227  S20.4902344,1,14.9462891,1z M14.9462891,19.6064453c-4.7158203,0-8.5527344-3.8369141-8.5527344-8.5532227  S10.2304688,2.5,14.9462891,2.5C19.6630859,2.5,23.5,6.3369141,23.5,11.0532227S19.6630859,19.6064453,14.9462891,19.6064453z" fill="#1D1D1B"/></svg>');
						}else{
							objClonar.addClass("barraPesqMobile");
							var elem = $(objClonar).find(".omw-plugin-search-container");
							$(elem).attr('style', $(elem).attr('style') + '; ' + 'background-color: transparent !important');
							var elem2 = $(objClonar).find(".omw-plugin-search-container button");
							$(elem2).attr('style', $(elem2).attr('style') + '; ' + 'background-color: transparent !important');
						}
					}
					if($(this).attr("module")=="idiomas"){
						temLinguas++;
						var lingua = $("html").attr("langext");
						
						var htmlBandeiras2="<div class='newRespBarLangOptions'><ul class='langOptions'>";
						var numLangs=0;
						if(objClonar.attr("tsplugin")==1){
							objClonar.find(".omw-idiomas span a").each(function(){
								//var lgSpan = $(this).attr("href").slice(-2);
								lgSpan = $(this).attr("rellang");
								if(lgSpan!=lingua){
									numLangs++;
									htmlBandeiras2+='<li><a href="'+$(this).attr("href")+'"><span>'+lgSpan+'</span></a></li>';
								}
							});
						}else if(objClonar.attr("tsplugin")==2){
							objClonar.find(".omw-idiomas a").each(function(){
								//var lgSpan = $(this).attr("href").slice(-2);
								lgSpan = $(this).attr("rellang");
								if(lgSpan!=lingua){
									numLangs++;
									htmlBandeiras2+='<li><a href="'+$(this).attr("href")+'"><span>'+lgSpan+'</span></a></li>';
								}
							});
						}
						htmlBandeiras2+="</ul></div>";
						htmlModulo="<div class='responsiveBarPadding iconNewRespBar' rel='"+numLangs+"'><div class='newRespBarLangCurrent'>"+lingua+"</div>"+htmlBandeiras2+"</div>";
					}
					if($(this).attr("module")=="shoppingcart"){
						objClonar.css("margin-top","0px");
						objClonar.find(".omw-cart-total").addClass("respBarModBox-cart");
						objClonar.find(".omw-cart-total").css("font-size","15px");
						objClonar.find("i").after('<svg width="24" height="24" enable-background="new 0 0 26 26" id="Слой_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M22.6835938,7.1357422c-0.0253906-0.3955078-0.3525391-0.703125-0.7490234-0.703125h-3.9697266V5.2597656  C17.9648438,2.9111328,15.7373047,1,13,1S8.0351563,2.9111328,8.0351563,5.2597656v1.1728516H4.0654297  c-0.3964844,0-0.7236328,0.3076172-0.7490234,0.703125L2.2509766,24.203125  c-0.0126953,0.2070313,0.0605469,0.4091797,0.2021484,0.5605469C2.5947266,24.9140625,2.7929688,25,3,25h20  c0.2070313,0,0.4052734-0.0859375,0.546875-0.2363281c0.1416016-0.1513672,0.2148438-0.3535156,0.2021484-0.5605469  L22.6835938,7.1357422z M9.5351563,5.2597656C9.5351563,3.7382813,11.0898438,2.5,13,2.5s3.4648438,1.2382813,3.4648438,2.7597656  v1.1728516H9.5351563V5.2597656z M8.0351563,7.9326172v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75  V7.9326172h6.9296875v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75V7.9326172h3.2646484  l0.6498413,10.4003906H4.1206665L4.7705078,7.9326172H8.0351563z M3.7978516,23.5l0.260376-4.1669922h17.8835449L22.2021484,23.5  H3.7978516z" fill="#1D1D1B"/></svg>');
						objClonar.find("i").remove();
						objClonar.find("a").css("display","table");
						objClonar.find("a").css("line-height","50px");
						objClonar.find("a span").css("vertical-align","middle");
						objClonar.find("a span").css("line-height","50px");
					}


					if($(this).attr("module")=="shoppingcart"){
						$(".respBarModBox").prepend(objClonar);
						// $(".respMenuIconBar").prepend(objClonar);
						objClonar.addClass("responsiveBarNoPadding");
					}else if($(this).attr("module")=="search"){
						$(".respBarModBox").append(objClonar);
						objClonar.addClass("responsiveBarPadding");
					}else{
						if($(this).attr("module")=="loginlite" && $("[module='menu']").attr("tsplugin")==1){
							$(".respBarModBox").append(objClonar);
							objClonar.addClass("responsiveBarPadding");
						}else{
							//$(".respBarModBox").append(objClonar);
							//$(".respMenuIconBar").append(objClonar);
							if($(this).attr("module")=="idiomas"){
								if(temLinguas==1){
									controloModulosResp++;
									$(".respMenuIconBar").prepend(htmlModulo);
								}
							}else if($(this).attr("module")=="loginlite"){
								if(temLogin==1){
									controloModulosResp++;
									controloModulosResp2++;
									$(".respMenuIconBar").append(htmlModulo);
								}
							}else{
								$(".respMenuIconBar").append(htmlModulo);
							}
							objClonar.addClass("responsiveBarPadding");
						}
					}


					objClonar.removeClass("omw-modulo-responsive-bar");

				}
				if($(".omw-responsive-bar").css("display")=="none"){
					$(this).css("display","table");
				}else{
					if($(this).hasClass("moduleCloned")==false){
						$(this).css("display","none");
					}
				}
			});
			if(controloModulosResp==1){
				if(controloModulosResp2==0){
					$("#cbp-spmenu-s1").attr("menuResp","menuRespOne");
					$(".respMenuIconBar").addClass("menuRespOne");
				}else{
					$("#cbp-spmenu-s1").attr("menuResp","menuRespOne2");
					$(".respMenuIconBar").addClass("menuRespOne2");
				}
			}else if(controloModulosResp>=2){
				$(".respMenuIconBar").addClass("menuRespTwo");
				$("#cbp-spmenu-s1").attr("menuResp","menuRespTwo");
			}else{
				$(".respMenuIconBar").addClass("menuRespNone");
				$("#cbp-spmenu-s1").attr("menuResp","menuRespNone");
			}
			//FIM
		}

		if($("html").attr("ismenuv2")==0){
			//$(".omw-responsive-bar").append("<div style='float:left' class='respBarModBox'></div>");
		}
	
		$( window ).resize(function() {
			resize();
		});
		$(document).ready(function(){
			resize();
		});

		/*if($("html").attr("ismenuv2")==0){
			if($(window).width()<=980){
				putModulesRespBar();
			}
		}*/
		
	};
		
	
	/* PUBLIC METHODS */ 
	return {
		init: function(){
			bindClickElements();
		},
		
		getSelectedObject: function() {
			return getSelectedObject();
		}
	};

}();

(function($){
  $.fn.parallax = function(options){
  	try{
  		$(this).css("display","table"); //Para que no chrome funcionar correctamente
	    var $$ = $(this);
	    offset = $$.offset();
	    var defaults = {
	      'start': 0,
	      'stop': offset.top + $$.height(),
	      'coeff': 0.95
	    };
	    var opts = $.extend(defaults, options);
	    opts.start= -($$.offset().top*opts.coeff);
	    var newCoordOrig = (($(window).scrollTop()*opts.coeff)+opts.start);
	    if( !$(".omw-responsive-bar").is(":visible") ){
	      	if ($(window).width() <= 980){
	      		newCoordOrig = (newCoordOrig+25);
	      	}
	    }else{
	    	if ($(window).width() <= 980){
	      		newCoordOrig = (newCoordOrig+25);
	      	}
	    }
	    $$.css("background-position", "center "+ newCoordOrig +"px" );
	    return this.each(function(){
	      $( window ).scroll(function() {
	        windowTop = $(window).scrollTop();
	        if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
	          newCoord = (windowTop * opts.coeff + opts.start);
	          if( !$(".omw-responsive-bar").is(":visible") ){
	          	if ($(window).width() <= 980) newCoord = (newCoord+25);
	          }else{
	          	if ($(window).width() <= 980) newCoord = (newCoord+25);
	          }
	          $$.css({
	              'background-position': 'center '+ newCoord + 'px'
	          });
	        }
	      });
	    });
	}catch(err){console.log("Erro parallax: "+err);}
  };
})(jQuery);

$('document').ready(function() {

	//INICIO código para novo modulo de listagem
	try{
		$(".starrr").each(function(){
			var ratingGlobal = $(this).attr("rel");
			var sku = $(this).attr("sku");
			$(".starrr[sku='"+sku+"']").jRate({
		        startColor: "#FBC74E",
		        endColor: "#FBC74E",
		        rating:ratingGlobal,
		        height: 14,
		        strokeWidth: '20px',
		        backgroundColor: 'transparent',
		        readOnly: true,
		        precision: 0.5
		    });
		})
	}catch(err){}

	$(".preview_main .detail_button").on("click",function(e){
		var sale_option = $(this).attr("saleoption");
		var hasoptions = $(this).attr("hasoptions");
		if( (sale_option=="imediata" || sale_option=="prevenda" || sale_option=="porencomenda") && hasoptions==0){
			e.preventDefault();
		}
	})
	$(".preview_main .preview_wish").on("click",function(e){
		e.preventDefault();
	})
	//FIM código para novo modulo de listagem


  
  $(".fechaSeccaoBtn").on("click",function(){
    var iddSeccao = $(this).closest(".row").attr("idd");
    $(this).closest(".row").remove();
    $.ajax({
			type: "POST",
			url: '/_inc/global_assets/builder/ajax/sectionHideAjax.php',
			data: "idd=" + iddSeccao,
			dataType:"json",
			success: function(data){
				
			},
			error: function(){
				
			}
		});
  })
  
  
	//******************************
	//COLOCAR MENU MOBILE CORRECTO
	//******************************
	function gereMenuMobileCurrent(element){
		$("#cbp-spmenu-s1").find("a[rel='"+element+"']").closest("div.filho").addClass("activa").addClass("activaPassed");
		var id = $("#cbp-spmenu-s1").find("a[rel='"+element+"']").closest("div.filho").attr("id");
		if(id != null && id != undefined && id != ""){
			if($("a[rel='"+id+"']").length>0){
				gereMenuMobileCurrent(id);
			}
		}
	}
	var curUrlMobile = $("nav").attr("cururl");
	$("#cbp-spmenu-s1 a").each(function(){
		var ele = $(this);
		if( $(ele).attr("href")==("/"+$("html").attr("iso")+"/"+curUrlMobile )) {
			if($(ele).closest("div.filho").length>0){
				$(ele).closest("div.filho").addClass("activa");
				$(".filhoBase").addClass("activaPassed");
				gereMenuMobileCurrent($(ele).closest("div.filho").attr("id"));
			}
		}
	});
	//*********************************************
	//FIM COLOCAR MENU MOBILE CORRECTO
	//*********************************************


	//***************
	//PESQUISA MOBILE
	//***************
	if($( window ).width() <= 768){
		$("[module='search'] i.btnpesquisa").on("click", function() {
			//$(this).closest(".module").find("#omw-search-panel-result").fadeIn().css("display","table").find("input").focus();
			$("#omw-search-panel-result[mobilesearch='sim']").fadeIn().css("display","table").find("input").focus();
		});

		//$$("div.module[module='search'] i#close").on("click", function() {
		$("body").on("click","#close", function() {
			//$(this).closest(".module").find("#omw-search-panel-result").fadeOut();
			$("#omw-search-panel-result[mobilesearch='sim'] input").val("");
			$("#omw-search-panel-result[mobilesearch='sim']").find("label").animate({
				opacity: 0
			}, 300, function() {
				$("#omw-search-panel-result[mobilesearch='sim']").find("label").removeClass("mostraMsgPesq");
			});
			$("#omw-search-panel-result[mobilesearch='sim']").fadeOut();
		});

		$("body").on("keyup","#omw-search-panel-result[mobilesearch='sim'] form input", function() {
			var c = $("#omw-search-panel-result[mobilesearch='sim'] .module-title").css("color");
			var rgb = c.match(/\d+/g);
			var rgbaColor = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+",0.5)";
			$("#omw-search-panel-result[mobilesearch='sim'] form label").css("color",rgbaColor);
			var searchString = $(this).val();
			if ( (searchString.length > 2) ) {
				$("#omw-search-panel-result[mobilesearch='sim'] form label").animate({
					opacity: 0
				}, 500, function() {
					// $("#omw-search-panel-result .mostraMsgPesq").css("display","none");
					$("#omw-search-panel-result[mobilesearch='sim'] .mostraMsgPesq").addClass("escondePesqmobileMessage");
				});
			}else{
				$("#omw-search-panel-result[mobilesearch='sim'] form label").animate({
					opacity: 1
				}, 500, function() {
					$("#omw-search-panel-result[mobilesearch='sim'] .mostraMsgPesq").removeClass("escondePesqmobileMessage");
				});
			}
		})

		$("body").on("submit","#omw-search-panel-result[mobilesearch='sim'] form", function(event) {
			event.preventDefault();
			var pesqTerm = $(this).find("input").val();
			if(pesqTerm.length>2){
				// var pesqUrl = "/" + $("html").attr("iso") + "/" + $(this).attr("action") + "/" + pesqTerm;
				var pesqUrl = "/" + $("html").attr("iso") + "/" + translations.i18n["trad2420"] + "/" + pesqTerm;
				// var pesqUrl = $(this).attr("action") + "/" + pesqTerm;
				location.href=pesqUrl;
			}else{
				$(this).find("label").addClass("mostraMsgPesq");
				$(this).find("label").animate({
					opacity: 1
				}, 300, function() {
					// Animation complete.
				});
			}
		})
	}
	//*******************
	//FIM PESQUISA MOBILE
	//*******************
	

	


	// String.prototype.filename=function(extension){
	//     var s= this.replace(/\\/g, '/');
	//     s= s.substring(s.lastIndexOf('/')+ 1);
	//     return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
	// }

	// function changeResponsiveImage(){
	// 	if($( window ).width() <= 768){
	// 		$("[module='image'] img, [module='logotipo'] img").each(function(){
	// 			var extensao = $(this).attr('src').split('.').pop();
	// 			var novoNome = $(this).attr("src").split('.').slice(0, -1).join('.')+"_thumb."+extensao;
	// 			$(this).attr("src",novoNome);
	// 		});
	// 	}
	// }
	// changeResponsiveImage();
	
	Builder.init();
	try {
		//CÓDIGO PARA ATUALIZAR OS MODULOS ANTIGOS DENTRO DO SLIDESHOW
		$( "[module='slideshow'] [module]" ).each(function( index ) {
			if($( this ).hasClass("wow")){
				$(this).removeClass("wow").addClass("omw-slideshow-item");
			}
		});
		//FIM
		new WOW({boxClass:"wow"}).init();
	}
	catch(err) {
		console.log(err);
	}

	$(".omw-slideshow-plugin:visible [module]").each(function(){
		console.log("nandex 1")
			if($(this).closest("[module='slideshow']").attr("themetypeslide")!="slideshow_v2"){
				$(this).css({"left":"0"});
				$(this).css({"top":"0"});
				var containerW = parseFloat($(".omw-slideshow").width());
				var containerH = parseFloat($(".omw-slideshow-plugin:visible").height());

				var builderRes = parseFloat($(this).attr("slidebuilderres"));
				var builderHRes = $(".omw-slideshow-plugin:visible").height();

				var objW = parseFloat($(this).width());
				var objH = parseFloat($(this).height());

				var objLeftPos = parseFloat($(this).attr("percentx"));
				var objTopPos = parseFloat($(this).attr("percenty"));
				var objTopPosNoFullscreen = parseFloat($(this).attr("percenty"));
				
				if($(this).attr("aligncenter")=="true") {
	 				objLeftPos = Math.round( (containerW / 2) - ( objW  / 2 ) ) ;
	 				objTopPos = Math.round( (containerH / 2) - ( objH / 2 ) ) ;
				}
				else {
			

					if($(this).attr("aligncenter")=="alignleft") {
						objLeftPos=0;

					}
					else if($(this).attr("aligncenter")=="alignright") {
						objLeftPos=containerW - objW -1;
					}		
					else {
						if(containerW >= builderRes){
							objLeftPos = objLeftPos + ((containerW - builderRes) / 2);
							if (objLeftPos<=5) objLeftPos = 0;
							if (objLeftPos + objW >= containerW) objLeftPos = containerW - objW - 1;
						}else{
							objLeftPos = objLeftPos + ((containerW - builderRes) / 2);
							if (objLeftPos<=30) objLeftPos = 30;
							if (objLeftPos + objW >= containerW) objLeftPos = containerW - objW - 1;
						}

						if(containerH >= builderHRes){
							objTopPos = objTopPos + ((containerH - builderHRes) / 2);
							if (objTopPos<=5) objTopPos = 0;
							if (objTopPos + objH >= containerH) objTopPos = containerH - objH - 1;
						}else{
							objTopPos = objTopPos + ((containerH - builderHRes) / 2);
							if (objTopPos<=30) objTopPos = 30;
							if (objTopPos + objH >= containerH) objTopPos = containerH - objH - 1;
						}

					}
					
			    }

			    if ( ($(this).parent().parent().attr("style").indexOf("100vh")>=0) && (builderHRes>0)   ) {
			    	$(this).css({"top": objTopPos + "px" });
			    }else{
			    	if($(this).attr("slidebuilderhres")=="" && objTopPosNoFullscreen<=100 && objTopPosNoFullscreen>=0){ // VALIDAÇÃO PARA VER SE SAO SLIDESHOWS ANTIGOS QUE NAO TEM slidebuilderhres
			    		$(this).css({"top": objTopPosNoFullscreen + "%" });
			    	}else{
			    		$(this).css({"top": objTopPosNoFullscreen + "px" });
			    	}
			    }
				$(this).css({"left": objLeftPos + "px" });
			}else{
				var larguraBox = $(this).closest("[module='slideshow']").attr("themetypeslideboxsize");
				if($( window ).width() <= 980){
					larguraBox = 320;
				}
				var larguraSlide = $(this).closest("[module='slideshow']").outerWidth();
				var posGuiaEsquerda = (parseInt(larguraSlide)-parseInt(larguraBox))/2;
				var posGuiaDireita = (parseInt(posGuiaEsquerda)+parseInt(larguraBox));
				$(this).closest("[module='slideshow']").find("#guide_display_left").css("left",posGuiaEsquerda+"px");
				$(this).closest("[module='slideshow']").find("#guide_display_right").css("left",posGuiaDireita+"px");

				var posModuloLeft = $(this).attr("percentxbuilder");
				var posModuloTop = $(this).attr("percentybuilder");
				var posModuloLeft_final = parseInt(posModuloLeft)+parseInt(posGuiaEsquerda);
				$(this).css("left", posModuloLeft_final+"px")

				console.log("final pos - " + (parseInt(posGuiaEsquerda)+parseInt(posModuloLeft)) )

				console.log(posModuloLeft + " --> " + posGuiaEsquerda + " - " + posModuloLeft_final)
			}

		});

	function GetIEVersion() {
		var sAgent = window.navigator.userAgent;
		var Idx = sAgent.indexOf("MSIE");

		// If IE, return version number.
		if (Idx > 0) 
			return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
		// If IE 11 then look for Updated user agent string.
		else if (!!navigator.userAgent.match(/Trident\/7\./)) 
			return 11;
		else
			return 0; //It is not IE
	}

	if (GetIEVersion() <= 0){
	   // column animation
		TweenLite.set(".omw-column-animation", {perspective:800});
		TweenLite.set(".omw-column-animation-flipper", {transformStyle:"preserve-3d"});
		TweenLite.set(".omw-column-card-animation", {perspective:800});
		TweenLite.set(".omw-column-card-animation-flipper", {transformStyle:"preserve-3d"});

		TweenLite.set([".omw-column-animation-flipy .omw-column-animation-back",".omw-column-animation-flipy .omw-column-animation-face"],{opacity:1});
		TweenLite.set([".omw-column-animation-flipx .omw-column-animation-back",".omw-column-animation-flipx .omw-column-animation-face"],{opacity:1});
		TweenLite.set([".omw-column-card-animation-flipy .omw-column-card-animation-back",".omw-column-card-animation-flipy .omw-column-card-animation-face"],{opacity:1});
		TweenLite.set([".omw-column-card-animation-flipx .omw-column-card-animation-back",".omw-column-card-animation-flipx .omw-column-card-animation-face"],{opacity:1});

		// column animation flipy
		TweenLite.set(".omw-column-animation-flipy .omw-column-animation-back", {rotationX:-180});
		TweenLite.set([".omw-column-animation-flipy .omw-column-animation-back", ".omw-column-animation-flipy .omw-column-animation-face"], {backfaceVisibility:"hidden"});
		TweenLite.set(".omw-column-card-animation-flipy .omw-column-card-animation-back", {rotationX:-180});
		TweenLite.set([".omw-column-card-animation-flipy .omw-column-card-animation-back", ".omw-column-card-animation-flipy .omw-column-card-animation-face"], {backfaceVisibility:"hidden"});

		$(".omw-column-animation.omw-column-animation-flipy").hover(
		  function() {
		    TweenLite.to($(this).find(".omw-column-animation-flipper"), 1.2, {rotationX:180, ease:Back.easeOut});
		  },
		  function() {
		    TweenLite.to($(this).find(".omw-column-animation-flipper"), 1.2, {rotationX:0, ease:Back.easeOut});  
		  }
		);
		$(".omw-column-card-animation.omw-column-card-animation-flipy").hover(
		  function() {
		    TweenLite.to($(this).find(".omw-column-card-animation-flipper"), 1.2, {rotationX:180, ease:Back.easeOut});
		  },
		  function() {
		    TweenLite.to($(this).find(".omw-column-card-animation-flipper"), 1.2, {rotationX:0, ease:Back.easeOut});  
		  }
		);

		// column animation flipx
		TweenLite.set(".omw-column-animation-flipx .omw-column-animation-back", {rotationY:-180});
		TweenLite.set([".omw-column-animation-flipx .omw-column-animation-back", ".omw-column-animation-flipx .omw-column-animation-face"], {backfaceVisibility:"hidden"});
		TweenLite.set(".omw-column-card-animation-flipx .omw-column-card-animation-back", {rotationY:-180});
		TweenLite.set([".omw-column-card-animation-flipx .omw-column-card-animation-back", ".omw-column-card-animation-flipx .omw-column-card-animation-face"], {backfaceVisibility:"hidden"});

		$(".omw-column-animation.omw-column-animation-flipx").hover(
		  function() {
		    TweenLite.to($(this).find(".omw-column-animation-flipper"), 1.2, {rotationY:180, ease:Back.easeOut});
		  },
		  function() {
		    TweenLite.to($(this).find(".omw-column-animation-flipper"), 1.2, {rotationY:0, ease:Back.easeOut});  
		  }
		);
		$(".omw-column-card-animation.omw-column-card-animation-flipx").hover(
		  function() {
		    TweenLite.to($(this).find(".omw-column-card-animation-flipper"), 1.2, {rotationY:180, ease:Back.easeOut});
		  },
		  function() {
		    TweenLite.to($(this).find(".omw-column-card-animation-flipper"), 1.2, {rotationY:0, ease:Back.easeOut});  
		  }
		);
	}else{
		$(".omw-column-animation").removeClass("omw-column-animation-flipy").removeClass("omw-column-animation-flipx").addClass("omw-column-animation-fadein");
		$(".omw-column-card-animation").removeClass("omw-column-card-animation-flipy").removeClass("omw-column-card-animation-flipx").addClass("omw-column-card-animation-fadein");
	}

	// // counter up numbers
	try{
		function Utils(element, fullyInView) {
			var pageTop = $(window).scrollTop();
	        var pageBottom = pageTop + $(window).height();
	        var elementTop = $(element).offset().top;
	        var elementBottom = elementTop + $(element).height();

	        if (fullyInView === true) {
	            return ((pageTop < elementTop) && (pageBottom > elementBottom));
	        } else {
	            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
	        }
		}

		function iniciaCounter(){
			$('[module="counterup"] button span.counter').each(function(){
				var attr = $(this).attr("ctrCounterUp");
				if (typeof attr !== typeof undefined && attr !== false) {
				}else{
					$(this).attr("ctrCounterUp",0);
				}
				var isElementInView = Utils($(this), false);
				if (isElementInView) {
				    if($(this).attr("ctrCounterUp")==0){
					 	$(this).jQuerySimpleCounter({
					 		start:0,
					 		end:parseInt($(this).html()),
							duration: 1000 // the speed time in ms
						});
						$(this).attr("ctrCounterUp",1);
					 }
				}
			});
		}

		iniciaCounter();
		$(window).on("scroll", function(e){
			iniciaCounter();
		})
		
		// $('[module="counterup"] button span.counter').counterUp({
		// 	delay: 10, // the delay time in ms
		// 	time: 1000 // the speed time in ms
		// });

	}catch(err){}
	
	
	
	// try {
	// 	if( $("[module='menu']").length == 0 && $("[module='categorias'][tsplugin='4']").length == 0){
	// 		$("#builder-sections").css("margin-top","0");
	// 	}
	// }
	// catch(err) {
	// }




	$(".live-preview .omw-column-animation-face").each(function(){
		var obj = $(this).parent().find(".omw_master_"+$(this).attr("id"));
		$(obj).css("width",$(this).width());
		$(obj).css("height",$(this).height());
		
	});

	$(".live-preview .omw-column-card-animation-face").each(function(){
		var obj = $(this).parent().find(".omw_master_"+$(this).attr("id"));
		$(obj).css("width",$(this).width());
		$(obj).css("height",$(this).height());
	});



	$(".omw-referral-warning").on("click", function(e){
		$(this).fadeOut();
		$.cookie('omw_referral_display_' + $.cookie('omw_referral'), 'viewed', { expires: 3650, path: '/' });
	})




	function responsivoNewsletter(){
		var disposicao = $("[module='newsletter']").find("button").css("clear");
		if(disposicao=="none"){
			try{
				var news = $("[module='newsletter']");
				if(news.length>0){
					var newsMarginLeft = news.css("margin-left");
					var newsMarginRight = news.css("margin-right");
					var news_input = $("[module='newsletter']").find("input");
					var news_button = $("[module='newsletter']").find("button");
					var news_buttonMarginLeft = news_button.css("margin-left");
					if( (news_input.outerWidth()+news_button.outerWidth()+parseInt(newsMarginLeft.replace("px",""))+parseInt(newsMarginRight.replace("px",""))+parseInt(news_buttonMarginLeft.replace("px",""))) > news.closest(".column").outerWidth() ){
						news_input.addClass("responsivoWide");
						news_button.addClass("responsivoWide");
						news_button.css("borderTopLeftRadius",news_button.css("borderTopRightRadius"));
						news_button.css("borderBottomLeftRadius",news_button.css("borderBottomRightRadius"));
						news_input.css("borderTopRightRadius",news_input.css("borderTopLeftRadius"));
						news_input.css("borderBottomRightRadius",news_input.css("borderBottomLeftRadius"));
					}else{
						news_input.removeClass("responsivoWide");
						news_button.removeClass("responsivoWide");
						if(parseInt(news_buttonMarginLeft.replace("px",""))==0){
							news_button.css("borderTopLeftRadius","0px");
							news_button.css("borderBottomLeftRadius","0px");
							news_input.css("borderTopRightRadius","0px");
							news_input.css("borderBottomRightRadius","0px");
						}
					}
				}
			}catch(err){console.log("Erro responsivo newsletter");}
		}
	}
	responsivoNewsletter();
	$( window ).resize(function() {
		responsivoNewsletter();
	});


	// TOS CALLBACKS
	$(".omw_tos_modal").on("click", function(e){
		e.preventDefault();
		var mode = $(this).attr("rel");
		
		$("#omw-tos-modal-overflow-" + mode).find(".uk-modal-title").html("");
		$("#omw-tos-modal-overflow-" + mode).find(".uk-modal-body").html("<div uk-spinner='ratio: 1' class='uk-position-center'></div>");
		UIkit.modal($("#omw-tos-modal-overflow-" + mode)).show(); 

		$.ajax({
			type: "POST",
			url: '/_inc/global_assets/builder/ajax/getTerms.php',
			data: "term=" + mode + "&lang=" + $("html").attr("iso"),
			dataType:"json",
			success: function(data){
				
					$("#omw-tos-modal-overflow-" + mode).find(".uk-modal-title").html(Base64.decode(data.title));
					$("#omw-tos-modal-overflow-" + mode).find(".uk-modal-body").html(Base64.decode(data.text));
			},
			error: function(){
				
			}
		});


	});

	// FORM UPLOAD BUTTON
	if ( $(".omw-form-btn-upload").length > 0  ) {


		// LETS LOAD PLUPLOAD
		 $.getScript("/_inc/global_assets/plupload/js/plupload.full.min.js", function() {

		 	var uploaders = new Array();

			initUploaders = function(uploaders) {
			    $("button.omw-form-btn-upload").each(function() {
			        var el = $(this);
			        var button = el;
			        //var container = el.prev(".omw-cart-custom-upload-filename");
			        var container = el
			        var uploader = new plupload.Uploader({
			            runtimes: 'gears,html5,flash,silverlight,browserplus',
			            browse_button: button.attr("id"),
			            max_file_size: '100mb',
			            url: '/_inc/global_assets/plupload/upload.php',
			            flash_swf_url: 'http://www.plupload.com/plupload/js/plupload.flash.swf',
			            silverlight_xap_url: 'http://www.plupload.com/plupload/js/plupload.silverlight.xap',
			            multipart: true,
			            multi_selection:false,
			            unique_names:true,
       					multipart_params: {"destination": $("html").attr("themesource") },
			            filters: [
			                { title: "Image", extensions: "jpeg,jpg,gif,png"},
			                { title: "PDF", extensions: "pdf"},
			                { title: "ZIP", extensions: "zip"},
			                { title: "Others", extensions: "dwg,dwf,dwfx,dxf,doc,docx,csv,xls"}

			            ],
			            init: {
							PostInit: function() {
							},

							FilesAdded: function(up, files) {
								plupload.each(files, function(file) {
									$(container).html( file.name + ' (' + plupload.formatSize(file.size) + ')');
									$(container).attr("originalname", file.name);
									$(container).attr("isuploading", "true");
									$(button).parent().find(".omw-cart-custom-delete-file-upload").show();
								}); 
								uploader.start();
					            up.refresh();


					            $(button).html($(button).attr("trad2"));

							},

							UploadProgress: function(up, file) {
								$(container).html( file.name + ' (' + file.percent + '%)');
							},

							FileUploaded: function(up, file,response) {
								//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
								var responseJson = jQuery.parseJSON(response.response);
								$(container).html( file.name + ' (' + file.percent + '%)');
								$(container).attr("rel", responseJson.filename);
								$(container).attr("isuploading", "");
								$(container).removeClass("errorClass");
								// SAVE UPLOAD ON TMP FOLDER

							},

							Error: function(up, err) {
								//alert($(".omw-cart-custom-upload-container").attr("trad1"))
								//console.log("\nError #" + err.code + ": " + err.message);
							}
						}
			        });

			        uploader.init();
			        uploaders.push(uploader);
			    });
			};               

			initUploaders(uploaders);


		 });
	}

  
  $(window).on("resize", function(event){
    calculoTamanhos();
  });

  function calculoTamanhos(tamanhoColuna){
    /*var tamanho = 0; 
    $(".timerBox").each(function(){
      if($(this).width()>tamanho){
        tamanho=$(this).width();
      }
    });

    $(".timerBox").css("font-size",tamanho+"px");*/
    
    $("[module='timer']").each(function(){
      var tamanhoFonteDesc = parseInt($(this).find(".omw-custombutton").attr("tamanhoLabels"))/100;
      var tamanhoFonte = parseInt($(this).find(".omw-custombutton").attr("tamanhoFonte"))/100;
      var larguraSeparador = $(this).find(".omw-custombutton").attr("larguraSeparador");
      var largura = $(this).find(".omw-custombutton").attr("largura");
      var larguraAtual = $(this).find(".timerBox").width();
      
      var larguraSeparador2 = (larguraAtual*larguraSeparador)/largura;
      
      //$(this).find(".timerBox").css("max-width",largura+"px");
      $(this).find(".timerBox").css("font-size",(larguraAtual*tamanhoFonte)+"px");
      $(this).find(".countdown-separator-box .uk-countdown-separator").css("font-size",(larguraAtual*tamanhoFonte)+"px");
      $(this).find(".countdown-separator-box").css("width",(larguraSeparador2)+"px");

      //$(this).find(".timerTitulos").css("max-width",largura+"px");
      //$(this).find(".countdown-separator-box2").css("max-width",(larguraSeparador2)+"px");
      $(this).find(".timerTitulos").css("font-size",(larguraAtual*tamanhoFonteDesc)+"px");
      
      
      
    });
    

  }
   
  calculoTamanhos();
  //setTimeout(function(){ calculoTamanhos(); }, 1000);

});

jQuery(window).load(function () {
	$(".preLoader").animate({
	    opacity: 0
	  }, 500, function() {
	    $(".preLoader").css("display","none");
	  });
});

