import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [
            (node) => {
              if (mode === 'production' && node.type === 1) {
                for (let i = 0; i < node.props.length; i += 1) {
                  const p = node.props[i];
                  if (
                    p &&
                    p.type === 6 /* NodeTypes.ATTRIBUTE */ &&
                    p.name === 'data-test'
                  ) {
                    node.props.splice(i, 1);
                    i -= 1;
                  }
                }
              }
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
