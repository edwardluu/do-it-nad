"use client";

import { useEffect, useState } from "react";
import DialogStatus from "@/components/layout/dialog-info";
import DialogMessages from "@/components/layout/dialog-message";
import ButtonApp from "@/components/ui/button-app";
import Image from "next/image";
import ImageStatus from "@/components/ui/image-status";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { abi, addressContract } from "@/lib/abi";
import { getUser, updatePoint } from "@/lib/supabase/services";

const choices = ["rock", "paper", "scissors"];

export default function Home() {
  const [userChoice, setUserChoice] = useState("");
  const [data, setData] = useState({ status: "", message: "", point: 0 });
  const [openDialogStatus, setOpenDialogStatus] = useState(false);
  const [openDialogMessages, setOpenDialogMessages] = useState(false);
  const [computerChoice, setComputerChoice] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userPoint, setPoint] = useState(0);

  const { address } = useAccount();

  const { data: hash, writeContract, error } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const getComputerChoice = (): string => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (user: string, computer: string): object => {
    if (!user || !computer) return { status: "", message: "", point: 0 };
    if (user === computer) {
      return {
        status: "tie",
        message: "It's a tie!",
        point: 5,
      };
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      return {
        status: "win",
        message: "You Win!",
        point: 10,
      };
    } else {
      return {
        status: "lose",
        message: "You Lose!",
        point: 0,
      };
    }
  };

  const play = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setDisabled(true);
    const computer = getComputerChoice();
    setComputerChoice(computer);

    writeContract({
      address: addressContract,
      abi,
      functionName: "sayGMonad",
    });
    setOpenDialogMessages(true);
  };

  useEffect(() => {
    if (error) {
      setOpenDialogMessages(false);
      return setDisabled(false);
    }
    if (isConfirmed) {
      setOpenDialogMessages(false);
      // @ts-expect-error: Unreachable code error
      const { point, status, message } = determineWinner(
        userChoice,
        computerChoice
      );

      if (point) {
        const currentPoint = userPoint + point;
        // @ts-expect-error: Unreachable code error
        updatePoint(address, currentPoint);
        setPoint(currentPoint);
      }
      setData({ point, status, message });
      setOpenDialogStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, error]);

  useEffect(() => {
    if (!address) return;
    async function getUserData() {
      const data = await getUser(address || "");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (data) setPoint(data.point || 0);
    }
    getUserData();
  }, [address]);

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setOpenDialogStatus(false);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col h-full w-full justify-between items-center">
      <DialogStatus data={data} open={openDialogStatus} resetGame={resetGame} />
      <DialogMessages open={openDialogMessages} />
      <div className="flex w-full justify-center flex-col items-center">
        <div className="flex w-full gap-4 items-end justify-center  mb-4">
          <Link href="/leader-board" className="lg:hidden">
            <Image
              src="/leader-board.png"
              width={50}
              height={50}
              unoptimized
              alt="rank"
            />
          </Link>
          <div className="md:text-4xl text-xl font-bold text-slate-500">
            Your Points:
            <span className="text-yellow-400 pl-1">{userPoint || 0}</span>
          </div>
        </div>
        {computerChoice ? (
          <ImageStatus choice={computerChoice} height={100} width={100} />
        ) : (
          <Image
            src="/computer.gif"
            width={200}
            height={200}
            unoptimized
            alt="computer"
          />
        )}
      </div>
      <div className="flex w-full justify-center">
        {!address ? (
          <ConnectKitButton theme="retro" />
        ) : (
          <ButtonApp
            onClick={play}
            className={`text-5xl rounded p-12`}
            disabled={!userChoice || disabled}
            typeButton="play"
          >
            <span>Play</span>
          </ButtonApp>
        )}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex gap-x-8 lg:w-1/2  w-full justify-center">
          {choices.map((choice) => (
            <ButtonApp
              key={choice}
              className="md:h-30 md:w-30 h-30 w-30 flex items-center justify-center rounded-full"
              onClick={() => setUserChoice(choice)}
              disabled={userChoice === choice}
            >
              <Image
                className="pointer-events-none"
                src={`/${choice}.png`}
                width={50}
                height={100}
                alt={choice}
              />
            </ButtonApp>
          ))}
        </div>
      </div>
    </div>
  );
}
