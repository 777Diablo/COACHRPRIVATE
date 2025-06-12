import Image from "next/image"

export default function Purpose() {
  return (
    <section className="py-20 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8">Our Purpose</h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              We are a team of seasoned HR professionals and expert career coaches with deep industry experience. Driven
              by a passion for mentoring, we share our knowledge to empower individuals—especially young
              professionals—to dream big, design their ideal career paths, and achieve success.
            </p>

            {/* Understanding and Approach */}
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              We understand the challenges of navigating the ever-evolving job market and the skills needed to stand
              out. That&apose;s why we offer structured guidance, personalized coaching, and real-world insights to help
              individuals gain confidence, unlock their full potential, make informed career decisions and thrive in
              their careers.
            </p>

            {/* Methods and Goals */}
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              Through mock interviews, psychometric assessments, career coaching, and resume-building support, we don&apos;t
              just prepare candidates for the next job but they are equipped with the skills, strategies, and mindset
              for long-term career success. Our aim is simple: to bridge the gap between ambition and achievement,
              ensuring every professional has the tools to unlock their full potential and thrive.
            </p>
          </div>

          {/* Optional: Visual Element */}
          {/* <div className="mt-12 relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=800"
              alt="Career coaching and mentoring"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01BAEF]/20 to-transparent dark:from-[#40CFFF]/20" />
          </div> */}
        </div>
      </div>
    </section>
  )
}

