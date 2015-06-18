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
	'deactivateVoted': function(){
		var question = Questions.findOne({_id: this._id}),
				user = Meteor.user(),
				userId = user.hook,
				votedBy = question.votedBy,
				array = jQuery.inArray(userId,votedBy);
		if(array >=0){
			return 'deactivate';
		}
	},
	'reportOption': function(){
		var question = Questions.findOne({_id: this._id}),
				questionTitle = question.question,
				user = Meteor.user(),
				userId = user.hook,
				singleUser = Meteor.users.findOne({hook:userId}),
				userName = singleUser.profile.name,
				report = Reports.findOne({name:userName, question:questionTitle}),
				reportOption = report.option,
				votedBy = question.votedBy,
				array = jQuery.inArray(userId,votedBy);
		if(array >=0){
			return reportOption;
		}
	},
	'smartColumns': function(){
		var optionId = this._id,
				option = Options.findOne({_id:optionId}),
				questionId = option.questionId,
				question = Questions.findOne({_id: questionId}),
				options = question.options;
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
		var questionId = this._id,
				question = Questions.findOne({_id: questionId}),
				options = question.options,
				winWidth = window.innerWidth,
				winHeight = window.innerHeight;
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
		var user = Meteor.user(),
				userId = user.hook,
				questionId = this.questionId;
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