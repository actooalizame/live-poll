Meteor.methods({
	'insertQuestion': function(question, creatorId, creatorName){
		Questions.insert({
			question: question,
			createdBy: creatorId,
			creatorName: creatorName,
			createdAt: new Date(),
			done: false,
			votedBy: [],
			options: 0
		});
	},
	'insertOption': function(questionId, option){
		Options.insert({
			questionId: questionId,
			option: option,
			score: 0
		});
		Questions.update(
			{	_id: questionId },
			{$inc: {options: 1} }
		);
	},
	'addVotedBy': function(questionId, userId){
		Questions.update(
			{	_id: questionId },
			{$push: {votedBy: userId} }
		);
	},
	'setDone': function(questionId){
		Questions.update(
			{	_id: questionId },
			{$set: {done: true} }
		);
	},
	'voteOption': function(optionId){
		Options.update(
			{ _id: optionId },
			{ $inc: { score: 1 } }
		);
	}

});