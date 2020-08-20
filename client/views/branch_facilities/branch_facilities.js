Template.BranchFacilities.onCreated(function() {
	
});

Template.BranchFacilities.onDestroyed(function() {
	
});

Template.BranchFacilities.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilities.events({
	
});

Template.BranchFacilities.helpers({
	
});

Template.BranchFacilitiesSideMenu.onCreated(function() {
	
});

Template.BranchFacilitiesSideMenu.onDestroyed(function() {
	
});

Template.BranchFacilitiesSideMenu.onRendered(function() {
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

Template.BranchFacilitiesSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.BranchFacilitiesSideMenu.helpers({
	
});
