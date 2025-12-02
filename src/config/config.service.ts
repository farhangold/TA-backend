export const configService = {
  getPort(): number {
    const portFromEnv = process.env.PORT;
    const port = portFromEnv ? parseInt(portFromEnv, 10) : 3000;
    return Number.isNaN(port) ? 3000 : port;
  },
};


