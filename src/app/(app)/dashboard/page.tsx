"use client";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = async (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.acceptMessages);
      toast.success("Messages accepted successfully");
    } catch (error) {
      toast.error("Failed to accept messages. Please try again later.");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/messages");
        setMessages(response.data.messages || []);
      } catch (error) {
        toast.error("Failed to fetch messages. Please try again later.");
      } finally {
        setIsSwitchLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session?.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchMessages, fetchAcceptMessage]);

  // handle switch change
  const handleSwitchChange = async (data: { acceptMessages: boolean }) => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(
        `Messages are now ${!acceptMessages ? "accepted" : "not accepted"}`
      );
    } catch (error) {
      toast.error(
        "Failed to update message acceptance status. Please try again."
      );
    }
  };

  if (!session || !session?.user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold">
          Please login to view your dashboard
        </h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Message Acceptance</h2>
        <form onSubmit={handleSubmit(handleSwitchChange)}>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              {...register("acceptMessages")}
            />
            <div className={`relative ${isSwitchLoading ? "opacity-50" : ""}`}>
              <div
                className={`block w-10 h-6 rounded-full ${
                  acceptMessages ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  acceptMessages ? "translate-x-full" : ""
                }`}
              ></div>
            </div>
          </label>
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isSwitchLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Messages</h2>
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((message) => (
              <li
                key={message.id}
                className="p-4 border rounded shadow-sm flex justify-between items-center"
              >
                <span>{message.content}</span>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages found.</p>
        )}
      </div>
      <div className="text-center">
        <p className="text-gray-600">
          Logged in as: {session.user.username} ({session.user.email})
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
