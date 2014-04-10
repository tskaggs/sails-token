
function getUrl(append){
	return "http://192.168.1.135:1337/"+append;
}

var UserLogin = Backbone.Model.extend({
    url: function(){
        return getUrl('login');
    }
});

var UserLogout = Backbone.Model.extend({
    url: function(){
        return getUrl('logout');
    }
});