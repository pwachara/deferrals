Template.Sow.onCreated(function() {
	
});

Template.Sow.onDestroyed(function() {
	
});

Template.Sow.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Sow.events({
	
});

Template.Sow.helpers({
	
});

Template.SowSideMenu.onCreated(function() {
	
});

Template.SowSideMenu.onDestroyed(function() {
	
});

Template.SowSideMenu.onRendered(function() {
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

Template.SowSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.SowSideMenu.helpers({
	
});
