Meteor.publish("covidlof_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({createdBy:this.userId}, {}));
});

Meteor.publish("covidlofs_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("covidlof", function(covidlofId) {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:covidlofId}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:covidlofId,createdBy:this.userId}, {}));
});

Meteor.publish("covidlof_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("covidlof_list_paged_count", function(extraOptions) {
	Counts.publish(this, "covidlof_list_paged_count", Covidlofs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"covidlofListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
			var data = Covidlofs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Covidlofs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

