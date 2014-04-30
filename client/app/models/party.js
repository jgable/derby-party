var Party = DS.Model.extend({
    title: DS.attr('string'),
    slug: DS.attr('string'),
    owner: DS.belongsTo('user')
});

export default Party;