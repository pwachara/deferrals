Meteor.publish("branch_facility_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("branch_facilities_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("branch_facility", function(branchFacilityId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:branchFacilityId}, {}));
	}
	return this.ready();
});

Meteor.publish("branch_facilities_loo_pending", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({loo_received:false}, {sort:{date:1}}));
	}
	return this.ready();
});

Meteor.publish("branch_facilities_loo_received", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({loo_received:true}, {sort:{date:1}}));
	}
	return this.ready();
});

Meteor.publish("loo_pending_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending", function(looPendingId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:looPendingId}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending_list1", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({loo_received:false}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending_null1", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending1", function(looPendingId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:looPendingId}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_received_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({loo_received:true}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_received_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_received", function(looReceivedId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:looReceivedId}, {}));
	}
	return this.ready();
});

Meteor.publish("all_branch_facilities_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("all_branch_facilities", function(allBranchFacilitiesId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find({_id:allBranchFacilitiesId}, {}));
	}
	return this.ready();
});

Meteor.publish("loo_pending_list1_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find(databaseUtils.extendFilter({loo_received:false}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("loo_pending_list1_paged_count", function(extraOptions) {
	Counts.publish(this, "loo_pending_list1_paged_count", BranchFacilities.find(databaseUtils.extendFilter({loo_received:false}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"looPendingList1PagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
			var data = BranchFacilities.find(databaseUtils.extendFilter({loo_received:false}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

Meteor.publish("loo_received_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find(databaseUtils.extendFilter({loo_received:true}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("loo_received_list_paged_count", function(extraOptions) {
	Counts.publish(this, "loo_received_list_paged_count", BranchFacilities.find(databaseUtils.extendFilter({loo_received:true}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"looReceivedListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
			var data = BranchFacilities.find(databaseUtils.extendFilter({loo_received:true}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

Meteor.publish("all_branch_facilities_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
		return BranchFacilities.publishJoinedCursors(BranchFacilities.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("all_branch_facilities_list_paged_count", function(extraOptions) {
	Counts.publish(this, "all_branch_facilities_list_paged_count", BranchFacilities.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"allBranchFacilitiesListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_manager"])) {
			var data = BranchFacilities.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

