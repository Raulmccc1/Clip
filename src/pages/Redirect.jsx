import { useURL } from "@/context/urlContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();

  const { urlDataLoading, getLongURL, storeClicks } = useURL();

  useEffect(() => {
    (async () => {
      const res = await getLongURL(id);
      if (res.success) {
        const data = res.data;
        await storeClicks(data.id, data.original_url);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto min-h-screen p-0.5 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28">
        {urlDataLoading && (
          <BarLoader
            width={"100%"}
            height={55}
            color="red"
            cssOverride={{
              position: "fixed",
              left: "0px",
              top: "0px",
            }}
          />
        )}
        {urlDataLoading && <p>Redirecting...</p>}
      </div>
    </div>
  );
};

export default Redirect;
