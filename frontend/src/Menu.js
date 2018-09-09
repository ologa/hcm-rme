const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Single View',
        path: 'singleview',
        icon: 'icon-grid',
        translate: 'sidebar.nav.SINGLEVIEW'
    },
    {
        name: 'Menu',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.MENU',
        label: {value: 1, color: 'info'},
        submenu: [{
            name: 'Submenu',
            translate: 'sidebar.nav.SUBMENU',
            path: 'submenu'
        }]
    },
    {
        name: 'Pacientes',
        icon: 'icon-people',
        translate: 'sidebar.nav.MENU',
        submenu: [{
            name: 'Todos',
            translate: 'sidebar.nav.SUBMENU',
            path: 'patients'
        }, {
            name: 'Cadastro',
            translate: 'sidebar.nav.SUBMENU',
            path: 'patient/new'
        }]
    }
];

export default Menu;
