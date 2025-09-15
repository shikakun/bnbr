import StyleDictionary from 'style-dictionary';
import { createJavaScriptEsmFormat } from './style-dictionary/formats/javascript-esm.js';
import { createTypeScriptDeclarationsFormat } from './style-dictionary/formats/typescript-declarations.js';

// カスタムフォーマットを登録
StyleDictionary.registerFormat(createJavaScriptEsmFormat());
StyleDictionary.registerFormat(createTypeScriptDeclarationsFormat());

export default {
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/esm',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/esm-declarations',
        },
      ],
    },
  },
};
