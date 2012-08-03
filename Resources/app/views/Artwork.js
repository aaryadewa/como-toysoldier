module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        create, buildTabbar;
        
    create = function() {
        var self = new UI.view();
        
        return self;
    };
        
    return {
        create: create
    };
};