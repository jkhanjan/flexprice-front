import type { Meta, StoryObj } from '@storybook/react';
import MeterProgress from './MeterProgress';

const meta: Meta<typeof MeterProgress> = {
	title: 'Molecules/MeterProgress',
	component: MeterProgress,
	tags: ['autodocs'],

	argTypes: {
		used: {
			control: 'number',
		},

		total: {
			control: 'number',
		},

		showPercentage: {
			control: 'boolean',
		},
	},
};

export default meta;

type Story = StoryObj<typeof MeterProgress>;

export const Default: Story = {
	args: {
		label: 'API Requests',
		used: 7200,
		total: 10000,
	},
};

export const LowUsage: Story = {
	args: {
		label: 'Storage',
		used: 120,
		total: 1000,
	},
};

export const MediumUsage: Story = {
	args: {
		label: 'Bandwidth',
		used: 680,
		total: 1000,
	},
};

export const HighUsage: Story = {
	args: {
		label: 'Monthly Credits',
		used: 950,
		total: 1000,
	},
};

export const FullUsage: Story = {
	args: {
		label: 'Team Seats',
		used: 100,
		total: 100,
	},
};

export const Playground: Story = {
	args: {
		label: 'API Requests',
		used: 7200,
		total: 10000,
		showPercentage: true,
	},
};
