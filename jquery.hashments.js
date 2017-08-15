/*
 *	jQuery Hashments v1.0
 *	https://github.com/brainedia/jquery-hashments
 *
 *	Copyright 2017 Robert Saß
 *	Released under the MIT license
 */
;
(function($) {

	$.setUrlHash = function(hash) {
		if(history.replaceState) {
			history.replaceState(null, null, '#/'+hash);
		}
		else {
			location.hash = '#/'+hash;
		}
	};


	$.getUrlHash = function() {
		return location.hash.replace(/^#\//, '');
	};


	$.parseUrlHashComponents = function() {
		var components = {};
		var hash = $.getUrlHash();
		var splitted = hash.split('/#/');
		if( splitted ) {
			for( var i in splitted ) {
				var component = splitted[i].split('=');
				var curKey = component[0];
				if( curKey ) {
					var curValue = component.length > 1 ? component[1] : null;
					components[curKey] = curValue;
				}
			}
		}
		return components;
	};


	$.encodeUrlHashComponents = function(components) {
		var splitted = [];
		var keys = Object.keys(components);
		keys.sort();
		for( var i in keys ) {
			var key = keys[i];
			var value = components[key];
			splitted.push( encodeURIComponent(key) +'='+ encodeURIComponent(value) );
		}
		$.setUrlHash( splitted.join('/#/') );
	};


	$.setUrlHashComponent = function(key, value) {
		var components = $.parseUrlHashComponents();
		components[key] = value;
		if( value === undefined || value === null )
			delete components[key];
		$.encodeUrlHashComponents(components);
	};


	$.getUrlHashComponent = function(key) {
		var components = $.parseUrlHashComponents();
		var component = components[key];
		if( component ) {
			var curValue = component ? component : null;
			return curValue;
		}
		return undefined;
	};

}(jQuery));
