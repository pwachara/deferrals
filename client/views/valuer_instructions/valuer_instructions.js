Template.ValuerInstructions.onCreated(function() {
	
});

Template.ValuerInstructions.onDestroyed(function() {
	
});

Template.ValuerInstructions.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructions.events({
	
});

Template.ValuerInstructions.helpers({
	
});

Template.ValuerInstructionsSideMenu.onCreated(function() {
	
});

Template.ValuerInstructionsSideMenu.onDestroyed(function() {
	
});

Template.ValuerInstructionsSideMenu.onRendered(function() {
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

Template.ValuerInstructionsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ValuerInstructionsSideMenu.helpers({
	
});
