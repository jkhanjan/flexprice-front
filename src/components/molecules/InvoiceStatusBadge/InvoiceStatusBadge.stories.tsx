import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],

	argTypes: {
		status: {
			control: 'select',
			options: ['paid', 'pending', 'failed', 'draft', 'overdue'],
		},

		count: {
			control: 'number',
		},
	},
};

export default meta;

type Story = StoryObj<typeof InvoiceStatusBadge>;

export const Paid: Story = {
	args: {
		status: 'paid',
		count: 24,
	},
};

export const Pending: Story = {
	args: {
		status: 'pending',
		count: 8,
	},
};

export const Failed: Story = {
	args: {
		status: 'failed',
		count: 3,
	},
};

export const Draft: Story = {
	args: {
		status: 'draft',
		count: 12,
	},
};

export const Overdue: Story = {
	args: {
		status: 'overdue',
		count: 5,
	},
};

export const Playground: Story = {
	args: {
		status: 'paid',
		count: 24,
	},
};

export const WithoutCount: Story = {
	args: {
		status: 'paid',
	},
};
