define(['hbs!../../views/working_with_json'],function(tpl){

		
		var working_with_json = function(respone){
			this.render = function(){
				return tpl(respone);
		
			}
			
			return this;
		}
		
		return working_with_json;
		
	

	
	
	
});