export interface NavLink {
    label: string;
    path: string;
}

export const appNavigationLinks: NavLink[] = [
    {
        label: 'Dashboard',
        path: '/'
    },
    {
        label: 'People',
        path: '/people'
    },
    {
        label: 'Projects',
        path: '/projects'
    },
    {
        label: 'Vendors',
        path: '/vendors'
    },
    {
        label: 'Your Profile',
        path: '/profile'
    }
]