# NextJS is here!
https://nextjs.org/learn/dashboard-app
-----------------------------------------------------------------------------------------------------

## Getting started

**Create new porject**
```
npx create-next-app@latest project-name --use-npm 
```

**Run project in dev mode**
```
npm run dev
```

## Project strucutre
- /app .....................(Contains all Routes(handled by folder structure), components and logic.)
- /app/page.tsx ............(Entry point components of application (Route "/"), like index.js in ReactJS)
- /app/layout.tsx ..........(Entry point layout of application, this envolve the app in the entry html page)
- /app/lib .................(Functions to use many times (utilities, Fetching) and model definition types)
- /app/lib/data ............(Functions for Fetching)
- /app/lib/definitions .....(Types for models defenitions))
- /app/lib/utils ...........(Functions for utilities)
- /app/ui ..................(All widgets components)
- /public ..................(Static assets for your application, such as images)
- /scripts .................(Files that can be used to populate your database, this has a seed.js file)
- config files (next.config.js)

-----------------------------------------------------------------------------------------------------

## Routing
NextJS has file-system routing!

Path: domain.com/dashboard/invoices
file-system:
/app (Root segment)
    /dashboard (Segment)
        /invoices (Leaf segment)
            page.tsx
        page.tsx
    layout.tsx
    page.tsx 

-----------------------------------------------------------------------------------------------------

## Layouts
You can create layouts to use it in chlidren pages and share ui across multiple pages.
For example a SideNav to use inside all dashboard pages.

- Create layout.tsx file inside your root page to have it
```
/app
    /dashboard
        /invoices
            page.tsx
        layout.tsx ---------> This
        page.tsx
    layout.tsx
    page.tsx
```

- Code example
```
import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
``` 

**At this point, all pages inside dashboard folder will have that layout**

-----------------------------------------------------------------------------------------------------

## Navigating

**With link**
```
import Link from 'next/link'
 
export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

**With hook**
**IMPORTANT** using useRouter hook you need to use client component  
```
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

-----------------------------------------------------------------------------------------------------

## usePathname() Hook
To has access to the browser URL
**You need Client Compoennt to use it**

```
'use client';

import { usePathname } from 'next/navigation';

export default function MyComponent() {
  const pathname = usePathname();
  // ...
}
```

**You can usefull use it in navs to active links**
```
'use client';
 
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
 
// ...
 
export default function NavLinks() {
  const pathname = usePathname();
 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

-----------------------------------------------------------------------------------------------------

## CSS styles

### Global CSS
- Create /app/ui/global.css

- Add it to your top level component (root layout) /app/layout.tsx
```
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### CSS modules
Scope CSS to a component.
Don't have to worry about name collisions.

- Create a module in /app/ui/home.module.css
```
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

- Import in any component you need, for example /app/page.tsx and use it
```
import styles from '@/app/ui/home.module.css';
 
//...
<div className={styles.shape}></div>
```

### clsx library to toggle classnames
To conditionally style an element based on state or some other condition.

- Import and use it
```
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

-----------------------------------------------------------------------------------------------------

## Optimize fonts

### Adding primary font
Imports from next/font/google

- Create file /app/ui/fonts.ts and import your font
```
import { Inter } from 'next/font/google';

export const interFont = Inter({ subsets: ['latin'] });
```

- Add font class in body tag inside app/layout.tsx
Also add the Tailwind 'antialiased' class which smooths out the font. 
It's not necessary to use this class, but it adds a nice touch to your fonts.

```
import '@/app/ui/global.css';
import { interFont } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${interFont.className} antialiased`}>{children}</body>
    </html>
  );
}
```

### Adding secondary fonts
Imports from next/font/google

- Create file or (if is created) add new font to this file
```
import { Lexend, Lusitana } from 'next/font/google';

export const lexendFont = Lexend({ subsets: ['latin'] });

export const lusitanaFont = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
```

- Add font class in any tag inside any app page or layout

```
import Link from 'next/link';
import { lusitanaFont } from './ui/fonts';
 
export default function Page() {
  return (
    <p className={`${lusitanaFont.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
      ...
    </p>
  );
}

-----------------------------------------------------------------------------------------------------

## Images in NextJS

- Store all static images in /public folder

- Use it in tag or component
```
      <img
        src="/my-image.png"
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
```

-----------------------------------------------------------------------------------------------------

## Optimize images with Image next component

- Store all static images in /public folder

- Use it with Image component
```
import Image from 'next/image';

export default function Page() {
  return (
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            // Define hidden but in md size block
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"          
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            // Define md size as hidden
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"          
          />
      </div>
  );
}
```

-----------------------------------------------------------------------------------------------------

