import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WobbleCard } from "@/components/ui/wobble-card";
import getCurrentYear from "@/utils/getCurrentYear";

export default function Component() {
  // Mock data for demonstration
  const solanaBalance = 10.5;
  const tokens = [
    {
      name: "Serum",
      symbol: "SRM",
      balance: 1000,
      price: 0.95,
      image: "https://cryptologos.cc/logos/serum-srm-logo.png",
    },
    {
      name: "Raydium",
      symbol: "RAY",
      balance: 500,
      price: 0.72,
      image: "https://cryptologos.cc/logos/raydium-ray-logo.png",
    },
    {
      name: "Star Atlas",
      symbol: "ATLAS",
      balance: 2000,
      price: 0.003,
      image: "https://cryptologos.cc/logos/star-atlas-atlas-logo.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <WobbleCard containerClassName="h-full bg-green-800 " className="">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-bold mb-2">
                Solana Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-5xl font-bold mb-2">{solanaBalance} SOL</p>
                  <p className="text-xl text-gray-300">
                    ${(solanaBalance * 20).toFixed(2)} USD
                  </p>
                </div>
                <img
                  src="https://cryptologos.cc/logos/solana-sol-logo.png"
                  alt="Solana Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </CardContent>
          </WobbleCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token, idx) => (
              <WobbleCard
                containerClassName={`h-full ${
                  idx === 1 ? "bg-pink-700" : idx === 2 ? "bg-orange-800" : ""
                }`}
                className="p-4"
                key={token.symbol}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={token.image}
                      alt={`${token.name} Logo`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{token.name}</h3>
                      <p className="text-sm text-gray-300">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">
                      {token.balance.toLocaleString()} {token.symbol}
                    </p>
                    <p className="text-sm text-gray-300">
                      $
                      {(token.balance * token.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      USD
                    </p>
                  </div>
                </CardContent>
              </WobbleCard>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          © {getCurrentYear()} Solana Wallet Dashboard. All rights reserved.
          Data provided for informational purposes only.
        </div>
      </footer>
    </div>
  );
}
