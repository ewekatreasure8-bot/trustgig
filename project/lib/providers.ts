export interface Provider {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  isLocal: boolean;
  price: number;
  image: string;
  verified: boolean;
  about: string;
  skills: string[];
  responseTime: string;
  jobsCompleted: number;
}

export const categories = [
  'Design',
  'Home Repair',
  'Consulting',
  'Marketing',
  'Writing',
  'Tech & Development',
] as const;

export const providers: Provider[] = [
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    title: 'Graphic & UI/UX Design',
    category: 'Design',
    rating: 4.9,
    reviews: 128,
    location: 'San Francisco, CA',
    isLocal: true,
    price: 65,
    image:
      'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'Award-winning designer with 7+ years crafting visual identities, web interfaces, and brand systems for startups and Fortune 500s. I blend strategy with aesthetics to deliver designs that convert. Every project includes unlimited revisions until you are 100% satisfied.',
    skills: [
      'Brand Identity',
      'UI/UX Design',
      'Figma',
      'Logo Design',
      'Design Systems',
      'Prototyping',
    ],
    responseTime: 'Under 1 hour',
    jobsCompleted: 312,
  },
  {
    id: 'daniel-park',
    name: 'Daniel Park',
    title: 'Home Repair Specialist',
    category: 'Home Repair',
    rating: 4.8,
    reviews: 96,
    location: 'Austin, TX',
    isLocal: true,
    price: 55,
    image:
      'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'Licensed and insured handyman with 8 years of experience in residential repairs. From drywall and painting to plumbing and electrical fixes, I handle it all. I show up on time, clean up after every job, and stand behind my work with a 90-day guarantee.',
    skills: [
      'Drywall Repair',
      'Painting',
      'Plumbing Fixes',
      'Fixture Installation',
      'Carpentry',
      'Electrical Troubleshooting',
    ],
    responseTime: 'Under 2 hours',
    jobsCompleted: 248,
  },
  {
    id: 'emily-carter',
    name: 'Emily Carter',
    title: 'Business Consultant',
    category: 'Consulting',
    rating: 4.9,
    reviews: 74,
    location: 'Remote',
    isLocal: false,
    price: 90,
    image:
      'https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'Former McKinsey consultant helping small businesses and startups optimize operations, raise capital, and scale sustainably. I offer actionable roadmaps, financial modeling, and strategic planning sessions tailored to your industry and growth stage.',
    skills: [
      'Strategic Planning',
      'Financial Modeling',
      'Market Research',
      'Operations',
      'Fundraising Prep',
      'Growth Strategy',
    ],
    responseTime: 'Under 3 hours',
    jobsCompleted: 156,
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    title: 'Full-Stack Developer',
    category: 'Tech & Development',
    rating: 5.0,
    reviews: 203,
    location: 'Remote',
    isLocal: false,
    price: 85,
    image:
      'https://images.pexels.com/photos/31420959/pexels-photo-31420959.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'Senior full-stack engineer specializing in React, Next.js, and Node.js. I have shipped 40+ production apps and helped teams migrate legacy codebases. Clean code, thorough testing, and clear documentation are non-negotiables on every project.',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'AWS Deployment',
    ],
    responseTime: 'Under 1 hour',
    jobsCompleted: 401,
  },
  {
    id: 'aria-johnson',
    name: 'Aria Johnson',
    title: 'Content & Copy Writer',
    category: 'Writing',
    rating: 4.7,
    reviews: 89,
    location: 'Remote',
    isLocal: false,
    price: 45,
    image:
      'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'SEO-driven content writer with a journalism background. I create blog posts, landing pages, email sequences, and product copy that ranks and converts. Every piece is researched, original, and delivered with a content strategy brief.',
    skills: [
      'SEO Writing',
      'Blog Content',
      'Email Copy',
      'Product Descriptions',
      'Editing',
      'Content Strategy',
    ],
    responseTime: 'Under 4 hours',
    jobsCompleted: 187,
  },
  {
    id: 'james-miller',
    name: 'James Miller',
    title: 'Digital Marketing Strategist',
    category: 'Marketing',
    rating: 4.8,
    reviews: 112,
    location: 'New York, NY',
    isLocal: true,
    price: 75,
    image:
      'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    verified: true,
    about:
      'Growth marketer with 6 years running paid campaigns across Google, Meta, and LinkedIn. I have managed $2M+ in ad spend with an average ROAS of 4.2x. I provide full-funnel strategies, creative direction, and weekly performance dashboards.',
    skills: [
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
      'Marketing Strategy',
      'Analytics',
      'Conversion Optimization',
    ],
    responseTime: 'Under 2 hours',
    jobsCompleted: 267,
  },
];

export function getProviderById(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}
