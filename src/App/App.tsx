import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../router";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
