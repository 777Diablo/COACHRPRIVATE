import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Mock authentication function
const auth = (req: Request) => ({ id: "fakeId" }); // Replace with actual logic

export const ourFileRouter = {
  videoUploader: f({
    video: { maxFileSize: "4GB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = auth(req);
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id }; // Returning metadata needed by the upload process
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url); // Log the URL or save it to your DB
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
