import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// Helper to get authenticated user details
async function getAuthUser(ctx: any) {
  try {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (authUser) {
      const profile = await ctx.db
        .query("users")
        .withIndex("by_userId", (q: any) => q.eq("userId", authUser._id))
        .unique();
      return {
        userId: authUser._id as string,
        name: profile?.name || authUser.name || "Anonymous User",
        image: profile?.profilePic || authUser.image || undefined,
        role: profile?.role || "user",
      };
    }

    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      const profile = await ctx.db
        .query("users")
        .withIndex("by_userId", (q: any) => q.eq("userId", identity.subject))
        .unique();
      return {
        userId: identity.subject as string,
        name: profile?.name || identity.name || "Anonymous User",
        image: profile?.profilePic || identity.picture || undefined,
        role: profile?.role || "user",
      };
    }
  } catch (err) {
    console.error("Auth user lookup error:", err);
  }

  return null;
}

export const getComments = query({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUser(ctx);
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .collect();

    // Fetch likes for each comment and enrich comment data
    const enrichedComments = await Promise.all(
      comments.map(async (comment) => {
        const commentLikes = await ctx.db
          .query("likes")
          .withIndex("by_commentId", (q) => q.eq("commentId", comment._id))
          .collect();

        const isLiked = user
          ? commentLikes.some((l) => l.userId === user.userId)
          : false;

        return {
          ...comment,
          likesCount: commentLikes.length,
          isLiked,
        };
      })
    );

    return enrichedComments;
  },
});

export const addComment = mutation({
  args: {
    postId: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized: You must be logged in to leave a comment.");
    }

    const trimmedContent = args.content.trim();
    if (!trimmedContent) {
      throw new Error("Comment content cannot be empty.");
    }

    // If parentId is specified, verify the parent comment exists
    if (args.parentId) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent) {
        throw new Error("Parent comment not found.");
      }
    }

    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      userId: user.userId,
      authorName: user.name,
      authorImage: user.image,
      content: trimmedContent,
      parentId: args.parentId,
      createdAt: Date.now(),
    });

    return commentId;
  },
});

export const removeComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized: You must be logged in to delete a comment.");
    }

    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found.");
    }

    // Only author or admin can delete comment
    if (comment.userId !== user.userId && user.role !== "admin") {
      throw new Error("Forbidden: You can only delete your own comments.");
    }

    // Delete associated likes for this comment
    const commentLikes = await ctx.db
      .query("likes")
      .withIndex("by_commentId", (q) => q.eq("commentId", args.commentId))
      .collect();
    for (const like of commentLikes) {
      await ctx.db.delete(like._id);
    }

    // Recursively delete child replies or remove comment
    const replies = await ctx.db
      .query("comments")
      .withIndex("by_parentId", (q) => q.eq("parentId", args.commentId))
      .collect();

    for (const reply of replies) {
      // Delete reply likes
      const replyLikes = await ctx.db
        .query("likes")
        .withIndex("by_commentId", (q) => q.eq("commentId", reply._id))
        .collect();
      for (const like of replyLikes) {
        await ctx.db.delete(like._id);
      }
      await ctx.db.delete(reply._id);
    }

    await ctx.db.delete(args.commentId);

    return { success: true };
  },
});
