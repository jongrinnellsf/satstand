
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Button from '../../components/Button/Button';
import { useAccount } from 'wagmi';


const products = [
  { name: "Sample Tee-M", price: 0.05 },
  { name: "Sample Hat", price: 0.1 },
  { name: "Sample Hoodie", price: 0.2 },
  { name: "Base Logo Hat", price: 20 },
  { name: "Onchain summer sunglasses", price: 25 },
  // Add the rest of your products here...
];

interface ProductCardProps {
  name: string;
  price: number;
  updateProductData: (name: string, discountedPrice: number, quantity: number) => void;
}

const checkNFTOwnership = async (walletAddress: string) => {
  const SH_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;
  if (!SH_API_KEY) {
    throw new Error('API_KEY is not defined');
  }

  const headers = {
    'X-API-KEY': SH_API_KEY,
    'accept': 'application/json'
  };

  //0x9D90669665607F08005CAe4A7098143f554c59EF = stand with crypto
  //0xB3Da098a7251A647892203e0C256b4398d131a54 = mint a penny
  //0x9340204616750cb61e56437befc95172c6ff6606 = FarCats

  try {
    const response = await fetch(`https://api.simplehash.com/api/v0/nfts/contracts?chains=ethereum,base&wallet_addresses=${walletAddress}&contract_addresses=0x9340204616750cb61e56437befc95172c6ff6606,0x9D90669665607F08005CAe4A7098143f554c59EF`, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json();
    const contracts = data.wallets[0]?.contracts;
    if (contracts?.length === 2) {
      return 15; // 15% discount if both NFTs are present
    } else if (contracts?.length > 0) {
      return 10; // 10% discount if at least one NFT is present
    }
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
  }
  return 0; // No discount if no NFTs are found or an error occurs
};


const ProductCard = ({ name, price, updateProductData }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const { address } = useAccount();
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [discount, setDiscount] = useState(0);


  const increment = () => {
    setQuantity(quantity + 1);
    updateProductData(name, discountedPrice, quantity + 1);
  };

  useEffect(() => {
    if (address) {
      checkNFTOwnership(address).then((discount) => {
        const newPrice = price * (1 - discount / 100);
        setDiscountedPrice(newPrice);
        setDiscount(discount);

      });
    }
  }, [address, price]);

  const decrement = () => {
    setQuantity(quantity - 1 > 0 ? quantity - 1 : 0);
    updateProductData(name, discountedPrice, quantity - 1);
  };

  return (
    
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full sm:w-96">
            {discount > 0 && (
        <div className="p-2 bg-green-500 text-black text-sm">
          Congratulations! A {discount}% discount has been applied.
        </div>
      )}

      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
        <img
          src="https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9647.jpg?v=1707459629"
          alt="product image" className="object-cover w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {name}
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            ${discountedPrice.toFixed(2)}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {/* Description can be added here if needed */}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Button
          onClick={increment}
          // buttonContent="Add to Cart"
          buttonContent={quantity > 0 ? `Added ${quantity}x` : "Add to Cart"}

          variant="sky" // Use the new 'sky' variant
          className="text-black" // Add text color and font classes
        />
      </div>
    </div>
  );
};

export default function WhyUseIt() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsData, setProductsData] = useState<{ name: string, price: number, quantity: number }[]>([]);
  const [hostedUrl, setHostedUrl] = useState('');
  const [resetKey, setResetKey] = useState(0); // Add a key for resetting the component
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalQuantity = productsData.reduce((total, product) => total + product.quantity, 0);

  const updateProductData = (name: string, discountedPrice: number, quantity: number) => {
    const updatedProducts = [...productsData];
    const existingProductIndex = updatedProducts.findIndex((product) => product.name === name);

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].price = discountedPrice; // Update the price to discountedPrice
      updatedProducts[existingProductIndex].quantity = quantity;
    } else {
      updatedProducts.push({ name, price: discountedPrice, quantity }); // Use discountedPrice for new entries
    }

    setProductsData(updatedProducts);

    const newTotalPrice = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(newTotalPrice);
  };
  const purchasedProducts = productsData.filter(product => product.quantity > 0);

  const handleCheckout = async () => {
    if (totalPrice === 0) {
      alert("Total price is 0. Please add items to your cart before checking out.");
      return;
    }
    const comKey = process.env.NEXT_PUBLIC_X_CC_API_KEY ?? '';

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-CC-Api-Key", comKey);


    const productsDataToSend = productsData.map((product) => ({
      name: product.name,
      price: product.price.toFixed(2),
      quantity: product.quantity
    }));

    const raw = JSON.stringify({
      "local_price": {
        // "amount": totalPrice.toString(),
        "amount": totalPrice.toFixed(2),
        "currency": "USD"
      },
      "pricing_type": "fixed_price",
      "metadata": {
        "products": productsDataToSend
      },
      "redirect_url": "https://satstand.vercel.app/mint"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect // Corrected line
    };

    try {
      const response = await fetch("https://api.commerce.coinbase.com/charges", requestOptions);
      const result = await response.json();
      setHostedUrl(result.data.hosted_url);
      setQRCodeValue(result.data.hosted_url);
      setIsModalOpen(true); // Show the modal on successful API call
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const handleReset = () => {
    setProductsData([]);
    setTotalPrice(0);
    setResetKey(prevKey => prevKey + 1); // Update the key to trigger re-render
  };

  return (
    
    <div className="flex flex-wrap justify-start md:justify-start p-2">
    {products.map((product, index) => (
      <div key={`${product.name}-${index}`} className="p-2 w-full sm:w-auto">
        <ProductCard key={`${product.name}-${resetKey}`} name={product.name} price={product.price} updateProductData={updateProductData} />
      </div>


      ))}
      <div className="flex flex-col items-center justify-center mt-4 w-full">
        <Button
          // buttonContent="Checkout"
          buttonContent={totalQuantity > 0 ? `CHECKOUT ${totalQuantity} item${totalQuantity !== 1 ? 's' : ''}` : 'CHECKOUT'}

          onClick={handleCheckout}
          variant="primary"
          // className="w-full md:w-1/2 text-mono" // 100% width on mobile, 50% width on desktop
          className="w-full md:w-1/2" // Add font-mono and font-bold classes

        />
        <Button
          buttonContent="RESET CART"
          onClick={handleReset}
          variant='secondary'
          className="flex w-full md:w-1/2 items-center justify-center py-4 text-sm text-white rounded-full my-4 " // 100% width on mobile, 50% width on desktop
        />
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 w-full h-full bg-black bg-opacity-100 flex justify-center items-center px-4 py-8 z-50"
          onClick={closeModal} // This will close the modal when the backdrop is clicked
        >
          <div
            className="w-full max-w-lg rounded-lg flex flex-col items-center text-white overflow-auto"
            onClick={(e) => e.stopPropagation()} // This prevents the click from propagating to the backdrop
          >
            <div className="text-lg font-semibold mb-4">Your Order:</div>
            <ul className="mb-4">
              {purchasedProducts.map((product, index) => (
                <li key={index}>{`${product.name} (${product.quantity}x)`}</li>
              ))}
            </ul>
            <div className="text-lg font-semibold mb-4">Subtotal: ${totalPrice.toFixed(2)}</div>
            <div className="p-4 bg-white rounded-lg">
              <QRCode value={qrCodeValue} size={256} />
            </div>
            <Button buttonContent="PAY" onClick={() => window.open(hostedUrl, '_blank')} className="flex w-4/5 bg-green-500 items-center justify-center py-4 text-sm bg-white text-black rounded-full my-4 bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}
