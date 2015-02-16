// @author Ryan Webber

/**
 * Takes data provided by the user to be converte into json data
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
        
    $.each(a, function() {
                        // ensure object has valid name
        if (o[this.name] !== undefined) {
            if (!o[this.name].push){
                o[this.name] = [o[this.name]]; // convert into object
            } // end if
             o[this.name].push(this.value || ''); // append value to end of array
        }else{
            o[this.name] = this.value || ''; // set name of object
        } // end else
    }); 

    return o; // return object
};


var LoginView = Backbone.View.extend({
	el: "#page",
    events: {
        'submit #login': 'logUserIn',
        'click #test': 'test',
        'click #logout':'logout'
    },render: function () {
        $.get('templates/login.html', function(incomingTemplate){
            $('#page').html(Handlebars.compile(incomingTemplate)).trigger('create'); 
        });
    }, logUserIn: function(ev){
        ev.preventDefault();
        var data = $(ev.currentTarget).serializeObject();
        $.post('http://localhost:1337/login', data, function(data){
            if(!data || data.success==false){
                alert("Failed Login");
            }else{
                alert("Successful login");
                sessionStorage.token = data.token;
                sessionStorage.user = JSON.stringify(data.user);
            }    
        });
    }, test: function(){
        $.ajax({
            type:"GET",
            headers: {
                Authorization: 'Bearer '+(sessionStorage.token || '')
            },
            url: "http://localhost:1337/user",
            success: function(data) {
                alert(JSON.stringify(data));
            },error: function(err){
                alert("Authorization failed");
            }
        });
    }, logout: function(){
        sessionStorage.token=null;
        $.get("http://localhost:1337/logout", function(data){
            alert("Logged out!"); 
        });
    }
});

var RegisterView = Backbone.View.extend({
	el: "#page",
    events: {
        'submit #register': 'registerUser'
    },render: function () {
        $.get('templates/register.html', function(incomingTemplate){
            $('#page').html(Handlebars.compile(incomingTemplate)).trigger('create'); 
        });
    }, registerUser: function(ev){
        ev.preventDefault();
        console.log('ev.currentTarget', ev.currentTarget);
        var data = $(ev.currentTarget).serializeObject();
        console.log('data', data);
        $.post('http://localhost:1337/user', data, function(data){
            alert("Success!");
            app_router.navigate('#/login');
        });
    }
});