
Ext.define('Admin.view.home.Home',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Admin.view.home.HomeController',
        'Admin.view.home.HomeModel'
    ],

    controller: 'home-home',
    viewModel: {
        type: 'home-home'
    },

    html: 'Hello, World!!'
});
