import React, { memo, useCallback } from "react";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "../lib/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveFile } from "../api-client/save-file";
import { FileUploader } from "@/components/upload/multi-file";

function UploadFile({
  isUIUploadFile,
  handlesetUIUploadFile,
}: {
  isUIUploadFile: boolean;
  handlesetUIUploadFile: VoidFunction;
}) {
  const queryClient = useQueryClient();
  const { edgestore } = useEdgeStore();

  const mutionSaveFile = useMutation({
    mutationFn: saveFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cv"],
      });
    },
  });

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.pdfFiles.upload({
        file,
        signal,
        input: { type: "post/cv" },
        options: {
          manualFileName: file.name,
        },
        onProgressChange,
      });

      mutionSaveFile.mutate({
        url: res.url,
        name: file.name,
      });

      return res;
    },
    [edgestore]
  );

  return (
    <div
      className={`${
        isUIUploadFile ? "scale-y-100 scale-x-100" : "scale-y-0 scale-x-0"
      } origin-center duration-700 transition-all hidden lg:block overflow-y-auto outline-3 outline-offset-2 outline-double p-4 absolute bg-white w-[80%] h-[calc(100vh-50px)] z-50 top-5 text-black`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handlesetUIUploadFile();
        }
      }}>
      <div>
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <FileUploader
            maxFiles={6}
            maxSize={10 * 1024 * 1024}
            accept={{
              "application/pdf": [],
            }}
          />
        </UploaderProvider>
      </div>
      {mutionSaveFile?.isSuccess && (
        <p className="text-green-500">Saved successfully</p>
      )}
      {mutionSaveFile?.isError && mutionSaveFile?.error && (
        <p className="text-red-500">{mutionSaveFile.error.toString()}</p>
      )}
    </div>
  );
}

export default memo(UploadFile);
