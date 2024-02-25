import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Button from '../../components/Button/Button';
import { useAccount } from 'wagmi';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross1Icon } from '@radix-ui/react-icons';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PlusIcon } from '@radix-ui/react-icons';
import { MinusIcon } from '@radix-ui/react-icons';
// import { CheckboxIcon } from '@radix-ui/react-icons';
// import { BoxIcon } from '@radix-ui/react-icons';



const products = [
  { name: "Sample Tee", price: 0.05 },
  { name: "Sample Hat", price: 0.1 },
  { name: "Sample Hoodie", price: 0.2 },
  { name: "Base Logo Hat", price: 1 },
  { name: "Onchain summer sunglasses", price: 5 },
  // Add the rest of products here...
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

  try {
    const response = await fetch(`https://api.simplehash.com/api/v0/nfts/contracts?chains=ethereum,base&wallet_addresses=${walletAddress}&contract_addresses=0xB3Da098a7251A647892203e0C256b4398d131a54,0x9D90669665607F08005CAe4A7098143f554c59EF,0x9340204616750cb61e56437befc95172c6ff6606`, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json();
    const contracts = data.wallets[0]?.contracts;

    let discount = 0;
    contracts.forEach((contract: { contract_address: string }) => {
      if (contract.contract_address === "0x9D90669665607F08005CAe4A7098143f554c59EF") {
        discount += 20; //  discount if "Stand with Crypto" NFT is present
      } else if (contract.contract_address === "0xB3Da098a7251A647892203e0C256b4398d131a54") {
        discount += 3; //  discount if "Mint a Penny" NFT is present
      } else if (contract.contract_address === "0x9340204616750cb61e56437bEfC95172C6Ff6606") {
        discount += 10; //  discount if "FarCats" NFT is present
      }
    });

    return discount;
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

<div className="relative flex flex-col text-gray-700 bg-[#141519] shadow-md border border-stone-100 rounded-xl w-full sm:w-96 md:w-96 lg:w-96 xl:w-96">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-38">
        <img
          src="https://coinbaseshop.com/cdn/shop/files/20240203_845a_Photoshoot_Coinbase-Merch-Q1_IMGP9647.jpg?v=1707459629"
          alt="product image" className="object-cover w-full h-full" />
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
        <div className="flex items-center justify-center border border-gray-300 text-xl text-white font-semibold w-20 h-10">{quantity}</div>
        <button onClick={increment} className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-gray-100 text-xl font-bold hover:bg-gray-200 shadow"> {<PlusIcon />}</button>
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

          {/* <h2 className="mb-14 text-center text-xl font-medium text-white md:text-2xl lg:text-3xl">
            Save 10% by holding one of these NFTs. Save 15% by holding both.
          </h2> */}
          <ul className="items-left flex flex-col justify-center">
            <li className="inline-flex items-center justify-start gap-4">
              <CheckIcon width="24" height="24" />
              <span className="font-inter text-xl font-normal leading-7 text-white">
                {' '}
                <a href="https://www.standwithcrypto.org/" target="_blank">
                  Stand with crypto 
                </a>{' '}
                — 20% off
              </span>
            </li>

            <li className="mt-5 inline-flex items-center justify-start gap-4">
              <CheckIcon width="24" height="24" />
              <span className="font-inter text-xl font-normal leading-7 text-white">

                <a href="https://opensea.io/collection/farcats" target="_blank">
                  FarCat
                </a>{' '}
                — 10% off
              </span>
            </li>
            <li className="mt-5 inline-flex items-center justify-start gap-4">
              <CheckIcon width="24" height="24" />
              <span className="font-inter text-xl font-normal leading-7 text-white">

                <a href="https://www.mintapenny.xyz/" target="_blank">
                  Mint a penny
                </a>{' '}
                — 3% off
              </span>
            </li>
          </ul>

        </div>
      </section>
      <div className="flex flex-wrap justify-start md:justify-start p-2">
        {products.map((product, index) => (
          <div key={`${product.name}-${index}`} className="p-2 w-full sm:w-auto">
            <ProductCard key={`${product.name}-${resetKey}`} name={product.name} price={product.price} updateProductData={updateProductData} />
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
