var Horse = DS.Model.extend({
    name:DS.attr('string'),
    currentBet:DS.belongsTo('bet')
});


Horse.reopenClass({
    FIXTURES:[
        {id:1, name:'Crust Lifter', currentBet:1}, 
        {id:2, name:'Blue Pen'},
        {id:3, name:'Sea Biscuit'}
    ]
});


export default Horse;

