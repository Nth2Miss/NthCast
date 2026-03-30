export async function onRequestGet(context) {
    const { env } = context;
    
    // 从环境变量中读取，如果没有则返回空字符串（防止崩溃）
    const config = {
        key: env.PUSHER_KEY || "",
        cluster: env.PUSHER_CLUSTER || "ap1"
    };

    return new Response(JSON.stringify(config), {
        headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600" // 增加缓存以提升性能
        }
    });
}