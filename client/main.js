Meteor.startup(function() {
  Tracker.autorun(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('hook');
    });
});

/*
Packages

meteor-platform
autopublish
insecure
iron:router
accounts-facebook
accounts-ui
d0minikk:materialize-meteor

*/
