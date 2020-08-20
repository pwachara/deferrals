var pageSession = new ReactiveDict();

Template.BankingSegmentsInsert.onCreated(function() {
	
});

Template.BankingSegmentsInsert.onDestroyed(function() {
	
});

Template.BankingSegmentsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BankingSegmentsInsert.events({
	
});

Template.BankingSegmentsInsert.helpers({
	
});

Template.BankingSegmentsInsertForm.onCreated(function() {
	
});

Template.BankingSegmentsInsertForm.onDestroyed(function() {
	
});

Template.BankingSegmentsInsertForm.onRendered(function() {
	

	pageSession.set("bankingSegmentsInsertFormInfoMessage", "");
	pageSession.set("bankingSegmentsInsertFormErrorMessage", "");

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

Template.BankingSegmentsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bankingSegmentsInsertFormInfoMessage", "");
		pageSession.set("bankingSegmentsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var bankingSegmentsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(bankingSegmentsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bankingSegmentsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("banking_segments", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bankingSegmentsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("bankingSegmentInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.BankingSegmentsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bankingSegmentsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bankingSegmentsInsertFormErrorMessage");
	}
	
});
