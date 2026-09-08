import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

async function getAuthUserId(ctx: any) {
  try {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (authUser) {
      return authUser._id as string;
    }
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      return identity.subject as string;
    }
  } catch (err) {
    console.error("Auth user lookup error:", err);
  }
  return null;
}

export const getPostLikes = query({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .collect();

    const isLiked = userId ? likes.some((l) => l.userId === userId) : false;

    return {
      likesCount: likes.length,
      isLiked,
    };
  },
});

export const togglePostLike = mutation({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized: You must be logged in to like a post.");
    }

    const existingLikes = await ctx.db
      .query("likes")
      .withIndex("by_postId_and_userId", (q) =>
        q.eq("postId", args.postId).eq("userId", userId)
      )
      .collect();

    if (existingLikes.length > 0) {
      // Remove all existing likes for this user and post (unlike)
      for (const like of existingLikes) {
        await ctx.db.delete(like._id);
      }
      return { isLiked: false };
    } else {
      // Add a single like (like once)
      await ctx.db.insert("likes", {
        postId: args.postId,
        userId: userId,
        createdAt: Date.now(),
      });
      return { isLiked: true };
    }
  },
});

export const toggleCommentLike = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized: You must be logged in to like a comment.");
    }

    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found.");
    }

    const existingLikes = await ctx.db
      .query("likes")
      .withIndex("by_commentId_and_userId", (q) =>
        q.eq("commentId", args.commentId).eq("userId", userId)
      )
      .collect();

    if (existingLikes.length > 0) {
      for (const like of existingLikes) {
        await ctx.db.delete(like._id);
      }
      return { isLiked: false };
    } else {
      await ctx.db.insert("likes", {
        commentId: args.commentId,
        userId: userId,
        createdAt: Date.now(),
      });
      return { isLiked: true };
    }
  },
});
