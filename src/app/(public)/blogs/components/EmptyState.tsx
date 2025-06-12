import { File } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <File className="h-12 w-12 text-primary/70" />
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-foreground">No Posts Found</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        We&apose;re working on creating valuable content for you. Please check back soon or subscribe to our newsletter to get notified when new posts are published.
      </p>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
        Subscribe to Updates
      </Button>
    </div>
  );
}