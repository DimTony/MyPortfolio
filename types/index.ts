// File: types/index.ts
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
