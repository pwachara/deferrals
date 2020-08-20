var pageSession = new ReactiveDict();

Template.ValuersEdit.onCreated(function() {
	
});

Template.ValuersEdit.onDestroyed(function() {
	
});

Template.ValuersEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuersEdit.events({
	
});

Template.ValuersEdit.helpers({
	
});

Template.ValuersEditEditForm.onCreated(function() {
	
});

Template.ValuersEditEditForm.onDestroyed(function() {
	
});

Template.ValuersEditEditForm.onRendered(function() {
	

	pageSession.set("valuersEditEditFormInfoMessage", "");
	pageSession.set("valuersEditEditFormErrorMessage", "");

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

Template.ValuersEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuersEditEditFormInfoMessage", "");
		pageSession.set("valuersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(valuersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("valuers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("valuersUpdate", t.data.valuer._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("valuers", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ValuersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuersEditEditFormErrorMessage");
	}
	
});
