Template.singleQuestion.rendered = function(){
	$('.orientation-alert')
    .css('visibility', 'visible')
    .animate({opacity: 1.0}, 1700)
    .fadeOut("fast");

  new WOW().init();
};

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
	},
	'flipPhone': function(){
		var questionId = this._id;
		var question = Questions.findOne({_id: questionId});
		var options = question.options;
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		if(winWidth<=600 && options===4 && winHeight>600){
			return "Gira tu teléfono :)";
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

		var singleUser = Meteor.users.findOne({hook: userId}),
				userName = singleUser.profile.name;
		var question = Questions.findOne({_id: questionId }),
				questionTitle = question.question;
		var option = Options.findOne({_id: optionId }),
				optionTitle = option.option;
		Meteor.call('insertReport', userName, questionTitle, optionTitle);
	}
});