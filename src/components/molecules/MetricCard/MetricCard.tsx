import React from 'react';
import clsx from 'clsx';

interface MetricCardProps {
	title: string;
	value: string | number;
	change?: string;
	icon?: React.ReactNode;
	trend?: 'up' | 'down' | 'neutral';
	loading?: boolean;
	className?: string;
}

const trendColors = {
	up: 'text-green-600',
	down: 'text-red-600',
	neutral: 'text-gray-500',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, trend = 'neutral', loading = false, className }) => {
	if (loading) {
		return (
			<div className='rounded-xl border border-gray-200 p-5 bg-white shadow-sm'>
				<div className='animate-pulse space-y-4'>
					<div className='h-4 w-24 bg-gray-200 rounded'></div>
					<div className='h-8 w-32 bg-gray-200 rounded'></div>
					<div className='h-4 w-20 bg-gray-200 rounded'></div>
				</div>
			</div>
		);
	}

	return (
		<div className={clsx('rounded-xl border border-gray-200 p-5 bg-white shadow-sm', 'transition-all hover:shadow-md', className)}>
			<div className='flex items-start justify-between'>
				<div>
					<p className='text-sm text-gray-500'>{title}</p>

					<h2 className='mt-2 text-3xl font-semibold text-gray-900'>{value}</h2>

					{change && <p className={clsx('mt-2 text-sm', trendColors[trend])}>{change}</p>}
				</div>

				{icon && <div className='rounded-lg bg-gray-100 p-2'>{icon}</div>}
			</div>
		</div>
	);
};

export default MetricCard;
