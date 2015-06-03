Template.allQuestions.helpers({
	'questions': function(){
		return Questions.find({done:true}, {sort: {createdAt:-1}});
	},
	'options': function(){
		return Options.find({questionId: this._id}, {sort: {score:-1}});
	}
});

