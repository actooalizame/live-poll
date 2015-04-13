Meteor.methods({
	'insertQuestion': function(question, creatorId){
		Questions.insert({
			question: question,
			createdBy: creatorId,
			createdAt: new Date(),
			done: false,
			options: 0
		});
	},
	'insertOption': function(questionId, option){
		Options.insert({
			questionId: questionId,
			option: option
		});
		Questions.update(
			{	_id: questionId },
			{$inc: {options: 1} }
		);
	},
	'setDone': function(questionId){
		Questions.update(
			{	_id: questionId },
			{$set: {done: true} }
		);
	}

});