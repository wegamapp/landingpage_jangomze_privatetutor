export type ProjectType = "app" | "paper" | "project";

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  paperUrl?: string;
  builtWith: string[];
}

export const portfolioProjects: Project[] = [
  {
    id: "real-auto-solution",
    title: "RealAutoSolution",
    type: "app",
    description:
      "A multi-tenant incident-management SaaS that gives tenants a direct reporting channel and keeps SLA escalation moving.",
    tags: ["Next.js 15", "React 19", "Supabase", "PostgreSQL RLS", "Multi-tenant SaaS"],
    image: "/images/RealState.png",
    demoUrl: "https://github.com/NIU1751879/RealStateSolution",
    builtWith: ["Next.js 15", "React 19", "Supabase", "Postgres RPCs", "Row-Level Security"],
  },
  {
    id: "statistical-arbitrage",
    title: "Statistical Arbitrage & Mean Reversion Strategies",
    type: "paper",
    description:
      "An open write-up on cointegration-driven pairs trading across equities, crypto, and FX, including Kalman-filtered hedge ratios and trading costs.",
    tags: ["Python", "statsmodels", "Kalman Filter", "Cointegration", "Quant Research"],
    image: "/images/residuals.jpg",
    paperUrl: "https://github.com/NIU1751879/Trading_Strategies/tree/main",
    builtWith: ["Python", "Johansen/VECM", "Kalman Filtering", "Transaction-cost analysis"],
  },
  {
    id: "bootstrap-risk-management",
    title: "Bootstrap Methods for Financial Risk Management",
    type: "paper",
    description:
      "A comparison of parametric and percentile/BCa bootstrap VaR intervals on BTC-USD, showing how parametric VaR can understate tail risk.",
    tags: ["Python", "Bootstrap Resampling", "Value-at-Risk", "Hypothesis Testing"],
    image: "/images/Bootstrap.png",
    paperUrl: "https://github.com/NIU1751879/QuantbootstrapVAR",
    builtWith: ["Python", "Parametric VaR", "Percentile Bootstrap", "BCa Bootstrap"],
  },
  {
    id: "real-options-valuation",
    title: "Numerical Methods for Real Options Valuation",
    type: "paper",
    description:
      "A benchmark of Euler, Heun, RK2, and RK4 ODE solvers against a closed-form real-options solution.",
    tags: ["Python", "Numerical ODE Solvers", "Options Pricing"],
    image: "/images/RO_NUM.png",
    paperUrl: "https://github.com/NIU1751879/NUM_METHODS_RealOptions",
    builtWith: ["Python", "Euler", "Heun", "RK2", "RK4"],
  },
  {
    id: "image-categorization",
    title: "E-Commerce Automated Image Categorization Engine",
    type: "project",
    description:
      "A KNN and K-Means pipeline for clothing shape and colour tagging, where ROI isolation improved accuracy from 37.9% to 53.7%.",
    tags: ["Python", "K-Means++", "Computer Vision"],
    image: "/images/Clasificator_heat.png",
    repoUrl: "https://example.com/image-categorization",
    builtWith: ["Python", "KNN", "K-Means++", "Fashion-MNIST", "ROI isolation"],
  },
  {
    id: "spinortechnologies",
    title: "Spinortechnologies",
    type: "project",
    description:
      "An independent quant research group I founded to read academic papers and publish strategy design in the open.",
    tags: ["Quant Research", "Community", "Open Research"],
    image: "/images/spinor-tecnologies.png",
    repoUrl: "https://spinortechnologies.com",
    builtWith: ["Academic literature review", "Python", "Open write-ups", "Peer discussion"],
  },
];
