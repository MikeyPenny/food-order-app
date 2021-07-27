import { useState } from 'react'; 
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';

import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {

  const [isCartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCartHandler = () => {
    setCartVisible(false);
  };

  return (
    <CartProvider >
      {isCartVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
