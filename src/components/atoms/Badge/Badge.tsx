import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors', {
	variants: {
		variant: {
			default: ' text-gray-800',
			success: ' text-green-700',
			warning: ' text-yellow-700',
			danger: 'text-red-700',
			info: 'text-blue-700',
			outline: 'border border-gray-300 text-gray-700',
		},
		size: {
			default: 'h-6 px-2.5 text-sm',
			sm: 'h-7 px-3 text-[11px]',
			lg: 'h-9 px-4 text-md',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
	return (
		<div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
			{leftIcon}
			{children}
			{rightIcon}
		</div>
	);
});

Badge.displayName = 'Badge';

export default Badge;
