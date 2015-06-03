Router.configure({
	layoutTemplate: 'layout'
});

Router.route('allQuestions', {
	template: 'allQuestions',
	path: '/',
	waitOn: function(){
		return [
			Meteor.subscribe('allQuestions'),
      Meteor.subscribe('options')
     ];
	}
});

Router.route('userQuestions', {
	template: 'userQuestions',
	path: '/create',
	waitOn: function(){
		return [
       Meteor.subscribe('undoneQuestion'),
       Meteor.subscribe('options')
     ];
	}
});

Router.route('/question/:_id', {
	template: 'singleQuestion',
	name: 'singleQuestion',
	data: function(){ return Questions.findOne(this.params._id);},
	waitOn: function() { return Meteor.subscribe('options');}
});