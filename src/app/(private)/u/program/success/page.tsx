import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@hidstech/common_components/components/ui/button.js";
import { Card } from "@hidstech/common_components/components/ui/card.js";

export default function TestSuccessPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md space-y-6 p-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Test Submitted Successfully!
        </h1>
        <p className="text-gray-600">
          Thank you for completing the video interview. Your responses have been
          recorded and will be reviewed by our team.
        </p>
        <div className="pt-4">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          If you have any questions, please contact our support team.
        </p>
      </Card>
    </div>
  );
}
