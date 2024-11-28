$('document').ready(function() {	
	var displayBoxVisible = false;
	var invalidAddToBasket = true;
	var comboStock = 0;
	var base64Loaded = false;

	
	$.getScript("/_inc/global_assets/jquery/base64.js", function() {
		   base64Loaded= true ;
	});
	
	
	// try {
	   //  if (omw_override_selectBoxIt != true) var selectBox = $(".omw_extraOptionCombo").selectBoxIt({});
	// }
	// catch(error) {
	// 	var selectBox = $(".omw_extraOptionCombo").selectBoxIt({});
	// }
	
	 var trad0 = translations.i18n["trad1"];
	 var trad1 = translations.i18n["trad2"];
	 var trad2 = translations.i18n["trad3"];
	 var trad3 = translations.i18n["trad4"];
	 var trad4 = translations.i18n["trad5"];
	 var trad5 = translations.i18n["trad6"];
	 var trad6 = translations.i18n["trad7"];
	 var trad7 = translations.i18n["trad8"];

   if ($(".updateBasket").length > 0 ) {
	   $(".finalizeOrder").data('onclick',   $(".finalizeOrder").prop("onclick") );
	   $(".finalizeOrder").prop("onclick", null);
	   $(".finalizeOrder").on("click", function(e){
		   $(".updateBasket").trigger("click");
		   var totalIdle = $(".updateBasket").length;
		   var stockChecked = Array();
		   var btnWidth = $(".finalizeOrder").width() + 5;
		   var btnSubmitText = $(".finalizeOrder").html();
		   var totalInvalids = 0;
		   $(".finalizeOrder").width(btnWidth);
		   $(".finalizeOrder").attr("disabled", true);
		   $(".finalizeOrder").html('<i class="fa fa-spinner fa-spin"></i>');
		   $(".updateBasket").attr("status","idle");

		   var myInterval = setInterval(function checkStatus() {
			   $(".updateBasket").each(function(index,item){
				   if ( $(item).attr("status") != "idle") {
					   if ($(item).attr("status") != "1") {
						   totalInvalids++;
					   }
					   var idRow = $(item).closest("tr").attr("id");
					   if(jQuery.inArray(idRow, stockChecked) === -1) {
						   stockChecked.push(idRow);
					   }
					   if (stockChecked.length == totalIdle) {
						   clearInterval(myInterval);
						   
						   if (totalInvalids ==0 ){  
							   $(".finalizeOrder").data('onclick').call(this, e || window.event);
						   }
						   else {
							   $(".finalizeOrder").attr("disabled", false);
							   $(".finalizeOrder").html(btnSubmitText);
						   }
					   }
				   }
			   });

		   },200);
		   //clearInterval(myInterval);
		   e.preventDefault();
	   });
   }

	
   $(".fields #pais").change(function(){
		   var iso = $(this).val();
		   $("#shippingHolder .container").fadeOut("fast",function() {
			   $("#shippingHolder .container").html("<center><img src='http://www.omeuwebsite.com/images/indicator.gif'></center>")
			   $("#shippingHolder .container").fadeIn("fast", function() {
					   $.ajax({
						   type: "POST",
						   url: "/_inc/global_assets/omw/getShipping.php",
						   data: "iso="+iso+"&check=" + $(".grandtotal").attr("rel"),
						   dataType:"json",
						   success: function(msg){
							   var pagamentosArr = msg.payments.split(",");
							   // DISABLE ALL PAYMENT TYPES
							   // $("#paymentHolder .omw-pt-container").hide();
							   // $.each( pagamentosArr, function( i, val ) {
							   // 	$("#paymentHolder #omw-pt-" + val).show();
								   
							   // });
							   // $("#paymentHolder .omw-pt-container").first(":visible").find("input").prop("checked",true);
							   

							   $("#shippingHolder .container").fadeOut("fast",function() {
								   
								   
								   if (parseFloat(msg.refundValue) > 0 ) {
									   $(".extraRefundValue").attr("rel",msg.refundValue);
									   $(".extraRefundValue").html("-" +msg.refundMoney);
									   $("#valorVatRefund").val(msg.refundValue);


									   $("#omw_vat_refund").css("display","compact");
									   $("#omw_vat_refund").show()
								   }
								   else {
									   $("#valorVatRefund").val(0);
									   $(".extraRefundValue").attr("rel",0);
									   $(".extraRefundValue").html(0);
									   $("#omw_vat_refund").css("display","none");
									   $("#omw_vat_refund").hide()
								   }
								   
								   $("#shippingHolder .container").html(Base64.decode(msg.html)).fadeIn();
								   $(".shippingValues").first().click()
								   
							   });
							   
						   },
						   error: function(XMLHttpObj, erroCode) {
							 
						   }
			   })
		   })
		   
		   
   });
		   
		   
   }); 
	

   $("[module='produtos'] .produtosLink").on("click",function(e) {
	   e.preventDefault();
	   try{
		   location.href = $(this).attr('href');
	   }
	   catch(error) {
		   location.href = $(this).attr('href');
	   }


   });

	
   $("#omwlocalPickup").on("change",function() {
	   if ($(this).val() == 1 && $(this).attr("rel")==0 ) {
		   $("#customer_shipping_details").fadeOut();
		   
		   // BEGIN change shippings to 0
		   $("#shippingHolder .container").fadeOut("fast",function() {
			   $("#shippingHolder .container").html("<center><img src='http://www.omeuwebsite.com/images/indicator.gif'></center>")
			   $("#shippingHolder .container").fadeIn("fast", function() {
						   $.ajax({
							   type: "POST",
							   url: "/_inc/global_assets/omw/getShipping.php",
							   data: "check=0"  ,
							   dataType:"json",
							   success: function(msg){
								   $("#shippingHolder .container").fadeOut("fast",function() {
									   $("#shippingHolder .container").html(Base64.decode(msg.html)).fadeIn();
									   
									   
									   // BEGIN update shippings to client cart
									   var valorTotalCompra = 0;
									   var portesTmp2=0;
									   var paymentTmp2=0;
									   
									   try {
										   var portesTmp = $(".shippingValues:checked").attr("rel").split("#");
										   if (portesTmp.length > 1) {
											   var portesTmp2 = portesTmp[1];
											   var valorTotalCompra = portesTmp[0];
										   }
									   }
									   catch(error) {}
									   
									   try {
										   var paymentTmp = $(".paymentTypesValues:checked").attr("rel").split("#");
										   if (paymentTmp.length > 1) {
											   var paymentTmp2 = paymentTmp[1];
											   var valorTotalCompra = paymentTmp[0];
										   }
									   }
									   catch(error) {}
									   
									   // convert to money
									   $.ajax({
										   type: "POST",
										   url: "/_inc/global_assets/omw/convertMoney.php",
										   data: "totalCart=" + valorTotalCompra + "&shipping=" + portesTmp2 + "&payment=" + paymentTmp2 ,
										   dataType:"json",
										   success: function(msg){
											   $(".grandtotal,.totalInCart").html(msg.totalCart);
											   $(".portesValue").html(msg.shipping);
											   $("#valorExtraPagamento").val(paymentTmp2);
											   $("#valor").val(msg.rawTotal);
											   $("#valorPortes").val(portesTmp2);
											   $(".extraPaymentValue").html(msg.payment);
											   if (parseFloat(paymentTmp2) > 0) {
												   $("#paymentCosts").css("display","table-row");
												   
											   }
											   else 
												   $("#paymentCosts").css("display","none");
										   },
										   error: function(XMLHttpObj, erroCode) {
											 
										   }
										});
									   
									   
									   // END update shippings to client cart
									   
									   
								   });
								   
							   },
							   error: function(XMLHttpObj, erroCode) {
								 
							   }
				   })
			   })
		   });
		   // END: change shippings to 0
		   
		   
	   }
	   else {
		   $("#customer_shipping_details").fadeIn();
		   
		   var iso = $(".fields #pais").val();
		   
		   $("#shippingHolder .container").fadeOut("fast",function() {
			   $("#shippingHolder .container").html("<center><img src='http://www.omeuwebsite.com/images/indicator.gif'></center>")
			   $("#shippingHolder .container").fadeIn("fast", function() {
					   $.ajax({
						   type: "POST",
						   url: "/_inc/global_assets/omw/getShipping.php",
						   data: "iso="+iso+"&check=" + $(".grandtotal").attr("rel"),
						   dataType:"json",
						   success: function(msg){
							   $("#shippingHolder .container").fadeOut("fast",function() {
								   $("#shippingHolder .container").html(Base64.decode(msg.html)).fadeIn();
								   $(".shippingValues").first().click()
							   });
							   
						   },
						   error: function(XMLHttpObj, erroCode) {
							 
						   }
					   })
			   })
		   })
		   
	   }
	   
   }); 
	
   $(".shippingValues,.paymentTypesValues").on("click",function() {
	   var valorTotalCompra = 0;
	   var portesTmp2=0;
	   var paymentTmp2=0;
	   var discount = $("#valorDesconto").val();
	   try {
		   var portesTmp = $(".shippingValues:checked").attr("rel").split("#");
		   if (portesTmp.length > 1) {
			   var portesTmp2 = portesTmp[1];
			   var valorTotalCompra = portesTmp[0];
		   }
	   }
	   catch(error) {}
	   try {
		   var paymentTmp = $(".paymentTypesValues:checked").attr("rel").split("#");
		   if (paymentTmp.length > 1) {
			   var paymentTmp2 = paymentTmp[1];
			   var valorTotalCompra = paymentTmp[0];

		   }
	   }
	   catch(error) {}
	   
	   if (parseFloat($(".extraRefundValue").attr("rel")) > 0 ) {
		   valorTotalCompra = valorTotalCompra - parseFloat($(".extraRefundValue").attr("rel"));
	   }
	   // convert to money
	   $.ajax({
		   type: "POST",
		   url: "/_inc/global_assets/omw/convertMoney.php",
		   data: "totalCart=" + valorTotalCompra + "&shipping=" + portesTmp2 + "&payment=" + paymentTmp2+ "&discount=" + discount ,
		   dataType:"json",
		   success: function(msg){
			   $(".grandtotal,.totalInCart").html(msg.totalCart);
			   $(".portesValue").html(msg.shipping);
			   $("#valorExtraPagamento").val(paymentTmp2);
			   $("#valor").val(msg.rawTotal);
			   $(".discountValue").html(msg.discount);
			   $("#valorPortes").val(portesTmp2);
			   $(".extraPaymentValue").html(msg.payment);
			   if (parseFloat(paymentTmp2) > 0) {
					$("#paymentCosts").css("display","table-row");
				   
			   }
			   else 
				   $("#paymentCosts").css("display","none");
		   },
		   error: function(XMLHttpObj, erroCode) {
			 
		   }
		});
	   
	   
	   
   }); 
	
   // VALIDAR COUPOUN
   
   $("#btnValidateCoupon").on("click",function() {
	   
	   if ($("#voucher").val()!="") {
		   var voucher = $("#voucher").val();
		   $("#validateCouponResult").fadeOut("fast",function() {
				   $("#validateCouponResult").html("<img style='margin-top:5px' src='http://www.omeuwebsite.com/images/indicator.gif'>")
				   $("#validateCouponResult").fadeIn();
				   // check voucher
				   
				   $.ajax({
							   type: "POST",
							   url: "/_inc/global_assets/omw/checkVoucher.php",
							   data: "voucher=" + voucher,
							   dataType:"json",
							   success: function(msg){
								   if (msg.status==0) {
									   $("#validateCouponResult").fadeIn("fast", function(){
										   $("#validateCouponResult").html("<div style='margin-top:5px'><b>" + msg.msg + "</b></div>").delay(2000).fadeOut("fast",function(){
											   $("#validateCouponResult").html('<input type="text" value="" id="voucher"/> &nbsp;&nbsp; <button id="btnValidateCoupon" class="btn" type="button">'+msg.trad+'</button>');
											   $("#validateCouponResult").fadeIn();
										   });
									   } );
								   }
								   else {
									   $("#validateCouponResult").fadeIn("fast", function(){
											   $("#validateCouponResult").html("<div style='margin-top:5px'><b>" + msg.msg + "</b></div>").delay(2000)
											   $("#validateCouponResult").fadeIn();
											   $(".discountValue").html(msg.discount)
											   $(".grandtotal,.totalInCart").html(msg.priceWithDiscount);
											   
											   
										   } );
									   }
							   },
							   error: function(XMLHttpObj, erroCode) {
								 
							   }
					   });				
				   
				   
				   
		   });
	   
	   }
	   
   });
	
	
   // ONLY NUMBERS WITHOUT 0
   $(".addToBasket_quantity").keydown(function(event) {
		 var tipoProduto = $(this).attr("tipoProduto");
	   // Allow: backspace, delete, tab, escape, and enter and .
	   
	   if (tipoProduto=="peso" || tipoProduto=="medida") {
		   if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 190 ||
				// Allow: Ctrl+A
			   (event.keyCode == 65 && event.ctrlKey === true) || 
			   
				// Allow: home, end, left, right
			   (event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
				
					return;
		   }
		   else {
			   // Ensure that it is a number and stop the keypress
			   if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				   event.preventDefault(); 
			   }   
		   }
	   }
	   else {
		   if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
				// Allow: Ctrl+A
			   (event.keyCode == 65 && event.ctrlKey === true) || 
			   
				// Allow: home, end, left, right
			   (event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
				
					return;
		   }
		   else {
			   // Ensure that it is a number and stop the keypress
			   if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				   event.preventDefault(); 
			   }   
		   }
	   }


   });
	
   
   $(".deleteFromBasket").click(function() {
	   var obj = $(this).parent().parent();
	   $.ajax({
		   type: "POST",
		   url: "/_inc/global_assets/omw/updateBasket.php",
		   data: "id=" +obj.attr("id") + "&quantidade=-1" ,
		   dataType:"json",
		   success: function(msg){
			   if (msg.status == "1") {
				   try {
					   callbackShoppingCart(msg.cart)
				   }
				   catch(err){}
				   
				   $("#totalItemsInCart").html(msg.cart.totalItems)
				   $(".grandsubtotal").html(msg.cart.subTotal)
				   $(".grandtotal").html(msg.cart.totalPrice)
				   obj.fadeOut("normal", function() {
					   obj.remove();
				   }) 
			   }
		   },
		   error: function(XMLHttpObj, erroCode) {
		   }
	   });
   });
   
   $(".emptyBasket").click(function() {
	   
	   $.ajax({
		   type: "POST",
		   url: "/_inc/global_assets/omw/emptyBasket.php",
		   data: "",
		   dataType:"json",
		   success: function(msg){
			   if (msg.status == "1") {
				   
				   if ($("#omw_resume_cart").length > 0) {
					   $("#omw_resume_cart").html("");
				   }
				   
								   
				   $(".omw_cart_container").fadeOut("normal",function() {
					   $(".omw_cart_container").remove();
					   $(".omw_cart_container_no_items").fadeIn();
				   })
				   try {
					   callbackShoppingCart(msg.cart)
				   }
				   catch(err){}
				   
				   
			   }
		   },
		   error: function(XMLHttpObj, erroCode) {
		   }
	   });
   
   });
   
   $(".updateBasket").click(function() {
	   var obj = $(this).parent().parent();
	   var stockBtn = $(this);
	   $(stockBtn).attr("status","checking_stock");
	   $.ajax({
		   type: "POST",
		   url: "/_inc/global_assets/omw/updateBasket.php",
		   data: "id=" +obj.attr("id") + "&quantidade=" + obj.find(".addToBasket_quantity").val() + "&extras=" + obj.attr("extras")+"&idProduto=" +obj.attr("prod_id"),
		   dataType:"json",
		   success: function(msg){
			   $(stockBtn).attr("status",msg.status);

			   if (msg.status == "1") {
				   try {
					   callbackShoppingCart(msg.cart)
				   }
				   catch(err){}
				   $("#totalItemsInCart").html(msg.cart.totalItems)
				   $(".grandsubtotal").html(msg.cart.subTotal)
				   $(".grandtotal").html(msg.cart.totalPrice)
				   $(".discountValue").html(msg.cart.discount)
				   
				   obj.find(".itemQtdUnitPrice").html(msg.cart.unityPrice)
				   obj.find(".itemQtdPrice").html(msg.cart.itemPrice)
			   }
			   else if (msg.status == "2") {
				   // $("body").append( 
				   // 		$("<div class='displayExtrasWarning' />").html(trad3).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
				   // );
				   noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad3+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 2500
				   });
				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }
				   obj.find(".addToBasket_quantity").val(msg.stock);
			   }
			   else if (msg.status == "3") {
				   // $("body").append( 
				   // 		$("<div class='displayExtrasWarning'/>").html(  trad5.replace("%",msg.stock)  ).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
				   // );
				   noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad5.replace("%",msg.stock)+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 2500
				   });
				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }
				   obj.find(".addToBasket_quantity").val(msg.stock);
			   }
			   else if (msg.status == "4") {
			   
				   try {
					   callbackShoppingCart(msg.cart)
				   }
				   catch(err){}
				   $("#totalItemsInCart").html(msg.cart.totalItems)
				   $(".grandsubtotal").html(msg.cart.subTotal)
				   $(".grandtotal").html(msg.cart.totalPrice)
				   $(".discountValue").html(msg.cart.discount)
				   
				   obj.find(".itemQtdUnitPrice").html(msg.cart.unityPrice) 
				   obj.find(".itemQtdPrice").html(msg.cart.itemPrice)
				   
				   obj.find(".addToBasket_quantity").val(msg.cart.totalItems);
			   
				   // $("body").append( 
				   // 		$("<div class='displayExtrasWarning' />").html(trad6).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
				   // );
				   noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad6+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 1500
				   });
				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }
			   }
			   else if (msg.status == "5") {
			   
				   try {
					   callbackShoppingCart(msg.cart)
				   }
				   catch(err){}
				   $("#totalItemsInCart").html(msg.cart.totalItems)
				   $(".grandsubtotal").html(msg.cart.subTotal)
				   $(".grandtotal").html(msg.cart.totalPrice)
				   $(".discountValue").html(msg.cart.discount)
				   
				   obj.find(".itemQtdUnitPrice").html(msg.cart.unityPrice) 
				   obj.find(".itemQtdPrice").html(msg.cart.itemPrice)
				   
				   obj.find(".addToBasket_quantity").val(msg.cart.minItems);
			   
				   // $("body").append( 
				   // 		$("<div class='displayExtrasWarning' />").html(trad7).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
				   // );
				   noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad8+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 1500
				   });
				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }
			   }
		   },
		   error: function(XMLHttpObj, erroCode) {
		   }
	   });
   });
   
	
   $(".displayCoupon").click(function(e) {
	   e.preventDefault();
	   $(".discountInformation").toggle("slideUp");
   }); 
   
	
   function addToBasket(idProduto,objParent) {
   
	   // BEGIN CREATE EXTRA OPTIONS JSON
	   var itemsExtraOptions = $(objParent).find(".omw_cartExtraOptions");
	   var optionsExtraPrice = 0;	
	   if (itemsExtraOptions.length > 0 ) {
				
				var cartExtraOptionsArr = Array();
			   
				  $(itemsExtraOptions).each(function(index) {
					   var valueField = String($(this).val());
					   valueField = valueField.replace(/"/g,'\\"')
					switch ( $(this).prop('tagName').toLowerCase()) {
					   case "textarea":
							   if ( $(this).val() != "") {
								   var line ='{"descricao":"' + $(this).attr("rel") + '","value":"'+ encodeURIComponent(valueField.replace(/(?:\r\n|\r|\n)/g, '<br>')) +'","amount":"0"}';
								   cartExtraOptionsArr.push(line);
							   }
					   break;
					   
					   case "select":
							//if (parseFloat($(this).children("option:selected").attr("extraValue")) > 0 ) {
							if ( $(this).val()  != "-1" &&  $(this).val()  != "" ) {	
							   optionsExtraPrice += parseFloat($(this).children("option:selected").attr("extraValue"));
							   
							   var line ='{"descricao":"' + $(this).attr("rel") + '","value":"'+$(this).children("option:selected").val()+'","amount":"'+$(this).children("option:selected").attr("extraValue")+'","weight":"'+$(this).children("option:selected").attr("weight")+'"}';
							   cartExtraOptionsArr.push(line);
							   
							}
							
					   break;
					   
					   case "input":
					   
						   switch ( $(this).prop('type').toLowerCase()) {
							   case "radio":
								   //if (parseFloat($(this).attr("extraValue")) > 0 && $(this).attr("checked")) {
								   if ( $(this).prop("checked") ) {
									   optionsExtraPrice += parseFloat( $("input[name='" + $(this).attr("name")+ "']:checked").attr("extraValue"));
									   
									   var line ='{"descricao":"' + $("input[name='" + $(this).attr("name")+ "']:checked").attr("rel") + '","value":"'+$("input[name='" + $(this).attr("name")+ "']:checked").val()+'","amount":"'+$("input[name='" + $(this).attr("name")+ "']:checked").attr("extraValue")+'" ,"weight":"'+$("input[name='" + $(this).attr("name")+ "']:checked").attr("weight")+'"}';
									   cartExtraOptionsArr.push(line);
									   
								   }
							   
							   break;
							   
							   case "checkbox":
								   var totalItemsCheckboxSelected = $("input[name='" + $(this).attr("name")+ "']:checked");
								   //if (parseFloat($(this).attr("extraValue")) > 0 && $(this).attr("checked")) {
								   
								   if ( $(this).prop("checked") ) {
									   optionsExtraPrice += parseFloat($(this).attr("extraValue"));
									   
									   var line ='{"descricao":"' + $("input[id='" + $(this).attr("id")+ "']:checked").attr("rel") + '","value":"'+$("input[id='" + $(this).attr("id")+ "']:checked").val()+'","amount":"'+$("input[id='" + $(this).attr("id")+ "']:checked").attr("extraValue")+'" ,"weight":"'+$("input[id='" + $(this).attr("id")+ "']:checked").attr("weight")+'"}';
									   cartExtraOptionsArr.push(line);
								   }
								   
							   break;
							   
							   case "text":
								   if ( $(this).val() != "") {
									   var line ='{"descricao":"' + $(this).attr("rel") + '","value":"'+ valueField +'","amount":"0"}';
									   cartExtraOptionsArr.push(line);
								   }

							   break;
							   
						   }
					   break;
					}
				 });
				
				 var jsonObj ='{"totalExtraOptions":"'+optionsExtraPrice+'","options":[';
				 jsonObj += cartExtraOptionsArr.join(",");

				 jsonObj +=']}';
				 
		 }
		 else {
				 var jsonObj ='{"totalExtraOptions":"0"}';
		 }
	   
	   // END CREATE EXTRA OPTIONS JSON
	   
	   var items = $(objParent).find("select.omw_extraOptionCombo");
	   var productCombo = []
	   $(items).each(function(index) {
		   var atributos = $(this).val().split(":");
		   if ($(this).val() != "-1")  productCombo.push($(this).val());
		   
	   });
	   var extras =  productCombo.join("-")
	   //var idProduto = $(".addToBasket").attr("rel");
	   var qtd = $(".addToBasket_quantity").val();
	   if(qtd==undefined) qtd=1;

	   var plataformaSource = "";
	   if($("html").attr("plataforma")=="pos"){
		   plataformaSource = "pos";
	   }

	   if (base64Loaded) {
			   $(objParent).find(".addToBasket label").attr("label",$(objParent).find(".addToBasket label").html()).fadeIn("normal",function(){
				   $(objParent).find(".addToBasket label").html('<i class="fa fa-spinner fa-spin fa-lg"></i>').fadeOut("normal",function(){

							   var obgBgColor = $(objParent).find(".addToBasket").css("background-color");
							   var obgColor = $(objParent).find(".addToBasket").css("color");

							   	try {
								   var itemValue=$(objParent).find(".omw-prod-detail-price").html().replace( /^\D+/g, '');
								   itemValue = parseFloat(itemValue.replace( /[^\d\.]*/g, ''))*qtd;
								}
								catch(err){
									itemValue=0;
							 	}
								try {
								   var itemValuePromo=$(objParent).find(".omw-prod-detail-normal-price-resurado").html().replace( /^\D+/g, '');
								   itemValuePromo = parseFloat(itemValuePromo.replace( /[^\d\.]*/g, ''))*qtd;
							   	}catch(err){
									itemValuePromo=0;
									console.log(err)
								}

								if($(".wdp_price_box").length>0){
									try {
										var itemValue=$(objParent).find(".wdp_price_promo").html().replace( /[^0-9.,]+/, '');
										itemValue = parseFloat(itemValue)*qtd;
									}catch(err){
										 itemValue=0;
									}
									try {
										var itemValuePromo=$(objParent).find(".wdp_price_old").html().replace( /[^0-9.,]+/, '');
										itemValuePromo = parseFloat(itemValuePromo)*qtd;
									}catch(err){
										itemValuePromo=0;
									}
								}
							   
							   // BEGIN: ADD TO BASKET
							   $.ajax({
									   type: "POST",
									   url: "/_inc/global_assets/omw/addToBasketV2.php",
									   data: "idProduto=" +  idProduto + "&extras=" + extras + "&quantidade="+qtd+ "&extraOptions="+encodeURIComponent(Base64.encode(jsonObj))+"&lang="+$("html").attr("iso")+"&plataformaSource="+plataformaSource+"&obgColor="+obgColor+"&obgBgColor="+obgBgColor+"&itemValue="+itemValue+"&itemValuePromo="+itemValuePromo,
									   dataType:"json",
									   success: function(msg){
										   var outputMsg="";
										   switch (msg.status) {
											   case "99":
												   noty({
														   text: '<center><i class="fa fa-5x fa-check"></i><br>'+translations.i18n['trad2433']+'</center>',
														   type: 'success',
														   layout:"topRight",
														   timeout: 3000
													   });
												   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
												   var leftPosObj = $("button.addToBasket").offset().left;
												   var topPosObj = $("button.addToBasket").offset().top;
												   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
												   }
												   $(objParent).find(".addToBasket label").html($(objParent).find(".addToBasket label").attr("label")).fadeIn();
												   try {
														   stopModuleButtonAnimation();
												   }
												   catch(err){}
												   try {
													TabUtils.BroadcastMessageToAllTabs("updateLinksContainer", "");
												   }
												   catch(err){}

												   return;
											   break;
											   case "0":
												   outputMsg = trad0;
												   try {
													   stopModuleButtonAnimation();
												   }
												   catch(err){}
											   break;
											   case "1":
												   outputMsg = Base64.decode(msg.crosselling);
													try{

														  fbq('track', 'AddToCart',{
															  content_type: 'product',
															  content_ids: msg.sku,
															  value:itemValue,
															  currency:msg.currency
														  });
												  }
												  catch(err){}
												  try{
													   // GA4 (GOOGLE ANALYTICS 4)
													   var currencyGA4 = $("html").attr("currencyIso4217");
													   if (typeof gtag === 'function') {
														   if (msg.variant !== "") {
															   gtag("event", "add_to_cart", {
																   currency: currencyGA4,
																   value: itemValue,
																   items: [
																   {
																	   item_id: msg.sku,
																	   item_name: msg.title,
																	   affiliation: "Weasy website",
																	   item_variant: msg.variant,
																	   price: itemValue,
																	   quantity: qtd,
																	   item_category: msg.categories.item_category,
																	   item_category2: msg.categories.item_category2,
																	   item_category3: msg.categories.item_category3,
																	   item_category4: msg.categories.item_category4,
																	   item_category5: msg.categories.item_category5
																   }
																   ]
															   });
														   } else {
															   gtag("event", "add_to_cart", {
																   currency: currencyGA4,
																   value: itemValue,
																   items: [
																   {
																	   item_id: msg.sku,
																	   item_name: msg.title,
																	   affiliation: "Weasy website",
																	   price: itemValue,
																	   quantity: qtd,
																	   item_category: msg.categories.item_category,
																	   item_category2: msg.categories.item_category2,
																	   item_category3: msg.categories.item_category3,
																	   item_category4: msg.categories.item_category4,
																	   item_category5: msg.categories.item_category5
																   }
																   ]
															   });
														   }
														   
														   
													   }

												  }
												  catch(err){}


												   try {
													   callbackShoppingCart(msg.cart)
												   }
												   catch(err){}

												   try {
													   $(objParent).find(".addToBasket label").html($(objParent).find(".addToBasket label").attr("label")).fadeIn();
													   startModuleButtonAnimation();
												   }
												   catch(err){}

											   break;
											   case "2":
												   outputMsg = trad2;
												   try {
													   stopModuleButtonAnimation();
												   }
												   catch(err){}
											   break;
											   case "3":
												   outputMsg = trad5.replace("%",msg.stock)
												   $(".addToBasket_quantity").val(msg.stock);
												   try {
													   stopModuleButtonAnimation();
												   }
												   catch(err){}
											   break;
											   case "4":
												   outputMsg = trad6.replace("%",msg.items2Add)
												   $(".addToBasket_quantity").val(msg.items2Add);
												   try {
													   stopModuleButtonAnimation();
												   }
												   catch(err){}
											   break;
											   case "5":
												   outputMsg = trad7.replace("%",msg.items2Add)
												   $(".addToBasket_quantity").val(msg.items2Add);
												   try {
													   stopModuleButtonAnimation();
												   }
												   catch(err){}
											   break;
										   }

										   if (msg.status!="1") {
											   // $("body").append( 
											   // 		$("<div class='displayExtrasWarning'/>").html(outputMsg).fadeIn("fast").delay(3000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
											   // );
											   noty({
												   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+outputMsg+'<br></center>',
												   type: 'error',
												   layout:"topRight",
												   timeout: 1500
											   });



											   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
												   var leftPosObj = $("button.addToBasket").offset().left;
												   var topPosObj = $("button.addToBasket").offset().top;
												   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
											   }
											   $(objParent).find(".addToBasket label").html($(objParent).find(".addToBasket label").attr("label")).fadeIn();
											   try {
													   stopModuleButtonAnimation();
											   }
											   catch(err){}
										   }else{
											   try{
												   if(!omw_settings){
													   // noty({
													   // 	text: '<center><i class="fa fa-5x fa-check"></i><br>'+outputMsg+'11<br></center>',
													   // 	type: 'success',
													   // 	layout:"topRight",
													   // 	timeout: 1000
													   // });
													   $("#omw-modal-overflow-cart-message").html(outputMsg);
													   UIkit.modal("#omw-modal-overflow-cart-message").show();
												   }
											   }catch(err){
												   // noty({
												   // 	text: '<center><i class="fa fa-5x fa-check"></i><br>'+outputMsg+'<br></center>',
												   // 	type: 'success',
												   // 	layout:"topRight",
												   // 	timeout: 1000
												   // });


												   $("#omw-modal-overflow-cart-message").html(outputMsg);
												   UIkit.modal("#omw-modal-overflow-cart-message").show();

											   }
											   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
												   var leftPosObj = $("button.addToBasket").offset().left;
												   var topPosObj = $("button.addToBasket").offset().top;
												   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
											   }
										   }
										   $(objParent).find(".addToBasket").css("width","auto");
									   
									   },
									   error: function(XMLHttpObj, erroCode) {
										 
									   }
								});
							   // END: ADD TO BASKET

						   })
				   })
	   }
	   
	   
   
   }

   $("body").on("click",".addToBasket",function(e) {
		// bolo


		if ( parseFloat($(".addToBasket_quantity").val()) == 0) {
			   //$("body").append($("<div class='displayExtrasWarning' />").html(trad3).fadeIn("fast").delay(3000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
			   noty({
				   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+translations.i18n["trad8"]+'<br></center>',
				   type: 'error',
				   layout:"topRight",
				   timeout: 2500
			   });
			   $(".addToBasket_quantity").val(1);
			   return
		 };


		 if ( parseFloat($(".addToBasket_quantity").val()) < parseInt($(".addToBasket_quantity").attr("qtdmin"))) {
			   //$("body").append($("<div class='displayExtrasWarning' />").html(trad3).fadeIn("fast").delay(3000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
			   noty({
				   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+translations.i18n["trad8"]+'<br></center>',
				   type: 'error',
				   layout:"topRight",
				   timeout: 2500
			   });
			   $(".addToBasket_quantity").val($(".addToBasket_quantity").attr("qtdmin"));
			   return
		 };






		  if ($(this).hasClass('omw-discontinuedProduct')) {
				  e.preventDefault();
				  swal({   
			   title: "",   
			   text:  translations.i18n["trad100"],   
			   type: "info",   
			   showCancelButton: false,   
			   confirmButtonColor: "#1998d5",  
			   confirmButtonText: translations.i18n["trad44"],
			   html:true, 
			   customClass:"customsweetnotification", 
			   closeOnConfirm: false });
				  return true;
		  };


		  if ($(this).hasClass('omw-AskForPrice')) {
			  var idProduto = $(this).attr("rel");
			  var logoSrc = $("[module='logotipo'] img").attr("src");
			  var imgLogo ="";
			  if (logoSrc){
				  imgLogo = "<img src='"+logoSrc+"' style='width:150px'><br><br>";
			  }

		   var items = $("body").find("select.omw_extraOptionCombo");
		   var productCombo = []
		   $(items).each(function(index) {
			   var atributos = $(this).val().split(":");
			   if ($(this).val() != "-1")  productCombo.push($(this).find(":selected").text());
			   
		   });
		   var extras =  productCombo.join(" - ");
		   console.log(extras);

		   if(productCombo.length==items.length){

					  swal( {
					   title: "",   
	   //				text:  translations.i18n["trad53"] + "<br><div style='text-align:left'><label for='omw-notifyBudgetName'>"+translations.i18n["trad55"]+" *</label><input class='required' id='omw-notifyBudgetName' type='text' value='' style='margin-top:0;display:block'><label for='omw-notifyBudgetEmail'>"+translations.i18n["trad56"]+" *</label><input class='required' id='omw-notifyBudgetEmail' type='text' value='' style='display:block;margin-top:0'><label for='omw-notifyBudgetTelephone'>"+translations.i18n["trad57"]+"</label><input class='required' id='omw-notifyBudgetTelephone' type='text' value='' style='display:block;margin-top:0;width:100%'><div style='color:#dd6b55;opacity:0' class='omw-notifyWhenActiveOnlyMsg'><center>"+translations.i18n["trad54"] +"</center></div></div>",   
					   text: imgLogo + "<div style='text-align:left'>" + translations.i18n["trad53"] + "</div><br><div style='text-align:left'><label for='omw-notifyBudgetName'>"+translations.i18n["trad55"]+" *</label><input class='required' id='omw-notifyBudgetName' type='text' value='' style='margin-top:0;display:block'><div style='float:left;width:65%'><label for='omw-notifyBudgetEmail'>"+translations.i18n["trad56"]+" *</label><input class='required' id='omw-notifyBudgetEmail' type='text' value='' style='display:block;margin-top:0'></div><div style='float:right;width:30%'><label for='omw-notifyBudgetTelephone'>"+translations.i18n["trad57"]+" *</label><input class='required' id='omw-notifyBudgetTelephone' type='text' value='' style='width:100%;display:block;margin-top:0;width:100%'></div><br clear='all'><label for='omw-notifyBudgetObs'>"+translations.i18n["trad59"]+"</label><textarea class='' id='omw-notifyBudgetObs' type='text' value='' style='display:block;margin-top:0;width:100%'></textarea><div style='color:#dd6b55;opacity:0' class='omw-notifyWhenActiveOnlyMsg'><center>"+translations.i18n["trad54"] +"</center></div></div>",   
					   showCancelButton: true,   
					   confirmButtonColor: "#1998d5",  
					   cancelButtonText: translations.i18n["trad49"],   
					   confirmButtonText: translations.i18n["trad50"],
					   html:true, 
					   customClass:"customsweetnotification", 
					   closeOnConfirm: false }, 
					   function(){  
						   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
						   var $email = $("#omw-notifyBudgetEmail").val(); 
						   var $name = $("#omw-notifyBudgetName").val(); 
						   var $telefone = $("#omw-notifyBudgetTelephone").val(); 
						   var $obs = $("#omw-notifyBudgetObs").val(); 
						   $("#omw-notifyBudgetEmail,#omw-notifyBudgetName,#omw-notifyBudgetTelephone").on("keyup",function(){
								   if (!$(".omw-notifyWhenActiveOnlyMsg").hasClass("canEdit")) {
									   $(".omw-notifyWhenActiveOnlyMsg").addClass("canEdit");
									   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:0}, 300, function() {});
								   }
						   });
						   if ($email != "" && $name !="" && $telefone !=""   ) {
								   function isEmail(email) {
									 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
									 return regex.test(email);
								   }
								   if (isEmail($email) ) {
										   $(".omw-notifyWhenActiveOnlyMsg").animate({opacity:0}, 300, function() {});
										   $(".sa-button-container button").attr("disabled","true");

										   item = {}
											 item ["email"] = $email;
										   item ["idProduto"] = idProduto;
										   item ["nome"] = $name;
										   item ["telefone"] = $telefone;
										   item ["obs"] = $obs;
											item ["lang"] = $("html").attr("iso");
											item ["extras"] = extras;

										   jsonObj = {"action":"addEmailNotifyAskForPrice", "details" : item };

										   $.ajax({
													   type: "POST",
													   url: "/_inc/global_assets/omw/addProductEmailNotify.php",
													   contentType: "application/json; charset=utf-8",
													   data: JSON.stringify(jsonObj) ,
													   dataType:"json",
													   success: function(msg){
														   swal({title:"",html:true, text: translations.i18n["trad58"] , type: "success",showConfirmButton: false,timer:3000  });

													   },
													   error: function(XMLHttpObj, erroCode) {
														 swal({title:"", html:true,text: translations.i18n["trad51"] , type: "error",showConfirmButton: false,timer:2000  });
													   }
										   })



								   }
								   else {
									   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
									   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
								   }

						   } else {
							   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
							   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
						   }
						   
						  });

				   }else{
					   noty({
						   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+translations.i18n["trad2"]+'<br></center>',
						   type: 'error',
						   layout:"topRight",
						   timeout: 1500
					   });
				   }


			  return
		  }


		  if ($(this).hasClass('omw-budgetOnly')) {
			  var idProduto = $(this).attr("rel");
			  var logoSrc = $("[module='logotipo'] img").attr("src");
			  var imgLogo ="";
			  if (logoSrc){
				  imgLogo = "<img src='"+logoSrc+"' style='width:150px'><br><br>";
			  }

			  swal({   
			   title: "", 
			   customClass:"swalextended",  
			   text:  imgLogo + "<div style='text-align:left'>" + translations.i18n["trad53"] + "</div><br><div style='text-align:left'><label for='omw-notifyBudgetName'>"+translations.i18n["trad55"]+" *</label><input class='required' id='omw-notifyBudgetName' type='text' value='' style='margin-top:0;display:block'><div style='float:left;width:65%'><label for='omw-notifyBudgetEmail'>"+translations.i18n["trad56"]+" *</label><input class='required' id='omw-notifyBudgetEmail' type='text' value='' style='display:block;margin-top:0'></div><div style='float:right;width:30%'><label for='omw-notifyBudgetTelephone'>"+translations.i18n["trad57"]+"</label><input class='required' id='omw-notifyBudgetTelephone' type='text' value='' style='width:100%;display:block;margin-top:0;width:100%'></div><br clear='all'><label for='omw-notifyBudgetObs'>"+translations.i18n["trad59"]+"</label><textarea class='' id='omw-notifyBudgetObs' type='text' value='' style='display:block;margin-top:0;width:100%'></textarea><div style='color:#dd6b55;opacity:0' class='omw-notifyWhenActiveOnlyMsg'><center>"+translations.i18n["trad54"] +"</center></div></div>",   
			   showCancelButton: true,   
			   confirmButtonColor: "#1998d5",  
			   cancelButtonText: translations.i18n["trad49"],   
			   confirmButtonText: translations.i18n["trad50"],
			   html:true,  
			   customClass:"customsweetnotification", 
			   closeOnConfirm: false }, 
			   function(){  
				   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
				   var $email = $("#omw-notifyBudgetEmail").val(); 
				   var $name = $("#omw-notifyBudgetName").val(); 
				   var $telefone = $("#omw-notifyBudgetTelephone").val(); 
				   var $obs = $("#omw-notifyBudgetObs").val(); 

				   $("#omw-notifyBudgetEmail,#omw-notifyBudgetName,#omw-notifyBudgetTelephone").on("keyup",function(){
						   if (!$(".omw-notifyWhenActiveOnlyMsg").hasClass("canEdit")) {
							   $(".omw-notifyWhenActiveOnlyMsg").addClass("canEdit");
							   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:0}, 300, function() {});
						   }
				   });
				   if ($email != "" && $name !=""   ) {
						   function isEmail(email) {
							 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
							 return regex.test(email);
						   }
						   if (isEmail($email) ) {
								   $(".omw-notifyWhenActiveOnlyMsg").animate({opacity:0}, 300, function() {});
								   $(".sa-button-container button").attr("disabled","true");

								   item = {}
									 item ["email"] = $email;
								   item ["idProduto"] = idProduto;
								   item ["nome"] = $name;
								   item ["telefone"] = $telefone;
								   item ["obs"] = $obs;
									item ["lang"] = $("html").attr("iso");

								   jsonObj = {"action":"addEmailNotifyBudget", "details" : item };

								   $.ajax({
											   type: "POST",
											   url: "/_inc/global_assets/omw/addProductEmailNotify.php",
											   contentType: "application/json; charset=utf-8",
											   data: JSON.stringify(jsonObj) ,
											   dataType:"json",
											   success: function(msg){
												   swal({title:"",html:true, text: translations.i18n["trad58"] , type: "success",showConfirmButton: false,timer:3000  });

											   },
											   error: function(XMLHttpObj, erroCode) {
												 swal({title:"", html:true,text: translations.i18n["trad51"] , type: "error",showConfirmButton: false,timer:2000  });
											   }
								   })



						   }
						   else {
							   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
							   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
						   }

				   } else {
					   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
					   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
				   }
				   
				  });
			  return
		  }

		  if ($(this).hasClass('omw-notifyWhenActiveOnly')) {
			  var idProduto = $(this).attr("rel");
			  var logoSrc = $("[module='logotipo'] img").attr("src");
			  var imgLogo ="";
			  if (logoSrc){
				  imgLogo = "<img src='"+logoSrc+"' style='width:150px'><br><br>";
			  }
			  swal({   
			   title: "",   
			   text:  imgLogo + "<div style='text-align:left'>" + translations.i18n["trad47"] + "</div><br><input class='' id='omw-notifyWhenActiveOnlyField' type='text' value='' style='display:block'><div style='color:#dd6b55;opacity:0' class='omw-notifyWhenActiveOnlyMsg'>"+translations.i18n["trad48"] +"</div>",   
			   showCancelButton: true,   
			   confirmButtonColor: "#1998d5",  
			   cancelButtonText: translations.i18n["trad49"],   
			   confirmButtonText: translations.i18n["trad50"],
			   customClass:"customsweetnotification", 
			   html:true,  
			   closeOnConfirm: false }, 
			   function(){  
				   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
				   var $email = $("#omw-notifyWhenActiveOnlyField").val(); 
				   $("#omw-notifyWhenActiveOnlyField").on("keyup",function(){
						   if (!$(".omw-notifyWhenActiveOnlyMsg").hasClass("canEdit")) {
							   $(".omw-notifyWhenActiveOnlyMsg").addClass("canEdit");
							   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:0}, 300, function() {});
						   }
				   });
				   if ($email != ""   ) {
						   function isEmail(email) {
							 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
							 return regex.test(email);
						   }
						   if (isEmail($email) ) {
								   $(".omw-notifyWhenActiveOnlyMsg").animate({opacity:0}, 300, function() {});
							   //	$(".sa-button-container button").attr("disabled","true");

								   
								   item = {}
									 item ["email"] = $email;
								   item ["idProduto"] = idProduto;
									item ["lang"] = $("html").attr("iso");
					 
					 if($(".omw_extraOptionComboV2").length>0){
					   var ids_extras=[];
					   $(".omw_extraOptionComboV2").each(function(){
						   ids_extras.push($(this).val());
					   });
					   item ["idsExtra"] = ids_extras.join("-");
					 }

								   jsonObj = {"action":"addEmailNotify", "details" : item };

								   $.ajax({
											   type: "POST",
											   url: "/_inc/global_assets/omw/addProductEmailNotify.php",
											   contentType: "application/json; charset=utf-8",
											   data: JSON.stringify(jsonObj) ,
											   dataType:"json",
											   success: function(msg){
												   swal({title:"",html:true, text: translations.i18n["trad52"] , type: "success",showConfirmButton: false,timer:3000  });

											   },
											   error: function(XMLHttpObj, erroCode) {
												 swal({title:"", html:true,text: translations.i18n["trad51"] , type: "error",showConfirmButton: false,timer:2000  });
											   }
								   })



						   }
						   else {
							   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
							   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
						   }

				   } else {
					   $(".omw-notifyWhenActiveOnlyMsg").removeClass("canEdit");
					   $(".omw-notifyWhenActiveOnlyMsg").stop().animate({opacity:1}, 500, function() {});
				   }
				   
				  });

			  return
		  }



		  e.preventDefault()
		  displayBoxVisible=false;
		   var tamBtn = $(this).outerWidth();
		   var btnObj = $(this);
		   $(btnObj).css("width", (tamBtn-1) +"px");

		 var idProduto = $(this).attr("rel");
		 var itemsExtraOptions = $(this).closest("form").find(".omw_cartExtraOptions");
		 var invalid = 0
		 if (itemsExtraOptions.length > 0 ) {
				  $(itemsExtraOptions).each(function(index) {

					switch ( $(this).prop('tagName').toLowerCase()) {
					   case "textarea":
							if ($(this).hasClass("required") && $(this).val()==""  ) {
								invalid++;
								$(this).addClass("errorClass");
							} 
							else {
								$(this).removeClass("errorClass");
							}
					   break;
					   
					   case "select":
					   console.log("select")
							if ($(this).hasClass("required") && $(this).val()=="-1"  )  {
								invalid++;
								$(this).addClass("errorClass");
							} else {
								$(this).removeClass("errorClass");
							}
					   break;
					   
					   case "input":
					   
						   switch ( $(this).prop('type').toLowerCase()) {
							   case "radio":
								   var totalItemsRadioSelected = $("input[name='" + $(this).attr("name")+ "']:checked");
								   if ($(this).hasClass("required") && totalItemsRadioSelected.length==0  ) {
									invalid++;
									$(this).addClass("errorClass");
								   } else {
										$(this).removeClass("errorClass");
									}							
							   break;
							   
							   case "checkbox":
								   var totalItemsCheckboxSelected = $("input[name='" + $(this).attr("name")+ "']:checked");
								   if ($(this).hasClass("required") && totalItemsCheckboxSelected.length==0  )  {
									   invalid++;
									   $(this).addClass("errorClass");
								   }	 else {
										$(this).removeClass("errorClass");
									}
															   
							   break;
							   
							   case "text":
								   if ($(this).hasClass("required") && $(this).val()==""  )  {
									   invalid++;
									   $(this).addClass("errorClass");
								   } else {
										$(this).removeClass("errorClass");
									}
							   break;
							   
						   }
					   break;
					}
				 });
		 }

		 
		if (invalid > 0 ) {
			 if (displayBoxVisible == false) {
				 displayBoxVisible = true;
				//  $("body").append( 
				   // $("<div class='displayExtrasWarning' />").html(trad1).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
				//  );
			   noty({
				   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad1+'<br></center>',
				   type: 'error',
				   layout:"topRight",
				   timeout: 1500
			   });
			   if ( $("html").attr("themetype")=="produtos.detail" && $("html").attr("facebookcanvas")=="true" ) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
			   }
				 $(btnObj).css("width","auto");
			 }
			 return;
		 }
		 
		  var items = $(this).closest("form").find("select.omw_extraOptionCombo");

		 if (items.length > 0 ) {
			 var invalid = 0
			 $(items).each(function(index) {
			   if ($(this).val() == "-1")  invalid++;
			 });
			 
			 if (invalid > 0 ) {
				 if (displayBoxVisible == false) {
					 displayBoxVisible = true;
					//  $("body").append( 
					   // $("<div class='displayExtrasWarning' />").html(trad1).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}) 
					//  );
					noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad1+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 2500
				   });

				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }

					 $(btnObj).css("width","auto");
				 }
			 }
			 else {
				
			   // produto com combinacoes

			   if (invalidAddToBasket==true) {
				   
				   //$("body").append($("<div class='displayExtrasWarning' />").html(trad2).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
				   noty({
					   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad2+'<br></center>',
					   type: 'error',
					   layout:"topRight",
					   timeout: 1500
				   });
				   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
					   var leftPosObj = $("button.addToBasket").offset().left;
					   var topPosObj = $("button.addToBasket").offset().top;
					   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
				   }
				   $(btnObj).css("width","auto");
			   }
			   else {
				   if (comboStock==0) {
					   invalidAddToBasket=true;
					   //$("body").append($("<div class='displayExtrasWarning' />").html(trad2).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
					   noty({
						   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad2+'<br></center>',
						   type: 'error',
						   layout:"topRight",
						   timeout: 1500
					   });
					   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
						   var leftPosObj = $("button.addToBasket").offset().left;
						   var topPosObj = $("button.addToBasket").offset().top;
						   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
					   }
					   $(btnObj).css("width","auto");
				   }
				   else {
					   invalidAddToBasket=false;
					   
					   if ( parseInt($(".addToBasket_quantity").val()) > parseInt(comboStock)) {
						   //$("body").append($("<div class='displayExtrasWarning' />").html(trad3).fadeIn("fast").delay(3000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
						   noty({
							   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad3+'<br></center>',
							   type: 'error',
							   layout:"topRight",
							   timeout: 1500
						   });
						   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
							   var leftPosObj = $("button.addToBasket").offset().left;
							   var topPosObj = $("button.addToBasket").offset().top;
							   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
						   }
						   $(".addToBasket_quantity").val( comboStock ) 
						   $(btnObj).css("width","auto");
					   }
					   else {
						   var objParent = $(this).closest("form");
						   addToBasket(idProduto,objParent);
					   }
				   }
				   
			   }
			 }
		 }
		 else {
		   // produto sem combinacoes
		   // BEGIN: CHECK PRODUCT STOCK
		   var idProduto = $(this).attr("rel");
		   var objParent = $(this).closest("form");
		   $.ajax({
				   type: "POST",
				   url: "/_inc/global_assets/omw/getProductStockV2.php",
				   data: "idProduto=" +  idProduto,
				   dataType:"json",
				   success: function(msg){

					   if (msg.stock==0) {
						   invalidAddToBasket=true;
						   //$("body").append($("<div class='displayExtrasWarning' />").html(trad2).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
						   // noty({
						   // 	text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad2+'<br></center>',
						   // 	type: 'error',
						   // 	layout:"topRight",
						   // 	timeout: 1500
						   // });

						   UIkit.notification("<div class='omw-default-font'> " + trad2 + "</div>", "danger");


						   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
							   var leftPosObj = $("button.addToBasket").offset().left;
							   var topPosObj = $("button.addToBasket").offset().top;
							   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
						   }

						   $(objParent).closest(".omw-custombutton").find("i").fadeOut("normal", function(){
								$(objParent).closest(".omw-custombutton").find("button.custombtn").html(Base64.decode($(objParent).closest(".omw-custombutton").find("button.custombtn").attr("tmptext"))).fadeIn();
								$(objParent).closest(".omw-custombutton").find("button.custombtn").css("width","auto");
							   $(objParent).closest(".omw-custombutton").find("button.custombtn").css("height","auto");
							});
							
					   }
					   else {
						   invalidAddToBasket=false;
						   
						   if ( parseInt($(".addToBasket_quantity").val()) > parseInt(msg.stock)) {
							   //$("body").append($("<div class='displayExtrasWarning' />").html(trad3).fadeIn("fast").delay(3000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
							   noty({
								   text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+trad3+'<br></center>',
								   type: 'error',
								   layout:"topRight",
								   timeout: 1500
							   });
							   if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
								   var leftPosObj = $("button.addToBasket").offset().left;
								   var topPosObj = $("button.addToBasket").offset().top;
								   $("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
							   }
							   $(".addToBasket_quantity").val( msg.stock ) 
						   }
						   else {
							   addToBasket(idProduto,objParent);
						   }
					   }
					   $(btnObj).css("width","auto");
				   },
				   error: function(XMLHttpObj, erroCode) {
					 
				   }
		   });
		   // END: CHECK PRODUCT STOCK
		   
	}
	   
	   
	});

   var originalContainerInfo = $(".omw-prod-detail-price-box").html();

	$("body").on("change","select.omw_extraOptionCombo, .omw_cartExtraOptions",
		function() {
				$(".addToBasket").attr("l",false);
				var imgFormat = $(this).closest(".omw-product-detail-box").find(".leftPanel").attr("imgformat");

				var textTitle = $(this).closest(".wdp_variations_box").find(".extraHolder").find("span").attr("rel");
				var textText = $(this).closest(".extraHolderCombo").find("select.omw_extraOptionCombo option:selected").text();
				var textValue = $(this).closest(".extraHolderCombo").find("select.omw_extraOptionCombo option:selected").val();
				console.log("clicou extras")
				console.log(textTitle)
				console.log(textText)
				console.log(textValue)
				if(textValue!="-1" && textTitle!=undefined && textText!=undefined){
					if($(this).closest("[module='productdetail']").attr("tsplugin")=="7"){
						$(this).closest(".wdp_variations_box").find(".extraHolder").find("span[rel]").html(textTitle+" / <span style='font-weight:bold !important; color: #3a2e2c !important;'>"+textText+"</span>");
					}else{
						$(this).closest(".wdp_variations_box").find(".extraHolder").find("span").text(textTitle+": "+textText);
					}
				}

				var optionsExtraPrice = 0;
			
				// lets check extra prices checked on omw_cartExtraOptions fields
				
				if ( $(this).prop('tagName').toLowerCase() == "select" || ($(this).prop('type').toLowerCase() == "radio" ||  $(this).prop('type').toLowerCase() == "checkbox")   ) {
					
					var itemsChecked = $(this).closest("form").find(".omw_cartExtraOptions:checked, select.omw_cartExtraOptions");
					
					$(itemsChecked).each(function(index) {
							
							if ($(this).prop('tagName').toLowerCase() == "select" ) {
							if (parseFloat($(this).children("option:selected").attr("extraValue")) > 0 ) {
								optionsExtraPrice += parseFloat($(this).children("option:selected").attr("extraValue"));
							}
							}
							else {
							if (parseFloat($(this).attr("extraValue")) > 0 ) {
								optionsExtraPrice += parseFloat($(this).attr("extraValue"));
							}
							}
							
					});
					
				}
				else {
					return
				}

				console.log($(this))
			
				var idProduto = $(this).attr("idProduto");
				var items = $(this).closest("form").find("select.omw_extraOptionCombo");
			
				if ( idProduto == undefined) {
					idProduto = $("#omw_idprod").val();
				}
				if ( idProduto == undefined) {
					idProduto = $(".addToBasket").attr("rel");
				}
				if ( idProduto == undefined) {
					idProduto = $(".rightPanel").attr("rel");
				}

				var productCombo = []
				$(items).each(function(index) {
					var atributos = $(this).val().split(":");
				if ($(this).val() != "-1")  productCombo.push($(this).val());
				
				});
				
				if (productCombo.length == items.length) 
					var restorePrice = 0;
				else 
					var restorePrice = 1;
				// BEGIN: CHECK PRICE CHANGE BASED ON EXTRA OPTION


				//if (restorePrice==1) $(".omw-prod-detail-price-box").html(originalContainerInfo);

				function controlStock(hasStock,trad){
					if(hasStock>0){
						$(".wdp_outstock_main .wdp_outstock_item").removeClass("wdp_outstock_icon").removeClass("wdp_hasstock_icon").addClass("wdp_hasstock_icon");
						$(".wdp_outstock_main .wdp_outstock_subitem").removeClass("wdp_outstock_inner_icon").removeClass("wdp_hasstock_inner_icon").addClass("wdp_hasstock_inner_icon");
					}else{
						$(".wdp_outstock_main .wdp_outstock_item").removeClass("wdp_outstock_icon").removeClass("wdp_hasstock_icon").addClass("wdp_outstock_icon");
						$(".wdp_outstock_main .wdp_outstock_subitem").removeClass("wdp_outstock_inner_icon").removeClass("wdp_hasstock_inner_icon").addClass("wdp_outstock_inner_icon");
					}
					$(".wdp_outstock_main span").text(trad);
				}

				$.ajax({
					type: "POST",
					url: "/_inc/global_assets/omw/getProductPriceV2.php",
					data: "idProduto=" +  idProduto + "&restorePrice=" + restorePrice + "&imgFormat=" + imgFormat + "&productCombo=" + productCombo.join("-") + "&optionsExtraPrice=" + optionsExtraPrice+"&lang="+$("html").attr("iso"),
					dataType:"json",
					success: function(msg){
						$(".addToBasket").attr("l",true);
						$("#phash").val(msg.phash);
						$("#phash_stock").val(msg.stock);

						//if(restorePrice==0){
							if($(".wdp_images_main").length>0){
								if($(".wdp_images_main2.owl-carousel").length==0){
									if(msg.imagens_plugin6!=""){
										var arrImg = msg.imagens_plugin6.split("[#]");
										var htmlImg = "";
										if(arrImg.length>0){
											for(var img=0; img<arrImg.length; img++){
												var fImg = arrImg[img];
												var fImg_name = "";
												var fImg_w = "1920";
												var fImg_h = "1920";
												if(fImg.length>1){
													var fImg_size = fImg.split("[x]");
													fImg_name = fImg_size[0];
													if(fImg_size.length>1){
														var fImg_size_final = fImg_size[1].split("x");
														fImg_w = fImg_size_final[0];
														fImg_h = fImg_size_final[1];
													}
												}
												if($(".grid_mix").length>0){
													var hasFull="";
													if($("[module='productdetail']").attr("tsplugin")=="7"){
														if (img==0) hasFull="full_width";
														var imgAux = '<div class="wdp_image '+hasFull+'"><figure><a class="zoomItem" href="'+fImg_name+'" data-cropped="true" data-size="'+fImg_w+'x'+fImg_h+'" data-pswp-width="'+fImg_w+'" data-pswp-height="'+fImg_h+'" target="_blank"><img srcset="'+fImg_name+' 100w,'+fImg_name+' 300w,'+fImg_name+' 500w,'+fImg_name+' 750w,'+fImg_name+' 1000w,'+fImg_name+' 1500w,'+fImg_name+' 2500w" sizes="(max-width: 100px) 100px, (max-width: 300px) 300px, (max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, (min-width: 1500px) 1500px, (min-width: 2500px) 2500px" onerror="handleImageError(this)" data-fallback="false" class="" src="'+fImg_name+'"></a></figure></div>';
													}else{
														if ((img - 2) % 3 === 0 && img >= 2) hasFull="full_width";
														var imgAux = '<div class="wdp_image '+hasFull+'"><figure><a class="zoomItem" href="'+fImg_name+'" data-cropped="true" data-size="'+fImg_w+'x'+fImg_h+'" data-pswp-width="'+fImg_w+'" data-pswp-height="'+fImg_h+'" target="_blank"><img srcset="'+fImg_name+' 100w,'+fImg_name+' 300w,'+fImg_name+' 500w,'+fImg_name+' 750w,'+fImg_name+' 1000w,'+fImg_name+' 1500w,'+fImg_name+' 2500w" sizes="(max-width: 100px) 100px, (max-width: 300px) 300px, (max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, (min-width: 1500px) 1500px, (min-width: 2500px) 2500px" onerror="handleImageError(this)" data-fallback="false" class="shape-rounded" src="'+fImg_name+'"></a></figure></div>';
													}
													htmlImg+=imgAux;
												}else{
													var imgAux = '<div class="wdp_image"><figure><a class="zoomItem" href="'+fImg_name+'" data-cropped="true" data-size="'+fImg_w+'x'+fImg_h+'" data-pswp-width="'+fImg_w+'" data-pswp-height="'+fImg_h+'" target="_blank"><img srcset="'+fImg_name+' 100w,'+fImg_name+' 300w,'+fImg_name+' 500w,'+fImg_name+' 750w,'+fImg_name+' 1000w,'+fImg_name+' 1500w,'+fImg_name+' 2500w" sizes="(max-width: 100px) 100px, (max-width: 300px) 300px, (max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, (min-width: 1500px) 1500px, (min-width: 2500px) 2500px" onerror="handleImageError(this)" data-fallback="false" class="shape-rounded" src="'+fImg_name+'"></a></figure></div>';
													htmlImg+=imgAux;
												}
											}
										}
										$(".wdp_images_main2").html(htmlImg);
									}
								}else{
									if(msg.imagens_plugin6!=""){
										var arrImg = msg.imagens_plugin6.split("[#]");
										if(arrImg.length>0){
											var fImg = arrImg[0];
											var fImg_name = "";
											if(fImg.length>1){
												var fImg_size = fImg.split("[x]");
												fImg_name = fImg_size[0];
											}
											console.log(fImg_name)
											if($(".wdp_images_main2.owl-carousel .owl-item img[src='"+fImg_name+"']").length>0){
												var slide_index = $(".wdp_images_main2.owl-carousel .owl-item img[src='"+fImg_name+"']").closest(".owl-item").index();
												$("[module='productdetail'] .wdp_images_main2.owl-carousel").trigger('to.owl.carousel',slide_index);
											}
										}
									}
								}
							}
						//}

						if (msg.sku && msg.sku!=""){
								$("[omwField='sku']").html(msg.sku);
						}
						if (msg.ean && msg.ean!=""){
								$("[omwField='ean']").html(msg.ean);
						}

						if (msg.multiplePrice!=1){

							$(".priceTag").html(msg.price);
							
							if ($(".discount").length >0 ) {
								$(".discount").html(msg.price2);
							}

							if(msg.hasSince){
								$(".priceHasSince").css("display","none");
								$('[data-value="priceSince"]').css("display","flex");
							}else{
								$(".priceFrom").html("&nbsp;");
								$('[data-value="priceSince"]').css("display","none");
							}
							if (restorePrice==0){

								$(".omw-prod-detail-price-box").html("");
								$(".wdp_price_main").html("");
								if (msg.price2 != msg.price){
									if($('html[themesource="_aldoshoespt"]').length>0){
										$(".omw-prod-detail-price-box").append("<div class='priceTag omw-prod-detail-price '>"+msg.price2+"</div>");
										$(".omw-prod-detail-price-box").append("<div class='bgTextColor promoPriceIndicatorBox  '>"+msg.discountPercent+"%</div>");
										$(".omw-prod-detail-price-box").append("<div class='discount omw-prod-detail-normal-price omw-prod-detail-normal-price-resurado'>"+msg.price+"</div>");
										$(".omw-prod-detail-price-box").append('<div class="promoPriceIndicatorLabel"><small>'+msg.discountDate+'</small></div>');
										
										$(".wdp_price_main").append('<div class="wdp_price_box"></div>');
										$(".wdp_price_box").append("<span class='wdp_price_old'>"+msg.price+"</span>");
										$(".wdp_price_box").append("<span class='wdp_price_perc'>"+msg.discountPercent+"%</span>");
										$(".wdp_price_box").append("<span class='wdp_price_promo'>"+msg.price2+"</span>");
										$(".wdp_price_main").append('<span class="wdp_price_dates">'+msg.discountDate+'</span>');
									}else{
										$(".omw-prod-detail-price-box").append("<div class='discount omw-prod-detail-normal-price omw-prod-detail-normal-price-resurado'>"+msg.price+"</div>");
										$(".omw-prod-detail-price-box").append("<div class='priceTag omw-prod-detail-price '>"+msg.price2+"</div>");
										$(".omw-prod-detail-price-box").append("<div class='bgTextColor promoPriceIndicatorBox  '>"+msg.discountPercent+"%</div>");
										$(".omw-prod-detail-price-box").append('<div class="promoPriceIndicatorLabel"><small>'+msg.discountDate+'</small></div>');
										
										$(".wdp_price_main").append('<div class="wdp_price_box"></div>');
										$(".wdp_price_box").append("<span class='wdp_price_promo'>"+msg.price2+"</span>");
										$(".wdp_price_box").append("<span class='wdp_price_old'>"+msg.price+"</span>");
										$(".wdp_price_box").append("<span class='wdp_price_perc'>"+msg.discountPercent+"%</span>");
										$(".wdp_price_main").append('<span class="wdp_price_dates">'+msg.discountDate+'</span>');
									}

								}
								else{
									$(".omw-prod-detail-price-box").append("<div class='priceTag omw-prod-detail-price omw-prod-detail-normal-price'>"+msg.price+"</div>");

									$(".wdp_price_main").append('<div class="wdp_price_box"></div>');
									$(".wdp_price_box").append("<span class='wdp_price_promo primColor'>"+msg.price+"</span>");
								}
								var newDetail="";
								if($(".wdp_price_main").length>0){
									newDetail=$(".wdp_price_main").attr("data-value");
									if(newDetail!=""){
										$(".wdp_price_box").addClass(newDetail);
										$(".wdp_price_dates").addClass(newDetail);
									}
								}
							} else{
								$(".omw-prod-detail-price-box").html(originalContainerInfo);
							}

							// Render placement with new information
							try {
								$("#size-h-placement").attr('data-splitit-amount', msg.rawPrice);
								splitit.ui.refresh();
							}
							catch(err){}

							try {
								var scalaObj = $("scalapay-widget");
								var minAmountScala = scalaObj.attr("min"); 
								var maxAmountScala = scalaObj.attr("max"); 
								scalaObj.attr('amount', msg.rawPrice);
								if (msg.rawPrice >= minAmountScala && msg.rawPrice <= maxAmountScala){
									$("#scalapay-container").show();
								} 
								else{
									$("#scalapay-container").hide();
								}

							}
							catch(err){}
						}

						comboStock = msg.stock
						if (productCombo.length == items.length) {
							invalidAddToBasket=false;
							//if (parseInt(msg.stock)==0 || (isNaN(parseInt(msg.stock)))){
							if (parseInt(msg.stock)==0){
								invalidAddToBasket=true;
								//$("body").append($("<div class='displayExtrasWarning' />").html(translations.i18n["trad9"]).fadeIn("fast").delay(2000).fadeOut("fast",function() {displayBoxVisible=false;$(this).remove()}));
								noty({
									text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+translations.i18n["trad9"]+'<br></center>',
									type: 'error',
									layout:"topRight",
									timeout: 1500
								});

								if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
									var leftPosObj = $("button.addToBasket").offset().left;
									var topPosObj = $("button.addToBasket").offset().top;
									$("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
								}
		
								if($("[module='productdetail'][tsplugin='7']").length>0 || $("[module='productdetail'][tsplugin='6']").length>0){
									if( $(".addToBasket").length>0 && $(".addToBasket_omw").length>0 ){
									
										$(".addToBasket").not(".addToBasket_omw").addClass("addToBasket_old").removeClass("addToBasket").css("display","none");
										$(".addToBasketMain").css("display","none");

										$(".wdp_addCart_title").css("display","none");

										$(".addToBasket_omw").addClass("addToBasket");
										$(".addToBasket_omw").css("display","block");
									
										$("#paypal-button-container").css("display","none");
										$(".omw-shipping-preview-container").css("display","none");
									
										$(".hasStockBox").addClass("hasStock_indisponivel");
										$(".hasStockBox .hasStock_desc").text(translations.i18n["trad2432"]);

										controlStock(0,translations.i18n["trad2432"]);
									
									}
								}else{
									if( $(".addToBasket").length>0 && $(".addToBasketMain").length>0 && $(".addToBasket_omw").length>0 ){
									
										$(".addToBasket").not(".addToBasket_omw").addClass("addToBasket_old").removeClass("addToBasket").css("display","none");
										$(".addToBasketMain").css("display","none");

										$(".wdp_addCart_title").css("display","none");

										$(".addToBasket_omw").addClass("addToBasket");
										$(".addToBasket_omw").css("display","block");
									
										$("#paypal-button-container").css("display","none");
										$(".omw-shipping-preview-container").css("display","none");
									
										$(".hasStockBox").addClass("hasStock_indisponivel");
										$(".hasStockBox .hasStock_desc").text(translations.i18n["trad2432"]);

										controlStock(0,translations.i18n["trad2432"]);
									
									}
								}

								// if(isNaN(parseInt(msg.stock))){
								// 	$(".wdp_group_2").css("display","none");
								// 	$(".omw-prod-detail-price-box").css("display","none");
								// }else{
									$(".wdp_group_2").css("display","flex");
									$(".omw-prod-detail-price-box").css("display","block");
								// }
		
							} else {
								$(".wdp_group_2").css("display","flex");
								$(".omw-prod-detail-price-box").css("display","block");
								
								if ( parseInt( $(".addToBasket_quantity").val() ) > parseInt( msg.stock ) ) {
									invalidAddToBasket=false;
									noty({
										text: '<center><i class="fa fa-5x fa-exclamation-circle"></i><br>'+translations.i18n["trad10"]+'<br></center>',
										type: 'error',
										layout:"topRight",
										timeout: 1500
									});
									if (( $("html").attr("themetype")=="produtos.detail"  && $("html").attr("facebookcanvas")=="true" )) {
										var leftPosObj = $("button.addToBasket").offset().left;
										var topPosObj = $("button.addToBasket").offset().top;
										$("#noty_topRight_layout_container").css({"position":"absolute","left":leftPosObj,"top":topPosObj});
									}
									$(".addToBasket_quantity").val( msg.stock ) 
								}
		
								if($("[module='productdetail'][tsplugin='7']").length>0 || $("[module='productdetail'][tsplugin='6']").length>0){
									if($(".addToBasket_old").length>0 && $(".addToBasket_omw").length>0){
										$(".addToBasket_omw").removeClass("addToBasket");
										$(".addToBasket_omw").css("display","none");

										$(".wdp_addCart_title").css("display","block");
										
										$(".addToBasket_old").addClass("addToBasket").removeClass("addToBasket_old").css("display","block");
										$(".addToBasketMain").css("display","flex");
										
										$("#paypal-button-container").css("display","block");
										$(".omw-shipping-preview-container").css("display","block");
										
										$(".hasStockBox").removeClass("hasStock_indisponivel");
										$(".hasStockBox .hasStock_desc").text(translations.i18n["trad2431"]);
									
										controlStock(1,translations.i18n["trad2431"]);
									}
								}else{
									if($(".addToBasket_old").length>0 && $(".addToBasketMain").length>0 && $(".addToBasket_omw").length>0){
										$(".addToBasket_omw").removeClass("addToBasket");
										$(".addToBasket_omw").css("display","none");

										$(".wdp_addCart_title").css("display","block");
										
										$(".addToBasket_old").addClass("addToBasket").removeClass("addToBasket_old").css("display","block");
										$(".addToBasketMain").css("display","block");
										
										$("#paypal-button-container").css("display","block");
										$(".omw-shipping-preview-container").css("display","block");
										
										$(".hasStockBox").removeClass("hasStock_indisponivel");
										$(".hasStockBox .hasStock_desc").text(translations.i18n["trad2431"]);
									
										controlStock(1,translations.i18n["trad2431"]);
									}
								}
		
							}
						} else {
							
							invalidAddToBasket=false;
						}
						//check for images from extras combinations
						try {
							if ( $("html[buybutton=true]").length == 0 && $("[module='productdetail'][tsplugin='3']").length == 0 && $("[module='productdetail'][tsplugin='4']").length == 0  && $("[module='productdetail'][tsplugin='6']").length == 0 && $("[module='productdetail'][tsplugin='7']").length == 0 && $("[module='productdetail'][tsplugin='nortemoda']").length == 0) {
								
								var instOWL = $("[module='productdetail'] .owl-carousel:not(.aldo_related_box)");
								instOWL.trigger('destroy.owl.carousel'); 
								instOWL.find('.owl-stage-outer').children().unwrap();
								instOWL.removeClass("owl-center owl-loaded owl-text-select-on");
								instOWL.html(msg.imagens);
								instOWL.owlCarousel({
									nav:true,
									dots:false,
									responsive:{
										0:{
											items:2
										},
										768:{
											items:3
										},
										980:{
											items:3
										}
									},
									navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
									items:3,
									margin:15,
									autoplay:false,
									loop:true
								});
								instOWL.find(".owl-item.active").eq(0).trigger("click");
								$(".mainImgBox").attr("href",instOWL.find(".owl-item.active").eq(0).find("img").attr("rel"));
							}
							// if ( $("html[buybutton=true]").length == 0 && $("[module='productdetail'][tsplugin='3']").length == 1 && msg.imagens_plugin3!="") {
							if ( $("html[buybutton=true]").length == 0 && ($("[module='productdetail'][tsplugin='3']").length == 1 || $("[module='productdetail'][tsplugin='4']").length == 1 || $("[module='productdetail'][tsplugin='nortemoda']").length == 1) && msg.imagens_plugin3!="") {
								
								var arrayImg = msg.imagens_plugin3.split("[#]");
								var arrayImg = $.map( arrayImg, function(v){
									return v === "" ? null : v;
								});
								for(var imgt=0; imgt<arrayImg.length; imgt++){
									if(imgt==0){
										var ext = arrayImg[imgt].split('.').pop();
										var nome = arrayImg[imgt].replace("."+ext,"");
										//var nomeFinal = nome+"_thumb."+ext;
										var nomeFinal = arrayImg[imgt];
										
										var indexImg = $("[module='productdetail'] .owl-carousel:not(.aldo_related_box)").find("img[src='"+nomeFinal+"']").closest(".owl-item").index();
										$("[module='productdetail'] .owl-carousel:not(.aldo_related_box)").trigger('to.owl.carousel',indexImg);

										if($(".owl-carousel-v3").length>0){
											sliderHorizontal.goToSlide(indexImg);
										}
										if($("#vertical").length>0){
											slideVertical.goToSlide(indexImg);
										}
									}
								}
							}
						}
						catch(err){}


						if (parseInt(msg.stock)==0 || msg.stock==""){

							var totalInvalid = 0;

							$("select.omw_extraOptionCombo").each(function() {
								if ($(this).val()=="-1") totalInvalid++;
							});

							// if (totalInvalid==0) {
							// 	$(".omw-prod-detail-normal-price").html(translations.i18n["trad45"]);
							// 	$(".omw-prod-detail-price:not(.omw-prod-detail-normal-price)").html("");
							// }
						}
						if ("sku" in msg){
							if ($(".omw-estimated-shipping-country-selector-container").length>0){
								var totalWeight = parseFloat(msg.weight) + parseFloat(msg.extraWeight);
								if (! parseFloat(totalWeight)>0) totalWeight=0;

								$(".omw-estimated-shipping-country-selector-container").attr("weight",totalWeight);
								$(".omw-estimated-shipping-country-selector-container select").trigger("change");
							}
						}
						


					},
					error: function(XMLHttpObj, erroCode) {
						
					}
				});
				// END: CHECK PRICE CHANGE BASED ON EXTRA OPTION
							 
					 
	});
	
   // BEGIN: FORM METATAGS HANDLER
   try {	
		$.validator.messages.required = "";
		$.validator.messages.number = "";
		$.validator.messages.email = "";
		$.validator.messages.remote = "";
		$.validator.messages.equalTo = "";
	   
	   $("form#omw_checkout_form").validate({
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
			 $(".finalizeOrder").fadeOut("fast", function() {
				 form.submit();
			 });
			 
			   
			 }
   });
	   
	   
   }
   catch(error) {}
   // END: FORM METATAGS HANDLER	
   
   
   $("ul.omw-product-tabs a").click(function(e) {
	   e.preventDefault();
	   $("ul.omw-product-tabs a").removeClass("active");
	   $(this).addClass("active");
	   
	   $("ul.omw-product-tabs-detail li").removeClass("active");
	   $("li#" + $(this).attr("id") + "-detail").addClass("active");
	   
	   
	   
   })


   // CUSTOM UPLOAD 

   // CHECK IF WE HAVE A OMW-CAR-CUSTOM-UPLOAD
   if ( $(".omw-cart-custom-upload-container").length > 0  ) {


	   // LETS LOAD PLUPLOAD
		$.getScript("/_inc/global_assets/plupload/js/plupload.full.min.js", function() {

			var uploaders = new Array();

		   initUploaders = function(uploaders) {
			   $(".omw-cart-custom-upload-container button").each(function() {
				   var el = $(this);
				   var button = el;
				   var container = el.prev(".omw-cart-custom-upload-filename");
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
						  multipart_params: {"destination": $(".omw-cart-custom-upload-container").attr("destination") },
					   filters: [
						   { title: "Image", extensions: "jpeg,jpg,gif,png,raw"},
						   { title: "PDF", extensions: "pdf"},
						   { title: "ZIP", extensions: "zip"}

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
							   // SAVE UPLOAD ON TMP FOLDER

							   var obj = $(container).closest(".omw-cart-custom-upload-container");
							   jsonObj = [];
							   item = {}
								 item ["id"] = $(obj).attr("rel");
							   item ["observacoes"] = $(obj).children("textarea").val();
							   item ["file"] = $(obj).children(".omw-cart-custom-upload-filename").attr("rel");
							   item ["originalname"] = $(obj).children(".omw-cart-custom-upload-filename").attr("originalname");

							   jsonObj.push(item);
							   jsonObj = {"action":"insert", "uploads" : jsonObj };

							   $.ajax({
											   type: "POST",
											   url: "/_inc/global_assets/omw/cartUploadV2.php",
											   contentType: "application/json; charset=utf-8",
											   data: JSON.stringify(jsonObj) ,
											   dataType:"json",
											   success: function(msg){
												   // $(".finalizeOrder").data('onclick').call(this, e || window.event);
											   },
											   error: function(XMLHttpObj, erroCode) {
												 
											   }
								   })

						   },

						   Error: function(up, err) {
							   alert($(".omw-cart-custom-upload-container").attr("trad1"))
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


	   // $(".finalizeOrder").data('onclick',   $(".finalizeOrder").prop("onclick") );
	   // $(".finalizeOrder").prop("onclick", null);
	   

	   $(".finalizeOrder").on("click", function(e) {


		   if ($("#cart .omw-cart-custom-upload-filename[isuploading='true']").length > 0 ) {
			   alert($(".omw-cart-custom-upload-container").attr("trad2"));
			   return	
		   }

	   //	$(this).prop("disabled",true)
		   var label = $(this).html();
		   $(this).html( $(".omw-cart-custom-upload-container").attr("trad")  )

		   jsonObj = [];
		   $(".omw-cart-custom-upload-container").each( function( index ) {
				item = {}
				  item ["id"] = $(this).attr("rel");
				item ["observacoes"] = $(this).children("textarea").val();
				item ["file"] = $(this).children(".omw-cart-custom-upload-filename").attr("rel");
				item ["originalname"] = $(this).children(".omw-cart-custom-upload-filename").attr("originalname");

				jsonObj.push(item);
		   })
		   jsonObj = {"action":"insert", "uploads" : jsonObj };

		   $.ajax({
						   type: "POST",
						   url: "/_inc/global_assets/omw/cartUploadV2.php",
						   contentType: "application/json; charset=utf-8",
						   data: JSON.stringify(jsonObj) ,
						   dataType:"json",
						   success: function(msg){
							   // $(".finalizeOrder").data('onclick').call(this, e || window.event);
						   },
						   error: function(XMLHttpObj, erroCode) {
							 
						   }
			   })

	   });



	   $(".omw-cart-custom-upload-container button.omw-cart-custom-delete-file-upload").on("click", function(e){
		   e.preventDefault();
		   var objuploadfilename = $(this).parent().find(".omw-cart-custom-upload-filename");
		   var button = $(this)
		   jsonObj = {"action":"delete", "id" : $(this).closest(".omw-cart-custom-upload-container").attr("rel") };
		   $.ajax({
						   type: "POST",
						   url: "/_inc/global_assets/omw/cartUploadV2.php",
						   contentType: "application/json; charset=utf-8",
						   data: JSON.stringify(jsonObj) ,
						   dataType:"json",
						   success: function(msg){
								   $(objuploadfilename).html("");
								   $(objuploadfilename).attr("rel","");
								   $(objuploadfilename).attr("originalname","");
								   $(objuploadfilename).attr("isuploading", "");
								   $(button).stop().stop().fadeOut();


						   },
						   error: function(XMLHttpObj, erroCode) {
						   

						   }
			   })

   });


   $("a.omw-cart-custom-upload").on("click", function(e){
	   e.preventDefault();
	   $(this).next(".omw-cart-custom-upload-container").toggle("fade");
   });
   
   

}



   
});


