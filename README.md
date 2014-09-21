<h1>Yourwayjs</h1>
a jquery plugin that let you build webapps easily

<h2>Introduction</h2>
Yourwayjs is an lightwight js library that make your website into  a webapp ,  without spending days or weaks on learning a new framework. this library is built for pepole who dont want to be bound to a sertain structre and wanna do things their own way.
for exsample - many times we build small websites with low trafic and we preffer to build the hole application on the server  to save time. in today populr framworks they tell you to seprate between the server and the client side .  
in Yourwayjs you chose how things will happen without almost any restrictions

<h1>Download</h1>
press the download zip on the right corner(:

<h1>demo</h1>
<a href="http://yourwayjs.pops.co.il/" target='_blank' >live demo</a>

<h1>Getting started</h1>
first of all we will need to load  some scripts 

```
<script src="yourpath/src/jquery-1.10.2.min.js"></script>
<script src="yourpath/src/jquery.touch.min"></script>
<script src="yourpath/src/history.js"></script>
<script src="yourpath/src/helper.js"></script>
<script src="yourpath/src/myrouts.js"></script>
<script src="yourpath/src/yourwayjs.js"></script>
```

after we finished load all the script we can start haveing some fun.
first lets create our app

```
new yourwayjs({
	url:"http://mywebsite.com" ,	// the base url of your webstie (requierd)
	routs: myRouts,			// this is your routing logic . (requierd)
	container:"",			// a jquery selctor for the main container of the page (requierd)
      
	onload:function(){} ,		// your own function when the plugin is finish to init,
	startWithRout:true, 		// after init call the page that requested
	startPageSwitch:function(){}, 	// user function that happen before the ajax request for the page  
	stopPageSwitch:function(){},	// user function that happen after the page was renderd
	defaultAjaxParams:{} ,          // your defult ajax params for every request
	delay:0,			//set the delay time when using animation in startPageSwitch  and stopPageSwitch

});

```
as you can see in the exsample above we have 3 required settings in the init and all other are optional
lets focus on the routs and container for 1 sec.
the routes get an boject that take all your routs, see the myrouts file to understand how this object shoud be built.
the container is basically a jquery selector for your main content to be switched in each page change.

after we start the plugin all the a tags and forms will go as an ajax request to the server and send an additional paramter 
```
ajax_req:'yourwayjs' 
```
this way you can check on the server if its a yourwayjs request or a normal request.

<h1>API</h1>

so lets do a quick overview on what we can do with our functions

<h3>router</h3>
use this function if you want to route to url manually

```
yourwayjs.router(url);
```

<h3>errors</h3>
check if a variable meats your requirments and throw error id not(good for debug)

```
yourwayjs.error(variable,Array(arg))
```

posiable arguments:
```
string 	 : check if the variable is a string
undefined: check if the variable is a undefined
required : check if the variable is a is emptey (works for array and strings)
array    : check if the variable is array
object	 : check if the variable is object
global	 : check if the variable is global variable
```

<h3>getUrl</h3>
returns the currnt path after the host name without paramters that comes after ?

```
yourwayjs.getUrl()
```

exsample:
for this url "http://mywebsite.com/projects/project1?p=1&p2=2"
the function will return "projects/project1"

<h3>getPage</h3>
return the current page 

```
yourwayjs.getPage()
```

exsample:
for this url "http://mywebsite.com/projects/project1?p=1&p2=2"
the function will return "projects"


<h3>noAnimation</h3>
if you want to diable page animation for a page call this function

```
yourwayjs.noAnimation();
```


<h3>setOneTimeAjaxParams</h3>
in your router object you might wanna change the ajax options . use this function in the router page settings to do so

```
yourwayjs.setOneTimeAjaxParams(object);
```


<h3>on</h3>
use this function when you want do add an on event on a selctor outside the main container  that will work only on the current page

```
yourwayjs.on(jquery selector,event,func)
```

<h3>off</h3>
use this function when you want manually off an event

```
yourwayjs.off(jquery selector)
```

<h3>bind</h3>
use this function when you want do add an bind event on a selctor outside the main container  that will work only on the current page


```
yourwayjs.bind(jquery selector,event,func)
```

<h3>unbind</h3>
use this function when you want manually unbind an event

```
yourwayjs.unbind(jquery selector)
```
<h3>addGlobals</h3>
adding a global variable that will live only on the current page

```
yourwayjs.addGlobals(name,value)
```

<h3>removeGlobals</h3>
manually remove all the global variables that you define with addGlobals
(this methoed is called  before any routing to other page )

```
yourwayjs.removeGlobals()
```

<h3>addPlugin</h3>
register the plugin destory method 

```
yourwayjs.addPlugin(destoryFunc)
```

exsample : 
```
yourwayjs.addPlugin(function(){$( "selctor" ).draggable("destroy");})
```

<h3>deletePlugins</h3>
manually delete all the registerted plugins
(this methoed is called  before any routing to other page )

```
yourwayjs.deletePlugins()
```

<h1>myrouts</h1>
myroutes is where you put your application logic for each page

exsample for a router
```
	var myRouts = {

		
		"page1":{
			route:function(response){
				
				$("#main_content").html(response)
			},
			
		},
		"":{
			route:function(response){
				
				myRouts.page1.route(response);
			},
			
		},

		"page2":{
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

	

		"default":{
			route:function(response){
				//$(".contentt").html(response)
			},
			error:function(jqXHR,textStatus,errorThrown){
				$("#main_content").html(jqXHR.responseText);
			},
		}
	

		
	}
```

lets review what we have here.
on the first level we put the page name and create and object for it with the following attributs
```
route:this function called after we get the respone for the server (u must declare a route function for each page you declare)
error:when ever we got an error from the server will come to this function( if this function is not declared it will go to the default error function)
settings:if you wanna do things just before the ajax request happens declare this function (this is a good place to use the
yourwayjs.setOneTimeAjaxParams(object) function )
```
you olso must declare a default attribute in your object. whenever the router go to a page that is not declared in your object or the page doesnt have an error function it will go to the default function

