define([
    'underscore',
    'js!vendor/color-js/color!exports=net.brehaut.Color'
], function( _, Color ){


	function ColourManager (){

        var MAX_LEVEL = 100;
        var THRESHOLD_LOWER_LIMIT = 45;
        var THRESHOLD_UPPER_LIMIT = 55;

		var colours;
        var v_level = MAX_LEVEL;
        var h_level = MAX_LEVEL;
        var hdrag;
        var vdrag;
        var friction = 0.5;

        var colour_width = MAX_LEVEL;
        var colour_count = 1;

        var round = Math.round;

		this.setColours = function( _colours ){

            if( !_.isArray(_colours) ) {
                throw "Colours argument must be an array";
            }

            colours = _.map( _colours, function( colour ) {
                return Color(colour);
            });


            colour_count = colours.length;
            colour_width = MAX_LEVEL / colours.length;

		};

        this.getCurrentColour = function( ) {

            // mood colour
            var index = Math.floor( v_level / colour_width, 0);
            index =  index >= colours.length ? colours.length -1 : index;

            var base_color = colours[index];

            var start = index * colour_width;
            var end = start + colour_width;

            var current_color;

            var percentage = round( ((v_level - start) / colour_width) * 100 );
            if( percentage > THRESHOLD_UPPER_LIMIT && index !== (colour_count-1) ) {
                // blend next colour
                percentage = (percentage - THRESHOLD_UPPER_LIMIT) / THRESHOLD_LOWER_LIMIT  / 2;
                current_color = base_color.blend( colours[index+1], percentage );

            } else if( percentage < THRESHOLD_LOWER_LIMIT && index !== 0 ) {
                // blend previous colour
                percentage = (1 - (percentage / THRESHOLD_LOWER_LIMIT) ) / 2;
                current_color = base_color.blend( colours[index-1], percentage );

            } else {
                current_color = Color(base_color.toString());
            }

            // intensity
            return current_color.setSaturation( h_level / 100 );
        };

        this.updateColour = function( mood, intensity ){

            v_level = round( mood < 0? 0: mood );
            v_level = round( v_level > MAX_LEVEL? MAX_LEVEL: v_level );
            h_level = round( intensity < 0? 0: intensity );
            h_level = round( h_level > MAX_LEVEL? MAX_LEVEL: h_level );

            return { vertical: v_level, horizontal: h_level, color: this.getCurrentColour().toString() };

        };

        this.refresh = function(){
            this.updateColour( v_level, h_level );
        };

        this.onDrag = function( event ) {
            this.updateColour( hdrag + ( event.distanceX * friction ), vdrag + ( event.distanceY * friction ) );
        };

        this.onDragStart = function( event ) {
            hdrag = v_level;
            vdrag = h_level;
        };
	}

	return ColourManager;

});