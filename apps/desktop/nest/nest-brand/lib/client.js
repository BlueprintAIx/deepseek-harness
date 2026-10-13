window.__ModuleLoader__.load({
    id: 'nest-brand',
    factory: (require) => {
        const { jsx } = require('react/jsx-runtime')
        const brand = window.__NEST_BRAND__ ?? { name: 'Nest' }
        const initial = brand.name.trim().charAt(0).toUpperCase() || 'N'

        function Mark({ size = 24 }) {
            return jsx('svg', {
                width: size, height: size, viewBox: '0 0 32 32', 'aria-hidden': 'true',
                children: [
                    jsx('rect', { x: 0, y: 0, width: 32, height: 32, rx: 8, fill: 'currentColor', opacity: 0.12 }, 'bg'),
                    jsx('text', { x: 16, y: 21, textAnchor: 'middle', fontSize: 16, fontWeight: 600, fill: 'currentColor', children: initial }, 'letter'),
                ],
            })
        }

        function Name() {
            return jsx('span', { children: brand.name })
        }

        // The hero headline ("Into the Unknown" + "Preview") is a locale string, not a slot, and dsh refuses
        // a second dictionary for the same namespace, so it is hidden by CSS; the mark's hitbox goes with it.
        const HIDE_HERO = '[class$="_titleGroup"], [class$="_fishHitbox"] { display: none; }'

        function Nothing() {
            return null
        }

        // Nest shows sessions only: the sidebar starts in its flat mode and the new-session hero has no workspace picker.
        const VIEW_KEY = 'dsh.workspace.view.v5'
        if (localStorage.getItem(VIEW_KEY) === null) {
            localStorage.setItem(VIEW_KEY, JSON.stringify({ groupBy: 'flat', orderBy: 'updated', groupExpansion: {}, sessionOrderByAccount: {}, archivedFilter: 'default' }))
        }

        const inject = ['slots']

        function apply(ctx) {
            const style = document.createElement('style')
            style.textContent = HIDE_HERO
            document.head.appendChild(style)
            ctx.effect(() => () => style.remove(), 'nest-brand: hero')

            ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({ name: 'sidebar.brand.mark' }, Mark))
            ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({ name: 'sidebar.brand.name' }, Name))
            ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({ name: 'conversation.hero.brand.mark' }, Nothing))
            ctx.slots.inject('conversation.hero.workspace', () => ctx.slots.register({ name: 'conversation.hero.workspace' }, Nothing))
        }

        return { apply, inject }
    },
})
