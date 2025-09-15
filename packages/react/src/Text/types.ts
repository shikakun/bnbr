import type { Typography } from '@bnbr/design-tokens';
import type { HTMLAttributes, ReactNode } from 'react';

export type FontSize = keyof typeof Typography.fontSize;
export type FontWeight = keyof typeof Typography.fontWeight;
export type FontFamily = keyof typeof Typography.fontFamily;
export type LineHeightDensity = keyof typeof Typography.lineHeight.m;

export type TextStyle = {
  readonly fontSize?: FontSize;
  readonly fontWeight?: FontWeight;
  readonly fontFamily?: FontFamily;
  readonly lineHeight?: LineHeightDensity | 'inherit' | 'default';
};

export interface TextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'style'>,
    TextStyle {
  readonly children: ReactNode;
  readonly as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type ResolvedTextStyle = {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight: string;
};
