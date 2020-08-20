Meteor.publish("audits_empty", function() {
	return AuditConfirmations.find({_id:null}, {});
});

Meteor.publish("audit", function(auditId) {
	return AuditConfirmations.find({_id:auditId}, {});
});

Meteor.publish("audits_pending", function() {
	return AuditConfirmations.find({status:"pending"}, {sort:{date_received:1}});
});

Meteor.publish("audits_closed", function() {
	return AuditConfirmations.find({status:"closed"}, {sort:{date_received:1}});
});

Meteor.publish("audits_pending_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return AuditConfirmations.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), databaseUtils.extendOptions({sort:{date_received:1}}, extraOptions));
});

Meteor.publish("audits_pending_paged_count", function(extraOptions) {
	Counts.publish(this, "audits_pending_paged_count", AuditConfirmations.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"auditsPendingPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = AuditConfirmations.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), databaseUtils.extendOptions({sort:{date_received:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("audits_closed_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return AuditConfirmations.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), databaseUtils.extendOptions({sort:{date_received:1}}, extraOptions));
});

Meteor.publish("audits_closed_paged_count", function(extraOptions) {
	Counts.publish(this, "audits_closed_paged_count", AuditConfirmations.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"auditsClosedPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = AuditConfirmations.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), databaseUtils.extendOptions({sort:{date_received:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

