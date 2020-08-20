Meteor.methods({
	"deferralsInsert": function(data) {
		if(!Deferrals.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Deferrals.insert(data);
	},

	"deferralsUpdate": function(id, data) {
		var doc = Deferrals.findOne({ _id: id });
		if(!Deferrals.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Deferrals.update({ _id: id }, { $set: data });
	},

	"deferralsRemove": function(id) {
		var doc = Deferrals.findOne({ _id: id });
		if(!Deferrals.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Deferrals.remove({ _id: id });
	}
});
