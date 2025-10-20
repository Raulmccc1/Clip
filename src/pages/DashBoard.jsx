import CreateLink from "@/components/CreateLink";
import LinkCard from "@/components/LinkCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { domain, mainURL } from "@/constants/domainConstants";
import { useAuth } from "@/context/authContext";
import { useURL } from "@/context/urlContext";
import useRequireAuth from "@/hooks/useRequireAuth";
import { Filter } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { BarLoader } from "react-spinners";

const DashBoard = () => {
  useRequireAuth();

  const { user, authLoading } = useAuth();
  const { urlDataLoading, getURLS, getClicksForURLS, deleteURL, urlDataError } = useURL();
  const [searchQuery, setSearchQuery] = useState("");
  const [allURLS, setAllURLS] = useState([]);
  const [allClicks, setAllClicks] = useState([]);

  const fetchAllURLS = async () => {
    setAllURLS([]);
    const res = await getURLS(user?.id);
    if (res.success) {
      setAllURLS(res.data);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    fetchAllURLS();
  }, [authLoading]);

  useEffect(() => {
    if (!allURLS || allURLS.length === 0) return;

    (async () => {
      const url_idArr = allURLS.map((url) => url.id) ?? [];
      const res = await getClicksForURLS(url_idArr);
      if (res.success) {
        setAllClicks(res.data);
      }
    })();
  }, [allURLS]);

  const onDelete = async (id, qr) => {
    const fileName = qr.split("/").pop();
    const res = await deleteURL(id, fileName);
    if (res.success) {
      fetchAllURLS();
    }
  };

  const filterURLS = useMemo(() => {
    return allURLS?.filter((url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allURLS, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen antialiased p-0.5 sm:px-4 md:px-6 lg:px-8 print:px-4 print:py-6">
      <div className="border-b py-5 mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28 md:py-8">
        <div className="flex flex-col items-center sm:items-start justify-center gap-2 px-3 sm:px-0 text-center sm:text-left">
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
          {urlDataError && allURLS.length === 0 && (
            <p className="text-red-500">{urlDataError}</p>
          )}
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl leading-tight tracking-tight font-extralight font-sans max-w-3xl mx-auto sm:mx-0">
            Your links at a glance
          </h1>
          <p className="mt-3 text-center sm:text-left text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl sm:max-w-3xl mx-auto sm:mx-0">
            Track total links and clicks, copy or open short URLs, and drill
            into analytics for deeper insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-5 auto-rows-fr">
          <Card className="rounded-2xl border hover:shadow-xl transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <p className="text-sm tracking-wide">Total Links</p>
              <p className="mt-1 text-3xl sm:text-4xl tabular-nums font-medium">
                {allURLS.length}
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border hover:shadow-xl transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <p className="text-sm tracking-wide">Total Clicks</p>
              <p className="mt-1 text-3xl sm:text-4xl tabular-nums font-medium">
                {allClicks.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Input Filtering of Urls */}
      <div className="w-full mt-5">
        <div className="w-full flex items-center justify-between gap-3 flex-wrap">
          <p className="flex-1 text-xl sm:text-2xl tracking-tight font-sans">
            My Links
          </p>
          <CreateLink mainURL={mainURL} domain={domain} />
        </div>
        <div className="w-full mt-5">
          <InputGroup>
            <InputGroupInput
              type={"text"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={"w-full max-w-full text-sm sm:text-base rounded-md"}
              placeholder={"Search your Links"}
            />
            <InputGroupAddon>
              <InputGroupText>
                <Filter strokeWidth={1} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* Filtered urls */}
      <div className="mt-5 flex flex-col gap-3 sm:gap-4 md:gap-5">
        {(filterURLS || []).map((url) => (
          <LinkCard
            key={url.id}
            url={url}
            mainURL={mainURL}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
