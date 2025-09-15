import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import * as Components from '../index';

describe('SSR互換性', () => {
  it.each(Object.entries(Components))(
    '%s がSSRでレンダリングできること',
    (_name, Component) => {
      expect(() => {
        const element = createElement(
          Component as React.ComponentType,
          {},
          'test',
        );
        const result = renderToString(element);
        expect(result).toBeTruthy();
      }).not.toThrow();
    },
  );
});
