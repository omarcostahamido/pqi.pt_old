try{
	// var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
	// 		menuRight = document.getElementById( 'cbp-spmenu-s2' ),
	// 		menuTop = document.getElementById( 'cbp-spmenu-s3' ),
	// 		menuBottom = document.getElementById( 'cbp-spmenu-s4' ),
	// 		showLeft = document.getElementById( 'showLeft' ),
	// 		showRight = document.getElementById( 'showRight' ),
	// 		showTop = document.getElementById( 'showTop' ),
	// 		showBottom = document.getElementById( 'showBottom' ),
	// 		showLeftPush = document.getElementById( 'showLeftPush' ),
	// 		showRightPush = document.getElementById( 'showRightPush' ),
	// 		body = document.body;

	var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		menuRight = document.getElementById( 'cbp-spmenu-s2' ),
			//showLeft = document.getElementById( 'showLeft' ),
			showRight = document.getElementById( 'showRight' ),
			mascara = document.getElementById( 'mascMenuResp' ),
			html = document.documentElement,
			body = document.body;

	// showLeft.onclick = function() {
	// 	classie.toggle( this, 'active' );
	// 	classie.toggle( menuLeft, 'cbp-spmenu-open' );
	// 	classie.toggle( mascara, 'mascMenuResp-open' );
	// 	classie.toggle( html, 'blockBody' );
	// 	classie.toggle( body, 'blockBody' );
	// 	disableOther( 'showLeft' );
	// };
	if(showRight!=null){
		showRight.onclick = function() {
			classie.toggle( this, 'active' );
			classie.toggle( mascara, 'mascMenuResp-open' );
			classie.toggle( html, 'blockBody' );
			classie.toggle( body, 'blockBody' );
			classie.toggle( menuRight, 'cbp-spmenu-open' );
			disableOther( 'showRight' );
		};
	}
	mascara.onclick = function() {
		// classie.remove( showLeft, 'active' );
		classie.remove( menuLeft, 'cbp-spmenu-open' );
		classie.remove( mascara, 'mascMenuResp-open' );
		classie.remove( html, 'blockBody' );
		classie.remove( body, 'blockBody' );
		if(showRight!=null){
			classie.remove( menuRight, 'cbp-spmenu-open' );
			classie.remove( showRight, 'active' );
		}
	};

	function disableOther( button ) {
		// if( button !== 'showLeft' ) {
		// 	classie.toggle( showLeft, 'disabled' );
		// }
		if(showRight!=null){
			if( button !== 'showRight' ) {
				classie.toggle( showRight, 'disabled' );
			}
		}
	}
}catch(err){console.log(err)}

$(document).ready(function(){

	$("body").on("click",".cbp-spmenu-vertical a",function(){
		var link = $(this).attr("href");
		var rel = $(this).attr("rel");
		if(link!="" && link!=undefined && link=="" && link==undefined ){
			$("#mascMenuResp").trigger("click");
		}
	});

	$("body").on("click",".cbp-spmenu a[rel]",function(e){
		if($(this).attr("tipomenu")!="onepage"){
			e.preventDefault();

			var filho_el = $(this).attr("rel");
			if(filho_el!="" && $("#"+filho_el).length>0){
				$("#"+filho_el).addClass("activa");
				$(this).closest(".filho").addClass("activaPassed");
				$(this).closest(".filhoBase").addClass("activaPassed");
			}
		}else{
			$("#mascMenuResp").trigger("click");
		}
	});
	$("body").on("click",".filho h3, .filho .h3Res",function(e){
		var id_el = $(this).closest(".filho").attr("id");
		$("#"+id_el).removeClass("activa");

		$("a[rel='"+id_el+"']").closest(".activaPassed").removeClass("activaPassed");
	})

	if($( window ).width()<=980 || $("html[themesource='_aldoteste']").length>0 || $("html[themesource='_aldoshoespt']").length>0 || $("html[themesource='_dev2']").length>0){
		var elementoFiltros = $("[module='productfilters'][tsplugin='1']");
		var cloneFiltros = $(elementoFiltros).clone();
		$(elementoFiltros).remove();
		$(cloneFiltros).find(".omw-filters-categories").remove();
		$("#cbp-spmenu-s2 .omw-menu-filters").html(cloneFiltros);
		var btnAplly=$("#omw-filters-apply").clone();
		$(btnAplly).addClass("omw-filters-apply-clone");
		// $("#cbp-spmenu-s2 .omw-menu-filters").after('<div class="omw-menu-filters-apply">'+$(btnAplly).outterHtml()+'</div>');
		$("#cbp-spmenu-s2 .omw-menu-filters").after('<div class="omw-menu-filters-apply">'+$(btnAplly).prop('outerHTML')+'</div>');
		$("#omw-filters-apply").remove();

	}
	var arrayOpcoesChecadas = [];
	$("#showRight").on("click",function(){
		if(arrayOpcoesChecadas.length>0){
			$("#cbp-spmenu-s2.cbp-spmenu-open .linhaon").each(function(){
				$(this).find(".checkbox").removeClass("on").addClass("off");
				$(this).find(".item-name").removeClass("selected");
				$(this).removeClass("linhaon");
			})
			for(var i=0;i<arrayOpcoesChecadas.length;i++){
				$("#cbp-spmenu-s2.cbp-spmenu-open .item-name[text='"+arrayOpcoesChecadas[i]+"']").closest("li").addClass("linhaon");
				$("#cbp-spmenu-s2.cbp-spmenu-open .item-name[text='"+arrayOpcoesChecadas[i]+"']").closest("li").find(".checkbox").removeClass("off").addClass("on");
				$("#cbp-spmenu-s2.cbp-spmenu-open .item-name[text='"+arrayOpcoesChecadas[i]+"']").closest("li").find(".item-name").addClass("selected");
			}
			// $("#cbp-spmenu-s2.cbp-spmenu-open .linhaon").each(function(){
			// 	var texto = $(this).find(".item-name").attr("text");
			// })
		}
		arrayOpcoesChecadas = [];
		$("#cbp-spmenu-s2.cbp-spmenu-open .linhaon").each(function(){
			var texto = $(this).find(".item-name").attr("text");
			arrayOpcoesChecadas.push(texto);
		});
		if(arrayOpcoesChecadas.length==0){
			arrayOpcoesChecadas.push("sem filtros");
		}
	})
	$(".menuFiltersClean").on("click",function(){
		$("#cbp-spmenu-s2.cbp-spmenu-open .linhaon").each(function(){
			$(this).find(".checkbox").removeClass("on").addClass("off");
			$(this).find(".item-name").removeClass("selected");
			$(this).removeClass("linhaon");
		})
	});

	$(document).click(function(event) { 
		$target = $(event.target);
		if(!$target.closest('.iconNewRespBar').length){
			$('.iconNewRespBar').find(".newRespBarLangCurrent").removeClass("openListBase");
			$('.iconNewRespBar').find(".newRespBarLangOptions").removeClass("openList");
		}
		if(!$target.closest('#cbp-spmenu-s1').length && $('#cbp-spmenu-s1').is(":visible") && !$target.closest('#nav-icon3').length && !$target.closest('#cbp-spmenu-s2').length && !$target.closest('#showRight').length) {
			//$('#menucontainer').hide();
			$("#cbp-spmenu-s1").removeClass("cbp-spmenu-open");
			$("#mascMenuResp").removeClass("mascMenuResp-open");
			$("#nav-icon3").removeClass("open");
			$("body").removeClass("blockBody");
			$("html").removeClass("blockBody");
		}
		if($target.closest('#nav-icon3').length){
			if($("#nav-icon3").hasClass("open")){
				$("#cbp-spmenu-s1").removeClass("cbp-spmenu-open");
				$("#mascMenuResp").removeClass("mascMenuResp-open");
				$("#nav-icon3").removeClass("open");
				$("body").removeClass("blockBody");
				$("html").removeClass("blockBody");
			}else{
				if($('#cbp-spmenu-s2').is(":visible")){
					$("#cbp-spmenu-s2").removeClass("cbp-spmenu-open");
					$("#mascMenuResp").removeClass("mascMenuResp-open");
				}
				$("#cbp-spmenu-s1").addClass("cbp-spmenu-open");
				$("#mascMenuResp").addClass("mascMenuResp-open");
				$("#nav-icon3").addClass("open");
				$("body").addClass("blockBody");
				$("html").addClass("blockBody");
			}
		}
	});

	$("body").on("click",".newRespBarLangCurrent",function(){
		$(".newRespBarLangCurrent").toggleClass("openListBase");
		$(".newRespBarLangOptions").toggleClass("openList");
	})
})