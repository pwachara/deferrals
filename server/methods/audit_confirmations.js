Meteor.methods({
	"auditConfirmationsInsert": function(data) {
		if(!AuditConfirmations.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return AuditConfirmations.insert(data);
	},

	"auditConfirmationsUpdate": function(id, data) {
		var doc = AuditConfirmations.findOne({ _id: id });
		if(!AuditConfirmations.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		AuditConfirmations.update({ _id: id }, { $set: data });
	},

	"auditConfirmationsRemove": function(id) {
		var doc = AuditConfirmations.findOne({ _id: id });
		if(!AuditConfirmations.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		AuditConfirmations.remove({ _id: id });
	}
});
