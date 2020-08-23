Template.Covidlofs.onCreated(function() {
	
});

Template.Covidlofs.onDestroyed(function() {
	
});

Template.Covidlofs.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Covidlofs.events({
	
});

Template.Covidlofs.helpers({
	
});

Template.CovidlofsSideMenu.onCreated(function() {
	
});

Template.CovidlofsSideMenu.onDestroyed(function() {
	
});

Template.CovidlofsSideMenu.onRendered(function() {
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

Template.CovidlofsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.CovidlofsSideMenu.helpers({
	
});
