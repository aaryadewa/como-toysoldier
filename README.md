Como - a Titanium Appcelerator MVC Framework
============================================

Just another approach to simplify appcelerator app development,
integrated with `joli.js` to persist data model using local DB and `underscore.js` as utility.

Please check the [demo project](https://github.com/geekzy/tiapp-como-demo) for a sample como project.

### v2.0.2

**required:**

- [joli.js](https://github.com/xavierlacot/joli.js) - Local DB ORM
- [underscore.js](https://github.com/documentcloud/underscore) - JS Utility-Belt

Getting Started
===============

Installation
------------

The simplest way to start using Como is just copy `app` & `lib` directory and also `app.js` into your project,
if you would like to use the localization feature then you also have to copy the `i18n` directory.

DO NOT modify `/Resources/app.js`, please modify `/Resources/app/main.js` instead to change application bootstrap.

Directory Structure
-------------------

The directory structure of common Como application is as follows:

    project_root
        |- i18n                 <- Localization sources
        |- Resources
            |- app
            |   |- config       <- Configuration sources
            |   |- controllers  <- Controller sources
            |   |- models       <- Model sources
            |   |- views        <- View sources
            |   |- main.js      <- Application bootstrap
            |
            |- lib
            |   |- Como         <- Core Como Library
            |   |- Joli         <- Joli ORM Library
            |   |- Underscore   <- Underscore js-utility-belt Library
            |
            |- app.js           <- Appcelerator bootstrap

Writing Views
-------------

The main view required by `main.js` is `/app/views/MainWindow.js` so we will need this view as our main window.
We need this MainWindow defined as CommonJS module. The directory for views is `/app/views` please create one if not exists.

```js
// /app/views/MainWindow.js
module.exports = function (Como) {

    var UI = Como.loadUI();

    var self = new UI.win({
        fullscreen : true,
        backgroundColor : '#bada55',
        title : 'Main Window',
        navBarHidden : false,
        exitOnClose : true
    });

    return self;
};
```

To create a Window we can use UIShortcut object factory from `Como.loadUI()` that will return the UIShortcut factory.
Other components also available such as `Ti.UI.ScrollView, Ti.UI.Button, Ti.UI.Label, etc.`. Please refer `lib/Como/UIShortcut.js`.

### Using Localization/Internationalization

To be able to localize messages we need to define the messages for each language inside `/i18n` directory under the `project root`.
Inside this folder, you will have folders for each of the supported languages in your application,
named according to the [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) standard. For example, `en` for English, is the default.
Each language contains a single XML Formatted file called `string.xml` which contains all the messages in that language.

*please refer [Internationalization Guide](http://docs.appcelerator.com/titanium/2.1/index.html#!/guide/Internationalization)*

### Create a custom UI Definition as extension to UIShortcut.js

To be able to put your UI definition inside of the UI Factory object coming from `Como.loadUI()` you can create a config file in
CommonJS module pattern in `/app/config/UIConfig.js` and it will be automatically included upon `Como.loadUI()` invocation.

The skeleton of the config is as follows:

```js
// /app/config/UIConfig.js
var myUIFactory = function (opt) {
    // UI Creation here and return the UI object
    // You CANNOT use Como.loadUI(); you have to use the native Titanium API to create UI.
};

// all your factories definition
var factories = [
    {
        // the name of the factory method
        // make sure no conflicts with existing ones
        name: 'myui',

        // the factory function
        fn: myUIFactory, // if you put in 'String' Como will try to execute Ti.UI.createString

        // callback before the factory executed; this reference will be user's options
        before: function () {
            // do before ui creation activity such as modifying user's options
        },

        // callback after the factory executed; this reference will be the ui object
        after: function () {
            // do after ui creation activity such as add child elements
        }
    }
];

// export it as factories attribute of the module
exports.factories = factories;
```

And next time you execute `var UI = Como.loadUI();` you'll be able to access `var customUI = new UI.myui(opts);`.

Writing Controllers
-------------------

To create a controller just add a `.js` in `/app/controllers`. The directory for controller is `/app/controllers` please create one if not exists.
Components created using UIShortcut factory are action aware. It means that we can straight pass action expression like this:

```js
win.on('click', 'Controller/action', param1, 'param2');
```

To define a Controller we need to use CommonJS module. We will pass Como in Constructor function and we will return the public API

```js
// /app/controllers/Test.js
module.exports = function (Como) {

    var doBtnClick = function (p) {

        // get the source of the event
        var source = this;

        alert('It\'s Clicked! p is ' + p + ' & xyz is ' + source.xyz);
    };

    // Public API
    return {
        doBtnClick : doBtnClick
    };
};
```

We can then use the public API of our Action in Controller to act as event handler of our view.
We can also pass parameters both via action parameters and component custom attributes.

UI created using `UIShortcut.js` which is accessed either via `Como.loadUI()` or `require('/lib/Como/UIShortcut')`
will have method `on(*event name*, *action/function*, *parameters*)` which is act as alias of method `addEventListener` with action aware ability.

*So you won't likely need to use `addEventListener` anymore, unless to listen event as Application Level Events (using `Ti.App.addEventListener`).*

```js
var btn = new UI.button({
    backgroundColor: '#272e12',
    color: '#fff',
    title: 'Click Me'
    width: '100dp',
    height: '40dp',
    bottom: '20dp',
    xyz: 'abc'          // custom attribute
});

// set click to doBtnClick action which expects a String paramter
btn.on('click', 'Test/doBtnClick', 'xxx');
```

### Use Action with my own custom events ?

Yes it is possible to use action API with custom events such as your own trigger custom events.
Como has an API to get the Controller Action using `Como.applyAction()` this function will return the actual Action function.


```js
var handler = Como.applyAction('Test/doFlash', 'params');

btn.on('flash', handler);
// or btn.on('flash', 'Test/doFlash', 'params');
```

### Custom Events added by UIShortcut

These events are added by UIShortcut so all components created using UIShortcut Factory will have these custom events.
And they are aware of action expression.

1. `tap` the same as `touchend` in native appcelerator event.
2. `taphod` the same as `longpress` in native appcelerator event.
*more to come in the future*

Writing Models
--------------

Models or Data Models are table representatives in local DB, since Como is using `joli` as ORM Library,
Como has a namespace for joli which is `Como.db`, it is a joli object.
The directory for model is `/app/models` please create one if not exists.

To configure your database name you can set it in `/app/config/app.js`

```js
module.exports = {

    /** db name **/
    db: 'tiapp-como',

    ...
};
```

To create a new joli model you can use the following pattern

```js
// app/models/User.js
module.exports = function (Como) {

    // define your data model
    var m = {
        /* the table name */
        table : 'user',

        /* the table columns */
        columns : {
            id:     'INTEGER PRIMARY KEY',
            nick:   'TEXT',
            name:  'TEXT'
        }
    };

    // transform it into joli model
    return new Como.db.model(m);
};
```

DO NOT forget to add your models to configuration `/app/config/app.js` in models property, put your model filename WITHOUT `.js` in the Array.

```js
module.exports = {

    /** Models to load **/
    models: [ 'User' ],

    ...
};
```

And to use it you can do the followings:

```js
// get the model, notice the parameter used is the table name of the Model.
var User = Como.db.models.get('user');

// setup a record
var aUser = {
    id: 1,
    nick: 'geekzy',
    name: 'Imam Kurniawan'
};

// create the record and insert into table
User.newRecord(aUser).save();

// select all
var users = User.all();

// select with criteria
var users = User.all({
    where : {
        'name like ?': 'Imam%'
    }
});
```

Change Log
==========

`[26/07/12]`

- Move UI Factories config out of UIShortcut.js into UIConfig.js and provide user defined extension to it.

`[25/07/12]`

- Provide addAll method to all UI created with UIShortcut module to add array of child elements into parent elements.

`[23/07/12]`

- Add on method as shortcut for addEventListener with ability of action path aware.
- Restructure UIShortcut for readibility.

`[17/07/12]`

- Move complete sample usage to another project.
- Fix to be able to put model configs as Array of String.

`[16/07/12]`

- Add parameter on extended event assignment method to remove method before add new one.
- Move remote base URL into configuration `/app/config/app.js`.
- Use new backend login script.

`[13/07/12]`

- Restructure baseline code to follow CommonJS pattern.

`[03/07/12]`

- Add download file demo using custom progress bar UI.
- Wrap ajax download/upload callback into ondatatream/onsendstream.
- Add more UI factory on `UIShortcut.js`.

`[02/07/12]`

- Fix to avoid Closure while applying action handler function.
- Move utility Function in `Como/App.js` into `Como/Utils.js`.

`[29/06/12]`

- Add Utility Module in `/lib/Como/Utils.js` to add `HTTPClient` utility.

`[26/06/12]`

- Move tablet form factor to config and Remove unused image folder.

`[25/06/12]`

- Initial Release of Como MVC Framework.

---
Como is *Copyright* &copy; 2012 by *GeekZy.Net* -
Lead Developer: Imam &lt;geekzy@gmail.com&gt;

---
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are
trademarks of Appcelerator, Inc.

Titanium is *Copyright* &copy; 2008-2012 by *Appcelerator, Inc.* All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.

