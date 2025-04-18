"use client";

import { useEffect, useState } from "react";
import CreateWorkspacesModal from "../modals/create-workspaces-modal";
// we need to prevent the un-necessary re-rendring the modal

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
         setIsMounted(true); 
    }, [])
    if (!isMounted) {
         return null
     }
    return ( 
        <>
        <CreateWorkspacesModal/>
        </>
     );
}
 
export default ModalProvider;