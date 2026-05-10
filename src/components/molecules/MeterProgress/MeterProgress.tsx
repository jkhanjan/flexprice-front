import React from 'react';

interface UsageBarProps {
	label: string;
	used: number;
	total: number;
	className?: string;
	showPercentage?: boolean;
}

const UsageBar: React.FC<UsageBarProps> = ({ label, used, total, className, showPercentage = true }) => {
	const percentage = Math.min((used / total) * 100, 100);

	return (
		<div
			className={`
				w-full rounded-xl border border-neutral-200
				bg-white p-4 shadow-sm
				${className || ''}
			`}>
			<div className='mb-2 flex items-center justify-between'>
				<h4 className='text-sm font-medium text-neutral-700'>{label}</h4>

				{showPercentage && <span className='text-sm font-semibold text-neutral-900'>{Math.round(percentage)}%</span>}
			</div>

			<div className='h-2 w-full overflow-hidden rounded-full bg-neutral-100'>
				<div
					className={`
						h-full rounded-full transition-all duration-300
						${percentage >= 90 ? 'bg-blue-500' : percentage >= 70 ? 'bg-green-500' : 'bg-yellow-500'}
					`}
					style={{ width: `${percentage}%` }}
				/>
			</div>

			<div className='mt-2 flex items-center justify-between text-sm'>
				<span className='text-neutral-600'>{used.toLocaleString()} used</span>

				<span className='text-neutral-500'>{total.toLocaleString()} total</span>
			</div>
		</div>
	);
};

export default UsageBar;
