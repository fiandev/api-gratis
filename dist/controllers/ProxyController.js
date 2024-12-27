"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_proxy_agent_1 = require("https-proxy-agent");
const request_1 = require("../utils/request");
class ProxyController {
    static async index(req, res) {
        var _a;
        const protocol = req.params.protocol || "http";
        if (!/http(s)?/.test(protocol)) {
            res.json({ status: "error", message: "invalid type of protocol" });
            return void 0;
        }
        let isRunning = true;
        while (isRunning) {
            for (const resource of ProxyController.resources) {
                const resourceURL = resource.replace("*", protocol);
                const xhr = await (0, request_1.request)(resourceURL, {
                    method: "get",
                });
                if (xhr.content) {
                    const proxies = xhr.content.split("\n").map((v) => v.trim()).filter((v) => !!v);
                    for (const proxy of proxies) {
                        const proxyURL = `${protocol}://${proxy}`;
                        const proxyAgent = new https_proxy_agent_1.HttpsProxyAgent(proxyURL);
                        const TEST_URL = "https://example.com/";
                        const proxyXhr = await (0, request_1.request)(TEST_URL, {
                            method: "head",
                            agent: proxyAgent,
                        });
                        if (((_a = proxyXhr.response) === null || _a === void 0 ? void 0 : _a.status) === 200) {
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
exports.default = ProxyController;
ProxyController.resources = [
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
//# sourceMappingURL=ProxyController.js.map