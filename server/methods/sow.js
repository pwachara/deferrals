Meteor.methods({
	"sowInsert": function(data) {
		if(!Sow.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Sow.insert(data);
	},

	"sowUpdate": function(id, data) {
		var doc = Sow.findOne({ _id: id });
		if(!Sow.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sow.update({ _id: id }, { $set: data });
	},

	"sowRemove": function(id) {
		var doc = Sow.findOne({ _id: id });
		if(!Sow.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sow.remove({ _id: id });
	}
});
