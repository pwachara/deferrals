Meteor.publish("branch_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Branches.find({}, {});
	}
	return this.ready();
});

Meteor.publish("branches_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Branches.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("branch", function(branchId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Branches.find({_id:branchId}, {});
	}
	return this.ready();
});

Meteor.publish("branch_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return Branches.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("branch_list_paged_count", function(extraOptions) {
	Counts.publish(this, "branch_list_paged_count", Branches.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"branchListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
			var data = Branches.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

