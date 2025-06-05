import { usePaginatedQuery } from "convex/react";

import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
const BATCH_SIZE =4;

interface  UseGetMessagesProps{
    channelId?:Id<"channels">;
    conversationId?:Id<"conversations">;
    parentMessageId?:Id<"messages">

}
export type GetMessagesReturnType= typeof api.messages.get._returnType["page"];
export const useGetMessages =({
channelId,conversationId,parentMessageId
}:UseGetMessagesProps) =>{
    const {loadMore,results,status} = usePaginatedQuery(
        api.messages.get
        ,
        {channelId,conversationId,parentMessageId},
        {initialNumItems:BATCH_SIZE});
        return {
            results,
            status,
            loadMore:()=>loadMore(BATCH_SIZE)
        }
}
 