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

	// $$('figcaption p').flowtype({
	//    minFont : 10,
	//    maxFont : 20,
	//    fontRatio : 10
	// });

});






