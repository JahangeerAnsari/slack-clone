import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
type RequestType = { name: string };
// we know what actually it return
type ResponseType = Id<"workspaces"> | null;
// i want to show mutaion means what happend onsuccss onerror onsettle
type Options = {
    onSuccess?: (data:ResponseType) => void;
    onError?: (error:Error) => void;
    // not error or not suceess
    onSettled?: () => void;
    throwError?:boolean
}
export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    // const [isPending, setIsPending] = useState(false);
    // const [isError, setIsError] = useState(false);
    // const [iseSettled, setIsSettled] = useState(false);
    // const[isSuccess,setIsSuccess] = useState(false)
    // we have better approach for above
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);
    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const iseSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.workspaces.create);
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending")
            const response = await mutation(values);
            console.log("response ====>", response);
            
            options?.onSuccess?.(response)
        } catch (error) {
            options?.onError?.(error as Error);
            if (options?.throwError) {
                throw error
            }
        } finally {
           setStatus("settled")
            options?.onSettled?.()
        }
    }, [mutation]);
    return {
        mutate,
        data,
        error,
        isError,
        isPending,
        isSuccess,
        iseSettled
    }
}