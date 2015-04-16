/*Template.singleQuestion.rendered = function(){
	var checker = $('.smart-hide').text();
	console.log(checker);
		if(checker==='hide'){
			$('.disableVote').hide();
		}
};*/

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
		var userId = user.services.facebook.id;
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
		var userId = user.services.facebook.id;
		var questionId = this.questionId;
		Meteor.call('addVotedBy', questionId, userId);
	}
});