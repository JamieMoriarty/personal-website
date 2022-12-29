import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
import * as fs from "fs";

const localEnv = dotenv.parse(fs.readFileSync("./.env.local"));

const URL = process.env.VITE_CMS_URL ?? localEnv.VITE_CMS_URL;
const TOKEN = process.env.VITE_CMS_TOKEN ?? localEnv.VITE_CMS_TOKEN;

console.log(URL, TOKEN);

const config: CodegenConfig = {
  schema: {
    [URL]: {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  },
  documents: ["src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
