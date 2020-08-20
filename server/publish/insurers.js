Meteor.publish("insurer_empty", function() {
	return Insurers.find({_id:null}, {});
});

Meteor.publish("insurers", function() {
	return Insurers.find({}, {sort:{name:1}});
});

Meteor.publish("insurer", function(insurerId) {
	return Insurers.find({_id:insurerId}, {});
});

Meteor.publish("insurers_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Insurers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
});

Meteor.publish("insurers_paged_count", function(extraOptions) {
	Counts.publish(this, "insurers_paged_count", Insurers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"insurersPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Insurers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

