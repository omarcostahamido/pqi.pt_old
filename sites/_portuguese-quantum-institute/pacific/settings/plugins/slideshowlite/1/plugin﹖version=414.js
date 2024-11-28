$('document').ready(function() {

	/* BEGIN: DO NOT CHANGE */
	if (Builder.getSelectedObject()) {
		$$ = function(obj) {
				return Builder.getSelectedObject().parent().find(obj); 
		}
	} 
	else {
		 $$ = function(obj) {
		 		return $("body").find(obj); 
		 }
	}
	/* END: DO NOT CHANGE */

	
	// $("[module='slideshowlite']").find(".caixaTitulos").each(function(){
	

	// $(".dummyVideoCover").click( function (){
	

	// setTimeout(function(){
	// 	try{
	// 		$("[module='slideshowlite']").find("video").prop('controls', false);
	// 		$("[module='slideshowlite']").find("video").prop('muted', true);
	// 		$("[module='slideshowlite']").find("video")[0].pause();

	// 		$("[module='slideshowlite']").find("video:visible").each(function(){
	// 			$(this)[0].play();	
	// 		})
	// 	}catch(err){console.log("Erro slideshow: plugin.js")}
		
	// }, 500);
	

	// if($('[module="slideshowlite"] .weasy-slideshow-lite .uk-slideshow-items').parent().attr("completeImg")==1){
	// 	var slideItem = $('[module="slideshowlite"] .weasy-slideshow-lite ul > li');
	// 	slideItem.on('itemshown', function(){
	// 		var altura = $(this).find("img").height();
	// 		$(this).closest(".uk-slideshow-items").css("height",altura+"px");
	// 	});
	// }
	
	$('[module="slideshowlite"]').each(function(){
		$(this).find(".caixaTitulos").each(function(){
			if($(this).find(".slidelite_overlay_titulo").html()=="" && $(this).find(".slidelite_overlay_descricao").html()==""){
				$(this).addClass("caixaTitulosEsconde");
			}
		});

		$(this).find(".dummyVideoCover").click( function (){
		    if( !$(this).parent().find("video").prop('muted') ) {
		        $(this).parent().find("video").prop('muted', true);
		      	$(this).parent().find("video")[0].pause();
		    } else {
		      $(this).parent().find("video").prop('muted', false);
		      $(this).parent().find("video")[0].play();
		      $(this).parent().find("video").prop("volume", 1);
		    }
		    
		  });

		setTimeout(function(){
			try{
				$(this).find("video").prop('controls', false);
				$(this).find("video").prop('muted', true);
				$(this).find("video")[0].pause();

				$(this).find("video:visible").each(function(){
					$(this)[0].play();	
				})
			}catch(err){console.log("Erro slideshow: plugin.js")}
			
		}, 500);	

	
		if($(this).find('.weasy-slideshow-lite .uk-slideshow-items').parent().attr("completeImg")==1){
			var slideItem = $(this).find('.weasy-slideshow-lite ul > li');
			slideItem.on('itemshown', function(){
				if($(this).find("video").length>0){
					var altura = $(this).find("video").height();
					$(this).closest(".uk-slideshow-items").css("height",altura+"px");
				}else{
					var altura = $(this).find("img").height();
					$(this).closest(".uk-slideshow-items").css("height",altura+"px");
				}
			});
		}
	})
	


});