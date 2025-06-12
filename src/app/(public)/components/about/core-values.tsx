import { Rocket, UserCog, Award, Lightbulb, Users, Clock } from "lucide-react"

const values = [
  {
    icon: Rocket,
    title: "Empowerment",
    description:
      "Unlocking potential and helping individuals to grow with confidence at every stage of their career journey",
  },
  {
    icon: UserCog,
    title: "Personalization",
    description: "Tailor our approach and methods to meet unique individual career goals and learning styles",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Success is achieved through strong partnerships between coaches and clients, working together towards common goals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Maintain the highest standards in our service with focus on continuous improvement & delivering results",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embrace advance coaching techniques and innovative tools with cutting-edge technology",
  },
  {
    icon: Clock,
    title: "Commitment",
    description: "We're dedicated to supporting our clients throughout their journey, ensuring long-term success.",
  },
]

export default function CoreValues() {
  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Our Core Values</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            The principles that guide us in delivering exceptional career coaching
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-primary/10 dark:bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary dark:text-primary" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{value.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

