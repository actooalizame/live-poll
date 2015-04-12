Meteor.publish('undoneQuestion', function(){
	return Questions.find({done:false});
});

/*Meteor.publish('userQuestions', function(){
	var user = Meteor.users.findOne(this.userId);
  var creator = user.services.facebook.id;
  return Questions.find({createdBy: creator });
});*/