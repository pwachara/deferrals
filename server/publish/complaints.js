Meteor.publish("complaints_empty", function() {
	return Complaints.find({_id:null}, {});
});

Meteor.publish("complaints_pending", function() {
	return Complaints.find({status:"Pending"}, {sort:{complaint_date:1}});
});

Meteor.publish("complaint", function(complaintId) {
	return Complaints.find({_id:complaintId}, {});
});

Meteor.publish("complaints_closed", function() {
	return Complaints.find({status:"Closed"}, {sort:{complaint_date:1}});
});

Meteor.publish("complaints_pending_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Complaints.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{complaint_date:1}}, extraOptions));
});

Meteor.publish("complaints_pending_paged_count", function(extraOptions) {
	Counts.publish(this, "complaints_pending_paged_count", Complaints.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"complaintsPendingPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Complaints.find(databaseUtils.extendFilter({status:"Pending"}, extraOptions), databaseUtils.extendOptions({sort:{complaint_date:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("complaints_closed_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Complaints.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{complaint_date:1}}, extraOptions));
});

Meteor.publish("complaints_closed_paged_count", function(extraOptions) {
	Counts.publish(this, "complaints_closed_paged_count", Complaints.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"complaintsClosedPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Complaints.find(databaseUtils.extendFilter({status:"Closed"}, extraOptions), databaseUtils.extendOptions({sort:{complaint_date:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

