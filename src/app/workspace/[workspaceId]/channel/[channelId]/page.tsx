"use client";

import { useGetChannelById } from "@/features/channels/api/use-get-channel-by-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import ChannelHeader from "./header";
import { ChatInput } from "./chat-input";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const { data: channel, isLoading: channelLoading } = useGetChannelById({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div className="h-full flex-1  flex flex-col items-center justify-center  gap-y-2">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!channel) {
    return (
      <div className="h-full flex-1  flex flex-col items-center justify-center  gap-y-2">
        <TriangleAlert className="size-5  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ChannelHeader name={channel?.name} />
      <div className="flex-1"/>
      <ChatInput placeholder={`Message # ${channel.name}`}/>
    </div>
  );
};
export default ChannelIdPage;
