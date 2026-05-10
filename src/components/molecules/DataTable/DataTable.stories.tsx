import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, ColumnDef } from './DataTable';
import { Badge } from '@/components/ui/badge';

// ---------------------------------------------------------------------------
// Shared row type & mock data
// ---------------------------------------------------------------------------

type User = {
	id: number;
	name: string;
	status: 'active' | 'inactive' | 'pending';
};

const makeRows = (count: number): User[] =>
	Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: `User ${i + 1}`,
		status: (['active', 'inactive', 'pending'] as const)[i % 3],
	}));

// ---------------------------------------------------------------------------
// Custom column example (extends defaults)
// ---------------------------------------------------------------------------

const customColumns: ColumnDef<User>[] = [
	{ key: 'id', label: 'ID', sortable: true },
	{ key: 'name', label: 'Full Name', sortable: true },
	{
		key: 'status',
		label: 'Status',
		sortable: true,
		render: (row) => {
			const map: Record<string, 'default' | 'secondary' | 'outline'> = {
				active: 'default',
				inactive: 'secondary',
				pending: 'outline',
			};
			return (
				<Badge variant={map[row.status] ?? 'outline'} className='capitalize'>
					{row.status}
				</Badge>
			);
		},
	},
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof DataTable> = {
	title: 'Molecules/DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A sortable, paginated, virtualised data table molecule composed from shadcn/ui atoms: `Table`, `Badge`, `Button`, `Skeleton`.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		loading: { control: 'boolean' },
		pagination: { control: 'boolean' },
		virtual: { control: 'boolean' },
		pageSize: { control: { type: 'number', min: 5, max: 50 } },
	},
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// ---------------------------------------------------------------------------
// 1. Default — loaded state with 20 rows
// ---------------------------------------------------------------------------

export const Default: Story = {
	name: 'Default (loaded)',
	args: {
		columns: customColumns,
		data: makeRows(20),
		rowKey: 'id',
		pagination: false,
	},
};

// ---------------------------------------------------------------------------
// 2. Loading skeleton
// ---------------------------------------------------------------------------

export const Loading: Story = {
	name: 'Loading (skeleton)',
	args: {
		columns: customColumns,
		data: [],
		loading: true,
		skeletonRows: 6,
	},
};

// ---------------------------------------------------------------------------
// 3. Empty state
// ---------------------------------------------------------------------------

export const Empty: Story = {
	name: 'Empty state',
	args: {
		columns: customColumns,
		data: [],
		loading: false,
		emptyMessage: 'No users found. Try adjusting your filters.',
	},
};

// ---------------------------------------------------------------------------
// 4. Pagination — client-side
// ---------------------------------------------------------------------------

export const Paginated: Story = {
	name: 'Pagination (client-side)',
	args: {
		columns: customColumns,
		data: makeRows(87),
		rowKey: 'id',
		pagination: true,
		pageSize: 10,
	},
};

// ---------------------------------------------------------------------------
// 5. Virtual list — 5 000 rows
// ---------------------------------------------------------------------------

export const Virtual: Story = {
	name: 'Virtual list (5 000 rows)',
	args: {
		columns: customColumns,
		data: makeRows(5000),
		rowKey: 'id',
		virtual: true,
		rowHeight: 48,
		virtualContainerHeight: 480,
		pagination: false,
	},
};

// ---------------------------------------------------------------------------
// 6. Custom columns (extra "score" field)
// ---------------------------------------------------------------------------

type Player = { id: number; name: string; status: 'active' | 'inactive' | 'pending'; score: number };

const playerColumns: ColumnDef<Player>[] = [
	{ key: 'id', label: '#', sortable: true },
	{ key: 'name', label: 'Player', sortable: true },
	{
		key: 'score',
		label: 'Score',
		sortable: true,
		render: (row) => <span className='font-mono font-semibold text-primary'>{row.score}</span>,
	},
	{
		key: 'status',
		label: 'Status',
		render: (row) => (
			<Badge variant={row.status === 'active' ? 'default' : 'secondary'} className='capitalize'>
				{row.status}
			</Badge>
		),
	},
];

export const CustomColumns: Story = {
	name: 'Custom columns',
	args: {
		columns: playerColumns,
		data: Array.from({ length: 15 }, (_, i) => ({
			id: i + 1,
			name: `Player ${i + 1}`,
			status: (['active', 'inactive', 'pending'] as const)[i % 3],
			score: Math.floor(Math.random() * 10000),
		})),
		rowKey: 'id',
		pagination: true,
		pageSize: 8,
	},
};
