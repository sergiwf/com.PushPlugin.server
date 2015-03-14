# Cordova Push Notifications server for Android.

## DESCRIPTION
  -With this plugin connect with the server to register the application and send the messages. It connects with the server and it registers automatically. Access to website and then you can send your messages.

## INSTALLATION

1) Install the plugin
```js
cordova plugin add https://github.com/sergiwf/com.PushPlugin.server.git
```


2) Activate plugin in your file.js after of ondeviceready.
```js
startNotification.loadApp("nameyourapp");
```
-Optional:

-It will call to the register in every app. inicialization 
```js
startNotification.loadApp("nameyourapp",false);
```
-It will call to the register according the number of indicated days, for example 30 days.

```js
startNotification.loadApp("nameyourapp",30);
```

-Callback when the message is received.

```js
startNotification.loadApp("nameyourapp",false,myfunction);

function myfunction(objmsg){
	alert(objmsg.message);
}
```

3) Send messages

-Access to website http://pushfreenotification.com .

-Insert the name of your application, message and send.

