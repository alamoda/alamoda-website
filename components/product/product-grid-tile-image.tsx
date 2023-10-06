import { cn } from '@/lib/util';
import Image from 'next/image';

export function GridTileImage({
    isInteractive = true,
    active,
    ...props
}: {
    isInteractive?: boolean;
    active?: boolean;
} & React.ComponentProps<typeof Image>) {
    return (
        <div
            className={cn(
                'group flex h-full w-full items-center justify-center overflow-hidden border bg-white hover:border-gray-900',
                {
                    'border-2 border-gray-900': active,
                    'border-neutral-200 ': !active
                }
            )}
        >
            <Image
                className={'relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105'
                }
                {...props}
            />
        </div>
    );
}
