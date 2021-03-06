/*
 * yourwayjs Plugin Beta version
 * 
 *
 * Copyright (c) 2014  Amit Wagner 
 * https://github.com/amit221/yourwayjs
 *
 * Requires jQuery v1.7.2+ , history.js , helper.js 
 *
 */


(function( $, window, document, undefined ) {
	
		/*yourwayjs variables*/
	/*****************************/
	var yourwayjsOptions = {
			url:null ,					// the base url of your webstie (requierd)
			onload:function(){} ,		// your own function when the plugin is finish to init,
			container:"",				// a jquery selctor for the main container of the page (requierd)
			startWithRout:true, 		// after init call the page that requested
			startPageSwitch:function(){}, 	// user function that happen before the ajax request for the page  
			stopPageSwitch:function(){},	// user function that happen after the page was renderd
			routs: null,				// this is your routing logic . (requierd)
			defaultAjaxParams:{},   	// your defult ajax params for every request
			delay:0,					//set the delay time if use animation in startPageSwitch  and stopPageSwitch
	};
	var current_url		= "";
	var _instance   	= null;
	var pages        		= {};
	var onEvents		= [];
	var bindEvents 		= [];
	var globalVars		= [];
	var plugins      		= [];
	var request 		= {method:'get',data:{}}; 
	var page  		= ""; 
	var oneTimeAjaxParams = {};
	var noAnimation 	= false;

	/*****************************/
	
	var yourwayjs = function(options){
		
		/* PRIVATE FUNCTION */
		var constructor  = function(options,thisClient){
			
			yourwayjsOptions = $.extend( {},yourwayjsOptions, options );
			
			if(yourwayjsOptions.url === null){
				throw "site url path is requierd";
			}
			if(yourwayjsOptions.routs === null){
				throw "you must define your router object"
			}
			if(yourwayjsOptions.container == ""){
				throw "you must set a main container for your app"
			}
			
			setCurrentUrl();	
			if ( _instance === null ) {

				_instance = thisClient;
				thisClient.addPage();
				History.Adapter.bind(window,'statechange',function(){thisClient.router();} );
				convertToAjax();
			
				yourwayjsOptions.onload();

			}
			
		};
		
		var startRoute = function(){
			if(yourwayjsOptions.startWithRout){
				var url = "";
				if(yourwayjsOptions.url.slice(-1)  == "/")
					url = yourwayjsOptions.url  + _instance.getUrl();
				else{
					url = yourwayjsOptions.url+"/"+_instance.getUrl();
				}
				
				_instance.router(url)
			}
		}
		
		
		var convertToAjax = function(){
			handleAtags();
			handleForms();
		};
		
		var handleAtags = function(){
			$(document).on('vclick click','a', function (event) {
				
				var $a =$(this);
				$aVal = $a.attr('href');
				if($a.attr('target') == '_blank'
					||$aVal == ""
					||$aVal === undefined
					||$aVal.indexOf("#") == 0
					||$a.data('refresh')  !== undefined){
				
					return true;
				}
				  var path = $a.attr('href');
				 if(current_url != path.replace(yourwayjsOptions.url,'')){
					 History.pushState(null, null, path);
				 }
				 else{
					 $(window).trigger('statechange');
				 }
				  event.preventDefault();
				  return false;
			});
		};
		
		var handleForms = function(){
			$(document).on('submit','form', function (event) {
				
				var $form =$(this);
				
				if($form.attr("enctype") === "multipart/form-data"){
					return true;
				}
				var path = $form.attr('action');
				request.method = $form.attr('method') !== undefined ? $form.attr('method') : request.method;
				request.data = $form.serializeObject();
				if(path === undefined){
					path = current_url;
					History.pushState(null, null, path);
				}
				
				if(path ===  undefined || path == yourwayjsOptions.url+"/"+current_url || path == current_url){
					$(window).trigger('statechange');
				} 
				
				
				
				event.preventDefault();
				return false;
			});
		};
		
		var setCurrentUrl = function(){
			current_url = window.location.href;
			current_url = current_url.replace(/#[^#]*$/, "").replace(/\?[^\?]*$/, "").replace(/^https:/, "http:").replace(yourwayjsOptions.url, "");
			
			if(current_url.slice(-1) == "/"){
				current_url = current_url.substr(0,current_url.lastIndexOf("/"));
			}
			if(current_url.indexOf("/") == 0){
				current_url = current_url.substr(1);
			}
			
			page 		= current_url.indexOf("/") > -1 ?  current_url.substr(0,current_url.indexOf("/")) : current_url;

		};
		
		var removePage = function(){
			
			for(var index in  onEvents){
				_instance.off(onEvents[index]);
			}
			onEvents=[];
			for(var index in  bindEvents){
				_instance.unbind(bindEvents[index]);
			}
			bindEvents=[];
			_instance.deletePlugins();
			_instance.removeGlobals();
			
		};
		
		var defaultRequest = function(){
			request = {method:'get',data:{}};
		};
		
		/* PUBLIC FUNCTION */
		this.errors = function(variable,arg){
			
			for(var index in arg){
				
				switch(arg[index]){
				
					case 'string':
						if(typeof (variable) !== "string"){
							throw 'the variable '+variable+ 'must be a string';
						}
						break;
					case 'undefined':
						if(typeof (variable) === "undefined"){
							throw 'the variable '+variable+ 'is undefined';
						}
						break;
					case 'required':
						if(variable.length === 0){
							 throw 'the variable '+variable+ 'is required';		
						}
						 break;
					case 'array':
						if (!$.isArray(variable)){
							throw 'the variable '+variable+ 'must be an array';		
						}
						break;
					case 'object':
						if (!$.isPlainObject(variable)){
							throw 'the variable '+variable+ 'must be an object';		
						}
						break;
					case 'global':
						if (typeof window[variable] !== "undefined"){
							throw 'this variable: '+variable+' is taken by the window object';		
						}
						break;
				}
			}
		};


		this.router = function(url){
			if(typeof(url) !== "undefined"){
				var path=url;
				if(url ==  page || url == yourwayjsOptions.url+"/"+current_url) {
					$(window).trigger('statechange');
					return;
				}
				History.pushState(null, null, path);
				return;
			}
				

			 removePage();
			 setCurrentUrl();
			 _instance.addPage();

 			if(typeof (yourwayjsOptions.routs[_instance.getPage()]) !== 'undefined' && typeof (yourwayjsOptions.routs[_instance.getPage()].settings) == "function" ){
 				yourwayjsOptions.routs[_instance.getPage()].settings()
 			}; 

			 var State = typeof(url) !== "undefined" ? {hashedUrl:url}:  History.getState();
			 request.data = $.extend({},request.data,{ajax_req:'yourwayjs'})
			 var ajaxOptions = {
			 	  type: request.method,
				  url: State.hashedUrl,
				  data: request.data,
			 }

			if(!$.isEmptyObject(oneTimeAjaxParams)){
				ajaxOptions =  $.extend( {},ajaxOptions, oneTimeAjaxParams );
			}else if(!$.isEmptyObject(yourwayjsOptions.defaultAjaxParams)){
				ajaxOptions =  $.extend( {},ajaxOptions, yourwayjsOptions.defaultAjaxParams );
			}
			yourwayjsOptions = $.extend( {},yourwayjsOptions, options );
			 var jqxhr = $.ajax(ajaxOptions); 
			 
			 defaultRequest(); 
			 if(noAnimation == false){
			 	yourwayjsOptions.startPageSwitch();
			}
			
				var ajaxTime= new Date().getTime();
				 
				  jqxhr.done(function(data) {	
				  var totalTime = new Date().getTime()-ajaxTime;
				 
				  var d = totalTime >=  yourwayjsOptions.delay ? 0 : yourwayjsOptions.delay - totalTime;
				   if(noAnimation == true){
				   	d  = 0;
				   }
				  window.setTimeout(function(){
					  $(yourwayjsOptions.container+" *").each(function(){ 
						  	$(this).off() ;
						  	$(this).unbind();
						  	$(this).removeNative();
						  });

						 if(typeof (yourwayjsOptions.routs[_instance.getPage()]) !== 'undefined' && typeof (yourwayjsOptions.routs[_instance.getPage()].route) == "function"){
						 	yourwayjsOptions.routs[_instance.getPage()].route(data);
						 }else{
						 	yourwayjsOptions.routs['default'].route(data);
						 }
						 if(noAnimation == false){
						 	yourwayjsOptions.stopPageSwitch();
						}
				  },d);
			

				 oneTimeAjaxParams = {};
				 noAnimation = false;
				
			  });
			  jqxhr.fail(function( jqXHR, textStatus, errorThrown ) {
				  var totalTime = new Date().getTime()-ajaxTime;
				  var d = totalTime >=  yourwayjsOptions.delay ? 0 : yourwayjsOptions.delay - totalTime;
				    if(noAnimation == true){
				   	d  = 0;
				   }
				  window.setTimeout(function(){
					  $(yourwayjsOptions.container+" *").each(function(){ 
						  	$(this).off() ;
						  	$(this).unbind();
						  	$(this).removeNative();
						  });
					  if(typeof (yourwayjsOptions.routs[_instance.getPage()]) !== 'undefined' && typeof (yourwayjsOptions.routs[_instance.getPage()].error) == "function"){
						  yourwayjsOptions.routs[_instance.getPage()].error(jqXHR,textStatus,errorThrown);
					  }else{
						  yourwayjsOptions.routs['default'].error(jqXHR,textStatus,errorThrown);
					  }
					  if(noAnimation == false){
						 	yourwayjsOptions.stopPageSwitch();
					}
				  },d)
			  	oneTimeAjaxParams = {};
			  	noAnimation = false;
				
			  });
			  return false;
		};
		
		this.addPage = function(){
			_instance.errors(current_url,Array('string')); 
			pages[current_url] = {};
			
		};
		
		this.on = function(selector,event,func){
			if(selector instanceof jQuery){
				selector.on(event,function(){func();});
			}
			else{
				$(selector).on(event,function(){func();});
			}
			onEvents.push(selector);
		};
		
		this.off = function(selector){
			if(selector instanceof jQuery){
				selector.off();
			}
			else{
				$(selector).off();
			}
		};
		
		this.bind = function(selector,event,func){
			if(selector instanceof jQuery){
				selector.bind(event,function(){func();});
			}
			else{
				$(selector).bind(event,function(){func();});
			}
			bindEvents.push(selector);
			 
		};
		
		this.unbind = function(selector){
			if(selector instanceof jQuery){
				selector.unbind();
			}
			else{
				$(selector).unbind();
			}
		};
		
		
		this.addGlobals = function(name,value){
			
			_instance.errors(name,Array('global'));
			globalVars.push(name);
			window[name] = value;
		};
		
				
		this.removeGlobals = function() {
			for(var index in globalVars){
				delete window[globalVars[index]];
			}
			globalVars = [];
		};
		
		this.addPlugin = function(destoryFunc){
			plugins.push(destoryFunc);
		};
		
		this.deletePlugins = function(){
			
			for(var index in plugins){
				plugins[index]();
			}
			plugins = [];
		};
		
	
		this.getUrl = function(){
			return current_url;
		}

		this.getPage = function(){
			return page;
		}
/*
		this.setyourwayjsOptions = function(obj){
			yourwayjsOptions.defaultAjaxParams = obj;
		
		}
*/
		this.setOneTimeAjaxParams = function(obj){
			oneTimeAjaxParams = obj;
		}

		this.setDelay = function(d){
			delay = d;
		}

		this.noAnimation = function(){
			noAnimation = true;
		}

		 
		constructor(options,this);
		window['yourwayjs'] = _instance;
		startRoute();
		return _instance;
		
	};

	if ( typeof define === "function" && define.amd ) {
		define( "yourwayjs", [], function() {
			return yourwayjs;
		});
	}
      	
	
})( jQuery, window, document );
