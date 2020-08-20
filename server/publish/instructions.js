Meteor.publish("instructions", function() {
	return Instructions.publishJoinedCursors(Instructions.find({}, {sort:{date:-1}}));
});

Meteor.publish("instructions_empty", function() {
	return Instructions.publishJoinedCursors(Instructions.find({_id:null}, {}));
});

Meteor.publish("instruction", function(instructionId) {
	return Instructions.publishJoinedCursors(Instructions.find({_id:instructionId}, {}));
});

Meteor.publish("instructions_incomplete", function() {
	return Instructions.publishJoinedCursors(Instructions.find({action_pending_with:{$nin:["Closed","Cancelled"]}}, {}));
});

Meteor.publish("instructions_complete", function() {
	return Instructions.publishJoinedCursors(Instructions.find({action_pending_with:{$in:["Closed","Cancelled"]}}, {}));
});

Meteor.publish("instructions_all", function() {
	return Instructions.publishJoinedCursors(Instructions.find({}, {}));
});

Meteor.publish("instructions_with_undertaking", function() {
	return Instructions.publishJoinedCursors(Instructions.find({undertaking_issued:"Yes",action_pending_with:{$nin:["Closed","Cancelled"]}}, {}));
});

Meteor.publish("lawyer_instructions_pending_list", function() {
	return Instructions.publishJoinedCursors(Instructions.find({action_pending_with:{$nin:["Cancelled","Closed"]}}, {}));
});

Meteor.publish("lawyer_instructions_pending_null", function() {
	return Instructions.publishJoinedCursors(Instructions.find({_id:null}, {}));
});

Meteor.publish("lawyer_instructions_pending", function(lawyerInstructionsPendingId) {
	return Instructions.publishJoinedCursors(Instructions.find({_id:lawyerInstructionsPendingId}, {}));
});

Meteor.publish("lawyer_instructions_closed_list", function() {
	return Instructions.publishJoinedCursors(Instructions.find({action_pending_with:{$in:["Cancelled","Closed"]}}, {}));
});

Meteor.publish("lawyer_instructions_closed", function(lawyerInstructionsClosedId) {
	return Instructions.publishJoinedCursors(Instructions.find({_id:lawyerInstructionsClosedId}, {}));
});

Meteor.publish("instructions_incomplete_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("instructions_incomplete_paged_count", function(extraOptions) {
	Counts.publish(this, "instructions_incomplete_paged_count", Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instructionsIncompletePagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("instructions_all_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("instructions_all_paged_count", function(extraOptions) {
	Counts.publish(this, "instructions_all_paged_count", Instructions.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instructionsAllPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("instructions_complete_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("instructions_complete_paged_count", function(extraOptions) {
	Counts.publish(this, "instructions_complete_paged_count", Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Closed","Cancelled"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instructionsCompletePagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("instructions_with_undertaking_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({undertaking_issued:"Yes",action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("instructions_with_undertaking_paged_count", function(extraOptions) {
	Counts.publish(this, "instructions_with_undertaking_paged_count", Instructions.find(databaseUtils.extendFilter({undertaking_issued:"Yes",action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instructionsWithUndertakingPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({undertaking_issued:"Yes",action_pending_with:{$nin:["Closed","Cancelled"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("instructions_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{date:-1}}, extraOptions)));
});

Meteor.publish("instructions_paged_count", function(extraOptions) {
	Counts.publish(this, "instructions_paged_count", Instructions.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instructionsPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{date:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("lawyer_instructions_pending_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("lawyer_instructions_pending_list_paged_count", function(extraOptions) {
	Counts.publish(this, "lawyer_instructions_pending_list_paged_count", Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"lawyerInstructionsPendingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("lawyer_instructions_closed_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instructions.publishJoinedCursors(Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("lawyer_instructions_closed_list_paged_count", function(extraOptions) {
	Counts.publish(this, "lawyer_instructions_closed_list_paged_count", Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"lawyerInstructionsClosedListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

