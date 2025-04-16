// apps/app/orval.config.ts

const config = {
  eventApi: {
    input: "../api/openapi.json",
    output: {
      mode: "single",
      target: "./src/api/generated/api.ts",
      schemas: "./src/api/generated/schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/client.ts",
          name: "customInstance",
        },
      },
    },
  },
};

export default config;
