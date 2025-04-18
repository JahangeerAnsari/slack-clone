import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const joinCode = "1234567";
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode,
      userId,
    });
    // const workspace = await ctx.db.get(workspaceId);
    // we can get the details of workspace
    return workspaceId;
    // every time we create docs in convex it return id of the docs
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
export const getWorkspaceById = query({
  args: {id:v.id('workspaces')},
  handler: async (ctx,args) => {
      const userId = await auth.getUserId(ctx);
      if (!userId) {
           throw new Error("Unauthrozed")

      }
      return await ctx.db.get(args.id)
  },
});