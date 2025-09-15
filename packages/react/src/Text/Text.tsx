import clsx from 'clsx';
import { useTextStyle } from './hooks/useTextStyle';
import type { TextProps, TextStyle } from './types';

export const Text = ({
  children,
  as: Component = 'span',
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  className,
  ...htmlProps
}: TextProps) => {
  const styleProps: TextStyle = {
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(fontWeight !== undefined ? { fontWeight } : {}),
    ...(fontFamily !== undefined ? { fontFamily } : {}),
    ...(lineHeight !== undefined ? { lineHeight } : {}),
  };

  const { classNames } = useTextStyle(styleProps);

  return (
    <Component className={clsx(classNames, className)} {...htmlProps}>
      {children}
    </Component>
  );
};
