Template.userQuestions.helpers({
	'userQuestions': function(){
		var creator = Meteor.user();
		var creatorId = creator.services.facebook.id;
		return Questions.find({createdBy:creatorId}, {sort: {createdAt:-1}});
	},
	'options': function(){
		return Options.find({questionId: this._id});
	},
	'selectedClass': function(){
		var questionId = this._id;
		var selectedQuestion = Session.get('selectedQuestion');
		if( questionId == selectedQuestion ){
			return 'selected';
		}
	},
	'hideClass': function(){
		var question = Questions.findOne(this._id);
		if( question.done === true){
			return 'hidden';
		}
	},
	'aptClass': function(){
		var question = Questions.findOne({done:false});
		if( question.options < 2){
			return 'hidden';
		}
	}
});


Template.userQuestions.events({
	'click .new-question': function(){
		var questionId = this._id;
		Session.set('selectedQuestion', questionId);
	},
	"submit .create-question": function(event){
		event.preventDefault();
		var question = event.target.question.value;
		var creator = Meteor.user();
		var creatorId = creator.services.facebook.id;
		Meteor.call('insertQuestion', question, creatorId);
		event.target.question.value = "";
	},
	'submit .create-option': function(event){
		event.preventDefault();
		var questionId = this._id;
		var option = event.target.option.value;
		Meteor.call('insertOption', questionId, option);
		event.target.option.value = "";
	},
	'click .set-done': function(){
		var questionId = this._id;
		Meteor.call('setDone', questionId);
	}
});