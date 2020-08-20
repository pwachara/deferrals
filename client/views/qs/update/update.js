var pageSession = new ReactiveDict();

Template.QsUpdate.onCreated(function() {
	
});

Template.QsUpdate.onDestroyed(function() {
	
});

Template.QsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsUpdate.events({
	
});

Template.QsUpdate.helpers({
	
});

Template.QsUpdateForm.onCreated(function() {
	
});

Template.QsUpdateForm.onDestroyed(function() {
	
});

Template.QsUpdateForm.onRendered(function() {
	

	pageSession.set("qsUpdateFormInfoMessage", "");
	pageSession.set("qsUpdateFormErrorMessage", "");

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

Template.QsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsUpdateFormInfoMessage", "");
		pageSession.set("qsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(qsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("qs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("qsUpdate", t.data.qs._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("qs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.QsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsUpdateFormErrorMessage");
	}
	
});
