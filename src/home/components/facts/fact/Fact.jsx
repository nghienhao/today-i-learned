import { useState } from "react";
import supabase from "../../../../config/supabase";

export default function Fact({fact, categories}) {
    let [item, setItem] = useState(fact);
  
    let update = async (columnName) => {
      const { data: updateFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: item[columnName]+1 })
      .eq("id", item.id)
      .select();

      if(!error) setItem(updateFact[0]);
    }

  return (
    <li className="fact" key={item.id}>
      <p>
        {item.text}
        <a className="source" href={item.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find(
            (category) => category.name === item.category
          ).color,
        }}
      >
        {item.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => update('votesInteresting')}>👍 {item.votesInteresting}</button>
        <button onClick={() => update('votesMindblowing')}>🤯 {item.votesMindblowing}</button>
        <button onClick={() => update('votesFalse')}>⛔️ {item.votesFalse}</button>
      </div>
    </li>
  );
}
