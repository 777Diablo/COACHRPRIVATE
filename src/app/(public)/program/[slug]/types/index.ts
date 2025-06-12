import {
  Brain,
  Briefcase,
  Users,
  MessageSquare,
  Globe,
  Target,
  TrendingUp,
  Building,
  Star,
  CheckCircle,
  FileText,
  Check,
  PenTool,
  Video,
} from "lucide-react";

export const programIcons = {
  Brain,
  Briefcase,
  Check,
  PenTool,
  Users,
  Target,
  TrendingUp,
  MessageSquare,
  Globe,
  Building,
  Star,
  CheckCircle,
  FileText,
  Video,
};

export type IconName = keyof typeof programIcons;

export type AvailableTypes = "online-only" | "in-person-only" | "hybrid";

export interface ProgramDetail {
  icon: IconName;
  title: string;
  description: string;
  premium?: boolean;
}

export type ProgramSchemeColor = {
  bgColor: string;
  gradient: string;
  hoverBorderColor: string;
};

export type Price = {
  inr: string;
  usd: string;
};

export type ModePricing = {
  standard: Price;
  premium: Price;
};

export type ProgramMode = {
  pricing: ModePricing;
};

export type ProgramAttribute = {
  id: string;
  title: string;
  description: string;
};

export type ProgramFeature = {
  title: string;
  description: string;
};

export type ProgramDetails = {
  commonDetails: ProgramDetail[];
  premiumDetails: ProgramDetail[];
};

export type Program = {
  id: string;
  icon: string;
  slug: string;
  title: string;
  subtitle: string;
  price?: string;
  description: string;
  requirements: string;
  targetAudience: string;

  // Visual and UI elements
  colorScheme: ProgramSchemeColor[];
  highlights?: string[];
  featured?: boolean;

  // Program attributes and features
  whyChooseAttributes: ProgramAttribute[];
  features: ProgramFeature[];

  // Program type and mode configuration
  programType: AvailableTypes;
  modes: {
    online?: ProgramMode;
    inPerson?: ProgramMode;
  };

  // Detailed program information
  programDetails: ProgramDetails;
};

export function getIconComponent(iconName?: IconName) {
  return iconName ? programIcons[iconName] : undefined;
}

/**
 * User information for checkout
 */
export interface UserInfo {
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** User's email address */
  email: string;
  /** User's phone number */
  phone: string;
}

/**
 * Payment information
 */
export interface PaymentInfo {
  /** Card number */
  cardNumber: string;
  /** Card expiry date */
  expiry: string;
  /** Card CVV */
  cvv: string;
}

// Testimonial Types
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
};

// Core Feature Types
export type CoreFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  cardHoverClass: string;
  iconBgClass: string;
  textColorClass: string;
  pointerColorClass: string;
};

// Target Audience Types
export type TargetAudience = {
  id: string;
  icon: string;
  title: string;
  description: string;
};
