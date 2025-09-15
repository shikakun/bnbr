import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('TextコンポーネントのfontSizeとlineHeightの組み合わせテスト', () => {
  it('デフォルトfontSizeとデフォルトlineHeightの場合、m-normalを使用する', () => {
    render(<Text>テストテキスト</Text>);
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightMNormal');
  });

  it('デフォルトfontSizeとnormal密度の場合、m-normalを使用する', () => {
    render(<Text lineHeight="normal">テストテキスト</Text>);
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightMNormal');
  });

  it('デフォルトfontSizeとdense密度の場合、m-denseを使用する', () => {
    render(<Text lineHeight="dense">テストテキスト</Text>);
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightMDense');
  });

  it('カスタムfontSizeとデフォルトlineHeightの場合、fontSize-normalを使用する', () => {
    render(<Text fontSize="xl">テストテキスト</Text>);
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightXlNormal');
  });

  it('カスタムfontSizeとnormal密度の場合、fontSize-normalを使用する', () => {
    render(
      <Text fontSize="s" lineHeight="normal">
        テストテキスト
      </Text>,
    );
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightSNormal');
  });

  it('カスタムfontSizeとdense密度の場合、fontSize-denseを使用する', () => {
    render(
      <Text fontSize="2xl" lineHeight="dense">
        テストテキスト
      </Text>,
    );
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeight2xlDense');
  });

  it('inheritのlineHeightの場合、inheritを使用する', () => {
    render(
      <Text fontSize="l" lineHeight="inherit">
        テストテキスト
      </Text>,
    );
    const element = screen.getByText('テストテキスト');
    expect(element.className).toContain('lineHeightInherit');
  });
});
