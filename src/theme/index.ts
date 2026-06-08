import { moderateScale, scaledFont } from '../utils/responsive';

export const theme = {
  colors: {
    background: '#F5F7FA',
    primary: '#2E7D32',
    secondary: '#81C784',
    white: '#FFFFFF',
    text: {
      main: '#1A1A1A',
      light: '#757575',
    },
    danger: '#D32F2F',
    success: '#388E3C',
    overlay: 'rgba(0,0,0,0.5)',
  },
  spacing: {
    small: moderateScale(8),
    medium: moderateScale(16),
    large: moderateScale(24),
    xlarge: moderateScale(32),
  },
  typography: {
    title: scaledFont(24),
    subtitle: scaledFont(18),
    body: scaledFont(14),
    small: scaledFont(12),
  },
  borderRadius: {
    card: moderateScale(20),
    button: moderateScale(8),
  }
};