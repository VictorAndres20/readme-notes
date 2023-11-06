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

