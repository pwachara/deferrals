var pageSession = new ReactiveDict();

Template.BrdsBrdsPendingInsert.onCreated(function() {
	
});

Template.BrdsBrdsPendingInsert.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsPendingInsert.events({
	
});

Template.BrdsBrdsPendingInsert.helpers({
	
});

Template.BrdsBrdsPendingInsertInsertForm.onCreated(function() {
	
});

Template.BrdsBrdsPendingInsertInsertForm.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingInsertInsertForm.onRendered(function() {
	

	pageSession.set("brdsBrdsPendingInsertInsertFormInfoMessage", "");
	pageSession.set("brdsBrdsPendingInsertInsertFormErrorMessage", "");

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

Template.BrdsBrdsPendingInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brdsBrdsPendingInsertInsertFormInfoMessage", "");
		pageSession.set("brdsBrdsPendingInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var brdsBrdsPendingInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(brdsBrdsPendingInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brdsBrdsPendingInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("brds.brds_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brdsBrdsPendingInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("brdsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.BrdsBrdsPendingInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brdsBrdsPendingInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brdsBrdsPendingInsertInsertFormErrorMessage");
	}
	
});
