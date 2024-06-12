import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Button from '../../components/Button/Button';
import { useAccount } from 'wagmi';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross1Icon } from '@radix-ui/react-icons';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PlusIcon } from '@radix-ui/react-icons';
import { MinusIcon } from '@radix-ui/react-icons';
import { CheckboxIcon } from '@radix-ui/react-icons';
import { BoxIcon } from '@radix-ui/react-icons';
import { ArrowRightIcon } from '@radix-ui/react-icons';


const products = [
  { name: "Hat", price: 5, imageUrl: '/h.png' },
  // { name: "Base Hat", price: 10, imageUrl: '/baseHat.png' },
  { name: "Socks (Unisex)", price: 5, imageUrl: '/socks.png' },

  { name: "Onchain summer sunglasses", price: 5, imageUrl: "https://www.lockerroomsportsapparel.com/cdn/shop/products/c24.jpg?v=1681920691" },
  { name: "Bit by Bit Childrens Book", price: 25, imageUrl: '/book.png' },
  { name: "BTC Tee: Medium (Womens)", price: 5, imageUrl: '/btc.jpeg' },
  { name: "BTC Tee: Large (Mens)", price: 5, imageUrl: '/btc.jpeg' },
  { name: "Coin Tee: XS", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },
  { name: "Coin Tee: Small", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },
  { name: "Coin Tee: Medium", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },
  { name: "Coin Tee: Large", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },
  { name: "Coin Tee: XL", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },
  { name: "Coin Tee: 2XL", price: 10, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9600_b4e81208-fd06-4205-b0d8-739bcaa527ac.jpg?v=1707459407" },

  { name: "Base Tee: XS", price: 15, imageUrl: '/baseT.png' },
  { name: "Base Tee: Small", price: 15, imageUrl: '/baseT.png' },
  // { name: "Base Tee: Medium", price: 15, imageUrl: '/baseT.png' },
  { name: "Base Tee: Large", price: 15, imageUrl: '/baseT.png' },
  { name: "Base Tee: XL", price: 15, imageUrl: '/baseT.png' },
  { name: "Base Tee: 2XL", price: 15, imageUrl: '/baseT.png' },

  { name: "Shadowy Super Coder Hoodie: Extra Small", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },
  { name: "Shadowy Super Coder Hoodie: Small", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },
  { name: "Shadowy Super Coder Hoodie: Medium", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },
  { name: "Shadowy Super Coder Hoodie: Large", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },
  { name: "Shadowy Super Coder Hoodie: XL", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },
  { name: "Shadowy Super Coder Hoodie: 2XL", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9694.jpg?v=1707459485" },

  { name: "Whitepaper Hoodie: Extra Small", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
  { name: "Whitepaper Hoodie: Small", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
  // { name: "Whitepaper Hoodie: Medium", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
  { name: "Whitepaper Hoodie: Large", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
  { name: "Whitepaper Hoodie: XL", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
  { name: "Whitepaper Hoodie: 2XL", price: 25, imageUrl: "https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9641.jpg?v=1707459629" },
];

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  updateProductData: (name: string, discountedPrice: number, quantity: number) => void;
  setAppliedDiscounts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  totalNFTs: number;
  setTotalNFTs: React.Dispatch<React.SetStateAction<number>>;
}



const checkNFTOwnership = async (
  walletAddress: string,
  setAppliedDiscounts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
  setTotalNFTs: React.Dispatch<React.SetStateAction<number>> // Add this line
) => {
  const SH_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;
  if (!SH_API_KEY) {
    throw new Error('API_KEY is not defined');
  }

  const headers = {
    'X-API-KEY': SH_API_KEY,
    'accept': 'application/json'
  };

  try {
    const response = await fetch(`https://api.simplehash.com/api/v0/nfts/contracts?chains=base&wallet_addresses=${walletAddress}`, {
      method: 'GET',
      headers: headers
    }); 

    const data = await response.json();
    const contracts = data.wallets[0]?.contracts;
    
    let totalNFTsOwned = 0;
    contracts.forEach((contract: { contract_address: string, nfts_owned: number }) => {
      totalNFTsOwned += contract.nfts_owned;
    });

    let discount = 0;
    if (totalNFTsOwned > 9) {
      discount = 30;
    } else if (totalNFTsOwned > 4) {
      discount = 25;
    } else if (totalNFTsOwned > 0) {
      discount = 20;
    }
    console.log(discount)

    setTotalNFTs(totalNFTsOwned); // Set the totalNFTs state

    return discount;
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
  }
  return 0; // No discount if no NFTs are found or an error occurs
};

const ProductCard = ({ name, price, imageUrl, updateProductData, setAppliedDiscounts, totalNFTs, setTotalNFTs }: ProductCardProps & { totalNFTs: number, setTotalNFTs: React.Dispatch<React.SetStateAction<number>> }) => {
  const [quantity, setQuantity] = useState(0);
  const { address } = useAccount();
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [discount, setDiscount] = useState(0);


  // Extract the size from the product name
  // const size = name.split(":").pop()?.trim() ?? '';
  const hasSize = name.includes(":");
  const size = hasSize ? name.split(":").pop()?.trim() ?? '' : '';
  const increment = () => {
    setQuantity(quantity + 1);
    updateProductData(name, discountedPrice, quantity + 1);
  };

  useEffect(() => {
    if (address) {
      checkNFTOwnership(address, setAppliedDiscounts, setTotalNFTs).then((discount) => { // Pass setTotalNFTs here
        const newPrice = price * (1 - discount / 100);
        setDiscountedPrice(newPrice);
        setDiscount(discount);
      });
    }
  }, [address, price, setTotalNFTs]); // Add setTotalNFTs to the dependency array

  const decrement = () => {
    setQuantity(quantity - 1 > 0 ? quantity - 1 : 0);
    updateProductData(name, discountedPrice, quantity - 1);
  };

  return (
    <div className="relative flex flex-col text-gray-700 bg-[#141519] shadow-md rounded-xl w-full sm:w-96 md:w-96 lg:w-96 xl:w-96">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-38">
        {hasSize && (
      <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded-md">{size}</div>
)}
      
        <img
          src={imageUrl}
          alt="product image"
          className="object-cover w-full h-64 md:w-full md:h-64"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-white">
            {name}
          </p>
          {discount > 0 ? (
            <>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-gray-500 line-through">
                ${price.toFixed(2)}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-green-500">
                ${discountedPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-white">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {/* Description can be added here if needed */}
        </p>

      </div>
      <div className="flex items-center justify-center space-x-2 p-4">
        <button onClick={decrement} className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-gray-100 text-xl font-bold hover:bg-gray-200 shadow">{<MinusIcon />}</button>

        <div className="flex items-center justify-center border border-gray-300 text-xl text-white font-semibold w-20 h-10 rounded-md">{quantity}</div>
        <button onClick={increment} className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-gray-100 text-xl font-bold hover:bg-gray-200 shadow"> {<PlusIcon />}</button>
      </div>
    </div>
  );
};

export default function WhyUseIt() {
  const [appliedDiscounts, setAppliedDiscounts] = useState<{ [key: string]: boolean }>({
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsData, setProductsData] = useState<{ name: string, price: number, quantity: number }[]>([]);
  const [hostedUrl, setHostedUrl] = useState('');
  const [resetKey, setResetKey] = useState(0); // Add a key for resetting the component
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalNFTs, setTotalNFTs] = useState(0);
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
        "amount": totalPrice.toFixed(2),
        "currency": "USD"
      },
      "pricing_type": "fixed_price",
      "metadata": {
        "products": productsDataToSend
      },
      // "redirect_url": "https://satoshisstand.com/mint"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
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
    <>
      <section className="mb-24 flex flex-col items-center justify-center">
        <div className="w-full md:w-4/5">
          <ul className="items-left flex flex-col justify-center">
            <li className="inline-flex items-center justify-start gap-4">
              {totalNFTs > 0 ? <CheckboxIcon width="24" height="24" /> : <BoxIcon width="24" height="24" />}
              <span className="font-inter text-m font-normal leading-7 text-white">
                {' '}
                  Own at leat 1 Base NFT — up to 20% off
                {totalNFTs > 0 && <span className="text-green-500">  discount applied!</span>}
              </span>
            </li>

            <li className="mt-5 inline-flex items-center justify-start gap-4">
              {totalNFTs >= 5 ? <CheckboxIcon width="24" height="24" /> : <BoxIcon width="24" height="24" />}
              <span className="font-inter text-m font-normal leading-7 text-white">
              Own at least 5 Base NFTs — up to 25% off

                {totalNFTs >= 5 && <span className="text-green-500">  discount applied!</span>}
              </span>
            </li>
            <li className="mt-5 inline-flex items-center justify-start gap-4">
              {totalNFTs >= 10 ? <CheckboxIcon width="24" height="24" /> : <BoxIcon width="24" height="24" />}
              <span className="font-inter text-m font-normal leading-7 text-white">
              Own at least 10 Base NFTs — up to 30% off
                {totalNFTs >= 10 && <span className="text-green-500">  discount applied!</span>}
                </span>
            </li>
            <li className="mt-5 inline-flex items-center justify-start gap-4">
            <ArrowRightIcon width="24" height="24" />
              <span className="font-inter text-m font-normal leading-7 text-green-500">
                Want to get a discount? <a href= "https://mint.fun/feed/free?chain=base&range=24h" target='blank'> Tap here to mint more Base NFTs</a> 
                </span>
            </li>


          </ul>

        </div>
      </section>
      <div className="flex flex-wrap justify-start md:justify-start p-2">
        {products.map((product, index) => (
          <div key={`${product.name}-${index}`} className="p-2 w-full sm:w-auto">
            <ProductCard
              key={`${product.name}-${resetKey}`}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl} // Pass imageUrl here
              updateProductData={updateProductData}
              setAppliedDiscounts={setAppliedDiscounts}
              totalNFTs={totalNFTs}
              setTotalNFTs={setTotalNFTs}
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center mt-4 w-full">
          {totalQuantity > 0 && (
            <div className="fixed bottom-0 left-0 right-0 p-4 shadow-md rounded-t-[25px] flex flex-col items-center backdrop-blur-2xl">
              <Button
                buttonContent={`CHECKOUT ${totalQuantity} ITEM${totalQuantity !== 1 ? 'S' : ''}`}
                onClick={handleCheckout}
                variant="sky"
                className="w-full md:w-1/2 rounded-[25px] my-2"
              />
              <Button
                buttonContent={<><ReloadIcon style={{ marginRight: '5px' }} /> RESET CART</>}
                onClick={handleReset}
                variant='primary'
                className="w-full md:w-1/2 flex items-center justify-center py-4 text-sm text-black rounded-full my-2"
              />
            </div>
          )}
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-100 backdrop-blur-2xl flex justify-center items-center px-4 py-8 z-50"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-lg rounded-lg flex flex-col items-center text-white overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-6 text-white text-2xl font-bold cursor-pointer"
                onClick={closeModal}
              >
                <Cross1Icon width="24" height="24" />
              </button>
              <div className="text-lg font-semibold mb-4">Your Order:</div>

              <ul className="mb-4">
                {purchasedProducts.map((product, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon width="24" height="24" style={{ marginRight: '5px' }} /> {`${product.name} (${product.quantity}x)`}
                  </li>
                ))}
              </ul>
              <div className="text-lg font-semibold mb-4">Subtotal: ${totalPrice.toFixed(2)}</div>
              <div className="p-4 bg-white rounded-lg">
                <QRCode value={qrCodeValue} size={116} />
              </div>
              <p>scan QR or click PAY</p>
              <Button
                buttonContent="PAY"
                onClick={() => window.open(hostedUrl, '_blank')}
                className="flex w-4/5 bg-green-500 items-center justify-center py-4 text-sm bg-white text-black rounded-full my-4 bg-white"
                variant='sky'
              />
            </div>
          </div>
        )}
      </div></>
  );
}
