import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

// Endpoint to directly serve Convex storage files
http.route({
  pathPrefix: "/api/storage/",
  method: "GET",
  handler: httpAction(async (ctx, req) => {
    const { pathname } = new URL(req.url);
    const storageId = pathname.replace("/api/storage/", "").trim();
    if (!storageId) {
      return new Response("Missing storageId", { status: 400 });
    }

    try {
      const blob = await ctx.storage.get(storageId as any);
      if (!blob) {
        return new Response("File not found", { status: 404 });
      }

      return new Response(blob, {
        status: 200,
        headers: {
          "Content-Type": blob.type || "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err: any) {
      return new Response("Error retrieving file", { status: 500 });
    }
  }),
});

export default http;