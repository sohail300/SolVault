"use client";

import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Loader2, Menu, Wallet } from "lucide-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  const fetchBalance = async () => {
    if (wallet.publicKey) {
      setLoading(true);
      try {
        const balanceInLamports = await connection.getBalance(wallet.publicKey);
        setBalance(balanceInLamports / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      fetchBalance();
    }
  }, [wallet.connected, wallet.publicKey, connection]);

  return (
    <nav className="bg-purple-700 text-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link className="flex items-center justify-center" href="/">
            <Wallet className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">solDapp</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {wallet.connected ? (
                <>
                  <div className="text-sm">
                    {loading ? (
                      <Loader2 className="animate-spin inline-block mr-2" />
                    ) : balance !== null ? (
                      <span className=" font-bold">
                        {balance.toFixed(4)} SOL
                        {/* <Button
                    onClick={fetchBalance}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-800 text-white text-sm py-1 px-3 rounded transition duration-200"
                  >
                    Refresh
                  </Button> */}
                      </span>
                    ) : (
                      "Balance unavailable"
                    )}
                  </div>
                </>
              ) : (
                "Wallet not connected"
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {wallet.connected ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href="/balance">
                        <DropdownMenuItem>Balance</DropdownMenuItem>
                      </Link>
                      <Link href="/airdrop/sol">
                        <DropdownMenuItem>Airdrop SOL</DropdownMenuItem>
                      </Link>
                      <Link href="/airdrop/sohailx">
                        <DropdownMenuItem>Airdrop sohailX</DropdownMenuItem>
                      </Link>
                      <Link href="/tranfer">
                        <DropdownMenuItem>Transfer</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <WalletDisconnectButton className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded transition duration-200" />
                </>
              ) : (
                <WalletMultiButton className="bg-purple-600 hover:bg-purple-800 text-white text-sm py-1 px-3 rounded transition duration-200" />
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {wallet.connected ? (
              <>
                <div className="text-center py-2">
                  {loading ? (
                    <Loader2 className="animate-spin inline-block mr-2" />
                  ) : balance !== null ? (
                    <span>{balance.toFixed(4)} SOL</span>
                  ) : (
                    "Balance unavailable"
                  )}
                </div>
                {/* <Button
                  onClick={fetchBalance}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-800 text-white text-sm py-2 px-3 rounded transition duration-200"
                >
                  Refresh Balance
                </Button> */}
                <div className="flex justify-center mt-2">
                  <WalletDisconnectButton className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded transition duration-200" />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <WalletMultiButton className="bg-purple-600 hover:bg-purple-800 text-white text-sm py-2 px-3 rounded transition duration-200" />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
