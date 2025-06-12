// import { genUploader } from "uploadthing/client";

// export const uploadVideoProgrammatically = async (file: File) => {
//     try {
//         const formData = new FormData();
//         formData.append("file", file);  // Ensure the file is appended with the key 'file'

//         const response = await fetch("/api/uploadthing", {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Upload failed: ${errorText}`);
//         }

//         const result = await response.json();
//         console.log("File uploaded successfully:", result);
//         return result; // File details like URL
//     } catch (error) {
//         console.error("Error during upload:", error);
//         throw error;
//     }
// };

import { genUploader } from "uploadthing/client";

// import type { UploadRouter } from "@/server/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
export const { uploadFiles } = genUploader<OurFileRouter>({
  package: "@uploadthing/react",
});

export const uploadVideoProgrammatically = async (file: File) => {
  const response = await uploadFiles("videoUploader", {
    files: [file],
  });

  console.log("File uploaded successfully:", response);

  return response[0];
};
