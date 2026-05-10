import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

import { CheckCircle2, Clock3, XCircle, Info } from 'lucide-react';

const meta: Meta<typeof Badge> = {
	title: 'Atoms/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'danger', 'info', 'outline'],
		},
		size: {
			control: 'select',
			options: ['sm', 'default', 'lg'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		children: 'Default Badge',
	},
};

export const Success: Story = {
	args: {
		children: 'Paid',
		variant: 'success',
		leftIcon: <CheckCircle2 size={12} />,
	},
};

export const Warning: Story = {
	args: {
		children: 'Pending',
		variant: 'warning',
		leftIcon: <Clock3 size={12} />,
	},
};

export const Danger: Story = {
	args: {
		children: 'Failed',
		variant: 'danger',
		leftIcon: <XCircle size={12} />,
	},
};

export const InfoBadge: Story = {
	args: {
		children: 'Draft',
		variant: 'info',
		leftIcon: <Info size={12} />,
	},
};

export const Outline: Story = {
	args: {
		children: 'Custom',
		variant: 'outline',
	},
};
