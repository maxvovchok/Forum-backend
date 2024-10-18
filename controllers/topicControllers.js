// const Topic = require("../model/topicModel"); // модель для теми

// // Створення теми (доступно лише для admin)
// exports.createTopic = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     const newTopic = await Topic.create({
//       title,
//       description,
//       createdBy: req.user._id, // користувач, який створив тему
//     });

//     res.status(201).json({
//       message: "Topic created successfully",
//       topic: newTopic,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Отримати всі теми (для всіх користувачів, включаючи гостей)
// exports.getAllTopics = async (req, res) => {
//   try {
//     const topics = await Topic.find().populate("createdBy", "name email"); // Популяція автора теми

//     res.status(200).json({
//       message: "Success",
//       topics,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Отримати конкретну тему (для всіх)
// exports.getTopic = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const topic = await Topic.findById(id).populate("createdBy", "name email");

//     if (!topic) {
//       return res.status(404).json({ message: "Topic not found" });
//     }

//     res.status(200).json({
//       message: "Success",
//       topic,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Видалення теми (тільки для admin)
// exports.deleteTopic = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const topic = await Topic.findById(id);

//     if (!topic) {
//       return res.status(404).json({ message: "Topic not found" });
//     }

//     await topic.remove();

//     res.status(204).json({
//       message: "Topic deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
