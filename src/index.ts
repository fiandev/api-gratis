import { app } from "./app";

const port = app.get("port");
let server: any;


try {
    server = app.listen(port, onListening);

    function onListening() {
        const addr = server.address();
        const bind =
            typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

} catch (error) {

}

export default server;
