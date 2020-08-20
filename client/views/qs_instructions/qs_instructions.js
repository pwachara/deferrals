Template.QsInstructions.onCreated(function() {
	
});

Template.QsInstructions.onDestroyed(function() {
	
});

Template.QsInstructions.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructions.events({
	
});

Template.QsInstructions.helpers({
	
});

Template.QsInstructionsSideMenu.onCreated(function() {
	
});

Template.QsInstructionsSideMenu.onDestroyed(function() {
	
});

Template.QsInstructionsSideMenu.onRendered(function() {
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

Template.QsInstructionsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.QsInstructionsSideMenu.helpers({
	
});
