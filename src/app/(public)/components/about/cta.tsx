import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/80 to-primary/60 dark:from-primary/50 dark:to-primary/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-6">Start Your Journey with Expert Coaching</h2>
        <p className="text-lg text-gray-200/80 dark:text-gray-300/80 mb-8 max-w-2xl mx-auto">
          Take the first step towards transforming your potential into success. Our expert coaches are ready to guide
          you on your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Button
            size="lg"
            className="bg-primary/80 hover:bg-primary/90 text-primary-foreground/90 px-8 py-6 text-lg rounded-full"
          >
            Schedule a Consultation
          </Button> */}
          <Link href="/signin">
          <Button
            size="lg"
            variant="outline"
            className="border-white/70 text-black/90   dark:border-white/60 dark:text-white/80  px-8 py-6 text-lg rounded-full"
          >
            Learn More
          </Button>
          </Link>
          
          
        </div>
      </div>
    </section>
  )
}