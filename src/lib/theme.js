// Global theme configuration for color usage across the app
// Primary (Emerald Deep), Secondary (Emerald Light), Accent (Warm Amber)
// Use these constants (preferably via inline style for dynamic cases) to ensure consistency.

export const theme = {
  primary: '#059669',      // Emerald 600
  secondary: '#10B981',    // Emerald 500
  accent: '#F59E0B',       // Amber 500
  // Common gradients
  gradients: {
    primary: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    primaryAccent: 'linear-gradient(135deg, #059669 0%, #10B981 55%, #F59E0B 100%)'
  }
};

export const gradientTextStyle = {
  backgroundImage: 'linear-gradient(90deg, #059669, #10B981)',
  WebkitBackgroundClip: 'text',
  color: 'transparent'
};
