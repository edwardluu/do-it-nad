'use client'
import Image from "next/image";

interface ImageStatus {
    choice: string,
    width: number | 100,
    height: number | 100
}

function ImageStatus({choice, height, width}: ImageStatus) {
  if (choice === "rock")
    return (
      <Image
        src="/rock.png"
        alt="status"
        unoptimized
        width={width}
        height={height}
      />
    );
  if (choice === "paper")
    return (
      <Image
        src="/paper.png"
        alt="status"
        unoptimized
        width={width}
        height={height}
      />
    );
  if (choice === "scissors") {
    return (
      <Image
        src="/scissors.png"
        alt="status"
        unoptimized
        width={width}
        height={height}
      />
    );
  }
}

export default ImageStatus;