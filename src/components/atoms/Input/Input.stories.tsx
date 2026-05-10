import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Input component with various types and states.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'number'],
		},
		error: {
			control: 'boolean',
		},
		prefix: {
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text here',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		type: 'email',
	},
};

export const WithError: Story = {
	args: {
		label: 'Password',
		type: 'password',
		error: 'Password must be at least 8 characters',
		placeholder: 'Enter your password',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		label: 'Full Name',
		placeholder: 'Enter your full name',
		fullWidth: true,
	},
	parameters: {
		layout: 'padded',
	},
};

export const WithValue: Story = {
	args: {
		label: 'Name',
		value: 'John Doe',
		placeholder: 'Enter your name',
	},
};

export const Text: Story = {
	args: {
		type: 'text',
		placeholder: 'Enter text',
	},
};

export const Number: Story = {
	args: {
		type: 'number',
		placeholder: 'Enter number',
	},
};
export const WithPrefix: Story = {
	args: {
		type: 'text',
		placeholder: 'Enter amount',
		prefix: '$',
	},
};
