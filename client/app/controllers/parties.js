import LoggedInMixin from 'appkit/controllers/loggedin-mixin';

export default Ember.ArrayController.extend(LoggedInMixin, {
    partyName: null,
    error: null,

    isEmpty: function () {
        return this.content.get('length') < 1;
    }.property('content.length'),

    actions: {
        makeParty: function () {
            var partyName = this.get('partyName');

            if (!partyName || partyName.length < 3) {
                this.set('error', 'Please enter a descriptive name');
                return;
            }

            this.set('error', null);
            this.set('partyName', '');

            var party = this.store.createRecord('party', {
                title: partyName,
                // TODO: Better slugging
                slug: partyName.toLowerCase().replace(/ /g, '-')
            });

            party.save();
        }
    }
});