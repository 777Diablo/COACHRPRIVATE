import { AlertCircle } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <AlertCircle className="h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Site Map</h1>
          <p className="text-xl text-muted-foreground">
            Our Site Map is currently being updated. Please check back
            soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
