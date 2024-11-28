$('document').ready(function() {
			 $(".omw-socialfeeds").each(function() {
				 $(this).html('<center><i class="fa fa-spinner fa-spin fa-lg"></i></center>');
		 		 var obj = $(this);
		 		 var socialfeeds = $(this).closest(".module").attr("socialfeeds").split(",");
		 		 var maxfeeds = $(this).closest(".module").attr("socialfeeds_max");
		 		 var facebook="";
		 		 var twitter ="";
		 		 var youtube="";

		 		 $.each(socialfeeds, function(key,val){
		 		 	var str = val.split(":");
		 		 	switch(str[0]){
		 		 		case "facebook":
		 		 			facebook = str[1];
		 		 		break;

						case "twitter":
							twitter = str[1];
		 		 		break;

						case "youtube":
							youtube = str[1];
		 		 		break;

		 		 	}
		 		 });

		 		 $.ajax({
						type: "POST",
			       		url: "/_inc/global_assets/builder/apps_helpers/social-stream/getSocialFeed.php?lang="+$('html').attr("iso"),
						data: "maxfeeds="+maxfeeds+"&facebook=" + facebook + "&twitter=" + twitter + "&youtube=" + youtube,
						dataType:"json",
						success: function(msg){
							 // $(obj).fadeOut("normal", function(){
							 	if (msg.status==1) {
							 		$(obj).html(Base64.decode(msg.html)).show();
							 	}
							 //});
							
						},
						error: function(XMLHttpObj, erroCode) {
						}
				});
	 		});

});