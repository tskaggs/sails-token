// set routing variables
var Router = Backbone.Router.extend({
	routes: {
        '' : 'login',
        'login' : 'login',
        'register': 'register'
	}
});

var app_router = new Router();

app_router.on('route:login', function() {
	console.log("Navigating: login");
	login.render();
});

app_router.on('route:register', function() {
	console.log("Navigating: register");
	register.render();
});