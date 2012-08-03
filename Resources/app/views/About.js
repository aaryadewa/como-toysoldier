module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        UI = Como.loadUI(),
        create;
        
    create = function() {
        var self = new UI.view();
        
        var content = new UI.view({
            height: Ti.UI.SIZE,
            layout: 'vertical',
            top: '7%',
            width: Ti.UI.SIZE
        });
        
        var infoWrapper = new UI.view({
            height: Ti.UI.SIZE,
            layout: 'vertical',
            left: '4%',
            right: '4%',
            top: 0
        });
        
        var subtitle = new UI.label({
            color: '#000',
            font: {
                fontSize: '18dp',
                fontWeight: 'bold'
            },
            left: 0,
            text: 'graphic designer',
            top: 0
        });
        
        var mainTitle = new UI.label({
            color: '#000',
            font: {
                fontSize: '48dp',
                fontWeight: 'bold'
            },
            left: 0,
            text: 'toysoldier',
            top: 0
        });
        
        var desc = new UI.label({
            color: '#333',
            font: {
                fontSize: '11dp'
            },
            left: 0,
            text: 'I wanna explore the world of design.\nThere, I give hope, joy and passion through my artwork.',
            top: 0
        });
        
        var logo = Ti.UI.createImageView({
            image: '/images/pg1_logo.png',
            height: '94dp',
            left: '2%',
            top: '3%',
            width: '134dp'
        });
        
        var author = new UI.label({
            color: '#333',
            font: {
                fontSize: '16dp',
                fontWeight: 'bold'
            },
            left: '4%',
            text: 'Daum',
            top: '2%'
        });
        
        var authorDesc = new UI.label({
            color: '#333',
            font: {
                fontSize: '14dp',
            },
            left: '4%',
            text: 'marketing design team',
            top: 0
        });
        
        var toy = Ti.UI.createImageView({
            bottom: '5%',
            image: '/images/pg1_toy.png',
            height: '250dp',
            right: '7%',
            width: '134dp'
        });
        
        infoWrapper.addAll([subtitle, mainTitle, desc]);
        content.addAll([infoWrapper, logo, author, authorDesc]);
        self.add(content);
        self.add(toy);
        
        return self;
    };
        
    return {
        create: create
    };
};