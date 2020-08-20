Template.Deferrals.onCreated(function() {
	
});

Template.Deferrals.onDestroyed(function() {
	
});

Template.Deferrals.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Deferrals.events({
	
});

Template.Deferrals.helpers({
	
});

Template.DeferralsSideMenu.onCreated(function() {
	
});

Template.DeferralsSideMenu.onDestroyed(function() {
	
});

Template.DeferralsSideMenu.onRendered(function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
});

Template.DeferralsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.DeferralsSideMenu.helpers({
	
});
