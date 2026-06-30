// Demo data for example.com — pre-built full report for the demo mode
import { analyzeWebsite } from './aiEngine';

export const demoReport = analyzeWebsite('https://example.com');

export const demoHistory = [
  {
    id: '1',
    url: 'example.com',
    domain: 'example.com',
    previousScore: 72,
    currentScore: 89,
    improvement: 17,
    date: '2025-06-28',
    status: 'improved',
  },
  {
    id: '2',
    url: 'myshop.store',
    domain: 'myshop.store',
    previousScore: 61,
    currentScore: 78,
    improvement: 17,
    date: '2025-06-25',
    status: 'improved',
  },
  {
    id: '3',
    url: 'portfolio.dev',
    domain: 'portfolio.dev',
    previousScore: 84,
    currentScore: 91,
    improvement: 7,
    date: '2025-06-20',
    status: 'improved',
  },
  {
    id: '4',
    url: 'startup.io',
    domain: 'startup.io',
    previousScore: 55,
    currentScore: 67,
    improvement: 12,
    date: '2025-06-15',
    status: 'improved',
  },
  {
    id: '5',
    url: 'agency.design',
    domain: 'agency.design',
    previousScore: 90,
    currentScore: 93,
    improvement: 3,
    date: '2025-06-10',
    status: 'improved',
  },
];
