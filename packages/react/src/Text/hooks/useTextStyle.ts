import { useMemo } from 'react';
import styles from '../Text.module.css';
import type { ResolvedTextStyle, TextStyle } from '../types';

const createStyleMaps = () => {
  const fontSizeMap = new Map<string, string>([
    ['2xs', styles.fontSize2xs ?? ''],
    ['xs', styles.fontSizeXs ?? ''],
    ['s', styles.fontSizeS ?? ''],
    ['m', styles.fontSizeM ?? ''],
    ['l', styles.fontSizeL ?? ''],
    ['xl', styles.fontSizeXl ?? ''],
    ['2xl', styles.fontSize2xl ?? ''],
    ['3xl', styles.fontSize3xl ?? ''],
    ['4xl', styles.fontSize4xl ?? ''],
    ['5xl', styles.fontSize5xl ?? ''],
    ['6xl', styles.fontSize6xl ?? ''],
    ['default', styles.fontSizeDefault ?? ''],
    ['inherit', styles.fontSizeInherit ?? ''],
  ]);

  const fontWeightMap = new Map<string, string>([
    ['normal', styles.fontWeightNormal ?? ''],
    ['bold', styles.fontWeightBold ?? ''],
    ['default', styles.fontWeightDefault ?? ''],
    ['inherit', styles.fontWeightInherit ?? ''],
  ]);

  const fontFamilyMap = new Map<string, string>([
    ['sansSerif', styles.fontFamilySansSerif ?? ''],
    ['monospace', styles.fontFamilyMonospace ?? ''],
    ['default', styles.fontFamilyDefault ?? ''],
    ['inherit', styles.fontFamilyInherit ?? ''],
  ]);

  const lineHeightMap = new Map<string, string>([
    ['inherit', styles.lineHeightInherit ?? ''],
  ]);

  const sizes = [
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
  ] as const;
  const densities = ['dense', 'normal', 'comfort'] as const;

  for (const size of sizes) {
    for (const density of densities) {
      const key = `${size}-${density}`;
      const className =
        `lineHeight${size.charAt(0).toUpperCase() + size.slice(1)}${
          density.charAt(0).toUpperCase() + density.slice(1)
        }` as keyof typeof styles;
      lineHeightMap.set(key, styles[className] ?? '');
    }
  }

  return { fontSizeMap, fontWeightMap, fontFamilyMap, lineHeightMap };
};

const resolveStyle = (style: TextStyle): ResolvedTextStyle => {
  const fontSize = style.fontSize ?? 'default';

  let lineHeight: string;
  if (style.lineHeight === undefined) {
    const actualFontSize = fontSize === 'default' ? 'm' : fontSize;
    lineHeight = `${actualFontSize}-normal`;
  } else if (style.lineHeight === 'inherit') {
    lineHeight = 'inherit';
  } else if (
    ['dense', 'normal', 'comfort', 'default'].includes(style.lineHeight)
  ) {
    const density =
      style.lineHeight === 'default' ? 'normal' : style.lineHeight;
    const actualFontSize = fontSize === 'default' ? 'm' : fontSize;
    lineHeight = `${actualFontSize}-${density}`;
  } else {
    lineHeight = style.lineHeight;
  }

  return {
    fontSize,
    fontWeight: style.fontWeight ?? 'default',
    fontFamily: style.fontFamily ?? 'default',
    lineHeight,
  };
};

const createClassNames = (
  resolvedStyle: ResolvedTextStyle,
  styleMaps: ReturnType<typeof createStyleMaps>,
): string[] => {
  const { fontSize, fontWeight, fontFamily, lineHeight } = resolvedStyle;
  const { fontSizeMap, fontWeightMap, fontFamilyMap, lineHeightMap } =
    styleMaps;

  const classNames = [
    styles.text,
    fontSizeMap.get(fontSize),
    fontWeightMap.get(fontWeight),
    fontFamilyMap.get(fontFamily),
    lineHeightMap.get(lineHeight),
  ];

  return classNames.filter(Boolean) as string[];
};

export const useTextStyle = (style: TextStyle) => {
  const styleMaps = useMemo(() => createStyleMaps(), []);

  const resolvedStyle = useMemo(() => resolveStyle(style), [style]);

  const classNames = useMemo(
    () => createClassNames(resolvedStyle, styleMaps),
    [resolvedStyle, styleMaps],
  );

  return {
    resolvedStyle,
    classNames,
  };
};
