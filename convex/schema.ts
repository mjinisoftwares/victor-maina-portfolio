import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("editor")),
    profilePic: v.optional(v.string()),
    profilePicStorageId: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
    socials: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
          label: v.string(),
        })
      )
    ),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  websiteContent: defineTable({
    key: v.string(), // "main"
    content: v.any(),
    lastUpdated: v.optional(v.string()),
  }).index("by_key", ["key"]),

  tasks: defineTable({
    text: v.string(),
    isCompleted: v.optional(v.boolean()),
  }),

  comments: defineTable({
    postId: v.string(),
    userId: v.string(),
    authorName: v.string(),
    authorImage: v.optional(v.string()),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
    createdAt: v.number(),
  })
    .index("by_postId", ["postId"])
    .index("by_parentId", ["parentId"]),

  likes: defineTable({
    postId: v.optional(v.string()),
    commentId: v.optional(v.id("comments")),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_postId", ["postId"])
    .index("by_commentId", ["commentId"])
    .index("by_postId_and_userId", ["postId", "userId"])
    .index("by_commentId_and_userId", ["commentId", "userId"]),
});
