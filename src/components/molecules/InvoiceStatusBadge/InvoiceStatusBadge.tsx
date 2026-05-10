import React from 'react';
import Badge from '@/components/atoms/Badge';

import { CheckCircle2, Clock3, XCircle, FileText, AlertTriangle } from 'lucide-react';

type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'draft' | 'overdue';

interface InvoiceStatusBadgeProps {
	status: InvoiceStatus;
	count?: number;
	className?: string;
}

const statusConfig = {
	paid: {
		label: 'Paid',
		variant: 'success',
		icon: <CheckCircle2 size={15} />,
	},

	pending: {
		label: 'Pending',
		variant: 'warning',
		icon: <Clock3 size={15} />,
	},

	failed: {
		label: 'Failed',
		variant: 'danger',
		icon: <XCircle size={15} />,
	},

	draft: {
		label: 'Draft',
		variant: 'info',
		icon: <FileText size={15} />,
	},

	overdue: {
		label: 'Overdue',
		variant: 'danger',
		icon: <AlertTriangle size={15} />,
	},
} as const;

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status, count, className }) => {
	const config = statusConfig[status];

	return (
		<div
			className={`
				inline-flex items-center justify-between
				gap-4 rounded-lg border border-neutral-200
				bg-white px-3 py-4
                w-full
				min-w-[140px]
				${className || ''}
			`}>
			<Badge variant={config.variant} leftIcon={config.icon}>
				{config.label}
			</Badge>

			{count !== undefined && <span className='text-sm font-semibold text-neutral-700'>{count}</span>}
		</div>
	);
};

export default InvoiceStatusBadge;
