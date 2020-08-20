Meteor.publish("sow_pending_list", function() {
	return Sow.find({status:"Pending"}, {sort:{sow_deadline:-1}});
});

Meteor.publish("sow_pending_null", function() {
	return Sow.find({_id:null}, {});
});

Meteor.publish("sow_pending", function(sowPendingId) {
	return Sow.find({_id:sowPendingId}, {});
});

Meteor.publish("sow_closed_list", function() {
	return Sow.find({status:"Closed"}, {sort:{loo_date:1}});
});

Meteor.publish("sow_closed", function(sowClosedId) {
	return Sow.find({_id:sowClosedId}, {});
});

Meteor.publish("sow_pending_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Sow.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{sow_deadline:-1}}, extraOptions));
});

Meteor.publish("sow_pending_list_paged_count", function(extraOptions) {
	Counts.publish(this, "sow_pending_list_paged_count", Sow.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"sowPendingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Sow.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{sow_deadline:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("sow_closed_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Sow.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{loo_date:1}}, extraOptions));
});

Meteor.publish("sow_closed_list_paged_count", function(extraOptions) {
	Counts.publish(this, "sow_closed_list_paged_count", Sow.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"sowClosedListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Sow.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{loo_date:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

