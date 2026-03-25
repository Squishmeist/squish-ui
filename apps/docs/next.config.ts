import type { NextConfig } from "next";
import path from "path";

const workspaceRoot = path.resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: ["@squishui/web", "@squishui/mobile"],
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      "react-native": "react-native-web",
    },
    resolveExtensions: [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
    ],
  },
};

export default nextConfig;
