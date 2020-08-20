Meteor.publish("qs_instructions_history_list", function(qsInstructionsPendingId) {
	return QsInstructionsHistory.find({qsInstructionsPendingId:qsInstructionsPendingId}, {sort:{date:-1}});
});

Meteor.publish("qs_instructions_history_null", function() {
	return QsInstructionsHistory.find({_id:null}, {});
});

Meteor.publish("qs_instructions_history_list_paged", function(qsInstructionsPendingId, extraOptions) {
	extraOptions.doSkip = true;
	return QsInstructionsHistory.find(databaseUtils.extendFilter({qsInstructionsPendingId:qsInstructionsPendingId}, extraOptions), databaseUtils.extendOptions({sort:{date:-1}}, extraOptions));
});

Meteor.publish("qs_instructions_history_list_paged_count", function(qsInstructionsPendingId, extraOptions) {
	Counts.publish(this, "qs_instructions_history_list_paged_count", QsInstructionsHistory.find(databaseUtils.extendFilter({qsInstructionsPendingId:qsInstructionsPendingId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"qsInstructionsHistoryListPagedExport": function(qsInstructionsPendingId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = QsInstructionsHistory.find(databaseUtils.extendFilter({qsInstructionsPendingId:qsInstructionsPendingId}, extraOptions), databaseUtils.extendOptions({sort:{date:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

