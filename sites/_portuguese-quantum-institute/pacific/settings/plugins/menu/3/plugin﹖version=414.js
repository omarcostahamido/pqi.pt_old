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
	var pathname = window.location.pathname;
	$(".omw-menu").find("li a[href='"+pathname+"']").closest("li").addClass("omw-active");

});