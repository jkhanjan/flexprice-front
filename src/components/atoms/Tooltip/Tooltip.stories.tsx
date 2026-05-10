import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Tooltip component for displaying additional information on hover.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		delayDuration: { control: 'number' },
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		sideOffset: { control: 'number' },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		content: 'This is a tooltip',
		side: 'top',
		align: 'center',
		sideOffset: 4,
	},
	render: (args) => (
		<Tooltip {...args}>
			<button className='px-4 py-2 rounded border text-sm'>Hover over me</button>
		</Tooltip>
	),
};

export const WithDelay: Story = {
	args: {
		content: 'Appears after a delay',
		delayDuration: 800,
	},
	render: (args) => (
		<Tooltip {...args}>
			<button className='px-4 py-2 rounded border text-sm'>Hover for delayed tooltip</button>
		</Tooltip>
	),
};

export const Sides: Story = {
	render: () => (
		<div className='flex gap-6 items-center p-12'>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
					<button className='px-4 py-2 rounded border text-sm capitalize'>{side}</button>
				</Tooltip>
			))}
		</div>
	),
};

export const Alignments: Story = {
	render: () => (
		<div className='flex gap-6 items-center p-12'>
			{(['start', 'center', 'end'] as const).map((align) => (
				<Tooltip key={align} content={`Aligned to ${align}`} align={align} side='bottom'>
					<button className='px-4 py-2 rounded border text-sm capitalize'>{align}</button>
				</Tooltip>
			))}
		</div>
	),
};

export const RichContent: Story = {
	render: () => (
		<Tooltip
			content={
				<div className='flex flex-col gap-1'>
					<span className='font-semibold text-white'>Rich Tooltip</span>
					<span className='text-xs text-gray-300'>Supports any React node as content.</span>
				</div>
			}>
			<button className='px-4 py-2 rounded border text-sm'>Hover for rich content</button>
		</Tooltip>
	),
};

export const OnIcon: Story = {
	render: () => (
		<Tooltip content='This is an info icon tooltip'>
			<span className='cursor-pointer text-gray-500 hover:text-gray-800 text-lg'>ℹ️</span>
		</Tooltip>
	),
};
