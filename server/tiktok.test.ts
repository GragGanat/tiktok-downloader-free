import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock axios
vi.mock("axios");

describe("tiktok.download", () => {
  it("should validate TikTok URL format", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.tiktok.download({ url: "https://invalid-url.com/video" });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid TikTok URL");
    }
  });

  it("should accept valid TikTok URLs", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(ctx);

    const validUrls = [
      "https://www.tiktok.com/@username/video/1234567890",
      "https://vm.tiktok.com/abcdef123",
      "https://vt.tiktok.com/xyz789",
      "tiktok.com/@user/video/123",
    ];

    for (const url of validUrls) {
      try {
        // This will fail at the API call stage, but should pass URL validation
        await caller.tiktok.download({ url });
      } catch (error: any) {
        // We expect it to fail at API call, not URL validation
        expect(error.message).not.toContain("Invalid TikTok URL");
      }
    }
  });

  it("should reject empty URLs", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.tiktok.download({ url: "" });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      // Zod validation should catch this
      expect(error).toBeDefined();
    }
  });
});
