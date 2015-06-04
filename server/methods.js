Meteor.methods({
	'insertQuestion': function(question, creatorId){
		Questions.insert({
			question: question,
			category: null,
			createdBy: creatorId,
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
			score: 0,
			scoreExp: 0,
			scoreExpSmall: 0
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
	'addCategory': function(questionId, category){
		Questions.update(
			{	_id: questionId },
			{$set: {category: category} }
		);
	},
	'voteOption': function(optionId){
		Options.update(
			{ _id: optionId },
			{ $inc: { score: 1, scoreExp: 30, scoreExpSmall: 5 } }
		);
	}

});