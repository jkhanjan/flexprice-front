import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchableSelect from './SearchableSelect';

const baseOptions = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2' },
	{ value: 'option-3', label: 'Option 3' },
];

describe('SearchableSelect', () => {
	// ─── Rendering ───────────────────────────────────────────────────────────────

	it('renders the trigger button with placeholder', () => {
		render(<SearchableSelect options={baseOptions} placeholder='Select an option' />);
		expect(screen.getByText('Select an option')).toBeInTheDocument();
	});

	it('renders label when provided', () => {
		render(<SearchableSelect options={baseOptions} label='My Label' />);
		expect(screen.getByText('My Label')).toBeInTheDocument();
	});

	it('renders description when provided', () => {
		render(<SearchableSelect options={baseOptions} description='Some description' />);
		expect(screen.getByText('Some description')).toBeInTheDocument();
	});

	it('renders error message when provided', () => {
		render(<SearchableSelect options={baseOptions} error='This field is required' />);
		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});

	it('shows selected option label in trigger when value is set', () => {
		render(<SearchableSelect options={baseOptions} value='option-2' />);
		expect(screen.getByText('Option 2')).toBeInTheDocument();
	});

	// ─── Dropdown ────────────────────────────────────────────────────────────────

	it('opens dropdown and shows all options on trigger click', async () => {
		render(<SearchableSelect options={baseOptions} />);
		await userEvent.click(screen.getByRole('button'));

		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(screen.getByText('Option 3')).toBeInTheDocument();
	});

	it('renders search input when dropdown is open', async () => {
		render(<SearchableSelect options={baseOptions} />);
		await userEvent.click(screen.getByRole('button'));

		expect(screen.getByPlaceholderText('Search options...')).toBeInTheDocument();
	});

	it('filters options based on search input', async () => {
		render(<SearchableSelect options={baseOptions} />);
		await userEvent.click(screen.getByRole('button'));
		await userEvent.type(screen.getByPlaceholderText('Search options...'), 'Option 1');

		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
	});

	it('shows empty text when no options match search', async () => {
		render(<SearchableSelect options={baseOptions} emptyText='Nothing found' />);
		await userEvent.click(screen.getByRole('button'));
		await userEvent.type(screen.getByPlaceholderText('Search options...'), 'zzz');

		expect(screen.getByText('Nothing found')).toBeInTheDocument();
	});

	// ─── Selection ───────────────────────────────────────────────────────────────

	it('calls onChange with correct value when option is selected', async () => {
		const handleChange = jest.fn();
		render(<SearchableSelect options={baseOptions} onChange={handleChange} />);
		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByText('Option 1'));

		expect(handleChange).toHaveBeenCalledWith('option-1');
	});

	it('closes dropdown after selecting an option', async () => {
		render(<SearchableSelect options={baseOptions} />);
		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByText('Option 1'));

		expect(screen.queryByPlaceholderText('Search options...')).not.toBeInTheDocument();
	});

	// ─── Disabled ────────────────────────────────────────────────────────────────

	it('does not open dropdown when select is disabled', async () => {
		render(<SearchableSelect options={baseOptions} disabled />);
		await userEvent.click(screen.getByRole('button'));

		expect(screen.queryByPlaceholderText('Search options...')).not.toBeInTheDocument();
	});

	// ─── No Options ──────────────────────────────────────────────────────────────

	it('shows noOptionsText when options array is empty', async () => {
		render(<SearchableSelect options={[]} noOptionsText='No options available' />);
		await userEvent.click(screen.getByRole('button'));

		expect(screen.getByText('No options available')).toBeInTheDocument();
	});
});
