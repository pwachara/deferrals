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

Meteor.publish("pending_lof_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({lof_received:"NO"}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({lof_received:"NO",createdBy:this.userId}, {}));
});

Meteor.publish("pending_lofs_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("pending_lof", function(pendingLofId) {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:pendingLofId}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:pendingLofId,createdBy:this.userId}, {}));
});

Meteor.publish("received_lof_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({lof_received:"YES"}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({lof_received:"YES",createdBy:this.userId}, {}));
});

Meteor.publish("received_lofs_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("received_lof", function(receivedLofId) {
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:receivedLofId}, {}));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find({_id:receivedLofId,createdBy:this.userId}, {}));
});

Meteor.publish("pending_lof_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO"}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("pending_lof_list_paged_count", function(extraOptions) {
	Counts.publish(this, "pending_lof_list_paged_count", Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"pendingLofListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
			var data = Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO"}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("received_lof_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
		return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES"}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return Covidlofs.publishJoinedCursors(Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("received_lof_list_paged_count", function(extraOptions) {
	Counts.publish(this, "received_lof_list_paged_count", Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"receivedLofListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","user","crad_user","crad_manager"])) {
			var data = Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES"}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

