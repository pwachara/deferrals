Template.HomePrivate.onCreated(function() {
	
});

Template.HomePrivate.onDestroyed(function() {
	
});

Template.HomePrivate.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});

Template.HomePrivateSideMenu.onCreated(function() {
	
});

Template.HomePrivateSideMenu.onDestroyed(function() {
	
});

Template.HomePrivateSideMenu.onRendered(function() {
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

Template.HomePrivateSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.HomePrivateSideMenu.helpers({
	
});
