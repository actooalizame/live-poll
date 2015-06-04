Template.allReports.helpers({
	'reports': function(){
		return Reports.find({}, {sort: {createdAt: -1}});
	}
});