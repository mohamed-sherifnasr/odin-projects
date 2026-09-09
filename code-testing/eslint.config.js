import js from "@eslint/js";
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    js.configs.recommended,
     {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]);