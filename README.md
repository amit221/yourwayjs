<h1>YourWayJS</h1>
a simple jquery plugin that let you build webapps easily

<h2>Introduction</h2>
YourWayJS is a lightweight js library that turn your website into a webapp without spending days or weeks on learning a new framework. This library is built for pepole who want to be free from the complicated existing frameworks. It is simple, easy to get started with and has minimum inteferring with your code. 
How many times have you built a small website with low traffic and preffered to build the whole application on the server in order to save time? In today populr framworks they tell you to seprate between the server and the client side .  
In Yourwayjs you cohose how things will happen without almost any restrictions!
It simply allows you to build your webapp your way!

<h1>Download</h1>
Press on the download zip button on the right corner(:

<h1>demo</h1>
<a href="http://yourwayjs.pops.co.il/" target='_blank' >live demo</a>

<h1>Getting started</h1>
First, we need to load some scripts: 

```
<script src="yourpath/src/jquery-1.10.2.min.js"></script>
<script src="yourpath/src/jquery.touch.min"></script>
<script src="yourpath/src/history.js"></script>
<script src="yourpath/src/helper.js"></script>
<script src="yourpath/src/myrouts.js"></script>
<script src="yourpath/src/yourwayjs.js"></script>
```

Now let's have some fun.
First, we create our app:

```
new yourwayjs({
	url:"http://mywebsite.com" ,	// the base url of your webstie (requierd)
	routs: myRouts,			// this is your routing logic . (requierd)
	container:"",			// a jquery selector for the main container of the page (requierd)
      
	onload:function(){} ,		// user function. Called when the plugin is finished loading
	startWithRout:true, 		// after init, call the requested page
	startPageSwitch:function(){}, 	// user function. Called before the ajax request for the page  
	stopPageSwitch:function(){},	// user function. Called after the page was rendered
	defaultAjaxParams:{} ,          // your defult ajax params for every request
	delay:0,			// sets the delay time when using animation in startPageSwitch  and stopPageSwitch

});

```
There are only 3 required settings on intializing the plugin, all other settings are optional
Now lets focus on the routes and the container.
The routes get an object that take all your routes. See the myroutes file to understand how this object should be built.
The container is basically a jquery selector for your main content to be switched in each page change.

After we start the plugin all the 'a' tags and forms will go as an ajax request to the server and the plugin sends an additional paramter. 
```
ajax_req:'yourwayjs' 
```
This way you can check on the server if the request is a yourwayjs request or a normal request.

<h1>API</h1>

So lets do a quick overview on what we can do with our functions

<h3>router</h3>
Use this function if you want to route to url manually

```
yourwayjs.router(url);
```

<h3>errors</h3>
Checks if a variable meats your requirments and throw error if not(good for debug)

```
yourwayjs.error(variable,Array(arg))
```

Optional arguments:
```
string 	 : check if the variable is a string
undefined: check if the variable is undefined
required : check if the variable is emptey (works for array and strings)
array    : check if the variable is an array
object	 : check if the variable is an object
global	 : check if the variable is a global variable
```

<h3>getUrl</h3>
Returns the current path after the host name without paramters that comes after "?"

```
yourwayjs.getUrl()
```

Example:
For this url "http://mywebsite.com/projects/project1?p=1&p2=2"
The function will return "projects/project1"

<h3>getPage</h3>
Returns the current page 

```
yourwayjs.getPage()
```

Example:
For this url "http://mywebsite.com/projects/project1?p=1&p2=2"
The function will return "projects"


<h3>noAnimation</h3>
If you want to disable page animation for a certain page call this function

```
yourwayjs.noAnimation();
```


<h3>setOneTimeAjaxParams</h3>
In your router object you might want to change the ajax options. Use this function in the router page settings to do so.

```
yourwayjs.setOneTimeAjaxParams(object);
```


<h3>on</h3>
Use this function when you want do add an "on event" on a selector outside the main container. The "on event" will work only on the current page

```
yourwayjs.on(jquery selector,event,func)
```

<h3>off</h3>
Use this function when you want manually off an event.

```
yourwayjs.off(jquery selector)
```

<h3>bind</h3>
Use this function when you want do add an "bind event" on a selector outside the main container. The "bind event" will work only on the current page.


```
yourwayjs.bind(jquery selector,event,func)
```

<h3>unbind</h3>
Use this function when you want manually unbind an event.

```
yourwayjs.unbind(jquery selector)
```
<h3>addGlobals</h3>
Adding a global variable that will live only on the current page.

```
yourwayjs.addGlobals(name,value)
```

<h3>removeGlobals</h3>
Manually removes all the global variables that you defined with addGlobals.
(this method is called  before any routing to other page )

```
yourwayjs.removeGlobals()
```

<h3>addPlugin</h3>
Register the plugin destory method 

```
yourwayjs.addPlugin(destoryFunc)
```

Example : 
```
yourwayjs.addPlugin(function(){$( "selctor" ).draggable("destroy");})
```

<h3>deletePlugins</h3>
Manually deletes all the registerted plugins
(this method is called  before any routing to other page )

```
yourwayjs.deletePlugins()
```

<h1>myrouts</h1>
In the myroutes put your application logic for each page

Example for a router
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
On the first level we put the page name and create and object for it with the following attributes
```
route:This function is called after you get the response from the server (you must declare a route function for each page you declare)
error:Whenever we get an error from the server, this function will be called( if this function is not declared it will go to the default error function)
settings:If you want to do things just before the ajax request happens, declare this function (this is a good place to use the
yourwayjs.setOneTimeAjaxParams(object) function )
```
you also must declare a default attribute in your object. Whenever the router goes to a page that is not declared in your object or the page doesnt have an error function it will go to the default functions.

