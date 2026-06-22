import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import axios from "axios";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tiktok: router({
    download: publicProcedure
      .input(z.object({ url: z.string().url() }))
      .mutation(async ({ input }) => {
        try {
          // Validate TikTok URL
          const tiktokUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)\/(\S+)/i;
          if (!tiktokUrlRegex.test(input.url)) {
            throw new Error("Invalid TikTok URL");
          }

          // Fetch video data from tikwm.com
          const response = await axios.get("https://www.tikwm.com/api/", {
            params: {
              url: input.url,
              hd: 1, // Request HD quality
            },
            timeout: 15000,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
          });

          // Check if API returned success
          if (response.data.code !== 0) {
            throw new Error(response.data.msg || "Failed to fetch video");
          }

          const videoData = response.data.data;
          if (!videoData) {
            throw new Error("No video data found");
          }

          // Extract video download URL (prefer no watermark version)
          const downloadUrl = videoData.download || videoData.play;
          if (!downloadUrl) {
            throw new Error("No video download URL available");
          }

          return {
            success: true,
            videoUrl: downloadUrl,
            title: videoData.title || "TikTok Video",
            cover: videoData.cover || videoData.dynamic_cover,
            author: videoData.author?.nickname || "Unknown",
            desc: videoData.desc || "",
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch video";
          throw new Error(message);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
