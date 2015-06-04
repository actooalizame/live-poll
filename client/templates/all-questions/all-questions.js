Template.allQuestions.rendered = function(){
	var grid = $('.grid');
	//grid.isotope({ filter: '.sci, .cultura, .arteymusica, .locura'});

	$('.filter-button-group').on( 'click', 'button', function(){
		var filterValue = $(this).attr('data-filter');
		grid.isotope({
			filter: filterValue,
			layoutMode: 'fitRows',
			resizesContainer: false,
			hiddenStyle: {
        opacity: 0,
      },
      visibleStyle: {
        opacity: 1,
      }
		});
	});
};

Template.allQuestions.helpers({
	'questions': function(){
		return Questions.find({done:true}, {sort: {createdAt:-1}});
	},
	'options': function(){
		return Options.find({questionId: this._id}, {sort: {score:-1}});
	}
});

