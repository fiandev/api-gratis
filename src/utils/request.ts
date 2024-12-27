import { HttpsProxyAgent } from 'https-proxy-agent';

type OptionParams = {
    method: string,
    agent?: HttpsProxyAgent<any>;
};

const defaultOptions: OptionParams = {
    method: "GET",
    agent: null,
};

export async function request(url: string, options: OptionParams = defaultOptions): Promise<any> {
    let response = null;
    let content = null;
    
    try {
        response = await fetch(url, {
            ...options,
        });
    
        content = await response.text();
    } catch (error) {
        
    }

    return {
        response: response,
        content: content,
    };
}
