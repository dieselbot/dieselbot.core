const drift_access_token = process.env.DRIFT_ACCESS_TOKEN;

class DriftAPI {
    send(conversation_id, message){
        return fetch(`https://driftapi.com/conversations/${conversation_id}/messages`, {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${drift_access_token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                type: "chat",
                body: message
            })
        }).then(async res => {
            if(!res.ok){
                const message = await res.text();
                console.warn(message)
            }
            return await res.json();
        })
    }
}

module.exports = DriftAPI