(function(global) {

	var init = false,
		config = {
        debug: true,
		baseUrl: 'js',


		paths: {
			vendor: '../vendor',
			curl: '../vendor/curl/src/curl',
			jquery: '../vendor/jquery/jquery.js',
			underscore: '../vendor/underscore-amd/underscore.js',
			backbone: '../vendor/backbone-amd/backbone.js'
		},

		packages: [
			{ name: 'wire',  location: '../vendor/wire',  main: 'wire' },
			{ name: 'when',  location: '../vendor/when',  main: 'when' },
			{ name: 'aop',   location: '../vendor/aop',   main: 'aop' },
            { name: 'meld', location: '../vendor/meld', main: 'meld' }
		]

	};

	curl(config, ['jquery', 'underscore'], function( $, _ ){

		var device_ready_promise = $.Deferred();

		// the actual function that kicks off the wiring
		var init_func = _.once(function( device_type ){

			// prevent dragging of the body (another setting is in Cordova.plist to prevent bounce )
			document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

			// wire it up and get things popping
			curl([ 'wire!spec/drag_screen' ]).then(function( spec ) {
				GLOBAL = spec;
			}, function(){
				alert('ERROR MOFO');
			});

		});

		document.addEventListener('deviceready', function(){ 
			// hopefull this will be triggered within 500ms ( open to am alternative )
			device_ready_promise.resolve(true); 
		}, false);

		// call the init_func using document ready if Cordova 'deviceready' does not start in time
		setTimeout(function(){
			device_ready_promise.reject('Failure');
		}, 500);

		// what happens once it has eventually resolved
		device_ready_promise.then(function(){
			init_func('mobile');
		}, function(){
			$( function() { init_func('browser'); } );
		});

	});

})(this);