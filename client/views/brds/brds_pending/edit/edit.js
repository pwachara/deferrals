var pageSession = new ReactiveDict();

Template.BrdsBrdsPendingEdit.onCreated(function() {
	
});

Template.BrdsBrdsPendingEdit.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsPendingEdit.events({
	
});

Template.BrdsBrdsPendingEdit.helpers({
	
});

Template.BrdsBrdsPendingEditEditForm.onCreated(function() {
	
});

Template.BrdsBrdsPendingEditEditForm.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingEditEditForm.onRendered(function() {
	

	pageSession.set("brdsBrdsPendingEditEditFormInfoMessage", "");
	pageSession.set("brdsBrdsPendingEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.BrdsBrdsPendingEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brdsBrdsPendingEditEditFormInfoMessage", "");
		pageSession.set("brdsBrdsPendingEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var brdsBrdsPendingEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(brdsBrdsPendingEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brdsBrdsPendingEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("brds.brds_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brdsBrdsPendingEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("brdsUpdate", t.data.brd._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("brds.brds_pending", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.BrdsBrdsPendingEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brdsBrdsPendingEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brdsBrdsPendingEditEditFormErrorMessage");
	}
	
});
