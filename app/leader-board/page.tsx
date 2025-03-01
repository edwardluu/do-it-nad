

import ButtonApp from "@/components/ui/button-app";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { getLeaderBoard } from "@/lib/supabase/services";


async function getUserData() {
  const data = await getLeaderBoard();
  return data || [];
}

async function LeaderBoardPage() {

  const leaderBoard = await getUserData();

  const renderIcon = (key: number) => {
    switch (key) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  const convertAddress = (address: string) => {
    return address ? address.substring(0, 5) + "..." + address.slice(-4) : '';
  };


  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <Link href="/">
        <ButtonApp className={`text-3xl rounded p-10`}>Play Game</ButtonApp>
      </Link>

      <div className="lg:w-2/3 w-full justify-center mt-10">
        <h1 className="text-4xl text-[#b18597] mb-8 uppercase">TOP 50 Player</h1>
        <ScrollArea className="h-[500px] rounded-md border-2 border-[#b18597] p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-xl">👑</TableHead>
              <TableHead className="w-[100px] text-xl text-green-600">Rank</TableHead>
              <TableHead className="text-gray-900 text-xl">Address</TableHead>
              <TableHead className="text-right text-yellow-600 text-xl">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderBoard &&
              leaderBoard.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text-xl">{renderIcon(index)}</TableCell>
                    <TableCell className="font-medium text-xl text-green-600">{index + 1}</TableCell>
                    <TableCell className="text-xl">{convertAddress(user?.address)}</TableCell>
                    <TableCell className="text-right text-xl text-yellow-600 ">{user?.point || 0}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        </ScrollArea>

      </div>
    </div>
  );
}

export default LeaderBoardPage;
