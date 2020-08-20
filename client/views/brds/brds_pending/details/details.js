var pageSession = new ReactiveDict();

Template.BrdsBrdsPendingDetails.onCreated(function() {
	
});

Template.BrdsBrdsPendingDetails.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsPendingDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("brds.brds_pending", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.BrdsBrdsPendingDetails.helpers({
	
});

Template.BrdsBrdsPendingDetailsDetailsForm.onCreated(function() {
	
});

Template.BrdsBrdsPendingDetailsDetailsForm.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("brdsBrdsPendingDetailsDetailsFormInfoMessage", "");
	pageSession.set("brdsBrdsPendingDetailsDetailsFormErrorMessage", "");

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

Template.BrdsBrdsPendingDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brdsBrdsPendingDetailsDetailsFormInfoMessage", "");
		pageSession.set("brdsBrdsPendingDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var brdsBrdsPendingDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(brdsBrdsPendingDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brdsBrdsPendingDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brdsBrdsPendingDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
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

Template.BrdsBrdsPendingDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brdsBrdsPendingDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brdsBrdsPendingDetailsDetailsFormErrorMessage");
	}
	
});
