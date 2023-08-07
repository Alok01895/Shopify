import Header from "./component/layout/Header.jsx"
import Footer from "./component/layout/footer.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import "./Style.scss"
import ProductDetails from "./pages/ProductDetails.jsx"
import ProductChild from "./component/Products/ProductChild.jsx"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route index path="/product/:id" element={<ProductDetails/>}/>
        <Route index path="/products" element={<ProductChild/>}/>
        <Route index path="/products/:keyword" element={<ProductChild/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
      

  );
}

export default App;
