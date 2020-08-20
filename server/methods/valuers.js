Meteor.methods({
	"valuersInsert": function(data) {
		if(!Valuers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Valuers.insert(data);
	},

	"valuersUpdate": function(id, data) {
		var doc = Valuers.findOne({ _id: id });
		if(!Valuers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Valuers.update({ _id: id }, { $set: data });
	},

	"valuersRemove": function(id) {
		var doc = Valuers.findOne({ _id: id });
		if(!Valuers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Valuers.remove({ _id: id });
	}
});
