Meteor.methods({
	"brdsInsert": function(data) {
		if(!Brds.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Brds.insert(data);
	},

	"brdsUpdate": function(id, data) {
		var doc = Brds.findOne({ _id: id });
		if(!Brds.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Brds.update({ _id: id }, { $set: data });
	},

	"brdsRemove": function(id) {
		var doc = Brds.findOne({ _id: id });
		if(!Brds.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Brds.remove({ _id: id });
	}
});
