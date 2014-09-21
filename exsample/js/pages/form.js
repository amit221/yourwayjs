define(['validate'],function(){
	var form = function(){
			$.validator.setDefaults({
				    highlight: function(element) {
				        $(element).closest('.form-group').addClass('has-error');
				    },
				    unhighlight: function(element) {
				        $(element).closest('.form-group').removeClass('has-error');
				    },
				    errorElement: 'span',
				    errorClass: 'help-block',
				    errorPlacement: function(error, element) {
				    	
				        if(element.parent('.input-group').length) {
				            error.insertAfter(element.parent());
				        } else {
				            error.insertAfter(element);
				        }
				    }
				});
				var validator = $("form").validate({
					 // rules: {
				});
				
				yourwayjs.addPlugin(function(){
					var form = $('form').get(0);
					$.removeData(form,'validator');

				});
				$("form").on('submit',function(){
					
					yourwayjs.noAnimation();
				});

				if($.trim($("#boxi").html()) != ""){
					 $('html,body').animate({
					        scrollTop: $("#boxi").offset().top},
					        'slow'
					 );

					
				}
	}

	return form;
});