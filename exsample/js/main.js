define(["yourwayjs","myRouts"],function(yourwayjs,myRouts){
	new yourwayjs({
	    url:"http://localhost/yourwayjs/exsample" ,  
	    routs: myRouts,         
	    container:"#main_content",         
	    startWithRout:true,         
	    startPageSwitch:function(){
	    	this.delay = 400;
	    	$("#main_content").slideUp(400);
	    	
	    	
	    },   
	    stopPageSwitch:function(){
	    	$("#main_content").slideDown(400);
	    
	    }    

	});
})
