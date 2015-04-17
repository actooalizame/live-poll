Template.allQuestions.helpers({
	'questions': function(){
		return Questions.find({done:true});
	},
	'options': function(){
		return Options.find({questionId: this._id}, {sort: {score:-1}});
	}
});

