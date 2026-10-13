import Schema from '@deepseek-ai/schemastery'

export const name = 'nest-brand'
export const inject = ['webServer']

export const Config = Schema.object({
    name: Schema.string().required().description('brand name shown in the sidebar and hero'),
})

export function apply(ctx, config) {
    ctx.on('webserver/index-inject', (table) => {
        table.push({ kind: 'global', name: '__NEST_BRAND__', value: { name: config.name } })
    })
}
