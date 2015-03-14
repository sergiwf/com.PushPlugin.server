var myPushNotification = function() {
};
var myApp,startRegister,callbackmsg,passwordapp;
// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
myPushNotification.prototype.loadApp = function(myapp, saveStorage, callback, password) {
    myApp = myapp;

    if (callback == null) { callbackmsg = function() {}}else {callbackmsg = callback}; 

    if (saveStorage == null || saveStorage == false) { 
        startRegister = true;
    } else { startRegister = dataTime(saveStorage) }

    if (password == null ) passwordapp = 'KO'; else passwordapp = password;

    cordova.exec(successRegister, errorRegister, "PushPlugin", "register", [{"senderID":"195514808979","ecb":"onNotificationGCM"}]);
};

 
myPushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};


window.startNotification = new myPushNotification();

onNotificationGCM= function(e) { 
        switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                { 
                    if (startRegister){
                        callAjaxRegister(e.regid,myApp);
                    }
                    console.log("Regid " + e.regid); 
                } 
            break; 

            case 'message': 
                if(e.message != undefined){
                    callbackmsg(e);
                    window.pushservermsg = e;
                    console.log(e);
                }
            break; 

            case 'error': 
              console.log('GCM error = '+e.msg); 
            break; 

            default: 
              console.log('An unknown GCM event has occurred'); 
              break; 
        } 
};

var successRegister = function(){
    console.log("Register: OK");
    //alert("Register: OK");
};

var errorRegister = function(){
    console.log("Register: error");
    //alert("Register: error");
};

var dataTime = function(time){
    var d = new Date();
    if(localStorage.getItem("notificationDate")){
            if (d.getTime() > localStorage.getItem("notificationDate")){
                localStorage.setItem("notificationDate",d.getTime() + time*86400000);
                return true;
            }else return false;
    } else {
        localStorage.setItem("notificationDate",d.getTime() + time*86400000);
        return true;
    }
}

var callAjaxRegister = function(regid,namemyapp){
    var xmlhttp;
    var sendget="nameapp=" + namemyapp +"&regid=" + regid +"&pass=" + passwordapp;

    if (window.XMLHttpRequest)
      {
      xmlhttp=new XMLHttpRequest();
      }
    else
      {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            if(xmlhttp.responseText == 0) localStorage.removeItem('notificationDate');
        console.log(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","http://pushfreenotification.com/Backregist/registro.php?" + sendget ,true);
    xmlhttp.send();
};