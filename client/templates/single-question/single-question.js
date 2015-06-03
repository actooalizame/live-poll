Template.singleQuestion.helpers({
	'options': function(){
		return Options.find({questionId: this._id});
	},
	'selectedClass': function(){
		var optionId = this._id;
		var selectedOption = Session.get('selectedOption');
		if( optionId == selectedOption ){
			return 'selected';
		}
	},
	'checkVoted': function(){
		var questionId = Questions.findOne({_id: this._id});
		var user = Meteor.user();
		var userId = user.hook;
		var votedBy = questionId.votedBy;
		var array = jQuery.inArray(userId,votedBy);
		if(array >=0){
			//return 'deactivate';
		}
	},
	'smartColumns': function(){
		var optionId = this._id;
		var option = Options.findOne({_id:optionId});
		var questionId = option.questionId;
		var question = Questions.findOne({_id: questionId});
		var options = question.options;
		if (options===2){
			return "s6";
		}
		if(options===3) {
			return "s4";
		}
		else if(options===4) {
			return "m3";
		}
	}
});

Template.singleQuestion.events({
	'click .single-option': function(){
		var optionId = this._id;
		Session.set('selectedOption', optionId);
	},
	'click .vote-option': function(){
		var optionId = this._id;
		Meteor.call('voteOption', optionId);
		var user = Meteor.user();
		var userId = user.hook;
		var questionId = this.questionId;
		Meteor.call('addVotedBy', questionId, userId);
	}/*
	'click .vote-btn': function(){
		var optionId = Session.get('selectedOption');
		Meteor.call('voteOption', optionId);
		var user = Meteor.user();
		var userId = user.hook;
		var questionId = this.questionId;
		Meteor.call('addVotedBy', questionId, userId);



		var question = Questions.findOne(this._id);
		var optionId = Options.find({questionId: this._id});
		var questionId = Questions.findOne({_id: this._id});
		//var question = Questions.findOne({_id: "questionId"});
		var options = question.options;
		var count = options.count();
		return question;
	}*/
});