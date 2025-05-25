import UserModel from "@/model/User";
import connectDB from "@/lib/dbConnect";
import { MessageSchema } from "@/schemas/messageSchema";

export async function POST(request: Request) {
  await connectDB();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne(
      { username },
      {
        $push: { messages: newMessage },
      },
      { new: true }
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }
    // is user accepting messages?
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }
    const newMessage = new MessageSchema({
      content,
      createdAt: new Date(),
    });

    user.messages.push(newMessage);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}
