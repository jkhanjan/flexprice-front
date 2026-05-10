// PricingTierTable.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Clock3, Database, ShieldCheck } from 'lucide-react';

import PricingTierTable, { PricingTier } from './PricingTierTable';

const tiers: PricingTier[] = [
	{
		id: 'basic',
		title: 'Basic',
		price: 'Free',
		highlightedText: '<strong>100k events</strong> per month',

		features: [
			{
				id: '1',
				label: '3 months Validity',
				icon: <Clock3 size={18} />,
			},
			{
				id: '2',
				label: '1 Year Data Retention',
				icon: <Database size={18} />,
			},
			{
				id: '3',
				label: 'Community Support',
				icon: <ShieldCheck size={18} />,
			},
		],

		cta: {
			label: 'Get Started',
		},
	},

	{
		id: 'starter',
		title: 'Starter',
		price: '$500',
		billingCycle: 'month',
		highlightedText: '<strong>1 million events</strong> per month',

		featured: true,
		featuredLabel: 'Most Popular',

		features: [
			{
				id: '1',
				label: 'Forever Validity',
				icon: <Clock3 size={18} />,
			},
			{
				id: '2',
				label: '7 Year Data Retention',
				icon: <Database size={18} />,
			},
			{
				id: '3',
				label: 'Dedicated Private Support',
				icon: <ShieldCheck size={18} />,
			},
		],

		cta: {
			label: 'Get Started',
		},
	},

	{
		id: 'premium',
		title: 'Premium',
		price: '$1000',
		billingCycle: 'month',
		highlightedText: '<strong>10 million events</strong> per month',

		features: [
			{
				id: '1',
				label: 'Forever Validity',
				icon: <Clock3 size={18} />,
			},
			{
				id: '2',
				label: '7 Year Data Retention',
				icon: <Database size={18} />,
			},
			{
				id: '3',
				label: 'Dedicated Private Support',
				icon: <ShieldCheck size={18} />,
			},
		],

		cta: {
			label: 'Get Started',
		},
	},

	{
		id: 'enterprise',
		title: 'Cloud Enterprise / On Prem',
		price: 'Custom',
		highlightedText: '<strong>Custom events</strong> per month',

		features: [
			{
				id: '1',
				label: 'Forever Validity',
				icon: <Clock3 size={18} />,
			},
			{
				id: '2',
				label: '7 Year Data Retention',
				icon: <Database size={18} />,
			},
			{
				id: '3',
				label: 'Dedicated Private Support',
				icon: <ShieldCheck size={18} />,
			},
		],

		cta: {
			label: 'Contact Us',
		},
	},
];

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,

	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj<typeof PricingTierTable>;

export const Default: Story = {
	args: {
		tiers,
	},
};

export const WithoutFeatured: Story = {
	args: {
		tiers: tiers.map((tier) => ({
			...tier,
			featured: false,
			featuredLabel: undefined,
		})),
	},
};

export const TwoTiers: Story = {
	args: {
		tiers: tiers.slice(0, 2),
	},
};
