export type ArticleBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export interface SubjectArticle {
  slug: string;
  resourceId: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  blocks: ArticleBlock[];
}

export const subjectArticles: SubjectArticle[] = [
  {
    slug: 'physics',
    resourceId: 'physics-formula',
    title: 'Physics Study Guide: Kinematics, Laws of Motion & Thermodynamics',
    metaTitle: "Physics Formulas Guide — Kinematics, Newton's Laws & Thermodynamics | Study Wallah Samir",
    metaDescription:
      'A complete, easy-to-follow physics study guide covering kinematics equations, the three laws of motion, and the fundamentals of thermodynamics with formulas and examples.',
    intro:
      'Physics is the science of understanding how and why the universe behaves the way it does, from a dropped pencil to the orbit of planets. This guide breaks down three of the most important foundational topics in classical physics — kinematics, the laws of motion, and thermodynamics — into clear explanations, key formulas, and worked concepts you can actually use while solving problems.',
    blocks: [
      { type: 'h2', text: 'Understanding Kinematics: The Language of Motion' },
      {
        type: 'p',
        text: 'Kinematics is the branch of mechanics that describes how objects move, using quantities like displacement, velocity, and acceleration, without worrying about what caused that motion. It gives us the mathematical vocabulary to answer questions like "how far did the object travel?", "how fast is it moving right now?", and "how quickly is its speed changing?" Before diving into equations, it helps to clearly separate the core quantities kinematics deals with.',
      },
      {
        type: 'ul',
        items: [
          'Displacement (s): the shortest straight-line distance between the initial and final position, along with direction — a vector quantity measured in metres.',
          'Velocity (v): the rate of change of displacement with time; average velocity is total displacement divided by total time, while instantaneous velocity is the velocity at a specific moment.',
          'Acceleration (a): the rate of change of velocity with time, measured in metres per second squared (m/s²).',
          'Time (t): the duration over which the motion is being studied, measured in seconds.',
        ],
      },
      { type: 'h3', text: 'The Three Equations of Motion' },
      {
        type: 'p',
        text: 'For an object moving with uniform (constant) acceleration in a straight line, three equations connect displacement, initial velocity, final velocity, acceleration, and time. These are among the most frequently used formulas in all of introductory physics, and mastering them makes solving projectile motion, free-fall, and straight-line motion problems dramatically easier.',
      },
      {
        type: 'ul',
        items: [
          'First equation of motion: v = u + at — this relates final velocity (v) to initial velocity (u), acceleration (a), and time (t).',
          'Second equation of motion: s = ut + ½at² — this gives the displacement (s) covered during time t.',
          'Third equation of motion: v² = u² + 2as — this connects velocity and displacement directly, without needing time.',
        ],
      },
      {
        type: 'p',
        text: "A practical tip: whenever a problem gives you three known quantities out of {u, v, a, s, t} and asks for a fourth, pick the equation that does not contain the unknown fifth quantity — this saves a step and avoids unnecessary algebra. For motion under gravity, acceleration a is typically replaced with g (approximately 9.8 m/s² near Earth's surface), and displacement s becomes height h.",
      },
      { type: 'h2', text: "Newton's Laws of Motion" },
      {
        type: 'p',
        text: "Sir Isaac Newton's three laws of motion form the backbone of classical mechanics. They explain not just how objects move, but why they move the way they do when forces act upon them. Every branch of engineering, from building bridges to designing rockets, rests on these three deceptively simple statements.",
      },
      { type: 'h3', text: 'The First Law — Law of Inertia' },
      {
        type: 'p',
        text: 'An object at rest stays at rest, and an object in motion continues moving at a constant velocity in a straight line, unless acted upon by a net external force. This property of matter to resist changes in its state of motion is called inertia. It is why passengers in a braking car feel pushed forward — their bodies are trying to continue moving at the original speed of the car.',
      },
      { type: 'h3', text: 'The Second Law — Force and Acceleration' },
      {
        type: 'p',
        text: 'The second law quantifies how force, mass, and acceleration relate to each other with the equation F = ma, where F is the net force applied (in Newtons), m is the mass of the object (in kilograms), and a is the resulting acceleration (in m/s²). This tells us that for a given force, a more massive object accelerates less, and for a given mass, more force produces greater acceleration.',
      },
      { type: 'h3', text: 'The Third Law — Action and Reaction' },
      {
        type: 'p',
        text: 'For every action, there is an equal and opposite reaction. When you push against a wall, the wall pushes back on you with the same amount of force in the opposite direction. This principle explains everything from how rockets launch (expelling gas downward pushes the rocket upward) to how we walk (pushing backward on the ground propels us forward).',
      },
      { type: 'h2', text: 'Thermodynamics: Heat, Work, and Energy' },
      {
        type: 'p',
        text: "Thermodynamics studies the relationships between heat, work, temperature, and energy, and how energy transforms from one form to another within a system. It is essential for understanding everything from car engines to refrigerators to the human body's metabolism.",
      },
      { type: 'h3', text: 'The Zeroth and First Laws' },
      {
        type: 'p',
        text: 'The Zeroth Law states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other — this is what makes the concept of temperature and thermometers meaningful. The First Law of Thermodynamics is essentially a statement of energy conservation: ΔU = Q − W, where ΔU is the change in internal energy of a system, Q is the heat added to the system, and W is the work done by the system on its surroundings.',
      },
      { type: 'h3', text: 'The Second Law and Entropy' },
      {
        type: 'p',
        text: 'The Second Law of Thermodynamics states that the total entropy (a measure of disorder) of an isolated system can never decrease over time — it explains why heat flows naturally from hot objects to cold ones, and never spontaneously in reverse, and why no engine can be 100% efficient at converting heat into work.',
      },
      { type: 'h3', text: 'The Ideal Gas Equation' },
      {
        type: 'p',
        text: 'For a fixed amount of gas behaving ideally, pressure, volume, and temperature are linked by PV = nRT, where P is pressure, V is volume, n is the number of moles of gas, R is the universal gas constant, and T is absolute temperature in Kelvin. This single formula lets you predict how a gas will behave when you compress it, heat it, or change the amount of gas present, and it forms the starting point for more advanced thermodynamic cycles studied in engines and refrigeration systems.',
      },
      {
        type: 'p',
        text: "Together, kinematics, Newton's laws, and thermodynamics give you the tools to describe motion, explain why that motion happens, and understand how energy flows through physical systems — the essential toolkit for tackling almost any introductory mechanics or heat-and-energy problem you'll encounter in your coursework.",
      },
    ],
  },
  {
    slug: 'maths',
    resourceId: 'math-short-notes',
    title: 'Maths Short Notes: Calculus, Algebra & Trigonometry Essentials',
    metaTitle: 'Maths Study Guide — Calculus, Algebra & Trigonometry Concepts | Study Wallah Samir',
    metaDescription:
      'Clear, exam-ready mathematics notes covering calculus fundamentals, algebra techniques, and trigonometric identities, with formulas and worked explanations.',
    intro:
      "Mathematics is the common language behind physics, engineering, economics, and computer science. This guide walks through three pillars every student needs to be comfortable with — calculus, algebra, and trigonometry — explaining the core ideas in plain language alongside the formulas you'll actually use on exams and assignments.",
    blocks: [
      { type: 'h2', text: 'Calculus: Understanding Change' },
      {
        type: 'p',
        text: 'Calculus is the mathematics of change and accumulation. It splits into two closely related halves — differential calculus, which studies rates of change (how fast something is changing), and integral calculus, which studies accumulation (how much has built up over an interval). Together, they let us model everything from the speed of a falling object to the area under a curved graph.',
      },
      { type: 'h3', text: 'Differentiation Basics' },
      {
        type: 'p',
        text: "The derivative of a function f(x), written f'(x) or dy/dx, measures the instantaneous rate of change of that function at a given point — geometrically, it is the slope of the tangent line to the curve at that point. Some of the most common differentiation rules are essential to memorise and apply quickly.",
      },
      {
        type: 'ul',
        items: [
          "Power Rule: if f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹.",
          "Sum Rule: the derivative of a sum is the sum of the derivatives — (f + g)' = f' + g'.",
          "Product Rule: (f·g)' = f'·g + f·g' — used when differentiating a product of two functions.",
          "Chain Rule: for a composite function f(g(x)), the derivative is f'(g(x))·g'(x) — used whenever one function is nested inside another.",
        ],
      },
      { type: 'h3', text: 'Integration Basics' },
      {
        type: 'p',
        text: 'Integration is essentially the reverse process of differentiation. The indefinite integral of f(x), written ∫f(x) dx, gives you a family of functions whose derivative is f(x), always including a constant of integration (+C). The definite integral, written ∫ₐᵇ f(x) dx, calculates the exact area between the curve and the x-axis from x = a to x = b, and is evaluated using the Fundamental Theorem of Calculus by finding the antiderivative and subtracting its value at the two limits.',
      },
      { type: 'h2', text: 'Algebra: Working With the Unknown' },
      {
        type: 'p',
        text: 'Algebra provides the tools to represent unknown quantities with symbols and manipulate equations to solve for them. It is the backbone of almost every other branch of mathematics and shows up constantly in real-world problem solving, from budgeting to physics formulas.',
      },
      { type: 'h3', text: 'Solving Linear and Quadratic Equations' },
      {
        type: 'p',
        text: 'A linear equation, such as ax + b = 0, has exactly one solution, found by isolating x: x = −b/a. A quadratic equation, of the general form ax² + bx + c = 0, can have zero, one, or two real solutions, and can be solved by factoring, completing the square, or using the quadratic formula: x = (−b ± √(b² − 4ac)) / 2a. The expression under the square root, b² − 4ac, is called the discriminant, and its sign tells you how many real roots the equation has.',
      },
      { type: 'h3', text: 'Key Algebraic Identities' },
      {
        type: 'ul',
        items: [
          '(a + b)² = a² + 2ab + b²',
          '(a − b)² = a² − 2ab + b²',
          '(a + b)(a − b) = a² − b²',
          '(a + b)³ = a³ + 3a²b + 3ab² + b³',
        ],
      },
      { type: 'h2', text: 'Trigonometry: Angles and Ratios' },
      {
        type: 'p',
        text: 'Trigonometry studies the relationships between the angles and sides of triangles, and extends into modelling periodic phenomena like sound waves, tides, and oscillations. It begins with the three primary ratios defined for a right-angled triangle.',
      },
      { type: 'h3', text: 'Primary Trigonometric Ratios' },
      {
        type: 'ul',
        items: [
          'Sine: sin(θ) = opposite side / hypotenuse',
          'Cosine: cos(θ) = adjacent side / hypotenuse',
          'Tangent: tan(θ) = opposite side / adjacent side, which also equals sin(θ)/cos(θ)',
        ],
      },
      { type: 'h3', text: 'The Pythagorean Identity and Beyond' },
      {
        type: 'p',
        text: 'One of the most important relationships in trigonometry is the identity sin²(θ) + cos²(θ) = 1, which follows directly from the Pythagorean theorem applied to the unit circle. From this single identity, several others can be derived, including 1 + tan²(θ) = sec²(θ) and 1 + cot²(θ) = cosec²(θ). These identities are heavily used to simplify trigonometric expressions and solve trigonometric equations across both algebra and calculus problems.',
      },
      {
        type: 'p',
        text: 'Mastering calculus, algebra, and trigonometry together builds a strong mathematical foundation — algebra gives you the manipulation skills, trigonometry gives you the geometric relationships, and calculus lets you analyse how everything changes and accumulates, making these three topics some of the highest-value areas to revise thoroughly before any exam.',
      },
    ],
  },
  {
    slug: 'chemistry',
    resourceId: 'chemistry-periodic',
    title: 'Chemistry Guide: Periodic Table, Chemical Bonding & Organic Basics',
    metaTitle: 'Chemistry Study Guide — Periodic Table, Bonding & Organic Chemistry | Study Wallah Samir',
    metaDescription:
      'An in-depth chemistry guide covering periodic table trends, ionic and covalent bonding, and the fundamentals of organic chemistry, explained simply.',
    intro:
      'Chemistry connects the microscopic world of atoms to the macroscopic materials and reactions we see every day. This guide covers three essential foundations — how the periodic table is organised, how atoms bond together to form compounds, and the basic building blocks of organic chemistry — to give you a solid base for more advanced study.',
    blocks: [
      { type: 'h2', text: 'The Periodic Table: Organising the Elements' },
      {
        type: 'p',
        text: 'The periodic table arranges all known chemical elements by increasing atomic number, grouping them so that elements with similar chemical properties line up in the same vertical column, called a group, while horizontal rows are called periods. This arrangement is not arbitrary — it directly reflects the electron configuration of each atom, particularly the arrangement of electrons in the outermost, or valence, shell.',
      },
      { type: 'h3', text: 'Groups, Periods, and Key Trends' },
      {
        type: 'p',
        text: 'Elements in the same group share the same number of valence electrons, which is why they display similar chemical behaviour — for example, Group 1 elements (the alkali metals) all react vigorously with water because they each have a single valence electron they readily lose. Moving across a period from left to right, several important trends emerge as the nuclear charge increases.',
      },
      {
        type: 'ul',
        items: [
          'Atomic radius generally decreases across a period (as electrons are pulled closer by increasing nuclear charge) and increases down a group (as additional electron shells are added).',
          'Ionisation energy — the energy needed to remove an electron — generally increases across a period and decreases down a group.',
          'Electronegativity, the tendency of an atom to attract electrons in a bond, generally increases across a period and decreases down a group.',
          'Metallic character decreases across a period and increases down a group, which is why metals cluster on the left and bottom-left of the table.',
        ],
      },
      { type: 'h2', text: 'Chemical Bonding: How Atoms Connect' },
      {
        type: 'p',
        text: "Atoms bond with one another to achieve a more stable, lower-energy electron configuration, typically by filling their outermost shell. The way this is achieved determines the type of bond formed, and understanding bond types is essential for predicting a compound's properties, from melting point to solubility.",
      },
      { type: 'h3', text: 'Ionic Bonds' },
      {
        type: 'p',
        text: 'Ionic bonds form when one atom transfers one or more electrons to another, typically between a metal and a non-metal. The metal atom becomes a positively charged cation, the non-metal becomes a negatively charged anion, and the two ions are held together by strong electrostatic attraction. Compounds like sodium chloride (table salt) are classic examples, and ionic compounds generally have high melting points and conduct electricity when dissolved in water.',
      },
      { type: 'h3', text: 'Covalent Bonds' },
      {
        type: 'p',
        text: 'Covalent bonds form when two atoms, typically both non-metals, share one or more pairs of electrons rather than transferring them outright. A single covalent bond shares one electron pair, a double bond shares two pairs, and a triple bond shares three pairs. Covalent compounds, such as water (H₂O) or carbon dioxide (CO₂), typically have lower melting points than ionic compounds and do not conduct electricity in their pure liquid form.',
      },
      { type: 'h3', text: 'Metallic Bonds' },
      {
        type: 'p',
        text: 'Metallic bonding occurs between metal atoms, where valence electrons become delocalised and move freely across a lattice of positively charged metal ions, often described as a "sea of electrons." This structure explains why metals are excellent electrical and thermal conductors, and why they can be bent and shaped (malleable and ductile) without breaking.',
      },
      { type: 'h2', text: 'Organic Chemistry: The Chemistry of Carbon' },
      {
        type: 'p',
        text: "Organic chemistry is the study of carbon-containing compounds, which form the basis of all known life and a huge portion of modern materials, medicines, and fuels. Carbon's unique ability to form four stable covalent bonds, including long chains and rings with itself, allows for an almost unlimited variety of molecular structures.",
      },
      { type: 'h3', text: 'Hydrocarbons: The Simplest Organic Compounds' },
      {
        type: 'p',
        text: 'Hydrocarbons contain only carbon and hydrogen atoms, and are classified by the type of carbon-carbon bonds they contain. Alkanes contain only single bonds and are called saturated hydrocarbons (e.g., methane, CH₄). Alkenes contain at least one carbon-carbon double bond, and alkynes contain at least one carbon-carbon triple bond — both are called unsaturated hydrocarbons because they can react further to add more atoms across those multiple bonds.',
      },
      { type: 'h3', text: 'Functional Groups' },
      {
        type: 'p',
        text: "A functional group is a specific arrangement of atoms within a molecule that is responsible for that molecule's characteristic chemical reactions, largely independent of the rest of the molecule's structure. Common functional groups include the hydroxyl group (-OH) found in alcohols, the carboxyl group (-COOH) found in carboxylic acids, and the amino group (-NH₂) found in amines. Recognising functional groups is the key skill needed to predict how an organic molecule will react and to classify it correctly.",
      },
      {
        type: 'p',
        text: 'From the structured layout of the periodic table, to the bonds that hold matter together, to the vast diversity of carbon-based organic molecules, these three topics form the essential foundation for every further chemistry topic you will encounter, including reaction kinetics, thermochemistry, and biochemistry.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string | undefined): SubjectArticle | undefined {
  return subjectArticles.find((article) => article.slug === slug);
}
