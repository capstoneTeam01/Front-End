export const CATEGORIES = [
  { id: "plumbing", label: "Plumbing", icon: "water-outline" },
  { id: "electrical", label: "Electrical", icon: "flash-outline" },
  { id: "appliances", label: "Appliances", icon: "thermometer-outline" },
];

// Home screen "Popular Repairs"
export const POPULAR_REPAIRS = [
  { id: "leaking-pipe", title: "Leaking Pipe", subtitle: "Plumbing", icon: "water-outline" },
  { id: "flickering-lights", title: "Flickering Lights", subtitle: "Electrical", icon: "flash-outline" },
  { id: "ac-not-cooling", title: "AC Not Cooling", subtitle: "HVAC", icon: "thermometer-outline" },
  { id: "clogged-drain", title: "Clogged Drain", subtitle: "Plumbing", icon: "water-outline" },
  { id: "dead-outlet", title: "Dead Power Outlet", subtitle: "Electrical", icon: "flash-outline" },
];

// Per-category screen content. Keyed by category id.
export const CATEGORY_DETAILS = {
  plumbing: {
    title: "Scan Plumbing Issues",
    description: "Leaks, drains, and water-related issues",
    repairs: [
      { id: "leaking-pipe", title: "Leaking Pipe", subtitle: "Plumbing", icon: "water-outline" },
      { id: "clogged-drain", title: "Clogged Drain", subtitle: "Plumbing", icon: "water-outline" },
      { id: "toilet-overflow", title: "Toilet Overflow", subtitle: "Needs immediate attention", icon: "flash-outline" },
      { id: "low-water-pressure", title: "Low Water Pressure", subtitle: "Faucet or shower", icon: "filter-outline" },
    ],
  },
  electrical: {
    title: "Scan Electrical Issues",
    description: "Outlets, wiring, and power-related issues",
    repairs: [
      { id: "flickering-lights", title: "Flickering Lights", subtitle: "Electrical", icon: "flash-outline" },
      { id: "dead-outlet", title: "Dead Power Outlet", subtitle: "Electrical", icon: "flash-outline" },
    ],
  },
  appliances: {
    title: "Scan Appliance Issues",
    description: "Heating, cooling, and appliance faults",
    repairs: [
      { id: "ac-not-cooling", title: "AC Not Cooling", subtitle: "HVAC", icon: "thermometer-outline" },
    ],
  },
};