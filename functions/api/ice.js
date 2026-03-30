export async function onRequestGet(context) {
    const { env } = context;
    const id = env.Turn_id;
    const token = env.Turn_token;

    if (!id || !token) {
        return new Response(JSON.stringify({ error: "环境变量 Turn_id 或 Turn_token 缺失" }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }

    const url = `https://rtc.live.cloudflare.com/v1/turn/keys/${id}/credentials/generate-ice-servers`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            // 发送空对象作为 Body
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(JSON.stringify({ error: `CF API 报错: ${response.status}`, detail: errorText }), { 
                status: response.status, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

        const data = await response.json();
        
        // 直接返回包含 { "iceServers": [...] } 的对象
        return new Response(JSON.stringify(data), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Fetch 异常: " + e.message }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}