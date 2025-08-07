export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  bio: string;
}

export interface Education {
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear?: string;
  currentlyStudying: boolean;
}

export interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Certification {
  certificateName: string;
  issuer: string;
  credentialUrl?: string;
  date: string;
}

export interface Volunteering {
  organizationName: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  currentlyVolunteering: boolean;
}

export interface StudentProfileFormData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  certifications: Certification[];
  volunteering: Volunteering[];
  extraInfo?: string;
  avatar?: any;
}

export interface FormComponentProps {
  form: any;
}

export interface ProfileHeaderProps {
  form: any;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
} 