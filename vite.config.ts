import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: "lovable-uploads-api",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith("/api/lovable-uploads")) {
            try {
              const uploadsDir = path.resolve(process.cwd(), "public", "lovable-uploads");
              const entries = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
              const files = entries.filter((f) => /(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/i.test(f));
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(files.map((f) => `/lovable-uploads/${f}`)));
              return;
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to read lovable-uploads" }));
              return;
            }
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
