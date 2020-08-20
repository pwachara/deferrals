Template.AuditConfirmations.onCreated(function() {
	
});

Template.AuditConfirmations.onDestroyed(function() {
	
});

Template.AuditConfirmations.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmations.events({
	
});

Template.AuditConfirmations.helpers({
	
});

Template.AuditConfirmationsSideMenu.onCreated(function() {
	
});

Template.AuditConfirmationsSideMenu.onDestroyed(function() {
	
});

Template.AuditConfirmationsSideMenu.onRendered(function() {
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

Template.AuditConfirmationsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.AuditConfirmationsSideMenu.helpers({
	
});
