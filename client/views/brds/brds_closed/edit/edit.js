var pageSession = new ReactiveDict();

Template.BrdsBrdsClosedEdit.onCreated(function() {
	
});

Template.BrdsBrdsClosedEdit.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsClosedEdit.events({
	
});

Template.BrdsBrdsClosedEdit.helpers({
	
});

Template.BrdsBrdsClosedEditEditForm.onCreated(function() {
	
});

Template.BrdsBrdsClosedEditEditForm.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedEditEditForm.onRendered(function() {
	

	pageSession.set("brdsBrdsClosedEditEditFormInfoMessage", "");
	pageSession.set("brdsBrdsClosedEditEditFormErrorMessage", "");

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

Template.BrdsBrdsClosedEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("brdsBrdsClosedEditEditFormInfoMessage", "");
		pageSession.set("brdsBrdsClosedEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var brdsBrdsClosedEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(brdsBrdsClosedEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("brdsBrdsClosedEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("brds.brds_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("brdsBrdsClosedEditEditFormErrorMessage", message);
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

		

		Router.go("brds.brds_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BrdsBrdsClosedEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("brdsBrdsClosedEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("brdsBrdsClosedEditEditFormErrorMessage");
	}
	
});
