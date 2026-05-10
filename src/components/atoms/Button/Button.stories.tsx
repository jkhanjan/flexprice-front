import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Reusable button component with multiple variants and states.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost', 'danger'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Click Me',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		variant: 'secondary',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

export const Loading: Story = {
	args: {
		children: 'Loading...',
		loading: true,
	},
};

export const Large: Story = {
	args: {
		children: 'Large Button',
		size: 'lg',
	},
};

export const Danger: Story = {
	args: {
		children: 'Delete',
		variant: 'danger',
	},
};
