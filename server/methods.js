Meteor.methods({
	'insertQuestion': function(question, creatorId){
		Questions.insert({
			question: question,
			createdBy: creatorId,
			createdAt: new Date(),
			done: false
		});
	}
});