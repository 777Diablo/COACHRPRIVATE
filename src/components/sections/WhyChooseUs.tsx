'use client';

import { motion } from 'framer-motion';
import { UserCheck, MessageSquare, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: UserCheck,
    iconColor:"bg-blue-600",
    title: 'Personalized Coaching',
    description: 'Get matched with coaches who understand your industry and career goals'
  },
  {
    icon: MessageSquare,
    iconColor:"bg-teal-600",
    title: 'Expert Feedback',
    description: 'Receive detailed, actionable feedback to improve your interview performance'
  },
  {
    icon: Clock,
    iconColor:"bg-purple-600",
    title: 'Real-Time Coaching',
    description: 'Practice with live feedback and immediate performance insights'
  },
  {
    icon: Shield,
    iconColor:"bg-orange-600",  
    title: 'Comprehensive Support',
    description: 'Access a full suite of tools and resources for complete interview preparation'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose CoachR?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive interview preparation solutions that set you up for success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 ">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 border border-neutral-700 rounded-xl bg-neutral-800 hover:border-blue-600 transition-all duration-300 `}
            >
              

              <div className="flex items-start space-x-6   text-center  p-6 rounded-lg bg-background hover:bg-secondary/5 transition-colors duration-300 hover:text-white">
                <div className={`  h-12 w-12 ${feature.iconColor} rounded-lg flex-shrink-0 flex  items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                <h3 className="text-lg font-semibold mb-2 hover:text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                </div>
                
              </div>

              
              
            </motion.div>
          ))}
        </div>
      </div>
      {/* <!-- Call to Action --> */}
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-black mb-6">Ready to Transform Your Interview Skills?</h3>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
                Get Started Today
            </button>
        </div>
    </section>
  );
};

export default WhyChooseUs;