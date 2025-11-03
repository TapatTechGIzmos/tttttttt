import { format, subDays } from 'date-fns';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  category: string[];
  country: string[];
}

// Mock data for development
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'African Insurance Market Shows Strong Growth in Q1 2024',
    summary: 'The African insurance sector demonstrated remarkable resilience with a 15% growth in premiums...',
    source: 'Insurance Business Africa',
    date: '2024-03-20',
    url: '#',
    category: ['Market News'],
    country: ['South Africa', 'Kenya']
  },
  {
    id: '2',
    title: 'New InsurTech Solutions Transform Nigerian Market',
    summary: 'Nigerian insurance sector sees digital transformation with new mobile-first solutions...',
    source: 'Insurance Business Africa',
    date: '2024-03-19',
    url: '#',
    category: ['InsurTech', 'Digital'],
    country: ['Nigeria']
  },
  {
    id: '3',
    title: 'Regulatory Changes Boost East African Insurance Sector',
    summary: 'Recent regulatory reforms in East Africa have created new opportunities for insurance providers...',
    source: 'Cover Magazine',
    date: '2024-03-18',
    url: '#',
    category: ['Regulation'],
    country: ['Tanzania', 'Uganda']
  }
];

export async function fetchNews(): Promise<NewsArticle[]> {
  // Return mock data for development
  return Promise.resolve(mockArticles);
}