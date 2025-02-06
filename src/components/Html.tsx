import { Child } from 'hono/jsx';

export const Html = ({ children }: { children: Child; }) => {
  return (
    <html lang="en">
      <head>
        <title>Noman Land</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Noman Land" />
        <meta property="og:title" content="Noman Land" />
        <meta property="og:description" content="Noman Land" />
        <meta property="og:image" content="icon.png" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="noman.land" />
        <meta property="og:locale" content="en_US" />
        <link rel="shortcut icon" href="icon.png" />
        <script
          type="module"
          src={
            import.meta.env.PROD
              ? "/assets/index.js"
              : "/src/client/index.tsx"
          }
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
};