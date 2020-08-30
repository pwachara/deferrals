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
if(!doc.date){
	doc.date = new Date();
}

var date_in_2weeks = doc.date.setDate(doc.date.getDate() + 14);

doc.lof_due_date = date_in_2weeks;
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
