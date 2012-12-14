define([
    'js!vendor/hammer/hammer!exports=Hammer'
], function( Hammer ){


    function HammerEventHandler ( element ){

        var horiz_element = element.querySelector('h1#horiz span');
        var verti_element = element.querySelector('h1#verti span');

        var listener = new Hammer( element );
        var self = this;

        listener.ondragstart = function( event ) {
            self.onDragStart( event );
        };

        listener.ondrag = function( event ) {
            self.onDrag( event );
        };

        this.updateDom = function( color ) {
            horiz_element.innerHTML = color.horizontal;
            verti_element.innerHTML = color.vertical;
            element.style['background-color'] = color.color;

        };
    }

    HammerEventHandler.prototype = {
        onDragStart: function( event ){
            return event;
        },
        onDrag: function( event ){
            return event;
        }
    };


    return HammerEventHandler;
});