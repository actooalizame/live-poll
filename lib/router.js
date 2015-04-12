Router.configure({
	layoutTemplate: 'layout'
});

Router.route('root', {
	template: 'newQuestion',
	path: '/create',
	waitOn: function(){
		return [
       Meteor.subscribe('undoneQuestion')
     ];
	}
});