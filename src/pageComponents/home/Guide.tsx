// import CodeBlock from '../../components/code-block/CodeBlock';
// import React, { useState } from 'react';

// const codeStep1 = `\`\`\`bash
// $ npx @coinbase/build-onchain-apps@latest create`;
// const codeStep2 = `\`\`\`bash
// NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE`;
// const codeStep3 = `\`\`\`bash
// # cd into your new project folder
// cd [app-name]/web

// # Install dependencies
// yarn

// # Run onchain app
// yarn dev`;
// const codeStep4 = `\`\`\`bash
// # Install Foundry

// curl -L https://foundry.paradigm.xyz | bash
// foundryup`;
// const codeStep5 = `\`\`\`bash
// cd contracts

// # Install dependencies
// forge install

// # Build
// forge build`;
// const codeStep6 = `\`\`\`bash
// # Create a .env file using the .env.example file provided in your contracts folder and add your private key. Make sure to add a 0x in front of your key to convert it to a hex.
// # Note: Get an API key from basescan.org for Base Sepolia by creating an account

// forge script script/BuyMeACoffee.s.sol:BuyMeACoffeeScript --broadcast --verify --rpc-url base_sepolia
// `;

// export default function Guide() {

//   const [hostedUrl, setHostedUrl] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   interface Product {
//     name: string;
//     price: number;
//     quantity: number;
//   }
  
//   const [productsData, setProductsData] = useState<Product[]>([]);
//   const updateProductData = (name: string, price: number, quantity: number) => {
//     const updatedProducts = [...productsData];
//     const existingProductIndex = updatedProducts.findIndex((product) => product.name === name);
    
//     if (existingProductIndex !== -1) {
//       updatedProducts[existingProductIndex].quantity = quantity;
//     } else {
//       updatedProducts.push({ name, price, quantity });
//     }

//     setProductsData(updatedProducts);

//     const newTotalPrice = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
//     setTotalPrice(newTotalPrice);

//     // Use totalPrice in guide.tsx for further processing or API calls
//   };

//   const fetchHostedUrl = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "application/json");

//     const productsDataToSend = productsData.map((product) => ({
//       name: product.name,
//       quantity: product.quantity
//     }));

//     const raw = JSON.stringify({
//       "local_price": {
//         "amount": totalPrice.toString(),
//         "currency": "USD"
//       },
//       "pricing_type": "fixed_price",
//       "metadata": {
//         "products": productsDataToSend
//       }
//     });

//     const requestOptions: RequestInit = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     fetch("https://api.commerce.coinbase.com/charges", requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         setHostedUrl(result.data.hosted_url);
//       })
//       .catch(error => console.error('error', error));
//   };

//   return (
//     <>
//       <h3 className="mt-8 text-4xl font-medium text-white" id="get-started">
//         Getting started
//       </h3>
//       <div className="flex items-center justify-center mt-4">
//         <button id="fetchButton" onClick={fetchHostedUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//           Checkout
//         </button>
//       </div>
//       <div id="urlDisplay">{hostedUrl}</div>
//     </>
//   );
// }
