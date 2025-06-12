"use client";

 const OurStory = () => {
  return (
    <section className="py-[100px] lg:pt-[80px] md:pt-[70px]  ct-02 content-section division">
      <div className="container">
        <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  items-center">
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="img-block text-center left-column wow fadeInRight mr-[30px] lg:mr-[5px] md:mr-0 sm:mx-[3%] xsm:m-[0_2%_35px]" style={{visibility: 'visible', animationName: 'fadeInRight'}}>
              <img 
              className="rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="content-image" />
            </div>
          </div>
          <div className="xl:w-6/12 lg:w-6/12 md:w-6/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
            <div className="txt-block right-column wow fadeInLeft" style={{visibility: 'visible', animationName: 'fadeInLeft'}}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Achieve more with better workflows</h2>
              <p className="text-lg text-muted-foreground mb-4">CoachR was born from a simple observation: many talented professionals struggle with interview preparation and career advancement, not due to lack of skills, but due to lack of proper guidance and preparation.</p>
              <p className="text-lg text-muted-foreground mb-4">What started as a small mentorship program has grown into a comprehensive platform that has helped thousands of professionals land their dream jobs and advance their careers.</p>
              <p className="text-lg text-muted-foreground mb-4">Today, we continue to evolve and expand our services, staying true to our mission of empowering careers through personalized coaching and cutting-edge technology.</p>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
}

export default OurStory;