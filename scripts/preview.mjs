process.env.PORT ||= process.env.PORTFOLIO_PORT || "4173";
process.env.HOST ||= "127.0.0.1";
await import("../.output/server/index.mjs");
