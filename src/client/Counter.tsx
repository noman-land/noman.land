import { useState } from "hono/jsx";

export function Counter() {
  const [count, setCount] = useState(0);
  console.log({ count });
  return (
    <div>
      <button onClick={() => setCount(count + 1)} type="button">
        Increase count
      </button>
      <span>Count: {count}</span>
    </div>
  );
}