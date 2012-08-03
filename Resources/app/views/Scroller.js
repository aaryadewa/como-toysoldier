module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        create, buildTabbar;
        
    create = function() {
        var ScrollablePage = require('/app/views/common/ScrollablePage'),
            scroller = new ScrollablePage(Como);
            
        var About = require('/app/views/About'), about = new About(Como);
        var Flight = require('/app/views/Flight'), flight = new Flight(Como);
        
        return scroller.create({
            views: [
                {page: about.create()},
                {page: flight.create()},
                {page: new UI.view({backgroundColor: '#DDD'})}
            ]
        });
    };
    
    return {
        create: create
    };
};