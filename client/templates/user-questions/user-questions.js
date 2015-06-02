Template.userQuestions.helpers({
	'userQuestions': function(){
		var creator = Meteor.user();
		var creatorId = creator.hook;
		return Questions.find({createdBy:creatorId}, {sort: {createdAt:-1}});
	},
	'options': function(){
		return Options.find({questionId: this._id});
	},
	'selectedClass': function(){
		var questionId = this._id;
		var selectedQuestion = Session.get('selectedQuestion');
		if( questionId == selectedQuestion ){
			return 'selected';
		}
	},
	'hideClass': function(){
		var question = Questions.findOne(this._id);
		if( question.done === true){
			return 'hidden';
		}
	},
	'disableAsk': function(){
		var question = Questions.findOne({done:false});
		if( question.options < 2){
			return 'hidden';
		}
	},
	'disableOptions': function(){
		var question = Questions.findOne({done:false});
		if( question.options === 5){
			return 'hidden';
		}
	}
});


Template.userQuestions.events({
	'click .new-question': function(){
		var questionId = this._id;
		Session.set('selectedQuestion', questionId);
	},
	"submit .create-question": function(event){
		event.preventDefault();
		var question = event.target.question.value;
		var questionLength = question.length;
		var creator = Meteor.user();
		var creatorId = creator.hook;
		//var firstName = creator.services.facebook.first_name;
		//var lastName = creator.services.facebook.last_name;
		//var creatorName = firstName + " " + lastName;

		if(question===""){
			alert("Debes crear una pregunta!");
		}
		else if(questionLength<8){
			alert("La pregunta debe contener al menos 8 caracteres");
		}
		else if(questionLength>120){
			alert("La pregunta debe contener un maximo de 120 caracteres");
		}
		else{
			Meteor.call('insertQuestion', question, creatorId);
		}
		event.target.question.value = "";
	},
	'submit .create-option': function(event){
		event.preventDefault();
		var questionId = this._id;
		var option = event.target.option.value;
		Meteor.call('insertOption', questionId, option);
		event.target.option.value = "";
	},
	'click .set-done': function(){
		var questionId = this._id;
		Meteor.call('setDone', questionId);
	}
});