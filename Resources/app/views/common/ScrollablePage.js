module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        
        create, buildTabbar, buildTabbarIndicator, buildCarouselIndicator;
        
    /**
     * 
     * @param {Object} opt ScrollablePage options:
     * - navigationMode: 'carousel|tab'
     * - views: (array of objects),
     *      - button
     *      - page
     */
    create = function(opt) {
        var config = $.extend({
            navigationMode: 'carousel',
            navigationDocked: 'bottom',
            views: []
        }, opt);
        
        var win = new UI.win({
            backgroundColor: '#FFF',
            // layout: 'vertical',
            navBarHidden: true
        });
        
        var scroller = Ti.UI.createScrollableView();
        var views = [];
        
        for(var i=0,j=config.views.length; i<j; i++){
            views.push(config.views[i].page);
        };
        
        scroller.views = views;
        
        win.add(scroller);
        
        if (config.navigationMode === 'carousel') {
            Ti.API.info('add carousel');
            win.add(buildCarouselIndicator({scroller: scroller, docked: config.navigationDocked}));
        }
        
        return win;
    };
    
    buildCarouselIndicator = function(opt) {
        var wrapper = new UI.view({
            height: '32dp',
            layout: 'horizontal',
            width: Ti.UI.SIZE
        });
        
        if (opt.docked === 'bottom')
            wrapper.bottom = 0;
        else
            wrapper.top = 0;
        
        var scroller = opt.scroller;
        
        for(var i=0,j=scroller.views.length; i<j; i++){
            var indicator = new UI.view({
                backgroundColor: '#333',
                borderRadius: 5,
                height: '10dp',
                left: '5dp',
                objIndex: i,
                width: '10dp'
            });
            
            if (i === 0) {indicator.left = 0}
            
            indicator.on('click', function(e) {
                scroller.scrollToView(e.source.objIndex);
            });
            
            wrapper.add(indicator);
        };
        
        return wrapper;
    };
    
    buildTabbar = function(opt) {
        var config = $.extend({
            height: '48dp',
            width: '93dp',
            tabs: []
        }, opt);
        
        var btnWrapper = new UI.view({
            height: Ti.UI.SIZE,
            layout: 'horizontal',
            top: '10dp',
            width: Ti.UI.SIZE
        });
        
        for(var i=0,j=config.tabs.length; i<j; i++){
            var btn = new UI.button($.extend({
                focusable: true,
                height: config.height,
                left: 0,
                objIdx: i,
                top: 0,
                width: config.tabs[i].width
            }, config.tabs[i]));
            btn.on('click', function(e) {
                config.scroller.scrollToView(e.source.objIdx);
            });
            
            btnWrapper.add(btn);
        };
        
        return btnWrapper;
    };
        
    return {
        create: create
    };
};