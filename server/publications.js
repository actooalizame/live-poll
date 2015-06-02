Meteor.publish('allQuestions', function(){
	return Questions.find({});
});

Meteor.publish('undoneQuestion', function(){
	return Questions.find({done:false});
});

Meteor.publish('options', function(){
	return Options.find({});
});

Meteor.publish('hook', function() {
  return Meteor.users.find(this.userId, {fields: {
    hook: 1
  }});
});
