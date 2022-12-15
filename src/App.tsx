import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex flex-row justify-center space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" alt="Vite logo" className="h-16 w-16" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} alt="React logo" className="h-16 w-16" />
        </a>
      </div>
      <h1 className="text-4xl font-bold">Vite + React</h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-center text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
