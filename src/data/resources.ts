export interface StudyResource {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  pages: number;
  size: string;
  /**
   * When present, this card links to a dedicated, text-rich full-page
   * article at /resource/:slug instead of opening the quick-download
   * modal directly. See src/data/articles.tsx for the article content.
   */
  slug?: string;
}

export const studyResources: StudyResource[] = [
  {
    id: 'physics-formula',
    title: 'Physics Formula Sheet',
    description: 'Complete collection of essential physics formulas covering mechanics, thermodynamics, electromagnetism, and modern physics.',
    category: 'Physics',
    icon: 'Atom',
    pages: 24,
    size: '2.1 MB',
    slug: 'physics',
  },
  {
    id: 'math-short-notes',
    title: 'Maths Short Notes',
    description: 'Concise mathematics notes covering algebra, calculus, geometry, and trigonometry with worked examples.',
    category: 'Mathematics',
    icon: 'Calculator',
    pages: 32,
    size: '3.4 MB',
    slug: 'maths',
  },
  {
    id: 'chemistry-periodic',
    title: 'Chemistry Periodic Guide',
    description: 'Interactive periodic table reference with element properties, trends, and bonding patterns explained.',
    category: 'Chemistry',
    icon: 'FlaskConical',
    pages: 18,
    size: '1.8 MB',
    slug: 'chemistry',
  },
  {
    id: 'biology-diagrams',
    title: 'Biology Diagrams Atlas',
    description: 'Labeled biological diagrams covering cell structure, human anatomy, and plant biology for visual learners.',
    category: 'Biology',
    icon: 'Dna',
    pages: 45,
    size: '5.2 MB',
  },
  {
    id: 'cs-programming',
    title: 'Programming Fundamentals',
    description: 'Core programming concepts including data structures, algorithms, and problem-solving techniques.',
    category: 'Computer Science',
    icon: 'Code2',
    pages: 56,
    size: '4.1 MB',
  },
  {
    id: 'english-grammar',
    title: 'English Grammar Handbook',
    description: 'Comprehensive grammar rules, punctuation guides, and common writing mistakes with clear examples.',
    category: 'English',
    icon: 'BookOpen',
    pages: 28,
    size: '1.5 MB',
  },
  {
    id: 'history-timeline',
    title: 'World History Timeline',
    description: 'Chronological overview of major world events, civilizations, and turning points in human history.',
    category: 'History',
    icon: 'Landmark',
    pages: 38,
    size: '2.9 MB',
  },
  {
    id: 'economics-notes',
    title: 'Economics Quick Notes',
    description: 'Micro and macroeconomics concepts explained simply, with real-world examples and key terminology.',
    category: 'Economics',
    icon: 'TrendingUp',
    pages: 22,
    size: '1.7 MB',
  },
];
