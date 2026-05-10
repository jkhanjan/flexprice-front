import * as React from 'react';
import { Search, X } from 'lucide-react';
import Input from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { SizeVariant } from '@/lib/sizing';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onDebouncedChange?: (value: string) => void;
	onSearch?: (value: string) => void;
	onClear?: () => void;
	debounceDelay?: number;
	showClearButton?: boolean;
	showSearchIcon?: boolean;
	isLoading?: boolean;
	size?: SizeVariant;
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	className?: string;
	inputClassName?: string;
	searchIcon?: React.ReactNode;
	clearIcon?: React.ReactNode;
	showSearchButton?: boolean;
	searchButtonLabel?: string;
	searchButtonVariant?: 'default' | 'black' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	searchButtonSize?: 'default' | 'sm' | 'lg' | 'icon' | 'xs';
	searchButtonClassName?: string;
	id?: string;
	ariaLabel?: string;
}

function useDebounce<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = React.useState<T>(value);

	React.useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
	(
		{
			value: controlledValue,
			defaultValue = '',
			onChange,
			onDebouncedChange,
			onSearch,
			onClear,
			debounceDelay = 300,
			showClearButton = true,
			showSearchIcon = true,
			isLoading = false,
			size = 'default',
			placeholder = 'Search…',
			error,
			disabled = false,
			className,
			inputClassName,
			searchIcon,
			clearIcon,
			showSearchButton = false,
			searchButtonLabel = 'Search',
			searchButtonVariant = 'default',
			searchButtonSize = 'default',
			searchButtonClassName,
			id,
			ariaLabel = 'Search',
		},
		ref,
	) => {
		const isControlled = controlledValue !== undefined;
		const [internalValue, setInternalValue] = React.useState(isControlled ? controlledValue : defaultValue);

		React.useEffect(() => {
			if (isControlled) setInternalValue(controlledValue);
		}, [isControlled, controlledValue]);

		const currentValue = isControlled ? controlledValue : internalValue;
		const debouncedValue = useDebounce(currentValue, debounceDelay);

		const isMounted = React.useRef(false);
		React.useEffect(() => {
			if (!isMounted.current) {
				isMounted.current = true;
				return;
			}
			onDebouncedChange?.(debouncedValue);
		}, [debouncedValue]);

		const handleChange = React.useCallback(
			(val: string) => {
				if (!isControlled) setInternalValue(val);
				onChange?.(val);
			},
			[isControlled, onChange],
		);

		const handleClear = React.useCallback(() => {
			if (!isControlled) setInternalValue('');
			onChange?.('');
			onClear?.();
		}, [isControlled, onChange, onClear]);

		const handleKeyDown = React.useCallback(
			(e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch?.(currentValue);
			},
			[currentValue, onSearch],
		);

		const hasValue = currentValue.length > 0;

		const prefixSlot = showSearchIcon ? (
			isLoading ? (
				<Search className='h-4 w-4 animate-spin text-muted-foreground' />
			) : (
				(searchIcon ?? <Search className='h-4 w-4 text-muted-foreground' />)
			)
		) : undefined;

		const suffixSlot =
			showClearButton && hasValue ? (
				<button
					type='button'
					onClick={handleClear}
					disabled={disabled}
					aria-label='Clear search'
					className='flex items-center justify-center rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'>
					{clearIcon ?? <X className='h-3.5 w-3.5' />}
				</button>
			) : undefined;

		return (
			<div className={cn('flex items-start gap-2', className)}>
				<div className='flex-1'>
					<Input
						ref={ref}
						id={id}
						size={size}
						value={currentValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						disabled={disabled}
						error={error}
						inputPrefix={prefixSlot}
						suffix={suffixSlot}
						aria-label={ariaLabel}
						className={inputClassName}
					/>
				</div>

				{showSearchButton && (
					<Button
						type='button'
						variant={searchButtonVariant}
						size={searchButtonSize}
						isLoading={isLoading}
						disabled={disabled}
						onClick={() => onSearch?.(currentValue)}
						prefixIcon={!isLoading && <Search className='h-4 w-4' />}
						className={searchButtonClassName}>
						{searchButtonLabel}
					</Button>
				)}
			</div>
		);
	},
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
