var Bet = DS.Model.extend({
    user:DS.belongsTo('user'),
    horse:DS.belongsTo('horse'),
    timeStamp:DS.attr('date'),
    money:DS.attr()
});


Bet.reopenClass({
    FIXTURES:[
    	{id:1, user:1, horse:1, money:2000}
    ]
});


export default Bet;

