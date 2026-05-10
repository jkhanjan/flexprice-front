import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';
import { DollarSign, Users, Activity } from 'lucide-react';

const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

export const Revenue: Story = {
	args: {
		title: 'Monthly Revenue',
		value: '$24,500',
		change: '+12.5%',
		trend: 'up',
		icon: <DollarSign size={18} />,
	},
};

export const UsersMetric: Story = {
	args: {
		title: 'Active Users',
		value: '12,450',
		change: '+4.2%',
		trend: 'up',
		icon: <Users size={18} />,
	},
};

export const ErrorRate: Story = {
	args: {
		title: 'Error Rate',
		value: '2.4%',
		change: '-1.1%',
		trend: 'down',
		icon: <Activity size={18} />,
	},
};

export const Loading: Story = {
	args: {
		title: '',
		value: '',
		loading: true,
	},
};
