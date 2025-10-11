import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                neon: {
                    primary: '#00E676',
                    primaryDark: '#00C853',
                    accent: '#00FFD1',
                    bg: '#0A0F0D',
                    text: '#E6FFE6',
                    muted: '#A3F7B5',
                },
            },
        },
    },
    plugins: [forms],
};
