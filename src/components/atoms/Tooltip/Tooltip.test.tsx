import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
	const renderTooltip = (props = {}) =>
		render(
			<Tooltip content='Tooltip content' {...props}>
				<button>Hover me</button>
			</Tooltip>,
		);

	// ─── Rendering ───────────────────────────────────────────────────────────────

	it('renders the trigger element', () => {
		renderTooltip();
		expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
	});

	it('does not show tooltip content before hover', () => {
		renderTooltip();
		expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
	});

	// ─── Hover Behavior ──────────────────────────────────────────────────────────

	it('shows tooltip content on hover', async () => {
		renderTooltip();
		await userEvent.hover(screen.getByRole('button'));
		expect(await screen.findByText('Tooltip content')).toBeInTheDocument();
	});

	it('hides tooltip content after unhover', async () => {
		renderTooltip();
		await userEvent.hover(screen.getByRole('button'));
		await screen.findByText('Tooltip content');

		await userEvent.unhover(screen.getByRole('button'));
		expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
	});

	// ─── Props ───────────────────────────────────────────────────────────────────

	it('renders with custom string content', async () => {
		renderTooltip({ content: 'Custom tooltip text' });
		await userEvent.hover(screen.getByRole('button'));
		expect(await screen.findByText('Custom tooltip text')).toBeInTheDocument();
	});

	it('renders with rich React node as content', async () => {
		render(
			<Tooltip
				content={
					<div>
						<span>Title</span>
						<span>Subtitle</span>
					</div>
				}>
				<button>Hover me</button>
			</Tooltip>,
		);
		await userEvent.hover(screen.getByRole('button'));
		expect(await screen.findByText('Title')).toBeInTheDocument();
		expect(await screen.findByText('Subtitle')).toBeInTheDocument();
	});

	it('renders with delayDuration prop without crashing', () => {
		expect(() => renderTooltip({ delayDuration: 500 })).not.toThrow();
	});

	it('renders with all side options without crashing', () => {
		(['top', 'right', 'bottom', 'left'] as const).forEach((side) => {
			expect(() => renderTooltip({ side })).not.toThrow();
		});
	});

	it('renders with all align options without crashing', () => {
		(['start', 'center', 'end'] as const).forEach((align) => {
			expect(() => renderTooltip({ align })).not.toThrow();
		});
	});

	it('applies custom className to tooltip content', async () => {
		renderTooltip({ className: 'custom-class' });
		await userEvent.hover(screen.getByRole('button'));
		const tooltipContent = await screen.findByText('Tooltip content');
		expect(tooltipContent.closest('[class*="custom-class"]')).toBeInTheDocument();
	});

	// ─── Trigger Types ───────────────────────────────────────────────────────────

	it('works with a span as trigger', async () => {
		render(
			<Tooltip content='Tooltip content'>
				<span>Hover this span</span>
			</Tooltip>,
		);
		await userEvent.hover(screen.getByText('Hover this span'));
		expect(await screen.findByText('Tooltip content')).toBeInTheDocument();
	});

	it('works with an icon as trigger', async () => {
		render(
			<Tooltip content='Icon tooltip'>
				<span role='img' aria-label='info'>
					ℹ️
				</span>
			</Tooltip>,
		);
		await userEvent.hover(screen.getByRole('img', { name: 'info' }));
		expect(await screen.findByText('Icon tooltip')).toBeInTheDocument();
	});
});
