import "./Layout.css";

import Header from "./components/header/Header";
import Form from "./components/form/Form";
import Categories from "./components/categories/Categories";
import Facts from "./components/facts/Facts";
import { useEffect, useState } from "react";
import supabase from "../config/supabase";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

export default function Layout() {
  let [open, setOpen] = useState(false);
  let [facts, setFacts] = useState([]);
  let [category, setCategory] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  const getFacts = async () => {
    setIsLoading(true)
    let { data: facts, error } = await supabase.from("facts").select("*").order('created_at', {ascending: false});
    setFacts(facts);
    setIsLoading(false);
  };

  const getFactsByCategory = async () => {
    setIsLoading(true)
    let { data: facts, error } = await supabase
      .from("facts")
      .select("*")
      .eq("category", category);
    setFacts(facts);
    setIsLoading(false);
  };
  useEffect(() => {
    getFacts();
    getFactsByCategory();
  }, []);

  useEffect(() => {
    (category !== '') ? getFactsByCategory() : getFacts();
  }, [category])

  return (
    <div className="container">
      <Header setOpen={setOpen} open={open} />
      {open ? <Form categories={CATEGORIES} facts={facts} setFacts={setFacts} /> : ""}
      <main className="main">
        <Categories CATEGORIES={CATEGORIES} setCategory={setCategory} />
        {isLoading ? <div>Loading...</div> : <Facts list={facts} categories={CATEGORIES} />}
      </main>
    </div>
  );
}
