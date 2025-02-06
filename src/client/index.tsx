import { StrictMode } from 'hono/jsx';
import { hydrateRoot } from 'hono/jsx/dom/client';

import { Home } from './Home';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

hydrateRoot(
  root,
  <StrictMode>
    <Home />
  </StrictMode>
);
