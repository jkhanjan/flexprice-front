import React from 'react';
import { Layers3, Clock, Database, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface PricingFeature {
	id: string;
	label: string;
	icon?: React.ReactNode;
}

interface PricingCTA {
	label: string;
	onClick?: () => void;
}

export interface PricingTier {
	id: string;
	title: string;
	price: string;
	billingCycle?: string;
	highlightedText: string;
	features: PricingFeature[];
	featured?: boolean;
	featuredLabel?: string;
	cta: PricingCTA;
}

interface PricingTierTableProps {
	tiers: PricingTier[];
	className?: string;
}

interface PricingTierCardProps {
	tier: PricingTier;
	isFirst: boolean;
	isLast: boolean;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({ tier, isFirst, isLast }) => {
	return (
		<div
			className={cn(
				'relative flex flex-1 flex-col bg-white px-6 pb-6 pt-8',
				'border-r border-slate-300 last:border-r-0',
				tier.featured && 'bg-slate-50',
				isFirst && 'rounded-l-lg',
				isLast && 'rounded-r-lg',
			)}>
			{/* Featured Badge */}
			{tier.featured && (
				<div className='absolute right-0  -translate-y-1/2'>
					<span className='bg-slate-900 px-4 py-1 text-xs font-medium text-white'>{tier.featuredLabel || 'Most Popular'}</span>
				</div>
			)}

			{/* Plan Name */}
			<p className='text-sm text-slate-500'>{tier.title}</p>

			{/* Price */}
			<div className='mt-2 flex items-end gap-1'>
				<span className={cn('font-bold leading-none tracking-tight text-slate-700 text-4xl', tier.price === 'Custom' ? 'text-4xl' : '')}>
					{tier.price}
				</span>
				{tier.billingCycle && <span className='mb-1 text-sm text-slate-400'>/ {tier.billingCycle}</span>}
			</div>

			{/* Highlighted Feature */}
			<div className='my-4 flex items-center gap-2 border-y border-dashed border-slate-300 py-3'>
				<Layers3 className='h-4 w-4 shrink-0 text-sky-500' />
				<span className='text-sm text-slate-800' dangerouslySetInnerHTML={{ __html: tier.highlightedText }} />
			</div>

			{/* Features */}
			<ul className='flex flex-1 flex-col gap-3'>
				{tier.features.map((feature) => (
					<li key={feature.id} className='flex items-center gap-2'>
						<span className='text-sky-500'>{feature.icon}</span>
						<span className='text-sm text-slate-800'>{feature.label}</span>
					</li>
				))}
			</ul>

			{/* CTA */}
			<Button variant='default' size='lg' className={cn('mt-6 w-full rounded-md bg-slate-800 px-4 py-3')}>
				{tier.cta.label}
			</Button>
		</div>
	);
};

const PricingTierTable: React.FC<PricingTierTableProps> = ({ tiers, className }) => {
	return (
		<section className={cn('w-full', className)}>
			<div className='flex flex-row overflow-visible rounded-lg border border-slate-300'>
				{tiers.map((tier, index) => (
					<PricingTierCard key={tier.id} tier={tier} isFirst={index === 0} isLast={index === tiers.length - 1} />
				))}
			</div>
		</section>
	);
};

export default PricingTierTable;

export const exampleTiers: PricingTier[] = [
	{
		id: 'basic',
		title: 'Basic',
		price: 'Free',
		highlightedText: '<strong>100k events</strong> per month',
		features: [
			{ id: 'validity', label: '3 months Validity', icon: <Clock className='h-4 w-4' /> },
			{ id: 'retention', label: '1 Year Data Retention', icon: <Database className='h-4 w-4' /> },
			{ id: 'support', label: 'Community Support', icon: <Globe className='h-4 w-4' /> },
		],
		cta: { label: 'Get Started' },
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
			{ id: 'validity', label: 'Forever Validity', icon: <Clock className='h-4 w-4' /> },
			{ id: 'retention', label: '7 Year Data Retention', icon: <Database className='h-4 w-4' /> },
			{ id: 'support', label: 'Dedicated Private Support', icon: <Globe className='h-4 w-4' /> },
		],
		cta: { label: 'Get Started' },
	},
	{
		id: 'premium',
		title: 'Premium',
		price: '$1000',
		billingCycle: 'month',
		highlightedText: '<strong>10 million events</strong> per month',
		features: [
			{ id: 'validity', label: 'Forever Validity', icon: <Clock className='h-4 w-4' /> },
			{ id: 'retention', label: '7 Year Data Retention', icon: <Database className='h-4 w-4' /> },
			{ id: 'support', label: 'Dedicated Private Support', icon: <Globe className='h-4 w-4' /> },
		],
		cta: { label: 'Get Started' },
	},
	{
		id: 'enterprise',
		title: 'Cloud Enterprise / On Prem',
		price: 'Custom',
		highlightedText: '<strong>Custom events</strong> per month',
		features: [
			{ id: 'validity', label: 'Forever Validity', icon: <Clock className='h-4 w-4' /> },
			{ id: 'retention', label: '7 Year Data Retention', icon: <Database className='h-4 w-4' /> },
			{ id: 'support', label: 'Dedicated Private Support', icon: <Globe className='h-4 w-4' /> },
		],
		cta: { label: 'Contact Us' },
	},
];
