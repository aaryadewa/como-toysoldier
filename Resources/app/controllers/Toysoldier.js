module.exports = function (Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        
        dashboard, about, artwork, guestbook;
        
    dashboard = function() {
        var Dashboard = require('/app/views/Scroller'),
            dashboard = new Dashboard(Como);
           
        dashboard.create().open();
    };
        
    about = function() {
        var About = require('/app/views/About'),
            about = new About(Como);
            
        about.create().open();
    };
        
    artwork = function() {
        Ti.API.info('open artwork page');
    };
        
    guestbook = function() {
        Ti.API.info('open guestbook page');
    };
    
    return {
        dashboard: dashboard,
        about: about,
        artwork: artwork,
        guestbook: guestbook
    };
};
