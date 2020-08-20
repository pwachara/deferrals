Template.Brds.onCreated(function() {
	
});

Template.Brds.onDestroyed(function() {
	
});

Template.Brds.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Brds.events({
	
});

Template.Brds.helpers({
	
});

Template.BrdsSideMenu.onCreated(function() {
	
});

Template.BrdsSideMenu.onDestroyed(function() {
	
});

Template.BrdsSideMenu.onRendered(function() {
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

Template.BrdsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.BrdsSideMenu.helpers({
	
});
