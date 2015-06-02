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
			return 'deactivate';
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
	}*/
});