import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.error(err);
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { idx: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        // I sent you the Message
        { senderId: myId, receiverId: userToChatId },
        // You sent me the Message
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.error(err);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { idx: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    //Upload the Image to the Cloudinary
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

export const getChatPatners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find all the messages where logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPatnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPatners = await User.find({
      _id: { $in: chatPatnersIds },
    }).select("-password");
    res.status(200).json(chatPatners);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};
