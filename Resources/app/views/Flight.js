module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        UI = Como.loadUI(),
        create;
        
    create = function() {
        var self = new UI.view();
        
        var scrollView = new UI.scrolly({
            layout: 'vertical'
        });
        
        var map = Ti.UI.createImageView({
            image: '/images/737-300_seatmap.gif',
            height: '586dp',
            top: '10dp',
            width: '220dp'
        });
        
        scrollView.add(map);
        self.add(scrollView);
        
        return self;
    };
        
    return {
        create: create
    };
};