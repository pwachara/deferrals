Covidlofs.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Covidlofs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
//var transaction_date = doc.date;
//var days_14 = new Date();
doc.lof_due_date = doc.date.setDate(doc.date.getDate() + 14);

//doc.lof_due_date = expected_closure_date;
});

Covidlofs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Covidlofs.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Covidlofs.before.remove(function(userId, doc) {
	
});

Covidlofs.after.insert(function(userId, doc) {
	
});

Covidlofs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Covidlofs.after.remove(function(userId, doc) {
	
});
