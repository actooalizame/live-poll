Router.configure({
	layoutTemplate: 'layout'
});

Router.route('allQuestions', {
	template: 'allQuestions',
	loadingTemplate: "loading",
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
	loadingTemplate: "loading",
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
	loadingTemplate: "loading",
	data: function(){ return Questions.findOne(this.params._id);},
	waitOn: function(){
		return [
			Meteor.subscribe('allQuestions'),
      Meteor.subscribe('options'),
      Meteor.subscribe('allReports')
     ];
	}
});

Router.route('allReports', {
	template: 'allReports',
	path: '/reports',
	loadingTemplate: "loading",
	waitOn: function(){
		return [
       Meteor.subscribe('allReports')
     ];
	}
});