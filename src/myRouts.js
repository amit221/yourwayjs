/*
 * yourwayjs Plugin Beta version
 * 
 *
 * Copyright (c) 2014  Amit Wagner
 *
 *
 * Requires jQuery v1.7.2+ , history.js , helper.js
 *
 */


(function( $, window, document, undefined ) {
	

	var myRouts = {

		
		"server_page":{
			route:function(response){
				
				$("#main_content").html(response)
			},
			
		},
		"":{
			route:function(response){
				
				myRouts.server_page.route(response);
			},
			
		},

		"working_with_json":{
			route:function(response){
				
				var page = new working_with_json(response);
				$("#main_content").html( page.render());
			},
			error:function(textStatus,errorThrown){
				
			},
			settings:function(){
				yourwayjs.setOneTimeAjaxParams({
					dataType:"json"
				});
			}
		},

		"form":{
			route:function(response){
				

				$("#main_content").html(response);
				var page = new form();
			},
		
			
		},

		"default":{
			route:function(response){
				//$(".contentt").html(response)
			},
			error:function(jqXHR,textStatus,errorThrown){
				$("#main_content").html(jqXHR.responseText);
			},
		}
	

		
	}



	return myRouts;

      	
	
})( jQuery, window, document );
