Meteor.publish("qs_instructions_pending_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find({action_pending_with:{$nin:["Cancelled","Closed"]}}, {}));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find({action_pending_with:{$nin:["Cancelled","Closed"]},createdBy:this.userId}, {}));
});

Meteor.publish("qs_instructions_pending_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:null}, {}));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("qs_instructions_pending", function(qsInstructionsPendingId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:qsInstructionsPendingId}, {}));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:qsInstructionsPendingId,createdBy:this.userId}, {}));
});

Meteor.publish("qs_instructions_closed_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find({action_pending_with:{$in:["Cancelled","Closed"]}}, {}));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find({action_pending_with:{$in:["Cancelled","Closed"]},createdBy:this.userId}, {}));
});

Meteor.publish("qs_instructions_closed", function(qsInstructionsClosedId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:qsInstructionsClosedId}, {}));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find({_id:qsInstructionsClosedId,createdBy:this.userId}, {}));
});

Meteor.publish("qs_instructions_pending_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("qs_instructions_pending_list_paged_count", function(extraOptions) {
	Counts.publish(this, "qs_instructions_pending_list_paged_count", QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"qsInstructionsPendingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
			var data = QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("qs_instructions_closed_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
		return QsInstructions.publishJoinedCursors(QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return QsInstructions.publishJoinedCursors(QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("qs_instructions_closed_list_paged_count", function(extraOptions) {
	Counts.publish(this, "qs_instructions_closed_list_paged_count", QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"qsInstructionsClosedListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager","user"])) {
			var data = QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]},createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

