"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Airdrop: React.FC = () => {
  const [airdropLoading, setAirdropLoading] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  const requestAirdrop = async () => {
    if (wallet.publicKey) {
      setAirdropLoading(true);
      try {
        await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);
        // fetchBalance();
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setAirdropLoading(false);
      }
    }
  };

  useEffect(() => {
    // fetchBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">
            SOL Airdrop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {wallet.connected ? (
              <>
                <div className=" mt-4">
                  <Button
                    onClick={requestAirdrop}
                    disabled={airdropLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Request Airdrop
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-lg text-gray-600">Wallet not connected.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Airdrop;
