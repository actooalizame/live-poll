Template.singleQuestion.helpers({
	'options': function(){
		return Options.find({questionId: this._id});
	}
});