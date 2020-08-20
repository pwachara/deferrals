Meteor.methods({
	"instructionsInsert": function(data) {
		if(!Instructions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Instructions.insert(data);
	},

	"instructionsUpdate": function(id, data) {
		var doc = Instructions.findOne({ _id: id });
		if(!Instructions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Instructions.update({ _id: id }, { $set: data });
	},

	"instructionsRemove": function(id) {
		var doc = Instructions.findOne({ _id: id });
		if(!Instructions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Instructions.remove({ _id: id });
	}
});
