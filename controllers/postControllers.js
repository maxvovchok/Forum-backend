// const Post = require("../model/postModel");
// const Topic = require("../model/topicModel");

// // Створення поста (тільки для користувачів)
// exports.createPost = async (req, res) => {
//   try {
//     const { content, topicId } = req.body;

//     const topic = await Topic.findById(topicId);
//     if (!topic) {
//       return res.status(404).json({ message: "Topic not found" });
//     }

//     const newPost = await Post.create({
//       content,
//       createdBy: req.user._id, // користувач, який створив пост
//       topic: topicId,
//     });

//     res.status(201).json({
//       message: "Post created successfully",
//       post: newPost,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Отримати всі пости для конкретної теми
// exports.getPostsForTopic = async (req, res) => {
//   try {
//     const { topicId } = req.params;

//     const posts = await Post.find({ topic: topicId }).populate(
//       "createdBy",
//       "name email"
//     );

//     res.status(200).json({
//       message: "Success",
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Видалення поста (тільки для власника поста або admin)
// exports.deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     if (
//       post.createdBy.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You don't have permission to delete this post" });
//     }

//     await post.remove();

//     res.status(204).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
