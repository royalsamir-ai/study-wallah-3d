export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] };

export interface SubjectArticle {
  slug: string;
  resourceId: string;
  title: string;
  emoji: string;
  category: string;
  icon: string;
  tagline: string;
  accent: {
    bg: string;
    border: string;
    icon: string;
    shadow: string;
  };
  blocks: ArticleBlock[];
}

export const subjectArticles: Record<string, SubjectArticle> = {
  physics: {
    slug: 'physics',
    resourceId: 'physics-formula',
    title: 'Physics Formula Guide',
    emoji: '⚛️',
    category: 'Physics',
    icon: 'Atom',
    tagline:
      'A friendly, thorough walkthrough of Kinematics, the Laws of Motion, and Thermodynamics — the three pillars every beginner physics student needs to master before moving on to advanced mechanics.',
    accent: {
      bg: 'linear-gradient(135deg, #ffd6e5, #ffe9f3)',
      border: 'rgba(255, 143, 184, 0.3)',
      icon: '#FF8FB3',
      shadow: 'rgba(255, 143, 184, 0.15)',
    },
    blocks: [
      { type: 'h2', text: 'Kinematics: Describing Motion' },
      {
        type: 'p',
        text: 'Kinematics is the branch of mechanics that describes how objects move without worrying about the forces that cause that motion. Before you can analyze why something moves, you first need a precise vocabulary for describing where it is, how fast it is going, and how quickly that speed is changing. Every kinematics problem you will ever encounter, from a ball thrown off a cliff to a rocket accelerating into orbit, boils down to tracking position, velocity, and acceleration over time.',
      },
      { type: 'h3', text: 'Core Definitions' },
      {
        type: 'ul',
        items: [
          'Distance is the total path length travelled, while displacement is the shortest straight-line change in position, including direction.',
          'Speed is distance covered per unit time; velocity is displacement per unit time, making it a vector quantity with both magnitude and direction.',
          'Acceleration is the rate of change of velocity with respect to time, measured in metres per second squared (m/s²).',
          'Uniform acceleration means the acceleration stays constant throughout the motion, which is the assumption behind the standard equations of motion below.',
        ],
      },
      { type: 'h3', text: 'The Three Equations of Motion' },
      {
        type: 'p',
        text: 'For an object moving with constant acceleration a, starting with initial velocity u and reaching final velocity v after time t, covering a displacement s, three equations tie everything together:',
      },
      {
        type: 'ul',
        items: [
          'First equation: v = u + at — relates final velocity to initial velocity, acceleration, and time.',
          'Second equation: s = ut + ½at² — gives displacement in terms of initial velocity, time, and acceleration.',
          'Third equation: v² = u² + 2as — connects velocity and displacement directly, without needing time.',
        ],
      },
      {
        type: 'p',
        text: 'A useful problem-solving habit is to list out every known quantity (u, v, a, t, s) before choosing which equation to apply — usually only one of the three will contain exactly the variables you need, letting you solve in a single step rather than juggling simultaneous equations.',
      },
      { type: 'h2', text: "Newton's Laws of Motion" },
      {
        type: 'p',
        text: 'Once you can describe motion, the next question is what causes it to change. Sir Isaac Newton answered this with three deceptively simple laws that still form the backbone of classical mechanics taught in every school and engineering programme today.',
      },
      { type: 'h3', text: 'First Law — The Law of Inertia' },
      {
        type: 'p',
        text: 'An object at rest stays at rest, and an object in motion continues moving at constant velocity in a straight line, unless acted upon by a net external force. This tendency to resist a change in motion is called inertia, and it is directly proportional to an object\'s mass — heavier objects are harder to start moving and harder to stop.',
      },
      { type: 'h3', text: 'Second Law — Force, Mass, and Acceleration' },
      {
        type: 'p',
        text: 'The second law quantifies how force produces acceleration. It is written as F = ma, where F is the net force applied (in newtons), m is the mass of the object (in kilograms), and a is the resulting acceleration (in m/s²). This single equation explains why the same push accelerates a light object more than a heavy one, and it is the starting point for solving almost every dynamics problem.',
      },
      { type: 'h3', text: 'Third Law — Action and Reaction' },
      {
        type: 'p',
        text: 'For every action, there is an equal and opposite reaction. When you push against a wall, the wall pushes back on you with the same magnitude of force but in the opposite direction. This law explains everything from how rockets generate thrust in the vacuum of space to how walking itself is possible.',
      },
      { type: 'h3', text: 'Related Formulas Worth Memorising' },
      {
        type: 'ul',
        items: [
          'Momentum: p = mv (mass times velocity), a vector quantity that is always conserved in a closed system.',
          'Impulse: J = FΔt, equal to the change in momentum an object experiences.',
          'Weight: W = mg, the force of gravity acting on a mass, where g ≈ 9.8 m/s² near Earth\'s surface.',
          'Frictional force: f = μN, where μ is the coefficient of friction and N is the normal force.',
        ],
      },
      { type: 'h2', text: 'Thermodynamics: Heat, Work, and Energy' },
      {
        type: 'p',
        text: 'Thermodynamics studies how energy moves between systems, particularly as heat and work. Unlike kinematics and dynamics, which track individual particles, thermodynamics deals with bulk properties like temperature, pressure, and volume — making it essential for understanding engines, refrigerators, and even biological processes.',
      },
      { type: 'h3', text: 'The Four Laws of Thermodynamics' },
      {
        type: 'ul',
        items: [
          'Zeroth Law: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other — this is what makes temperature measurement meaningful.',
          'First Law: energy cannot be created or destroyed, only converted from one form to another; mathematically, ΔU = Q − W, where ΔU is change in internal energy, Q is heat added, and W is work done by the system.',
          'Second Law: heat flows spontaneously from hot to cold, and the total entropy of an isolated system never decreases over time.',
          'Third Law: as a system\'s temperature approaches absolute zero, its entropy approaches a minimum constant value.',
        ],
      },
      { type: 'h3', text: 'Key Thermodynamic Formulas' },
      {
        type: 'ul',
        items: [
          'Heat transfer: Q = mcΔT, where m is mass, c is specific heat capacity, and ΔT is the temperature change.',
          'Ideal gas law: PV = nRT, linking pressure, volume, moles of gas, the universal gas constant, and temperature.',
          'Carnot engine efficiency: η = 1 − (Tc / Th), the theoretical maximum efficiency between a hot reservoir Th and cold reservoir Tc.',
          'Work done by an expanding gas at constant pressure: W = PΔV.',
        ],
      },
      {
        type: 'p',
        text: 'Together, kinematics, the laws of motion, and thermodynamics form the foundation of classical physics. Mastering the definitions, memorising the core formulas, and practising plenty of numerical problems is the fastest route to becoming comfortable with this material — download the companion formula sheet below once you have solved today\'s puzzle for a compact reference you can revise from anywhere.',
      },
    ],
  },

  maths: {
    slug: 'maths',
    resourceId: 'math-short-notes',
    title: 'Maths Short Notes',
    emoji: '📐',
    category: 'Mathematics',
    icon: 'Calculator',
    tagline:
      'Clear, example-driven notes covering the three subjects that trip up most students the most: Calculus, Algebra, and Trigonometry — with every essential formula explained in plain language.',
    accent: {
      bg: 'linear-gradient(135deg, #e0d4ff, #f0e9ff)',
      border: 'rgba(167, 139, 250, 0.3)',
      icon: '#a78bfa',
      shadow: 'rgba(167, 139, 250, 0.15)',
    },
    blocks: [
      { type: 'h2', text: 'Calculus Essentials' },
      {
        type: 'p',
        text: 'Calculus is the mathematics of change. It is split into two complementary halves — differentiation, which measures how quickly a quantity changes, and integration, which measures the total accumulation of a quantity over an interval. Together they let you model everything from the speed of a falling object to the area under a curved surface.',
      },
      { type: 'h3', text: 'Limits and Derivatives' },
      {
        type: 'p',
        text: 'A derivative describes the instantaneous rate of change of a function — geometrically, it is the slope of the tangent line at a given point. Derivatives are built on the concept of a limit, which asks what value a function approaches as its input gets arbitrarily close to some point, without necessarily reaching it.',
      },
      {
        type: 'ul',
        items: [
          'Power rule: d/dx (xⁿ) = n·xⁿ⁻¹, the single most-used differentiation rule.',
          'Product rule: d/dx (uv) = u′v + uv′, for differentiating a product of two functions.',
          'Quotient rule: d/dx (u/v) = (u′v − uv′) / v², for differentiating a ratio of two functions.',
          'Chain rule: d/dx f(g(x)) = f′(g(x))·g′(x), used whenever one function is nested inside another.',
        ],
      },
      { type: 'h3', text: 'Integration Basics' },
      {
        type: 'p',
        text: 'Integration reverses differentiation. The indefinite integral of a function gives you a family of antiderivatives (plus a constant of integration, C), while the definite integral over an interval gives you a single number representing the net area under the curve between two limits.',
      },
      {
        type: 'ul',
        items: [
          'Power rule for integration: ∫xⁿ dx = xⁿ⁺¹ / (n + 1) + C, valid whenever n ≠ −1.',
          'Integration by parts: ∫u dv = uv − ∫v du, useful for products of functions that don\'t simplify with substitution.',
          'The Fundamental Theorem of Calculus links the two halves of calculus: it states that definite integration and differentiation are inverse operations.',
        ],
      },
      { type: 'h2', text: 'Algebra Foundations' },
      {
        type: 'p',
        text: 'Algebra generalises arithmetic by using symbols to represent unknown quantities, letting you solve for values that satisfy an equation. Strong algebra fundamentals make every other branch of mathematics — from calculus to statistics — dramatically easier to learn.',
      },
      { type: 'h3', text: 'Quadratic Equations' },
      {
        type: 'p',
        text: 'A quadratic equation takes the form ax² + bx + c = 0, where a ≠ 0. Every quadratic can be solved using the quadratic formula, which works regardless of whether the roots are real or complex, and regardless of how the expression factors:',
      },
      {
        type: 'ul',
        items: [
          'Quadratic formula: x = [−b ± √(b² − 4ac)] / 2a.',
          'The discriminant, b² − 4ac, tells you the nature of the roots — positive means two real roots, zero means one repeated real root, and negative means two complex roots.',
          'Sum of roots = −b/a, and product of roots = c/a, both handy shortcuts for verifying an answer.',
        ],
      },
      { type: 'h3', text: 'Sequences and Series' },
      {
        type: 'ul',
        items: [
          'Arithmetic sequence nth term: aₙ = a₁ + (n − 1)d, where d is the common difference.',
          'Sum of an arithmetic series: Sₙ = n/2 · [2a₁ + (n − 1)d].',
          'Geometric sequence nth term: aₙ = a₁ · rⁿ⁻¹, where r is the common ratio.',
          'Sum of a geometric series: Sₙ = a₁(1 − rⁿ) / (1 − r), for r ≠ 1.',
        ],
      },
      { type: 'h2', text: 'Trigonometry Concepts' },
      {
        type: 'p',
        text: 'Trigonometry studies the relationships between the angles and sides of triangles, and extends naturally into modelling periodic phenomena such as waves, sound, and oscillations. It begins with three fundamental ratios defined on a right-angled triangle.',
      },
      { type: 'h3', text: 'Basic Ratios' },
      {
        type: 'ul',
        items: [
          'sine: sin θ = opposite / hypotenuse',
          'cosine: cos θ = adjacent / hypotenuse',
          'tangent: tan θ = opposite / adjacent = sin θ / cos θ',
        ],
      },
      { type: 'h3', text: 'Key Identities' },
      {
        type: 'ul',
        items: [
          'Pythagorean identity: sin²θ + cos²θ = 1',
          'Angle sum formulas: sin(A ± B) = sinA cosB ± cosA sinB, cos(A ± B) = cosA cosB ∓ sinA sinB',
          'Double angle formulas: sin 2θ = 2 sinθ cosθ, cos 2θ = cos²θ − sin²θ',
        ],
      },
      {
        type: 'p',
        text: 'Calculus, algebra, and trigonometry each build on one another, so revisiting the basics regularly — rather than cramming right before an exam — is the most reliable way to develop lasting fluency. Once you\'ve unlocked your token, grab the short notes below to keep every formula on this page in your pocket.',
      },
    ],
  },

  chemistry: {
    slug: 'chemistry',
    resourceId: 'chemistry-periodic',
    title: 'Chemistry Periodic Guide',
    emoji: '🧪',
    category: 'Chemistry',
    icon: 'FlaskConical',
    tagline:
      'An approachable deep-dive into the Periodic Table, Chemical Bonding, and the basics of Organic Chemistry — everything you need to build a rock-solid foundation for high-school and early college chemistry.',
    accent: {
      bg: 'linear-gradient(135deg, #d4f4e9, #e9f5ef)',
      border: 'rgba(107, 191, 155, 0.3)',
      icon: '#6bbf9b',
      shadow: 'rgba(107, 191, 155, 0.15)',
    },
    blocks: [
      { type: 'h2', text: 'The Periodic Table' },
      {
        type: 'p',
        text: 'The periodic table organises every known element by increasing atomic number, arranging them so that elements with similar chemical behaviour line up in the same column. This single chart is arguably the most information-dense document in all of science, and understanding how it is structured makes memorising individual element facts almost unnecessary.',
      },
      { type: 'h3', text: 'Periods and Groups' },
      {
        type: 'p',
        text: 'Horizontal rows are called periods, and moving across a period adds one proton and one electron at a time, gradually changing an element\'s properties from metallic to non-metallic. Vertical columns are called groups (or families), and elements within the same group share the same number of valence electrons, which is why they react in similar ways — for example, all the alkali metals in Group 1 react vigorously with water.',
      },
      { type: 'h3', text: 'Periodic Trends' },
      {
        type: 'ul',
        items: [
          'Atomic radius generally decreases across a period (due to increasing nuclear pull) and increases down a group (due to added electron shells).',
          'Ionization energy — the energy needed to remove an electron — increases across a period and decreases down a group.',
          'Electronegativity, an atom\'s tendency to attract shared electrons, increases across a period and decreases down a group, with fluorine being the most electronegative element.',
          'Metallic character is the mirror image of electronegativity: it increases down a group and decreases across a period from left to right.',
        ],
      },
      { type: 'h2', text: 'Chemical Bonding' },
      {
        type: 'p',
        text: 'Atoms bond together to reach a more stable, lower-energy electron configuration, typically by achieving a full outer shell. The type of bond that forms depends heavily on the electronegativity difference between the atoms involved.',
      },
      { type: 'h3', text: 'Ionic Bonding' },
      {
        type: 'p',
        text: 'Ionic bonds form when one atom transfers electrons to another, usually between a metal and a non-metal, creating oppositely charged ions that attract each other electrostatically. Sodium chloride (table salt) is the textbook example: sodium loses an electron to become Na⁺, while chlorine gains it to become Cl⁻.',
      },
      { type: 'h3', text: 'Covalent Bonding' },
      {
        type: 'p',
        text: 'Covalent bonds form when two non-metal atoms share electron pairs rather than transferring them outright. These bonds can be single, double, or triple depending on how many electron pairs are shared, and the resulting molecules — like water (H₂O) or methane (CH₄) — typically have much lower melting points than ionic compounds.',
      },
      { type: 'h3', text: 'Metallic Bonding' },
      {
        type: 'p',
        text: 'In metals, valence electrons are delocalised, forming a shared "sea of electrons" that surrounds a lattice of positive metal ions. This electron mobility is exactly why metals conduct electricity and heat so well, and why they can be bent or hammered into new shapes without shattering.',
      },
      { type: 'h2', text: 'Organic Chemistry Basics' },
      {
        type: 'p',
        text: 'Organic chemistry is the study of carbon-containing compounds. Carbon\'s unique ability to form four stable covalent bonds, including long chains and rings with itself, is the reason it underpins the chemistry of all known life and the vast majority of synthetic materials we use every day.',
      },
      { type: 'h3', text: 'Hydrocarbons' },
      {
        type: 'ul',
        items: [
          'Alkanes contain only single bonds between carbon atoms and follow the general formula CₙH₂ₙ₊₂ — methane and propane are common examples.',
          'Alkenes contain at least one carbon-carbon double bond, following the general formula CₙH₂ₙ, and are more reactive than alkanes.',
          'Alkynes contain at least one carbon-carbon triple bond, following the general formula CₙH₂ₙ₋₂, making them the most reactive of the three.',
        ],
      },
      { type: 'h3', text: 'Common Functional Groups' },
      {
        type: 'p',
        text: 'A functional group is a specific arrangement of atoms within a molecule responsible for that molecule\'s characteristic chemical reactions. Recognising functional groups is the key skill that unlocks the rest of organic chemistry.',
      },
      {
        type: 'ul',
        items: [
          'Hydroxyl group (–OH): defines alcohols, such as ethanol.',
          'Carboxyl group (–COOH): defines carboxylic acids, such as acetic acid found in vinegar.',
          'Carbonyl group (C=O): found in aldehydes and ketones.',
          'Amino group (–NH₂): defines amines and is the building block of amino acids and proteins.',
        ],
      },
      {
        type: 'p',
        text: 'From the elegant structure of the periodic table to the countless carbon-based molecules of organic chemistry, these three topics form the backbone of every introductory chemistry course. Solve today\'s puzzle to unlock your token, then grab the full periodic guide below for a handy printable reference.',
      },
    ],
  },
};

export function getSubjectArticle(slug: string | undefined): SubjectArticle | undefined {
  if (!slug) return undefined;
  return subjectArticles[slug];
}
