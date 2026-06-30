// SiteLens AI — Simulation Engine
// Generates realistic, deterministic AI analysis reports from any URL

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed, min, max) {
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1)) + min;
}

export function analyzeWebsite(url) {
  const domain = url.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0];
  const seed = hashCode(domain);

  const perf = seededRandom(seed + 1, 62, 98);
  const seo = seededRandom(seed + 2, 58, 96);
  const design = seededRandom(seed + 3, 55, 97);
  const ux = seededRandom(seed + 4, 60, 95);
  const accessibility = seededRandom(seed + 5, 50, 92);
  const conversion = seededRandom(seed + 6, 45, 90);
  const security = seededRandom(seed + 7, 70, 99);
  const trust = seededRandom(seed + 8, 55, 94);

  const overall = Math.round((perf + seo + design + ux + accessibility + conversion) / 6);

  const lcp = (seededRandom(seed + 9, 12, 45) / 10).toFixed(1);
  const fid = seededRandom(seed + 10, 8, 120);
  const cls = (seededRandom(seed + 11, 1, 25) / 100).toFixed(2);
  const fcp = (seededRandom(seed + 12, 8, 30) / 10).toFixed(1);
  const ttfb = seededRandom(seed + 13, 80, 600);
  const pageSize = (seededRandom(seed + 14, 8, 45) / 10).toFixed(1);
  const requests = seededRandom(seed + 15, 12, 85);

  return {
    url,
    domain,
    overall,
    scores: { perf, seo, design, ux, accessibility, conversion, security, trust },
    status: overall >= 85 ? 'Excellent digital foundation' : overall >= 70 ? 'Good with room to grow' : 'Needs significant improvement',
    performance: {
      score: perf,
      lcp: parseFloat(lcp),
      fid,
      cls: parseFloat(cls),
      fcp: parseFloat(fcp),
      ttfb,
      pageSize: parseFloat(pageSize),
      requests,
      mobile: seededRandom(seed + 16, 55, 95),
      desktop: seededRandom(seed + 17, 70, 99),
      speedIndex: seededRandom(seed + 18, 60, 98),
      chartData: [
        { name: 'LCP', value: Math.max(0, 100 - (parseFloat(lcp) - 1) * 15), benchmark: 75 },
        { name: 'FID', value: Math.max(0, 100 - (fid / 100) * 50), benchmark: 80 },
        { name: 'CLS', value: Math.max(0, 100 - parseFloat(cls) * 300), benchmark: 85 },
        { name: 'FCP', value: Math.max(0, 100 - (parseFloat(fcp) - 0.8) * 20), benchmark: 72 },
        { name: 'TTFB', value: Math.max(0, 100 - (ttfb / 600) * 60), benchmark: 78 },
      ],
      timelineData: [
        { time: '0s', value: 0 },
        { time: '0.5s', value: 20 },
        { time: '1s', value: 45 },
        { time: '1.5s', value: 65 },
        { time: '2s', value: 78 },
        { time: '2.5s', value: 88 },
        { time: '3s', value: 95 },
        { time: '3.5s', value: 100 },
      ],
    },
    seo: {
      score: seo,
      titleLength: seededRandom(seed + 19, 25, 72),
      metaPresent: seededRandom(seed + 20, 0, 1) === 1,
      h1Count: seededRandom(seed + 21, 0, 3),
      imagesWithAlt: seededRandom(seed + 22, 40, 95),
      canonicalPresent: seededRandom(seed + 23, 0, 1) === 1,
      robotsTxt: seededRandom(seed + 24, 0, 1) === 1,
      sitemap: seededRandom(seed + 25, 0, 1) === 1,
      structuredData: seededRandom(seed + 26, 0, 1) === 1,
      keywords: generateKeywords(domain, seed),
      chartData: [
        { subject: 'On-Page', score: seededRandom(seed + 27, 55, 98), fullMark: 100 },
        { subject: 'Technical', score: seededRandom(seed + 28, 50, 95), fullMark: 100 },
        { subject: 'Content', score: seededRandom(seed + 29, 45, 92), fullMark: 100 },
        { subject: 'Links', score: seededRandom(seed + 30, 40, 88), fullMark: 100 },
        { subject: 'Mobile', score: seededRandom(seed + 31, 55, 97), fullMark: 100 },
        { subject: 'Speed', score: perf, fullMark: 100 },
      ],
    },
    design: {
      score: design,
      colorSystem: seededRandom(seed + 32, 55, 98),
      typography: seededRandom(seed + 33, 50, 96),
      spacing: seededRandom(seed + 34, 45, 94),
      visualHierarchy: seededRandom(seed + 35, 50, 97),
      consistency: seededRandom(seed + 36, 55, 98),
      modernness: seededRandom(seed + 37, 45, 97),
      strengths: generateDesignStrengths(seed),
      problems: generateDesignProblems(seed),
    },
    ux: {
      score: ux,
      navigation: seededRandom(seed + 38, 55, 98),
      readability: seededRandom(seed + 39, 50, 96),
      cta: seededRandom(seed + 40, 40, 95),
      trustFactors: trust,
      mobileExp: seededRandom(seed + 41, 50, 96),
      conversionFlow: conversion,
      review: generateUXReview(domain, seed),
    },
    accessibility: {
      score: accessibility,
      colorContrast: seededRandom(seed + 42, 45, 98),
      altText: seededRandom(seed + 43, 40, 95),
      keyboardNav: seededRandom(seed + 44, 35, 92),
      ariaLabels: seededRandom(seed + 45, 30, 90),
      focusManagement: seededRandom(seed + 46, 40, 94),
      chartData: [
        { name: 'Color Contrast', value: seededRandom(seed + 47, 45, 98) },
        { name: 'Alt Text', value: seededRandom(seed + 48, 40, 95) },
        { name: 'Keyboard Nav', value: seededRandom(seed + 49, 35, 92) },
        { name: 'ARIA Labels', value: seededRandom(seed + 50, 30, 90) },
        { name: 'Focus Mgmt', value: seededRandom(seed + 51, 40, 94) },
        { name: 'Screen Reader', value: seededRandom(seed + 52, 35, 88) },
      ],
    },
    conversion: {
      score: conversion,
      ctaVisibility: seededRandom(seed + 53, 40, 95),
      formUsability: seededRandom(seed + 54, 45, 92),
      socialProof: seededRandom(seed + 55, 35, 90),
      urgencyElements: seededRandom(seed + 56, 25, 85),
      valueProposition: seededRandom(seed + 57, 45, 95),
      trustSignals: trust,
      conversionPrediction: seededRandom(seed + 58, 12, 68),
    },
    recommendations: generateRecommendations(seed, { perf, seo, design, ux, accessibility, conversion }),
    improvedContent: generateImprovedContent(domain, seed),
    analyzedAt: new Date().toISOString(),
  };
}

function generateKeywords(domain, seed) {
  const allKeywords = [
    { word: 'digital marketing', volume: 8100, difficulty: 72 },
    { word: 'web design', volume: 12400, difficulty: 68 },
    { word: 'online presence', volume: 5400, difficulty: 55 },
    { word: 'user experience', volume: 9900, difficulty: 64 },
    { word: 'conversion rate', volume: 6600, difficulty: 58 },
    { word: 'SEO optimization', volume: 14800, difficulty: 75 },
    { word: 'website performance', volume: 4400, difficulty: 52 },
    { word: 'mobile responsive', volume: 3200, difficulty: 48 },
    { word: 'brand identity', volume: 7800, difficulty: 62 },
    { word: 'content strategy', volume: 5100, difficulty: 57 },
  ];
  const start = seededRandom(seed + 60, 0, 4);
  return allKeywords.slice(start, start + 5);
}

function generateDesignStrengths(seed) {
  const strengths = [
    'Modern hero section with strong visual impact',
    'Consistent color palette throughout',
    'Clear typographic hierarchy established',
    'Good use of whitespace and breathing room',
    'Responsive grid layout detected',
    'Strong brand identity maintained',
    'Professional imagery selection',
    'Effective use of contrast ratios',
  ];
  const idx = seededRandom(seed + 70, 0, 2);
  return strengths.slice(idx, idx + 3);
}

function generateDesignProblems(seed) {
  const problems = [
    { issue: 'Weak CTA button placement above the fold', severity: 'high' },
    { issue: 'Font size too small on mobile devices', severity: 'medium' },
    { issue: 'Inconsistent spacing between sections', severity: 'medium' },
    { issue: 'Color contrast insufficient in footer', severity: 'high' },
    { issue: 'Too much text without visual breaks', severity: 'medium' },
    { issue: 'Missing visual hierarchy in navigation', severity: 'low' },
    { issue: 'Hero image lacks emotional resonance', severity: 'medium' },
    { issue: 'No loading state for interactive elements', severity: 'low' },
  ];
  const idx = seededRandom(seed + 80, 0, 3);
  return problems.slice(idx, idx + 3);
}

function generateUXReview(domain, seed) {
  const reviews = [
    `Users may struggle to identify the primary call-to-action within the first 5 seconds. The value proposition is buried below the fold.`,
    `Navigation structure is intuitive but the mobile hamburger menu lacks visual feedback. Users on small screens may experience friction.`,
    `The trust signals are well-placed but social proof elements could be more prominent. Testimonials would significantly improve conversions.`,
    `Good user flow overall, but the checkout or contact process has unnecessary steps that could increase drop-off rates by 34%.`,
    `First-time visitors to ${domain} may not immediately understand the core offering. A stronger headline and sub-headline would help.`,
  ];
  return reviews[seededRandom(seed + 90, 0, 4)];
}

function generateRecommendations(seed, scores) {
  const all = [
    {
      category: 'Performance',
      problem: 'Large unoptimized images are significantly slowing page load times.',
      solution: 'Implement WebP format with lazy loading. Use Next.js Image component or similar for automatic optimization.',
      impact: 'Reduce page load time by up to 40% and improve Core Web Vitals score.',
      priority: scores.perf < 75 ? 'high' : 'medium',
      effort: 'Medium',
    },
    {
      category: 'SEO',
      problem: 'Meta descriptions are missing or too short on key pages.',
      solution: 'Write compelling 150-160 character meta descriptions for every page that include primary keywords.',
      impact: 'Improve click-through rates from search results by 15-30%.',
      priority: scores.seo < 75 ? 'high' : 'medium',
      effort: 'Low',
    },
    {
      category: 'Design',
      problem: 'Homepage lacks a strong emotional connection with visitors.',
      solution: 'Create a clearer value proposition above the fold. Use benefit-focused copy with a compelling visual story.',
      impact: 'Increase time-on-page and reduce bounce rate.',
      priority: scores.design < 75 ? 'high' : 'medium',
      effort: 'High',
    },
    {
      category: 'Conversion',
      problem: 'CTA buttons are not visually prominent enough to drive action.',
      solution: 'Use high-contrast colors for primary CTAs. Add micro-copy beneath to reduce friction ("No credit card required").',
      impact: 'Estimated 18-25% improvement in conversion rate.',
      priority: scores.conversion < 70 ? 'high' : 'medium',
      effort: 'Low',
    },
    {
      category: 'Accessibility',
      problem: 'Several interactive elements lack proper ARIA labels for screen readers.',
      solution: 'Add descriptive aria-label attributes to all buttons, links, and form inputs. Test with NVDA or VoiceOver.',
      impact: 'Reach additional 15% of users with disabilities and improve SEO.',
      priority: scores.accessibility < 65 ? 'high' : 'low',
      effort: 'Medium',
    },
    {
      category: 'UX',
      problem: 'Navigation is complex for first-time users — too many options.',
      solution: 'Apply the Hick\'s Law principle. Reduce primary navigation to 5-7 items. Group secondary options in dropdowns.',
      impact: 'Reduce cognitive load, improve navigation completion rate by 22%.',
      priority: scores.ux < 72 ? 'high' : 'medium',
      effort: 'High',
    },
    {
      category: 'Trust',
      problem: 'Absence of social proof makes it hard for new visitors to trust your brand.',
      solution: 'Add customer testimonials, case studies, trust badges, and recognizable client logos near the main CTA.',
      impact: 'Increase conversions by up to 34% through improved trust signals.',
      priority: 'medium',
      effort: 'Medium',
    },
    {
      category: 'Mobile',
      problem: 'Mobile experience has usability issues — tap targets too small.',
      solution: 'Ensure all tap targets are at minimum 44×44px. Test on real devices across iOS and Android.',
      impact: 'Improve mobile conversion rate by up to 28%.',
      priority: 'high',
      effort: 'Medium',
    },
  ];

  // Shuffle based on seed and return 6
  const shuffled = [...all].sort((a, b) => seededRandom(seed + 100, -1, 1));
  return shuffled.slice(0, 6);
}

function generateImprovedContent(domain, seed) {
  const headlines = [
    `Transform Your ${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} Experience — Built for the Future`,
    `The Smarter Way to Achieve Results — Powered by AI`,
    `Stop Losing Customers. Start Converting with Intelligence.`,
    `Your Business Deserves a Website That Actually Works.`,
    `Join Thousands Who Transformed Their Digital Presence`,
  ];

  const subheadlines = [
    'Get measurable results from day one. Our platform delivers performance, conversions, and growth — without the complexity.',
    'AI-powered insights meet beautiful design. Everything you need to dominate your market, in one place.',
    'We handle the technology so you can focus on what matters — growing your business.',
    'From struggling website to revenue machine. See the transformation in 30 days or less.',
  ];

  const ctas = [
    'Start Your Free Analysis',
    'Get Instant Results',
    'Transform My Website',
    'See It In Action',
    'Begin Free Trial',
  ];

  return {
    headline: headlines[seededRandom(seed + 110, 0, 4)],
    subheadline: subheadlines[seededRandom(seed + 111, 0, 3)],
    cta: ctas[seededRandom(seed + 112, 0, 4)],
    structure: [
      { section: 'Hero', suggestion: 'Lead with the transformation (before → after). Show the result, not the process.' },
      { section: 'Social Proof', suggestion: 'Place 3-5 testimonials with real photos immediately after the hero section.' },
      { section: 'Features', suggestion: 'Frame each feature as a benefit: "You get X so that Y happens".' },
      { section: 'CTA', suggestion: 'Use a single, bold, benefit-driven CTA. Remove competing actions.' },
      { section: 'Footer', suggestion: 'Add trust signals: security badges, privacy policy, and contact info.' },
    ],
  };
}
