import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useCallback, useMemo, useState } from "react";
type ResponseType = string| null;
// i want to show mutaion means what happend onsuccss onerror onsettle
type Options = {
    onSuccess?: (data:ResponseType) => void;
    onError?: (error:Error) => void;
    // not error or not suceess
    onSettled?: () => void;
    throwError?:boolean
}
export const useGenerateUploadUrl = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
  
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);
    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const iseSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.upload.generateUploadUrl);
    const mutate = useCallback(async (_values: {}, options?: Options): Promise<ResponseType> => {
    try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation();
        setData(response); // optionally store the response
        setStatus("success");

        options?.onSuccess?.(response);
        return response; // ✅ returning response
    } catch (error) {
        setStatus("error");
        setError(error as Error);

        options?.onError?.(error as Error);
        if (options?.throwError) {
            throw error;
        }
        return null; // ✅ consistent return
    } finally {
        setStatus("settled");
        options?.onSettled?.();
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