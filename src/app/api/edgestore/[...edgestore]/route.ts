import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import z from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  pdfFiles: es
    .fileBucket({
      accept: ["application/pdf"],
      maxSize: 10 * 1024 * 1024,
    })
    .input(
      z.object({
        type: z.enum(["post/cv", "profile"]),
      })
    )
    // e.g. /post/my-file.jpg
    .path(({ input }) => [{ type: input.type }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
