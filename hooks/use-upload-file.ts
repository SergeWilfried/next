import * as React from "react"
import type { UploadedFile } from "@/types"

import { getErrorMessage } from "@/lib/handle-error"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { uploadFiles } from "@/lib/uploadthing"
import { UploadFilesOptions } from "uploadthing/types"
import { toast } from "sonner"


interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: UploadedFile[]
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], headers, onUploadBegin, onUploadProgress, skipPolling }: UseUploadFileProps
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles)
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)

  async function onUpload(files: File[]) {
    setIsUploading(true)
    try {
      const res = await uploadFiles(endpoint, {
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file]: progress ?? 0,
            }
          })
        },
      })

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res))
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  }
}