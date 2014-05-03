var Horse = DS.Model.extend({
    name: DS.attr('string'),
    currentBid: DS.belongsTo('bid'),
    headshotImage: DS.attr('string'),
    silkColor: DS.attr('string')
});


Horse.reopenClass({
    FIXTURES:[
        {id:1, name:'Crust Lifter', currentBid:1, silkColor: 'red', headshotImage: 'http://static.kentuckyderby.com/sites/kentuckyderby.com/files/imagecache/content_full/images/primary/vicars-in-trouble.jpg' },
        {id:2, name:'Blue Pen', currentBid:2, silkColor: 'blue', headshotImage: 'http://static.kentuckyderby.com/sites/kentuckyderby.com/files/imagecache/content_full/images/primary/harrys-holiday.jpg' },
        {id:3, name:'Sea Biscuit', silkColor: 'purple', headshotImage: 'http://static.kentuckyderby.com/sites/kentuckyderby.com/files/imagecache/content_full/images/primary/uncle-sigh.jpg' }
    ]
});


export default Horse;

