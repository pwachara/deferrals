Template.LawyerInstructions.onCreated(function() {
	
});

Template.LawyerInstructions.onDestroyed(function() {
	
});

Template.LawyerInstructions.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructions.events({
	
});

Template.LawyerInstructions.helpers({
	
});

Template.LawyerInstructionsSideMenu.onCreated(function() {
	
});

Template.LawyerInstructionsSideMenu.onDestroyed(function() {
	
});

Template.LawyerInstructionsSideMenu.onRendered(function() {
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

Template.LawyerInstructionsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.LawyerInstructionsSideMenu.helpers({
	
});
