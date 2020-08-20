Template.Complaints.onCreated(function() {
	
});

Template.Complaints.onDestroyed(function() {
	
});

Template.Complaints.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Complaints.events({
	
});

Template.Complaints.helpers({
	
});

Template.ComplaintsSideMenu.onCreated(function() {
	
});

Template.ComplaintsSideMenu.onDestroyed(function() {
	
});

Template.ComplaintsSideMenu.onRendered(function() {
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

Template.ComplaintsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ComplaintsSideMenu.helpers({
	
});
