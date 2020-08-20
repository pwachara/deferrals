Meteor.publish("qs_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Qs.publishJoinedCursors(Qs.find({}, {}));
	}
	return Qs.publishJoinedCursors(Qs.find({createdBy:this.userId}, {}));
});

Meteor.publish("qs_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Qs.publishJoinedCursors(Qs.find({_id:null}, {}));
	}
	return Qs.publishJoinedCursors(Qs.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("qs", function(qsId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Qs.publishJoinedCursors(Qs.find({_id:qsId}, {}));
	}
	return Qs.publishJoinedCursors(Qs.find({_id:qsId,createdBy:this.userId}, {}));
});

Meteor.publish("qs_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Qs.publishJoinedCursors(Qs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return Qs.publishJoinedCursors(Qs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("qs_list_paged_count", function(extraOptions) {
	Counts.publish(this, "qs_list_paged_count", Qs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"qsListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
			var data = Qs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Qs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

