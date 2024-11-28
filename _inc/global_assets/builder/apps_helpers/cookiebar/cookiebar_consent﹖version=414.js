$('document').ready(function() {
	//$.removeCookie('omw_app_cookiebar_consent', { path: '/' }); 
	




	$("body").on("click",".tabs-cookies .left-side", function(e){
		e.preventDefault();
		if ($(this).closest(".tab-item").find(".body").hasClass("hidden")){
			$(this).closest(".tab-item").find(".body").removeClass("hidden").show();
			$(this).closest(".tab-item").find(".header .minus").removeClass("hide");
			$(this).closest(".tab-item").find(".header .plus").addClass("hide");

		}
		else{
			$(this).closest(".tab-item").find(".body").addClass("hidden").hide();
			$(this).children(".minus").addClass("hide");
			$(this).find(".minus").addClass("hidenn");
			$(this).find(".plus").removeClass("hide");


		}

	
	});
	
	$("body").on("click","#acceptCookieText", function(e){
		e.preventDefault();
		try{
			UIkit.modal($("#omw-tos-modal-overflow-cookies2")).show(); 
		}catch(err){}
	});
	
	$("body").on("click",".wm-customize-cookies", function(e){
		e.preventDefault();
		try{
			UIkit.modal($("#modal-cookie-settings")).show(); 
		
		}catch(err){}
	});
	
	$("body").on("click",".wm-confirm-choices", function(e){
		e.preventDefault();

		if ($("#filter1").is(":checked")){
			$.cookie('weasy_cookies_1', 'true', { expires: 333650, path: '/' });
			if (typeof gtag === 'function') {
				gtag('consent', 'update', {
					'ad_storage': 'granted',
					'ad_personalization': 'granted',
					'ad_user_data': 'granted'
				  });
			}
		}
		else{
			$.cookie('weasy_cookies_1', 'true', { expires: -1, path: '/' });
			if (typeof gtag === 'function') {
				gtag('consent', 'update', {
					'ad_storage': 'denied',
					'ad_personalization': 'denied',
					'ad_user_data': 'denied'
				  });
			}

		}

		if ($("#filter2").is(":checked")){
			$.cookie('weasy_cookies_2', 'true', { expires: 333650, path: '/' });
			if (typeof gtag === 'function') {
				gtag('consent', 'update', {
					'analytics_storage': 'granted'
				  });
			}
		}
		else{
			$.cookie('weasy_cookies_2', 'true', { expires: -1, path: '/' });
			if (typeof gtag === 'function') {
				gtag('consent', 'update', {
					'analytics_storage': 'denied'
				  });
			}
		}

	
		if ($("#filter3").is(":checked")){
			$.cookie('weasy_cookies_3', 'true', { expires: 333650, path: '/' });
		}
		else{
			$.cookie('weasy_cookies_3', 'true', { expires: -1, path: '/' });
		}


		$.cookie('omw_app_cookiebar_consent', 'viewed', { expires: 3650, path: '/' });
		
		UIkit.modal($("#modal-cookie")).hide(); 
		UIkit.modal($("#modal-cookie-settings")).hide(); 
		setTimeout(function(){
			$("#modal-cookie").hide();
			$("#modal-cookie-settings").hide();
		}, 500)
	
	});


	$("body").on("click",".wm-manage-cookies", function(e){
		e.preventDefault();
		$(this).html("<div uk-spinner='ratio: .5'></div>")
		buildCookies(2);
	});

	$("body").on("click",".wm-reject-cookies", function(e){
		e.preventDefault();
		$.cookie('weasy_all_cookies', 'false', { expires: -1, path: '/' });
		$.cookie('weasy_cookies_1', 'false', { expires: -1, path: '/' });
		$.cookie('weasy_cookies_2', 'false', { expires: -1, path: '/' });
		$.cookie('weasy_cookies_3', 'false', { expires: -1, path: '/' });

		if (typeof gtag === 'function') {
			gtag('consent', 'update', {
				'ad_storage': 'denied',
				'ad_personalization': 'denied',
				'ad_user_data': 'denied',
				'analytics_storage': 'denied'
			});
		}


		$.cookie('omw_app_cookiebar_consent', 'viewed', { expires: 3650, path: '/' });

		UIkit.modal($("#modal-cookie")).hide(); 
		UIkit.modal($("#modal-cookie-settings")).hide();
		setTimeout(function(){
			$("#modal-cookie").hide();
			$("#modal-cookie-settings").hide();
		}, 500)
	});


	$("body").on("click",".wm-accept-all-cookies", function(e){
		e.preventDefault();
		$.cookie('weasy_all_cookies', 'true', { expires: 3650, path: '/' });
		$.cookie('weasy_cookies_1', 'true', { expires: 333650, path: '/' });
		$.cookie('weasy_cookies_2', 'true', { expires: 333650, path: '/' });
		$.cookie('weasy_cookies_3', 'true', { expires: 333650, path: '/' });

		if (typeof gtag === 'function') {
			gtag('consent', 'update', {
				'ad_storage': 'granted',
				'ad_personalization': 'granted',
				'ad_user_data': 'granted',
				'analytics_storage': 'granted'
			});
		}


		$.cookie('omw_app_cookiebar_consent', 'viewed', { expires: 3650, path: '/' });

		UIkit.modal($("#modal-cookie")).hide(); 
		UIkit.modal($("#modal-cookie-settings")).hide();
		setTimeout(function(){
			$("#modal-cookie").hide();
			$("#modal-cookie-settings").hide();
		}, 500)

	});
	
	
	 buildCookies = function(type){
			$("#modal-cookie").remove();
			$("#modal-cookie-settings").remove();
			$.ajax({
				type: "GET",
				url: "/_inc/global_assets/builder/apps_helpers/cookiebar/cookiebar.php?lang="+$('html').attr("iso"),
				data: "",
				dataType:"json",
				success: function(msg){
					$( Base64.decode(msg.html) ).hide().prependTo("#builder-sections");
					if (msg.force == "true"){
						
						if ( $.cookie('weasy_cookies_1')!="true" || $.cookie('weasy_cookies_2')!="true") {
							$("#modal-cookie").css("display","flex");
							$("#modal-cookie-settings").css("display","flex");
							UIkit.modal("#modal-cookie").show();
						}
					}
					if (! $.cookie('omw_app_cookiebar_consent') && msg.force != "true" || type=="2") {
							if (msg.status==1) {
								if(msg.mostra==1){
									setTimeout(function(){
										// $("#modal-cookie").show();
										// $("#modal-cookie-settings").show();
										if (type=="1"){
											$("#modal-cookie").css("display","flex");
											$("#modal-cookie-settings").css("display","flex");
											UIkit.modal("#modal-cookie").show();
										}
										if (type=="2"){
											$("#modal-cookie").css("display","flex");
											$("#modal-cookie-settings").css("display","flex");
											UIkit.modal("#modal-cookie-settings").show();
										}
									}, 500)
								}
							}
						}
				},
				error: function(XMLHttpObj, erroCode) {
				}
		});
	
	
	}
	buildCookies(1);

});