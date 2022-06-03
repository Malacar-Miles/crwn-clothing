import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import { Routes, Route } from "react-router-dom";

const ShopPage = () => <h1>SHOP PAGE</h1>;

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<ShopPage />} />
      <Route path="auth" element={<Authentication />} />
    </Route>
  </Routes>
);

export default App;
