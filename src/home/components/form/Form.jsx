import { useState } from "react";
import supabase from "../../../config/supabase";

export default function Form({ categories, setFacts, facts }) {
  let [text, setText] = useState("");
  let [source, setSource] = useState("");
  let [category, setCategory] = useState("");
  let textLength = text.length;

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (text && source && category && textLength <= 200) {
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text: text, source: source, category: category }])
        .select();
      if (!error) {
        setFacts([newFact[0], ...facts]);
        setText('');
        setSource('');
        setCategory('');
      }
    } else {
      alert("Vui lòng nhập đủ thông tin");
    }
  };
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share a fact with the world..."
      />
      <span>200</span>
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Trustworthy source..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {categories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-large">
        Post
      </button>
    </form>
  );
}
