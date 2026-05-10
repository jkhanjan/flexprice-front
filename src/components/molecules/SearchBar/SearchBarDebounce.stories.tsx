import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from './SearchBarDebounce';

const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A fully customisable `SearchBar` molecule built on top of your existing `Input` and `Button` atoms. ' +
					'Supports debounce, clear button, loading state, controlled/uncontrolled modes, and an optional Search button.',
			},
		},
	},
	argTypes: {
		debounceDelay: {
			control: { type: 'range', min: 0, max: 2000, step: 50 },
			description: 'Delay (ms) before `onDebouncedChange` fires',
			table: { defaultValue: { summary: '300' } },
		},
		showClearButton: {
			control: 'boolean',
			description: 'Show ✕ button when the input has text',
			table: { defaultValue: { summary: 'true' } },
		},
		showSearchIcon: {
			control: 'boolean',
			description: 'Show the magnifying-glass icon on the left',
			table: { defaultValue: { summary: 'true' } },
		},
		isLoading: {
			control: 'boolean',
			description: 'Show spinner and disable buttons',
			table: { defaultValue: { summary: 'false' } },
		},
		showSearchButton: {
			control: 'boolean',
			description: 'Render an explicit Search button',
			table: { defaultValue: { summary: 'false' } },
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg'],
			description: 'Maps to your Input size prop (SizeVariant)',
			table: { defaultValue: { summary: 'default' } },
		},
		placeholder: { control: 'text' },
		error: { control: 'text', description: 'Error string — passed straight to Input' },
	},
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	args: {
		placeholder: 'Search…',
		debounceDelay: 300,
	},
};

const ControlledSearchBar = () => {
	const [value, setValue] = useState('');
	const [debounced, setDebounced] = useState('');
	const [searched, setSearched] = useState('');

	return (
		<div className='flex flex-col gap-4 max-w-md'>
			<SearchBar
				value={value}
				onChange={setValue}
				onDebouncedChange={setDebounced}
				onSearch={setSearched}
				onClear={() => setValue('')}
				debounceDelay={500}
				showSearchButton
				searchButtonLabel='Search'
				placeholder='Controlled — 500 ms debounce…'
			/>

			<div className='rounded-[7px] border border-input bg-background p-3 font-mono text-xs space-y-1.5'>
				<div>
					<span className='font-semibold text-foreground'>onChange:</span> <span className='text-muted-foreground'>{value || '—'}</span>
				</div>

				<div>
					<span className='font-semibold text-foreground'>onDebouncedChange:</span>{' '}
					<span className='text-muted-foreground'>{debounced || '—'}</span>
				</div>

				<div>
					<span className='font-semibold text-foreground'>onSearch (Enter / button):</span>{' '}
					<span className='text-muted-foreground'>{searched || '—'}</span>
				</div>
			</div>
		</div>
	);
};

export const Controlled: Story = {
	render: () => <ControlledSearchBar />,
};
export const WithSearchButton: Story = {
	args: {
		showSearchButton: true,
		searchButtonLabel: 'Search',
		searchButtonVariant: 'default',
		placeholder: 'Type and hit Search…',
	},
};

export const OutlineSearchButton: Story = {
	args: {
		showSearchButton: true,
		searchButtonVariant: 'outline',
		searchButtonLabel: 'Go',
		placeholder: 'Outline button variant…',
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		defaultValue: 'react query',
		placeholder: 'Searching…',
		showSearchButton: true,
	},
};
export const ErrorState: Story = {
	args: {
		error: 'Something went wrong. Please try again.',
		placeholder: 'Search…',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: 'Read-only value',
	},
};
export const CustomLucideIcon: Story = {
	args: {
		searchIcon: <Filter className='h-4 w-4 text-muted-foreground' />,
		placeholder: 'Filter mode…',
	},
};

export const Playground: Story = {
	args: {
		placeholder: 'Search anything…',
		debounceDelay: 300,
		showClearButton: true,
		showSearchIcon: true,
		isLoading: false,
		size: 'default',
		disabled: false,
		showSearchButton: false,
		searchButtonLabel: 'Search',
		searchButtonVariant: 'default',
		searchButtonSize: 'default',
	},
};
