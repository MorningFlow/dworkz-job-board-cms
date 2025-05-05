
export interface Job {
  id: string;
  title: string;
  location: string;
  deadline: string;
  type: 'Government' | 'Private' | string;
  applyLink: string;
  description: string;
  createdAt?: string;
  companyName?: string;
  companyLogo?: string;
}
