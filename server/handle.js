import serverless from "serverless-http";
import server from "./server"; // Ajuste o caminho conforme necessário

export const handler = serverless(server);
