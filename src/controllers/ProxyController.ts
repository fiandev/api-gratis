import { Request, Response } from "express";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { request } from "../utils/request";

export default class ProxyController {
    static resources = [
        "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/*.txt",
        "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-*.txt",
        "https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/*.txt",
        "https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/*/data.txt",
        "https://raw.githubusercontent.com/prxchk/proxy-list/main/*.txt",
        "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/*_proxies.txt",
        "https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/*.txt",
        "https://api.proxyscrape.com/v2/?request=getproxies&protocol=*&country=all&ssl=all&anonymity=all",
        "https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/*.txt",
    ];

    static async index(req: Request, res: Response): Promise<void> {
        const protocol = req.params.protocol || "http";

        if (!/http(s)?/.test(protocol)) {
            res.json({ status: "error", message: "invalid type of protocol" });
            return void 0;
        }

        let isRunning = true;

        while (isRunning) {
            for (const resource of ProxyController.resources) {
                const resourceURL = resource.replace("*", protocol);
                const xhr = await request(resourceURL, {
                    method: "get",
                });

                if (xhr.content) {
                    const proxies = xhr.content.split("\n").map((v: string) => v.trim()).filter((v: string) => !!v);
                    for (const proxy of proxies) {
                        const proxyURL = `${ protocol }://${proxy}`;
                        const proxyAgent = new HttpsProxyAgent(proxyURL);
                        const TEST_URL = "https://example.com/";

                        const proxyXhr = await request(TEST_URL, {
                            method: "head",
                            agent: proxyAgent,
                        });
                        if (proxyXhr.response?.status === 200) {
                            console.log("[serve]: ", proxyURL);
                            res.redirect(proxyURL);
                            
                            break;
                        }
                        break;
                    }

                    isRunning = false;
                    break;
                }
            }
        }
    }
}
