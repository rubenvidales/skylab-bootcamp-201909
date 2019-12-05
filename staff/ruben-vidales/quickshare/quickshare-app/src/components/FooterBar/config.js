export default [
    {
        name: 'playlist',
        path: '/playlist',
        icon :'fas fa-list-ul fa-2x',
        visibility: {
            playlist: false,
            favs: true,
            player: true,
            channels: true
        }
    },
    {
        name: 'favs',
        path: '/favs',
        icon: 'fas fa-heart fa-2x',
        visibility: {
            playlist: true,
            favs: false,
            player: true,
            channels: true
        }
    },
    {
        name: 'player',
        path: '/player',
        icon: 'far fa-play-circle fa-2x',
        visibility: {
            playlist: true,
            favs: true,
            player: false,
            channels: true
        }
    },
    {
        name: 'channels',
        path: '/channels',
        icon: 'fas fa-podcast fa-2x',
        visibility: {
            playlist: true,
            favs: true,
            player: true,
            channels: false
        }
    }
]


