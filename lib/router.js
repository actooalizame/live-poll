Router.configure({
	layoutTemplate: 'layout'
});

Router.route('root', {
	template: 'allQuestions',
	path: '/',
	waitOn: function(){
		return [
			Meteor.subscribe('allQuestions'),
      Meteor.subscribe('options')
     ];
	}
});

Router.route('own', {
	template: 'newQuestion',
	path: '/create',
	waitOn: function(){
		return [
       Meteor.subscribe('undoneQuestion'),
       Meteor.subscribe('options')
     ];
	}
});