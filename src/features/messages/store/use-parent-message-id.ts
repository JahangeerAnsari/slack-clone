import {  useQueryState } from "nuqs";
import { useState } from "react";


export const useParentMessageId = () =>{
    const [parentMessageId,setParentMessageId]=useState(null);
    return useQueryState("parentMessageId")
}