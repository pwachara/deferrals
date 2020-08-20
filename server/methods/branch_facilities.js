Meteor.methods({
	"branchFacilitiesInsert": function(data) {
		if(!BranchFacilities.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return BranchFacilities.insert(data);
	},

	"branchFacilitiesUpdate": function(id, data) {
		var doc = BranchFacilities.findOne({ _id: id });
		if(!BranchFacilities.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BranchFacilities.update({ _id: id }, { $set: data });
	},

	"branchFacilitiesRemove": function(id) {
		var doc = BranchFacilities.findOne({ _id: id });
		if(!BranchFacilities.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BranchFacilities.remove({ _id: id });
	}
});
