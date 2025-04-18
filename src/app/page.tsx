"use client";

import UserButton from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const { onOpen, isOpen } = useStoreModal();
  const router = useRouter()
   
  /* we want to get the workspaceId
   if workspaces id is then redirect to workspace/id page
   else open workspace model
  */
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  useEffect(() => {
    if (isLoading) return 
    if (workspaceId) {
      console.log("Redirect to the workspace/id page");
      // router replace dont take back to the router but push does
      router.replace(`/workspace/${workspaceId}`)
       
    } else if (!isOpen) {
      console.log("Open workspace model;");
      onOpen("createWorkspaces");
    }
  },[workspaceId, isLoading,onOpen])
  return (
    <div>
      <UserButton />
    </div>
  );
}
 