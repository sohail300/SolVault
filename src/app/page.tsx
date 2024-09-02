"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Gem, BarChart, Lock } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WobbleCard } from "@/components/ui/wobble-card";
import { GlareCard } from "@/components/ui/glare-card";
import getCurrentYear from "@/utils/getCurrentYear";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import Image from "next/image";

export default function Component() {
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
    <div className="flex flex-col bg-gray-950 text-gray-100">
      <section className="w-full py-8 md:py-20 lg:py-28 xl:py-36">
        <div className="px-4 md:px-6 flex flex-col items-center justify-evenly space-y-8 text-center">
          <Image
            src={"/solana.webp"}
            height={200}
            width={200}
            className="m-auto"
          />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl ">
            Welcome to solDapp
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl space-y-8 ">
            Experience the future of decentralized applications on Solana. Fast,
            secure, and scalable.
          </p>

          {wallet.connected ? (
            <>
              <WalletDisconnectButton className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded transition duration-200" />
            </>
          ) : (
            <WalletMultiButton className="bg-purple-600 hover:bg-purple-800 text-white text-sm py-1 px-3 rounded transition duration-200" />
          )}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Our Offerings
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <WobbleCard
              containerClassName="h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="font-bold text-3xl">Balance</CardTitle>
                <Gem className="h-12 w-12 mb-2" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>View real-time SOL balance</li>
                  <li>Monitor token balances</li>
                  <li>Comprehensive balance tracking</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/balance" className=" w-full z-50">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 ">
                    Check Balance
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </WobbleCard>

            <WobbleCard
              containerClassName="h-full bg-blue-900 min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="font-bold text-3xl">Airdrop</CardTitle>
                <BarChart className="h-12 w-12 mb-2" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Receive airdrops</li>
                  <li>Receive sohailX token airdrops</li>
                  <li>Automated airdrop processes</li>
                </ul>
              </CardContent>
              <CardFooter className=" space-x-4">
                <Link href="/airdrop/sol" className=" w-full z-50">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    SOL
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/airdrop/sohailx" className=" w-full z-50">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    sohailX
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </WobbleCard>

            <WobbleCard
              containerClassName="h-full bg-green-700 min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="font-bold text-3xl">Transfer</CardTitle>
                <Lock className="h-12 w-12 mb-2" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <ul className="space-y-2 text-sm">
                    <li>Secure SOL transfers</li>
                    <li>Transfer tokens seamlessly</li>
                    <li>Instant transaction processing</li>
                  </ul>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/transfer" className=" w-full z-50">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Transfer Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </WobbleCard>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Features
          </h2>
          <div className=" flex justify-evenly">
            <GlareCard className="flex flex-col items-center justify-center p-6 bg-sky-900 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Zap className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-300 text-center">
                Experience blazing fast transaction speeds with Solana's
                architecture.
              </p>
            </GlareCard>

            <GlareCard className="flex flex-col items-center justify-center p-6  bg-sky-900 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Zap className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure & Reliable</h3>
              <p className="text-gray-300 text-center">
                Built on Solana's robust blockchain for maximum security and
                uptime.
              </p>
            </GlareCard>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © {getCurrentYear()} SolDApp. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
      <BackgroundBeams />
    </div>
  );
}
