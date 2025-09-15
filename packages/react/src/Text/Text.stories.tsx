import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    fontSize: 'default',
    fontWeight: 'default',
    fontFamily: 'default',
    lineHeight: 'default',
    as: 'span',
    children:
      'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
  },
  argTypes: {
    fontSize: {
      control: { type: 'radio' },
    },
    fontWeight: {
      control: { type: 'radio' },
    },
    fontFamily: {
      control: { type: 'radio' },
    },
    lineHeight: {
      control: { type: 'radio' },
    },
    as: {
      control: { type: 'select' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
