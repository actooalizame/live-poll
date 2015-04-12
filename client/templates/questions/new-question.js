Template.newQuestion.helpers({
	'newQuestion': function(){
		var creator = Meteor.user();
		var creatorId = creator.services.facebook.id;
		return Questions.find({createdBy:creatorId});
	}
});

Template.newQuestion.events({
	"submit form": function(event){
		event.preventDefault();
		var question = event.target.question.value;
		var creator = Meteor.user();
		var creatorId = creator.services.facebook.id;
		Meteor.call('insertQuestion', question, creatorId);
		event.target.question.value = "";
	}
});