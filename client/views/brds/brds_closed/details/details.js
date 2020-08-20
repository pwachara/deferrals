var pageSession = new ReactiveDict();

Template.BrdsBrdsClosedDetails.onCreated(function() {
	
});

Template.BrdsBrdsClosedDetails.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsClosedDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("brds.brds_closed", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.BrdsBrdsClosedDetails.helpers({
	
});

Template.BrdsBrdsClosedDetailsDetailsForm.onCreated(function() {
	
});

Template.BrdsBrdsClosedDetailsDetailsForm.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("brdsBrdsClosedDetailsDetailsFormInfoMessage", "");
	pageSession.set("brdsBrdsClosedDetailsDetailsFormErrorMessage", "");

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

Template.BrdsBrdsClosedDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brdsBrdsClosedDetailsDetailsFormInfoMessage", "");
		pageSession.set("brdsBrdsClosedDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var brdsBrdsClosedDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(brdsBrdsClosedDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brdsBrdsClosedDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brdsBrdsClosedDetailsDetailsFormErrorMessage", message);
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

Template.BrdsBrdsClosedDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brdsBrdsClosedDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brdsBrdsClosedDetailsDetailsFormErrorMessage");
	}
	
});
