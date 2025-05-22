"use client";

import { useGetChannelById } from "@/features/channels/api/use-get-channel-by-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import ChannelHeader from "./header";
import { ChatInput } from "./chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-message";
import { MessageList } from "@/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const {results,loadMore,status} =useGetMessages({channelId})
  const { data: channel, isLoading: channelLoading } = useGetChannelById({
    id: channelId,
  });
  console.log("results for messages",results);
  

  if (channelLoading || status === "LoadingFirstPage") {
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
     <MessageList
      channelName={channel.name} 
      channelCreationTime={channel._creationTime}
      data = {results}
      loadMore={loadMore}
      isLoadingMore={status === "LoadingMore"}
       canLoadMore={status === "CanLoadMore"}
     
     />
      <ChatInput placeholder={`Message # ${channel.name}`}/>
    </div>
  );
};
export default ChannelIdPage;
