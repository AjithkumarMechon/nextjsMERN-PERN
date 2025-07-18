"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spin } from "antd";
import Cookies from "js-cookie";
import ContentListScreen from "../Content/page";
import { useDashboard } from "@/tanstack/fetchDashboard";

function Dashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const { data: userlistData, isLoading, error } = useDashboard();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    const accessToken = (session as any)?.accessToken;
    if (accessToken) {
      Cookies.set("token", accessToken);
      setLoading(false);
    } else {
      const token = Cookies.get("token");
      if (!token) {
        redirect("/login"); // Redirect only if no session and no token
      }
      setLoading(false);
    }
  }, [session, status]);

  if (loading || isLoading) {
    return (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-white z-50">
        <Spin size="large" />
      </div>
    );
  }

  const handleClick = async (valueId: any) => {
    redirect(`/showselect/${valueId}`);
  };

  return (
    <>
      {" "}
      <main className="min-h-screen bg-white p-6 m-4 mx-auto rounded-xl">
        <header>
          <h2 className="text-3xl font-bold text-center mb-10">Welcome</h2>
        </header>

        <section>
          <ContentListScreen />
        </section>
      </main>
    </>
  );
}

export default Dashboard;
