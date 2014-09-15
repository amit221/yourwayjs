<h1>Yourwayjs</h1>
an easy plugin that let you build webapps with minimum guidlines how your app should be build

<h2>Introduction</h2>
Yourwayjs is an lightwight js library that make your website into  a webapp ,  without spending days or weaks on learning a new framework. this library is built for pepole who dont want to be bound to a sertain structe and wanna do things there own way.
for exsample - many times we build small websites with low trafic and we preffer to build the hole application on the server time to save time. in today populr framworks they tell you to seprate between the server and the client side .  
in Yourwayjs you chose how things will happen without almost any restrictions

<h2>Download</h2>
copy the src folder from github

<h2>Getting started</h2>
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
      url:http://mywebsite.com ,			// the base url of your webstie (requierd)
      routs: myRouts,			            // this is your routing logic . (requierd)
      container:"",			              // a jquery selctor for the main container of the page (requierd)
      
			onload:function(){} ,		        // your own function when the plugin is finish to init,
			startWithRout:true, 		        // after init call the page that requested
			startPageSwitch:function(){}, 	// user function that happen before the ajax request for the page  
			stopPageSwitch:function(){},	  // user function that happen after the page was renderd
		
			defaultAjaxParams:{}            // your defult ajax params for every request

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

<h2>API</h2>

so lets do a quick overview on what we can do with our functions

<h3>on<h3>
use this function when you want do add an on event on a selctor outside the main container  that will work only on the current page

```
yourwayjs.on(jquery selector,event,func)
```

<h3>off<h3>
use this function when you want manually off an event

```
yourwayjs.off(jquery selector)
```

<h3>bind<h3>
use this function when you want do add an bind event on a selctor outside the main container  that will work only on the current page


```
yourwayjs.bind(jquery selector,event,func)
```

<h3>unbind<h3>
use this function when you want manually unbind an event

```
yourwayjs.unbind(jquery selector)
```
<h3>addGlobals<h3>
adding a global variable that will live only on the current page

```
yourwayjs.addGlobals(name,value)
```

<h3>removeGlobals<h3>
manually remove all the global variables that you define with addGlobals
(this methoed is called  before any routing to other page )

```
yourwayjs.removeGlobals()
```

<h3>addPlugin<h3>
register the plugin destory method 

```
yourwayjs.addPlugin(destoryFunc)
```

exsample : 
```
yourwayjs.addPlugin(function(){$( "selctor" ).draggable("destroy");})
```

<h3>deletePlugins<h3>
manually delete all the registerted plugins
(this methoed is called  before any routing to other page )

```
yourwayjs.deletePlugins()
```
