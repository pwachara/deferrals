Meteor.publish("deferrals", function() {
	return Deferrals.publishJoinedCursors(Deferrals.find({}, {sort:{deferral_date:1}}));
});

Meteor.publish("deferrals_empty", function() {
	return Deferrals.publishJoinedCursors(Deferrals.find({_id:null}, {}));
});

Meteor.publish("deferral", function(deferralId) {
	return Deferrals.publishJoinedCursors(Deferrals.find({_id:deferralId}, {}));
});

Meteor.publish("deferrals_pending", function() {
	return Deferrals.publishJoinedCursors(Deferrals.find({status:"Pending"}, {sort:{due_date:1}}));
});

Meteor.publish("deferrals_closed", function() {
	return Deferrals.publishJoinedCursors(Deferrals.find({status:"Closed"}, {sort:{due_date:1}}));
});

Meteor.publish("deferrals_pending_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Deferrals.publishJoinedCursors(Deferrals.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{due_date:1}}, extraOptions)));
});

Meteor.publish("deferrals_pending_paged_count", function(extraOptions) {
	Counts.publish(this, "deferrals_pending_paged_count", Deferrals.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"deferralsPendingPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Deferrals.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{due_date:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("deferrals_closed_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Deferrals.publishJoinedCursors(Deferrals.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{due_date:1}}, extraOptions)));
});

Meteor.publish("deferrals_closed_paged_count", function(extraOptions) {
	Counts.publish(this, "deferrals_closed_paged_count", Deferrals.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"deferralsClosedPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Deferrals.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{due_date:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

