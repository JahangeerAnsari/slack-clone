import { useCreateChannel } from "@/features/channels/api/use-create-channel";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"),{ssr:false})
interface ChatInputProps{
    placeholder:string
}
export const ChatInput = ({placeholder}:ChatInputProps) =>{
    const [editorKey,setEditorKey]= useState(0);
    const[isPending, setIsPending] =useState(false)
    const workspaceId = useWorkspaceId();
    const channelId = useChannelId()
    const {mutate:createMessage} =useCreateMessage()
    const editorRef = useRef<Quill | null>(null);
    const handleSubmit= async ({body, image}:{
        body:string;
        image:File | null
    }) => {
try {
    setIsPending(true)
  await   createMessage({
    workspaceId,
    channelId,
    body
 },{throwError:true});
 // we cannot directly pass the image to it

//  everytime we set the value and the key value change editor will
// be re-render and set the defaul value
setEditorKey ((prev) => prev +1)
} catch (error) {
     toast.error("Failed to send message")
}finally{
setIsPending(false)
}

    }
    return (
        <div className="px-5 w-full">
            <Editor 
            key={editorKey}
            variant="create"
             placeholder={placeholder}
             onSubmit={handleSubmit}
             disabled={isPending}
             innerRef={editorRef}
            />
        </div>
    )
}
