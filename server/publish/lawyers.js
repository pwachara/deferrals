Meteor.publish("lawyers", function() {
	return Lawyers.publishJoinedCursors(Lawyers.find({}, {sort:{name:1}}));
});

Meteor.publish("lawyers_empty", function() {
	return Lawyers.publishJoinedCursors(Lawyers.find({_id:null}, {}));
});

Meteor.publish("lawyer", function(lawyerId) {
	return Lawyers.publishJoinedCursors(Lawyers.find({_id:lawyerId}, {}));
});

Meteor.publish("lawyers_in_panel", function() {
	return Lawyers.publishJoinedCursors(Lawyers.find({is_in_panel:true}, {}));
});

Meteor.publish("lawyers_in_panel_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Lawyers.publishJoinedCursors(Lawyers.find(databaseUtils.extendFilter({is_in_panel:true}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("lawyers_in_panel_paged_count", function(extraOptions) {
	Counts.publish(this, "lawyers_in_panel_paged_count", Lawyers.find(databaseUtils.extendFilter({is_in_panel:true}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"lawyersInPanelPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Lawyers.find(databaseUtils.extendFilter({is_in_panel:true}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("lawyers_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Lawyers.publishJoinedCursors(Lawyers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
});

Meteor.publish("lawyers_paged_count", function(extraOptions) {
	Counts.publish(this, "lawyers_paged_count", Lawyers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"lawyersPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Lawyers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

