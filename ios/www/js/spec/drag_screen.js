define({
	plugins: [
		// { module: 'wire/debug', trace: true },
        { module: 'wire/on' },
        { module: 'wire/dom' },
        { module: 'wire/connect'},
        { module: 'wire/aop' }
	],

	// random colours
	colours: [ '#fff000', '#0000ff', '#ff0000' ],

	manager: {
		create: {
			module: 'modules/colour_manager',
			isConstructor: true
		},

		init: {
			setColours: [{$ref: 'colours'}]
		},

		ready: {
			refresh: []
		},

		afterReturning: {
			updateColour: 'dom_node_handler.updateDom'
		}
	},

	dom_node: {$ref: 'dom!drag_screen'},

	dom_event_handler: {
		create: {
			module: 'modules/hammer_event_handler',
			args: [{$ref: 'dom_node'}],
			isConstructor: true
		},

		afterReturning: {
			onDragStart: 'manager.onDragStart',
			onDrag: 'manager.onDrag'
		}
	},

	dom_node_handler: {
		create: {
			module: 'modules/dom_update_handler',
			args: [{$ref: 'dom_node'}],
			isConstructor: true
		}
	}
});