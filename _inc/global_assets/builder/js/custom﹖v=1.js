$('document').ready(function() {
	
	var alturaHeader = $(".weasy_page_header").outerHeight(true);
	if( $(".weasy_page_header").hasClass("weasy_page_header_fixo")===true ){
		if( $(".weasy_page_header").hasClass("weasy_page_header_float")===false ){
			//$(".weasy_page_header").next(".row").css({"margin-top": alturaHeader + "px" });

			if($( window ).width()>980){
				$(".weasy_page_content").css({"margin-top": alturaHeader + "px" });
			}
		}
		$(".weasy_page_header").addClass("wph_fixo");
	}else{
		if( $(".weasy_page_header").hasClass("weasy_page_header_float")===true ){
			$(".weasy_page_header").addClass("wph_float");
		}
	}

	if( $(".weasy_page_header").hasClass("weasy_page_header_dinamico")===true ){
		var scrollHeaderControl = 0;
		var ctr=0;
		if( $(".weasy_page_header").hasClass("weasy_page_header_float")===false ){
			//$(".weasy_page_header").next(".row").css({"margin-top": alturaHeader + "px" });
			if($( window ).width()>980){
				$(".weasy_page_content").css({"margin-top": alturaHeader + "px" });
			}
		}
		$(".weasy_page_header").addClass("wph_dinamico");
	  	$(window).on("scroll", function(e){
	  		if($( window ).width()>980){
				var scrollTop = $(window).scrollTop();
		        var diff = (scrollTop-scrollHeaderControl);
				if(diff>alturaHeader){
		        	$(".weasy_page_header").css("top",(0-alturaHeader)+"px");
					ctr=1;
		        }else if(diff<-alturaHeader){
		        	$(".weasy_page_header").css("top",0);
					ctr=2;
		        }
		        if(diff==0 && ctr==2){
		        	$(".weasy_page_header").css("top",(0-alturaHeader)+"px");
		        }
		        if(diff==0 && ctr==1){
		        	$(".weasy_page_header").css("top",0);
		        }
				console.log("-->",scrollTop)
				if($("#builder-sections").hasClass("builder_edit")){
					if(scrollTop<=64){
						$(".weasy_page_header").css("top","64px");
					}
				}

				clearTimeout($.data(this, 'scrollTimer'));
			    $.data(this, 'scrollTimer', setTimeout(function() {
					scrollHeaderControl=scrollTop;
			        // console.log("Haven't scrolled in 250ms!");
			    }, 250));
	  		}
	  	});
	}

 $.validator.messages.required = "";
 $.validator.messages.number = "";
 $.validator.messages.email = "";
 $.validator.messages.remote = "";
 $.validator.messages.equalTo = "";

 $.extend( $.validator.defaults, {
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
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



	 $("form#omw-privatearea-form").validate({
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
			  	var obj = $("button");
			  	$("button").html("<div uk-spinner='ratio: .5'></div>");
			  	
			  	$.ajax({
						type: "POST",
						url: '/_inc/global_assets/builder/ajax/checkPasswordPrivate.php?lang=' + $("html").attr("iso"),
						data: $(form).serialize(),
						dataType:"json",
						success: function(data){
							if (data.status==0){
								noty({
									text: translations.i18n['trad26'],
									type: 'error',
									layout:"topRight",
									timeout: 2000
								});
								$(obj).html($(obj).attr("rel"));
							}
							else{
								location.href = location.href +"?token=" +  data.token;
							}
						},
						error: function(){
							// console.log('failure send email');
							// formularioObj.find("button").html(htmlSumbit);
							// formularioObj.find("button").removeAttr("disabled");
						}
					});

				

			  	return false;
		  		
				
			  }
		});
	



	
	if( $(".weasy_page_header").hasClass("weasy_page_header_fixo")===true && $(".weasy_page_header").hasClass("weasy_page_header_fixo_mini")===true ){
		var alturaHeaderMini = $(".weasy_page_header").find("div.row:not(.sub-section)").last().outerHeight(true);
		var diffHeader=($(".weasy_page_header").outerHeight(true)-alturaHeaderMini);
		$(window).on("scroll", function(e){
			if($( window ).width()>980){
				var scrollTop = $(window).scrollTop();
				if(scrollTop>=diffHeader){
					$(".weasy_page_header").addClass("weasyMiniActive");
					$(".weasy_page_header").css("top",(0-diffHeader)+"px");
				}else{
					$(".weasy_page_header").css("top",0);
					$(".weasy_page_header").removeClass("weasyMiniActive");
				}
			}
	    })
	}


	if( $(".weasy_page_footer").hasClass("weasy_page_footer_revelar")===true ){
		if($( window ).width()>980){
			var alturaFooter = $(".weasy_page_footer").outerHeight(true);
			$(".weasy_footer_helper").css("margin-bottom",alturaFooter+"px");
		}
	}

	if( $(".weasy_page_footer").hasClass("weasy_page_footer_normal")===true ){
		gereFooter();
	}

	//$('[relCabFloat="float"] div.row').css("opacity",1);
	$('[relCabFloat="float"]').css("opacity",1);
	$('[relCabRevelar="revelar"]').css("opacity",1);

	function gereFooter(){
		var alturaFooter = $(".weasy_page_footer").outerHeight(true);
		var alturaConteudo = $("#builder-sections").outerHeight(true);
		alturaConteudo += $("#builder-sections").offset().top;
		var alturaJanela = $(window).outerHeight(true);
		if(alturaJanela>alturaConteudo){
			$(".weasy_page_footer").addClass("placeFooterBottom");
		}else{
			$(".weasy_page_footer").removeClass("placeFooterBottom");
		}
	}

	$( window ).resize(function() {
		gereFooter();
	});
	//FIM HEADER & FOOTER



	var maxColHeight=0;
	$("[module='produtos'] .omw-products .col .infoBox .title").each(function(){
		if($(this).outerHeight()>maxColHeight){
			maxColHeight=$(this).outerHeight();
		}
	})
	$("[module='produtos'] .omw-products .col .infoBox .title").each(function(){
		$(this).css("height",maxColHeight+"px");
	})

		$( ".omw-sentence span, .omw-sentence h1, .omw-sentence h2, .omw-sentence h3" ).each(function( index ) {
			var fontPx = $(this).css("font-size").split("px")[0];
			var lineHeight = $(this).css("line-height").split("px")[0];
			$(this).attr("fs",fontPx);
			$(this).attr("ln",lineHeight);
		});
		resize = function(){
			$( ".omw-sentence span, .omw-sentence h1, .omw-sentence h2, .omw-sentence h3" ).each(function( index ) {

				$( this ).each(function( index ) {
					// console.log($(this))
					var objWidth = $(this).outerWidth(true);
					
					var windowWidth = $(this).closest(".col").outerWidth();

					var racio = 100 - Math.round(100 - ((windowWidth * 100) / objWidth));
					var fontPx = $(this).css("font-size").split("px")[0];
					var originalFontSize =$(this).attr("fs");
					var lineHeightOriginal =$(this).attr("ln");

					fontPx = Math.round( ( racio * fontPx ) / 100 );
					//console.log("--> "+fontPx+" - "+originalFontSize)

					if (fontPx < originalFontSize){
						if($(this).closest("[module]").hasClass("omw-modulo-responsive-hor")){
							fontPx = (fontPx*0.92);
						}
						$(this).css({"font-size": fontPx + "px", "line-height":"normal"});
					}
					else
						$(this).css({"font-size": originalFontSize + "px", "line-height":lineHeightOriginal + "px"});
					//console.log(objWidth + " | " + windowWidth + " | " + racio + " | " + fontPx);
				});
			});
		}
		$( window ).resize(function() {
			resize();
		});
		resize();
});