export async function onRequestPost(context) {
    const { env, request } = context;
    const formData = await request.formData();
    
    const socketId = formData.get("socket_id");
    const channelName = formData.get("channel_name");

    if (!socketId || !channelName) {
        return new Response("Missing parameters", { status: 400 });
    }

    const stringToSign = `${socketId}:${channelName}`;
    const secret = env.PUSHER_SECRET;
    const key = env.PUSHER_KEY;

// 使用 Web Crypto API 进行 HMAC-SHA256 签名
    try {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const msgData = encoder.encode(stringToSign);

        const cryptoKey = await crypto.subtle.importKey(
            "raw", 
            keyData, 
            { name: "HMAC", hash: "SHA-256" }, 
            false, 
            ["sign"]
        );

        const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
        const signatureArray = Array.from(new Uint8Array(signatureBuffer));
        const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const response = { auth: `${key}:${signatureHex}` };

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "加密签名失败" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}