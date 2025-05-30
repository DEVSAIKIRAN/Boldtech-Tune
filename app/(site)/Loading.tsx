"use client";

import { FC } from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClipLoader color="white" size={40} />
    </div>
  );
};

export default Loading;