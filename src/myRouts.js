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

		

		"index.php":{
			route:function(response){
				
				$(".contentt").html(response)
			},
			error:function(textStatus,errorThrown){
				
			},
			settings:function(){

			}
		},

		"page2.php":{
			route:function(response){
				
				$(".contentt").html(response)
				$("#adaa").click(function(){
					console.log(3);
				});
			},
			error:function(textStatus,errorThrown){
				
			},
			settings:function(){

			}
		},

		"page3.php":{
			route:function(response){
				$(".contentt").html(response)
				$("#ada").click(function(){
					console.log(2);
				});
			},
			error:function(textStatus,errorThrown){
				
			},
			settings:function(){

			}
		},

		"default":{
			route:function(response){
				$(".contentt").html(response)
			},
			error:function(textStatus,errorThrown){
				
			},
		}
	

		
	}

	if ( typeof define === "function" && define.amd ) {
		define( "myRouts", [], function() {
			return myRouts;
		});
	}

	return myRouts;
      	
	
})( jQuery, window, document );
