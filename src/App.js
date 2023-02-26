import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import api from "./api/api";
import { getItem, setItem } from "./services/localStorageService";

import {
  SharedLayout,
  Home,
  Shoe,
  Shoes,
  Outlet,
  EditShoe,
  AddShoe,
  NotFound,
  SharedShoeLayout,
} from "./pages";

function App() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const getShoes = async () => {
      try {
        setLoading(true);

        const response = await api.get("/Shoes", {
          transformResponse: [
            (data) => {
              const parsedData = JSON.parse(data);
              console.log(parsedData);
              return parsedData;
            },
          ],
        });

        setShoes(response.data);
        setItem("shoes", response.data);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          message: error.response.data.message,
        });
      } finally {
        setLoading(false);
      }
    };

    getShoes();
  }, []);

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={<Home />}
            />
            <Route path="add" element={<AddShoe />} />

            <Route
              path="shoes"
              element={<Shoes shoes={shoes} loading={loading} error={error} />}
            ></Route>

            <Route path="shoes" element={<SharedShoeLayout />}>
              <Route path=":shoeId" element={<Shoe />} />
              <Route path=":shoeId/edit" element={<EditShoe />} />
            </Route>

            <Route
              path="outlet"
              element={<Outlet shoes={shoes} loading={loading} error={error} />}
            ></Route>

            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
