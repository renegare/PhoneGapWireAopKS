define(function( ){

    function DomUpdateHandler ( element ){
        var horiz_element = element.querySelector('h1#horiz span');
        var verti_element = element.querySelector('h1#verti span');

        this.updateDom = function( color ) {
            horiz_element.innerHTML = color.horizontal;
            verti_element.innerHTML = color.vertical;
            element.style['color'] = color.color;

        };
    }

    return DomUpdateHandler;
});