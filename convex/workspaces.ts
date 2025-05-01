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
  // join workspace we need workspaceId and the generated code
  export const join = mutation({
    args:{
      joinCode:v.string(),
      workspaceId:v.id("workspaces")
    },
    handler : async (ctx, args) =>{
      const userId = await auth.getUserId(ctx);
      if (!userId) {
        throw new Error("Unauthorized");
      }
      const workspace = await ctx.db.get(args.workspaceId);
      if(!workspace){
        throw new Error("Workspace not found")
      }

      if(workspace.joinCode !== args.joinCode){
        throw new Error("Invalid join Code")
      };
// we fint the person
  const existingMember = await ctx.db.query("members")
  .withIndex("by_workspace_id_user_id",(q) => 
    q.eq("workspaceId",args.workspaceId).eq("userId",userId),
    ).unique();
     if(existingMember){
      throw new Error("Already a member of this workspace")
     }
    //  we add new member with this workspace
    await ctx.db.insert("members",{
      userId,
      workspaceId:workspace._id,
      role:"member"
    })
return workspace._id
    }
  })
  // GET NEW JOINCODE
export const newJoinCode = mutation({
  args:{
    workspaceId:v.id("workspaces")
  },
  handler :async(ctx, args) =>{
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const member = await ctx.db.query("members")
      .withIndex("by_workspace_id_user_id",(q) => 
      q.eq("workspaceId",args.workspaceId).eq("userId",userId),
      ).unique();

      if(!member || member.role !=="admin"){
        throw new Error("Unauthorized")
      }
   const joinCode = generateCode();
   await ctx.db.patch(args.workspaceId,{joinCode});
   return args.workspaceId
  }
})
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
    //  whenever we create an workspace by default we create channel
    await ctx.db.insert("channels",{
      name:"general",
      workspaceId
    })
    // const workspace = await ctx.db.get(workspaceId);
    // we can get the details of workspace
    return workspaceId;
    // every time we create docs in convex it return id of the docs
  },
  
  });
  // GET_USERBY_ID
  
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
export const getInfoById = query({
  args: { id: v.id("workspaces") },
  handler: async(ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();
    const workspace = await ctx.db.get(args.id);
    return {
      name: workspace?.name,
      isMember: !!member
    }
  }
})
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

export const update = mutation({
  args: {
      id: v.id("workspaces"),
      name:v.string(),
  },
  handler: async (ctx, args) => {
       const userId = await auth.getUserId(ctx);
       if (!userId) {
         throw new Error("Unauthorized");
      }
       const member = await ctx.db
         .query("members")
         .withIndex("by_workspace_id_user_id", (q) =>
           q.eq("workspaceId", args.id).eq("userId", userId)
         )
         .unique();
      if (!member || member.role !== "admin") {
          throw new Error("Unauthorized")
      }
      await ctx.db.patch(args.id, { name: args.name });
      return args.id
  }
})
export const deleteWorkspace = mutation({
  args:{id:v.id("workspaces")
  },
  handler: async(ctx, args) =>{
  const userId = await auth.getUserId(ctx);
    if(!userId){
      throw new Error("Unauthrozed")
    }

   const member = await ctx.db.query("members")
   .withIndex("by_workspace_id_user_id",(q) => q.eq("workspaceId", args.id).eq("userId",userId)).unique();
   
   if(!member || member.role !=="admin"){
    throw new Error("Unauthorized")
   }
  // once we delete workspace we have to delete associate members also
  const [members] = await Promise.all([ctx.db.query("members")

    .withIndex("by_workspace_id",(q) => q.eq("workspaceId", args.id)).collect()
  ])
   for(const member of members){
    await ctx.db.delete(member._id)
   }
   await ctx.db.delete(args.id)
   return args.id
  }
 
})
