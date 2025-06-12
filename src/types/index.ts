export type Brand = {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight: string;
};

export type Feature = {
  id: number;
  icon: React.ReactNode;
  title: string;
  paragraph: string;
};

export type Testimonial = {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
};

export type ProgramFeatureType = {
  id: number;
  title: string;
  description: string;
};

export * from "./output";
