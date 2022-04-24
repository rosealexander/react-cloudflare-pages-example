export async function onRequestDelete(context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
    }
    try {
        const {env, params} = context;
        const key = params.id
        const res = await env.Posts.delete(key)
        return new Response(key, { status: 202, headers })
    } catch (error) {
        return new Response("Error: " + error, { status: 409, headers })
    }
}
