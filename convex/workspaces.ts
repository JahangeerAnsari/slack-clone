import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
const generateCode = () =>{
  const code = Array.from(
    {length:6},
    () =>
      "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
}
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const joinCode = generateCode();
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode,
      userId,
    });
     await ctx.db.insert("members",{
      userId,
      workspaceId,
      role:"admin"
     })
    // const workspace = await ctx.db.get(workspaceId);
    // we can get the details of workspace
    return workspaceId;
    // every time we create docs in convex it return id of the docs
  },
  
  });
export const get = query({
  args: {},
  handler: async (ctx) => {
     const userId = await auth.getUserId(ctx);
     if(!userId){
      return []
     }
    //  get all the members where this user part of
    const members = await ctx.db.query("members").withIndex("by_user_id",(q) => q.eq("userId",userId)).collect()
    const workspacesIds = members.map((member) => member.workspaceId);
    const workspaces = [];
    for(const workspaceId of workspacesIds){
      const workspace = await ctx.db.get(workspaceId);
       if(workspace){
        workspaces.push(workspace)
       }
    }
    return workspaces;
  },
});
export const getWorkspaceById = query({
  args: {id:v.id('workspaces')},
  handler: async (ctx,args) => {
      const userId = await auth.getUserId(ctx);
      if (!userId) {
           throw new Error("Unauthrozed")

      }
      const members = await ctx.db.query("members")
      .withIndex("by_workspace_id_user_id",(q) => 
      q.eq("workspaceId",args.id).eq("userId",userId),
      ).unique();
      if(!members){
        return null;
      }
      return await ctx.db.get(args.id)
  },
});