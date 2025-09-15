import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTextStyle } from '../useTextStyle';

describe('useTextStyle', () => {
  describe('fontSizeとlineHeightの組み合わせ', () => {
    it('fontSizeとlineHeightを指定しない場合は `m-normal` になる', () => {
      const { result } = renderHook(() => useTextStyle({}));
      expect(result.current.resolvedStyle.lineHeight).toBe('m-normal');
    });

    it('fontSizeを指定せずlineHeightに `normal` を指定した場合は `m-normal` になる', () => {
      const { result } = renderHook(() =>
        useTextStyle({ lineHeight: 'normal' }),
      );
      expect(result.current.resolvedStyle.lineHeight).toBe('m-normal');
    });

    it('fontSizeに `xl` を指定してlineHeightを指定しない場合は `xl-normal` になる', () => {
      const { result } = renderHook(() => useTextStyle({ fontSize: 'xl' }));
      expect(result.current.resolvedStyle.lineHeight).toBe('xl-normal');
    });

    it('fontSizeに `xl` を指定してlineHeightに `normal` を指定した場合は `xl-normal` になる', () => {
      const { result } = renderHook(() =>
        useTextStyle({ fontSize: 'xl', lineHeight: 'normal' }),
      );
      expect(result.current.resolvedStyle.lineHeight).toBe('xl-normal');
    });

    it('fontSizeを指定せずlineHeightに `inherit` を指定した場合は `inherit` になる', () => {
      const { result } = renderHook(() =>
        useTextStyle({ lineHeight: 'inherit' }),
      );
      expect(result.current.resolvedStyle.lineHeight).toBe('inherit');
    });

    it('fontSizeに `xl` を指定してlineHeightに `inherit` を指定した場合は `inherit` になる', () => {
      const { result } = renderHook(() =>
        useTextStyle({ fontSize: 'xl', lineHeight: 'inherit' }),
      );
      expect(result.current.resolvedStyle.lineHeight).toBe('inherit');
    });
  });

  describe('resolvedStyleの生成', () => {
    it('すべてのスタイルプロパティにデフォルト値が設定される', () => {
      const { result } = renderHook(() => useTextStyle({}));
      expect(result.current.resolvedStyle).toEqual({
        fontSize: 'default',
        fontWeight: 'default',
        fontFamily: 'default',
        lineHeight: 'm-normal',
      });
    });

    it('指定されたスタイルプロパティが正しく反映される', () => {
      const { result } = renderHook(() =>
        useTextStyle({
          fontSize: 'xl',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          lineHeight: 'dense',
        }),
      );
      expect(result.current.resolvedStyle).toEqual({
        fontSize: 'xl',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        lineHeight: 'xl-dense',
      });
    });
  });

  describe('classNamesの生成', () => {
    it('基本のtextクラスが含まれる', () => {
      const { result } = renderHook(() => useTextStyle({}));
      expect(
        result.current.classNames.some((className) =>
          className.includes('text'),
        ),
      ).toBe(true);
    });

    it('複数のスタイルクラスが含まれる', () => {
      const { result } = renderHook(() =>
        useTextStyle({
          fontSize: 'xl',
          fontWeight: 'bold',
        }),
      );
      const classNamesString = result.current.classNames.join(' ');
      expect(classNamesString).toContain('fontSize');
      expect(classNamesString).toContain('fontWeight');
    });
  });
});
