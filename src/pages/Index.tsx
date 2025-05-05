
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import JobList from "@/components/JobList";
import { Job } from "@/types/types";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from Netlify CMS
    // For now, we'll use sample data
    const sampleJobs: Job[] = [
      {
        id: "1",
        title: "SSC CHSL 2025",
        location: "All India",
        deadline: "10 June 2025",
        type: "Government",
        applyLink: "https://ssc.nic.in/",
        description: "The SSC CHSL exam recruits for various posts including Lower Division Clerk, Data Entry Operator, and Postal Assistants.\n\nEligibility: Candidates must have passed 12th standard.\n\nSelection Process: Tier 1 (objective), Tier 2 (descriptive), and Typing Test.\n\nImportant Notes: Detailed syllabus, age relaxation criteria, and category-wise vacancies are available on the official notification. Aspirants are advised to regularly check updates.",
        companyName: "Staff Selection Commission"
      },
      {
        id: "2",
        title: "TCS NQT Hiring 2025",
        location: "Pan India",
        deadline: "30 May 2025",
        type: "Private",
        applyLink: "https://www.tcs.com/",
        description: "TCS National Qualifier Test (NQT) is a multi-level assessment to evaluate competencies and skills.\n\nTarget Audience: Suitable for freshers and experienced professionals.\n\nComponents: Verbal ability, reasoning, numerical aptitude, and programming (optional).\n\nDetails: The NQT score is valid across multiple companies. Registration, sample tests, and FAQs are available on the TCS iON portal.",
        companyName: "Tata Consultancy Services"
      },
      {
        id: "3",
        title: "Indian Navy Agniveer",
        location: "All India",
        deadline: "15 June 2025",
        type: "Government",
        applyLink: "https://joinindiannavy.gov.in/",
        description: "The Agniveer scheme is a short-term service in the Indian Navy for youth aged 17.5 to 21.\n\nEngagement: 4 years with possible absorption into the regular cadre.\n\nTraining: Recruits undergo rigorous physical training, technical instruction, and discipline development.\n\nSelection: Online exam, Physical Fitness Test (PFT), and medical standards.\n\nOpportunity: Candidates get exposure to naval operations, skill development, and future employment pathways.",
        companyName: "Indian Navy"
      },
      {
        id: "4",
        title: "Software Engineer",
        location: "Bangalore, Karnataka",
        deadline: "20 May 2025",
        type: "Private",
        applyLink: "https://example.com/apply",
        description: "We are looking for a Software Engineer to join our team and help build next-generation web applications.\n\nRequirements:\n- 2+ years of experience with JavaScript/TypeScript\n- Experience with React and modern frontend frameworks\n- Knowledge of backend technologies (Node.js preferred)\n\nResponsibilities:\n- Develop and maintain web applications\n- Collaborate with cross-functional teams\n- Write clean, maintainable code",
        companyName: "Tech Innovations"
      },
      {
        id: "5",
        title: "Data Analyst",
        location: "Hyderabad, Telangana",
        deadline: "5 June 2025",
        type: "Private",
        applyLink: "https://example.com/apply",
        description: "We're seeking a Data Analyst to help interpret data and turn it into information which can offer ways to improve our business.\n\nRequirements:\n- Bachelor's degree in Statistics, Mathematics, or related field\n- Proficiency in SQL, Excel, and data visualization tools\n- Experience with data analysis and statistical methods\n\nResponsibilities:\n- Analyze data to identify trends and patterns\n- Create visualizations and dashboards\n- Present findings to stakeholders",
        companyName: "Data Solutions Ltd"
      },
      {
        id: "6",
        title: "IBPS Clerk 2025",
        location: "All India",
        deadline: "25 June 2025",
        type: "Government",
        applyLink: "https://www.ibps.in/",
        description: "The Institute of Banking Personnel Selection (IBPS) conducts the Clerk exam annually to recruit for clerical cadre positions in participating public sector banks.\n\nEligibility: Candidates must have a bachelor's degree from a recognized university.\n\nSelection Process: Preliminary Exam, Main Exam, and Document Verification.\n\nImportant Notes: Candidates are advised to check official notification for state-wise vacancies, age limits, and reservation policies.",
        companyName: "Institute of Banking Personnel Selection"
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setJobs(sampleJobs);
      setLoading(false);
    }, 1000);

    // In real app:
    // fetch('/api/jobs')
    //   .then(res => res.json())
    //   .then(data => {
    //     setJobs(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching jobs:', err);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchQuery}
        onTypeChange={setTypeFilter}
        onLocationChange={setLocationFilter}
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <JobList 
            jobs={jobs}
            searchQuery={searchQuery}
            typeFilter={typeFilter}
            locationFilter={locationFilter}
          />
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} dWorkz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
