import React from "react";
import { ClipLoader } from "react-spinners";

export const Loading = isLoading => {
  console.log("isLoading", isLoading);
  return (
    <div className="sweet-loading">
      <ClipLoader
        sizeUnit={"px"}
        size={150}
        color={"#123abc"}
        loading={isLoading}
      />
    </div>
  );
};
