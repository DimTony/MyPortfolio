import { Project } from "@prisma/client";

// Define your types here
export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  // id?: string;
  // imageUrl?: string;
  // liveUrl?: string;
  // githubUrl?: string;
  // featured?: boolean;
  // order?: number;
};

// NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
    };
  }
}

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface TechIcon {
  name: string;
  image: string;
}

export interface Slide {
  id: number;
  title: string;
  img: string;
}

export interface Testimonial {
  name: string;
  pos: string;
  review: string;
  imgPath: string;
}

export interface GradientSpheresProps {
  sphere1Class: string;
  sphere2Class: string;
}

export interface TitleHeaderProps {
  title: string;
  number: string;
  text: string;
}

export interface TechIconProps {
  icon: TechIcon;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export type Theme = "light" | "dark" | "system";
export type ProjectTab = "projects" | "thinktank";


export type Objective = {
  id: number;
  text: string;
  descriptionId: number;
};

export type ProjectDescription = {
  id: number;
  title: string;
  summary: string;
  footer: string;
  objectives: Objective[];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string | string[]; // Can be string (JSON) or parsed array
  role: string;
  dash: string;
  thumbnail: string;
  releaseStatus: string;
  maintainStatus: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  desc?: ProjectDescription;
  descId?: number;
};