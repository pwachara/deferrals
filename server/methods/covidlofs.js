Meteor.methods({
	"covidlofsInsert": function(data) {
		if(!Covidlofs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Covidlofs.insert(data);
	},

	"covidlofsUpdate": function(id, data) {
		var doc = Covidlofs.findOne({ _id: id });
		if(!Covidlofs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Covidlofs.update({ _id: id }, { $set: data });
	},

	"covidlofsRemove": function(id) {
		var doc = Covidlofs.findOne({ _id: id });
		if(!Covidlofs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Covidlofs.remove({ _id: id });
	}
});
