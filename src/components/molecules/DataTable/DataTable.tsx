import * as React from 'react';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/Table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;
export interface ColumnDef<TRow = any> {
	key: string;
	label: string;
	sortable?: boolean;
	render?: (row: TRow) => React.ReactNode;
}

export interface DataTableProps<TRow extends Record<string, unknown>> {
	columns?: ColumnDef<any>[];
	/** Row data */
	data: TRow[];
	rowKey?: keyof TRow;
	loading?: boolean;
	skeletonRows?: number;
	emptyMessage?: string;
	pagination?: boolean;
	pageSize?: number;
	page?: number;
	total?: number;
	onPageChange?: (page: number) => void;
	sortKey?: string | null;
	sortDirection?: SortDirection;
	onSortChange?: (key: string, direction: SortDirection) => void;
	virtual?: boolean;
	rowHeight?: number;
	virtualContainerHeight?: number;

	className?: string;
}

const DEFAULT_COLUMNS: ColumnDef[] = [
	{ key: 'id', label: 'ID', sortable: true },
	{ key: 'name', label: 'Name', sortable: true },
	{
		key: 'status',
		label: 'Status',
		sortable: true,
		render: (row) => {
			const status = String((row as Record<string, unknown>).status ?? '');
			const variant = status === 'active' ? 'default' : status === 'inactive' ? 'secondary' : 'outline';
			return (
				<Badge variant={variant} className='capitalize'>
					{status}
				</Badge>
			);
		},
	},
];

function SortIcon({ columnKey, sortKey, sortDirection }: { columnKey: string; sortKey?: string | null; sortDirection?: SortDirection }) {
	if (sortKey !== columnKey) return <ChevronsUpDown className='ml-1 inline h-3.5 w-3.5 opacity-40' />;
	if (sortDirection === 'asc') return <ChevronUp className='ml-1 inline h-3.5 w-3.5' />;
	return <ChevronDown className='ml-1 inline h-3.5 w-3.5' />;
}

function SkeletonRows({ rows, colCount }: { rows: number; colCount: number }) {
	return (
		<>
			{Array.from({ length: rows }).map((_, i) => (
				<TableRow key={`skeleton-${i}`}>
					{Array.from({ length: colCount }).map((_, j) => (
						<TableCell key={j}>
							<Skeleton className='h-4 w-full rounded' />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}

export function DataTable<TRow extends Record<string, unknown>>({
	columns = DEFAULT_COLUMNS as ColumnDef<TRow>[],
	data,
	rowKey = 'id' as keyof TRow,
	loading = false,
	skeletonRows = 5,
	emptyMessage = 'No results found.',
	pagination = false,
	pageSize = 10,
	page: controlledPage,
	total,
	onPageChange,
	sortKey,
	sortDirection,
	onSortChange,
	virtual = false,
	rowHeight = 48,
	virtualContainerHeight = 480,
	className,
}: DataTableProps<TRow>) {
	const [internalPage, setInternalPage] = React.useState(0);
	const currentPage = controlledPage ?? internalPage;
	const setPage = (p: number) => {
		setInternalPage(p);
		onPageChange?.(p);
	};

	const [internalSortKey, setInternalSortKey] = React.useState<string | null>(sortKey ?? null);
	const [internalSortDir, setInternalSortDir] = React.useState<SortDirection>(sortDirection ?? null);

	const activeSortKey = sortKey !== undefined ? sortKey : internalSortKey;
	const activeSortDir = sortDirection !== undefined ? sortDirection : internalSortDir;

	const handleSort = (key: string) => {
		const nextDir: SortDirection =
			activeSortKey === key ? (activeSortDir === 'asc' ? 'desc' : activeSortDir === 'desc' ? null : 'asc') : 'asc';

		setInternalSortKey(nextDir === null ? null : key);
		setInternalSortDir(nextDir);
		onSortChange?.(key, nextDir);
	};

	const sortedData = React.useMemo(() => {
		if (onSortChange || !activeSortKey || !activeSortDir) return data;
		return [...data].sort((a, b) => {
			const av = a[activeSortKey];
			const bv = b[activeSortKey];
			const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''));
			return activeSortDir === 'asc' ? cmp : -cmp;
		});
	}, [data, activeSortKey, activeSortDir, onSortChange]);

	const paginatedData = React.useMemo(() => {
		if (!pagination || onPageChange) return sortedData;
		const start = currentPage * pageSize;
		return sortedData.slice(start, start + pageSize);
	}, [sortedData, pagination, onPageChange, currentPage, pageSize]);

	const displayData = pagination ? paginatedData : sortedData;
	const totalRows = total ?? sortedData.length;
	const totalPages = Math.ceil(totalRows / pageSize);

	const scrollRef = useRef<HTMLDivElement>(null);
	const virtualizer = useVirtualizer({
		count: displayData.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => rowHeight,
		overscan: 8,
	});

	const renderCell = (col: ColumnDef<TRow>, row: TRow) => {
		if (col.render) return col.render(row);
		const val = row[col.key];
		return val !== null && val !== undefined ? String(val) : '—';
	};

	const header = (
		<TableHeader>
			<TableRow>
				{columns.map((col) => (
					<TableHead
						key={col.key}
						onClick={col.sortable ? () => handleSort(col.key) : undefined}
						className={cn('select-none whitespace-nowrap', col.sortable && 'cursor-pointer hover:bg-muted/60 transition-colors')}>
						{col.label}
						{col.sortable && <SortIcon columnKey={col.key} sortKey={activeSortKey} sortDirection={activeSortDir} />}
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
	);

	let body: React.ReactNode;

	if (loading) {
		body = (
			<TableBody>
				<SkeletonRows rows={skeletonRows} colCount={columns.length} />
			</TableBody>
		);
	} else if (displayData.length === 0) {
		body = (
			<TableBody>
				<TableRow>
					<TableCell colSpan={columns.length} className='h-32 text-center text-muted-foreground'>
						{emptyMessage}
					</TableCell>
				</TableRow>
			</TableBody>
		);
	} else if (virtual) {
		const virtualItems = virtualizer.getVirtualItems();
		body = (
			<TableBody style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
				{virtualItems.map((vRow) => {
					const row = displayData[vRow.index];
					return (
						<TableRow
							key={String(row[rowKey] ?? vRow.index)}
							data-index={vRow.index}
							ref={virtualizer.measureElement}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								transform: `translateY(${vRow.start}px)`,
							}}>
							{columns.map((col) => (
								<TableCell key={col.key}>{renderCell(col, row)}</TableCell>
							))}
						</TableRow>
					);
				})}
			</TableBody>
		);
	} else {
		body = (
			<TableBody>
				{displayData.map((row, idx) => (
					<TableRow key={String(row[rowKey] ?? idx)}>
						{columns.map((col) => (
							<TableCell key={col.key}>{renderCell(col, row)}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		);
	}

	const paginationControls = pagination && !loading && (
		<div className='flex items-center justify-between px-2 py-3 border-t'>
			<span className='text-sm text-muted-foreground'>
				Page {currentPage + 1} of {totalPages || 1}
			</span>
			<div className='flex gap-2'>
				<Button variant='outline' size='sm' disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>
					Previous
				</Button>
				<Button variant='outline' size='sm' disabled={currentPage >= totalPages - 1} onClick={() => setPage(currentPage + 1)}>
					Next
				</Button>
			</div>
		</div>
	);

	return (
		<div className={cn('rounded-md border bg-background', className)}>
			{virtual ? (
				<div ref={scrollRef} style={{ height: virtualContainerHeight, overflowY: 'auto' }}>
					<Table>
						{header}
						{body}
					</Table>
				</div>
			) : (
				<Table>
					{header}
					{body}
				</Table>
			)}
			{paginationControls}
		</div>
	);
}

export default DataTable;
