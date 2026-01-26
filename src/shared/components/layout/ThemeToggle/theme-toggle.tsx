'use client';

import { IconBrightness } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/shared/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newMode);
        return;
      }

      // Set coordinates from the click event
      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newMode);
      });
    },
    [resolvedTheme, setTheme]
  );

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle size-8'
      onClick={handleThemeToggle}
    >
      <IconBrightness />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}

export function DropdownMenuThemeToggleItem() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = React.useCallback(
    (newTheme: string, e: React.MouseEvent) => {
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newTheme);
        return;
      }

      // Set coordinates from the click event
      root.style.setProperty('--x', `${e.clientX}px`);
      root.style.setProperty('--y', `${e.clientY}px`);

      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    },
    [setTheme]
  );

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className='gap-2'>
        <IconBrightness className='text-muted-foreground mr-2 h-4 w-4' />
        Appearance
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={(e) => handleThemeChange('light', e)}
            onSelect={(e) => e.preventDefault()}
            className={theme === 'light' ? 'bg-accent' : ''}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => handleThemeChange('dark', e)}
            onSelect={(e) => e.preventDefault()}
            className={theme === 'dark' ? 'bg-accent' : ''}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => handleThemeChange('system', e)}
            onSelect={(e) => e.preventDefault()}
            className={theme === 'system' ? 'bg-accent' : ''}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
