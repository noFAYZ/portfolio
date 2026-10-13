import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Source vendored by `shadcn add` (beUI, shadcn). Kept as pulled so a
    // re-pull diffs cleanly: these files export helpers beside components, and
    // use two patterns the compiler rules flag that are safe where they sit —
    // a mounted flag set in an effect before portalling, and a counter bumped
    // while rendering a list.
    files: [
      'src/components/ui/**',
      'src/components/motion/**',
      'src/lib/hooks/**',
      'src/lib/presence-gate.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
    },
  },
])
