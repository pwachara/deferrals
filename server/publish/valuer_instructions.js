Meteor.publish("valuer_instructions_empty", function() {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({_id:null}, {}));
});

Meteor.publish("valuer_instructions", function() {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({}, {}));
});

Meteor.publish("valuer_instruction", function(valuer_instructionId) {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({_id:valuer_instructionId}, {}));
});

Meteor.publish("valuer_instructions_pending_list", function() {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({status:{$nin:["Cancelled","Closed"]}}, {}));
});

Meteor.publish("valuer_instructions_pending_null", function() {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({_id:null}, {}));
});

Meteor.publish("valuer_instructions_pending", function(valuerInstructionsPendingId) {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({_id:valuerInstructionsPendingId}, {}));
});

Meteor.publish("valuer_instructions_closed_list", function() {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({status:{$in:["Cancelled","Closed"]}}, {}));
});

Meteor.publish("valuer_instructions_closed", function(valuerInstructionsClosedId) {
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find({_id:valuerInstructionsClosedId}, {}));
});

Meteor.publish("valuer_instructions_pending_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find(databaseUtils.extendFilter({status:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("valuer_instructions_pending_list_paged_count", function(extraOptions) {
	Counts.publish(this, "valuer_instructions_pending_list_paged_count", ValuerInstructions.find(databaseUtils.extendFilter({status:{$nin:["Cancelled","Closed"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"valuerInstructionsPendingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = ValuerInstructions.find(databaseUtils.extendFilter({status:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("valuer_instructions_closed_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return ValuerInstructions.publishJoinedCursors(ValuerInstructions.find(databaseUtils.extendFilter({status:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("valuer_instructions_closed_list_paged_count", function(extraOptions) {
	Counts.publish(this, "valuer_instructions_closed_list_paged_count", ValuerInstructions.find(databaseUtils.extendFilter({status:{$in:["Cancelled","Closed"]}}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"valuerInstructionsClosedListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = ValuerInstructions.find(databaseUtils.extendFilter({status:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

