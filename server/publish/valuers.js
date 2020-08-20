Meteor.publish("valuers", function() {
	return Valuers.publishJoinedCursors(Valuers.find({}, {sort:{name:1}}));
});

Meteor.publish("valuer_empty", function() {
	return Valuers.publishJoinedCursors(Valuers.find({_id:null}, {}));
});

Meteor.publish("valuer", function(valuerId) {
	return Valuers.publishJoinedCursors(Valuers.find({_id:valuerId}, {}));
});

Meteor.publish("valuers_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Valuers.publishJoinedCursors(Valuers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
});

Meteor.publish("valuers_paged_count", function(extraOptions) {
	Counts.publish(this, "valuers_paged_count", Valuers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"valuersPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Valuers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

