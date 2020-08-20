var pageSession = new ReactiveDict();

Template.BankingSegmentsUpdate.onCreated(function() {
	
});

Template.BankingSegmentsUpdate.onDestroyed(function() {
	
});

Template.BankingSegmentsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BankingSegmentsUpdate.events({
	
});

Template.BankingSegmentsUpdate.helpers({
	
});

Template.BankingSegmentsUpdateForm.onCreated(function() {
	
});

Template.BankingSegmentsUpdateForm.onDestroyed(function() {
	
});

Template.BankingSegmentsUpdateForm.onRendered(function() {
	

	pageSession.set("bankingSegmentsUpdateFormInfoMessage", "");
	pageSession.set("bankingSegmentsUpdateFormErrorMessage", "");

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

Template.BankingSegmentsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bankingSegmentsUpdateFormInfoMessage", "");
		pageSession.set("bankingSegmentsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var bankingSegmentsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(bankingSegmentsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bankingSegmentsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("banking_segments", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bankingSegmentsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("bankingSegmentUpdate", t.data.banking_segment._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("banking_segments", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BankingSegmentsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bankingSegmentsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bankingSegmentsUpdateFormErrorMessage");
	}
	
});
