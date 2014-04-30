import LoggedInMixin from 'appkit/controllers/loggedin-mixin';

export default Ember.ArrayController.extend(LoggedInMixin, {
    partyName: null,
    error: null,

    currentParties: function () {
        return this.get('content').toArray();
    }.property('content', 'content.isLoaded'),

    isEmpty: function () {
        return this.get('currentParties').length < 1;
    }.property('currentParties'),

    actions: {
        makeParty: function () {
            var self = this,
                partyName = this.get('partyName');

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

            party.save().then(function () {
                self.addObject(party);
                self.transitionToRoute('party', party);
            });
        }
    }
});