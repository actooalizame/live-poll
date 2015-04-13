Meteor.methods({
	'insertQuestion': function(question, creatorId){
		Questions.insert({
			question: question,
			createdBy: creatorId,
			createdAt: new Date(),
			done: false
		});
	},
	'insertOption': function(questionId, option){
		Options.insert({
			questionId: questionId,
			option: option
		});
	},
	'setDone': function(questionId){
		Questions.update(
			{	_id: questionId },
			{$set: {done: true} }
		);
	}

});