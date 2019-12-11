//Hide the favs compo to improve in future features
export default [
    {
        name: 'playlist',
        path: '/playlist',
        icon :'fas fa-list-ul fa-2x',
        visibility: {
            playlist: false,
            favs: false,
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
            favs: false,
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
            favs: false,
            player: true,
            channels: false
        }
    }
]


