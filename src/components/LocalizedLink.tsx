"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type LocalizedLinkProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export default function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const pathname = usePathname();
  
  // Extract the current language from the pathname (e.g., /en/about -> en)
  const currentLang = pathname?.split('/')[1] || 'id';

  // Make sure href is a string before manipulation
  const hrefStr = href.toString();

  // Don't modify external links or anchor links
  if (hrefStr.startsWith('http') || hrefStr.startsWith('mailto:') || hrefStr.startsWith('tel:') || hrefStr.startsWith('#')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // Prepend the current language if it doesn't already have one
  let localizedHref = hrefStr;
  if (hrefStr.startsWith('/')) {
    localizedHref = `/${currentLang}${hrefStr === '/' ? '' : hrefStr}`;
  } else {
    localizedHref = `/${currentLang}/${hrefStr}`;
  }

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
