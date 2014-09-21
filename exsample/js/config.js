require.config({
    baseUrl: 'js/',
    hbs: {
        disableHelpers: true,
        disableI18n: true,
        templateExtension: 'html'
    },
    paths: {
        main: 'main',
        jquery: 'jquery',
        bootstrap: 'bootstrap.min',
        yourwayjs:"yourwayjs/yourwayjs",
        helper:"yourwayjs/helper",
        history:"yourwayjs/history.min",
        touch:"yourwayjs/jquery.touch.min",
        myRouts:"yourwayjs/myRouts",
        hbs: 'require-handlebars-plugin/hbs',
        json2: 'require-handlebars-plugin/hbs/json2',
        i18nprecompile: 'require-handlebars-plugin/hbs/i18nprecompile',
        handlebars: 'require-handlebars-plugin/hbs/handlebars',
        validate:"jquery.validate"
    },
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        },
        validate: {
            deps: [
                'jquery'
            ],
          
        },
        yourwayjs:{
            deps: [
                'jquery',
                'history',
                'touch',
                'helper'
            ],
          
        },
        
        history:{
            deps: [
                'jquery',
            ],
        },
        helper:{
            deps: [
                'jquery',
            ],
        },
        myRouts:{
            deps: [
                'jquery',
                'yourwayjs'
            ],
        },
        touch:{
            deps: [
                'jquery',
            ],
        }
    },

    packages: [

    ]
});
require(['main'], function() {});