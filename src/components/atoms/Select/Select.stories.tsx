import type { Meta, StoryObj } from '@storybook/react';
import { Star, Tag } from 'lucide-react';
import SearchableSelect from './Select';
import { useState } from 'react';

// Add this utility render wrapper at the top (after imports)
const StatefulSelect = (args: React.ComponentProps<typeof SearchableSelect>) => {
	const [value, setValue] = useState(args.value ?? '');
	return <SearchableSelect {...args} value={value} onChange={(val) => setValue(val)} />;
};

const meta: Meta<typeof SearchableSelect> = {
	title: 'Atoms/Select',
	component: SearchableSelect,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A searchable select component with support for icons, descriptions, radio mode, and disabled states.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'text' },
		placeholder: { control: 'text' },
		label: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		hideSelectedTick: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

const baseOptions = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2' },
	{ value: 'option-3', label: 'Option 3' },
];

export const Default: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		placeholder: 'Select an option',
	},
};

export const WithLabel: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		label: 'Choose an option',
		placeholder: 'Select an option',
	},
};

export const WithDescription: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		label: 'Choose an option',
		description: 'Pick one of the available options from the list.',
		placeholder: 'Select an option',
	},
};

export const WithError: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		label: 'Choose an option',
		error: 'This field is required.',
		placeholder: 'Select an option',
	},
};

export const Preselected: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		value: 'option-2',
		label: 'With preselected value',
	},
};

export const WithSelectedTick: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		value: 'option-1',
		label: 'With checkmark on selected',
		hideSelectedTick: false,
	},
};

export const RadioMode: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		isRadio: true,
		label: 'Radio style select',
		defaultOpen: true,
	},
};

export const WithDescriptions: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: [
			{ value: 'basic', label: 'Basic Plan', description: 'Good for individuals.' },
			{ value: 'pro', label: 'Pro Plan', description: 'Best for small teams.' },
			{ value: 'enterprise', label: 'Enterprise', description: 'For large organizations.' },
		],
		label: 'Select a plan',
		placeholder: 'Choose your plan',
	},
};

export const WithPrefixIcons: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: [
			{ value: 'starred', label: 'Starred', prefixIcon: <Star className='h-4 w-4 text-yellow-500' /> },
			{ value: 'tagged', label: 'Tagged', prefixIcon: <Tag className='h-4 w-4 text-blue-500' /> },
		],
		label: 'With prefix icons',
		placeholder: 'Select an option',
	},
};

export const WithSuffixIcons: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: [
			{ value: 'starred', label: 'Starred', suffixIcon: <Star className='h-4 w-4 text-yellow-500' /> },
			{ value: 'tagged', label: 'Tagged', suffixIcon: <Tag className='h-4 w-4 text-blue-500' /> },
		],
		label: 'With suffix icons',
		placeholder: 'Select an option',
		hideSelectedTick: false,
	},
};

export const WithDisabledOptions: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: [
			{ value: 'option-1', label: 'Option 1' },
			{ value: 'option-2', label: 'Option 2 (disabled)', disabled: true },
			{ value: 'option-3', label: 'Option 3' },
		],
		label: 'With a disabled option',
		placeholder: 'Select an option',
	},
};

export const DisabledSelect: Story = {
	render: (args) => <StatefulSelect {...args} />,
	args: {
		options: baseOptions,
		label: 'Disabled select',
		placeholder: 'Cannot interact',
		disabled: true,
	},
};
