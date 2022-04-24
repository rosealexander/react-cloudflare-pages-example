import {uid} from "uid";

export async function onRequestGet(context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
    }
    try {
        const {env} = context;
        const postListRes = await env.Posts.list()
        const postsPromise = postListRes.keys.flatMap(async (c) => {
            try {
                const post = JSON.parse(await env.Posts.get(c.name))
                post.key = c.name
                return post
            }
            catch (error) {
                return null
            }
        })
        const body = JSON.stringify((await Promise.all(postsPromise)).filter(c => !!c))
        return new Response(body, { status: 200, headers })
    }
    catch (error) {
        return new Response('Error: ' + error, { status: 404, headers })
    }
}

export async function onRequestPost(context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
    }
    try {
        const {env, request} = context;
        const body = request.body
        const key = uid()
        const res = await env.Posts.put(key, body, {expirationTtl: `${3*60*60}`})
        return new Response(key, { status: 200, headers })
    } catch (error) {
        return new Response("Error: " + error, { status: 400, headers })
    }
}
