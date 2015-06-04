Meteor.startup(function() {
  Tracker.autorun(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('hook');
    });
});

/*
Packages

iron:router
accounts-facebook
accounts-twitter
accounts-ui
d0minikk:materialize-meteor
sacha:spin
isotope:isotope

*/
