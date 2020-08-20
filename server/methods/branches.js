Meteor.methods({
	"branchesInsert": function(data) {
		if(!Branches.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Branches.insert(data);
	},

	"branchesUpdate": function(id, data) {
		var doc = Branches.findOne({ _id: id });
		if(!Branches.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Branches.update({ _id: id }, { $set: data });
	},

	"branchesRemove": function(id) {
		var doc = Branches.findOne({ _id: id });
		if(!Branches.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Branches.remove({ _id: id });
	}
});
