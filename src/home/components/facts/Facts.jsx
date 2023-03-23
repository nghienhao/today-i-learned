import supabase from "../../../config/supabase";
import Fact from "./fact/Fact";
export default function Facts({list, categories}) {
  return (
    <section>
      <ul className="facts-list">
        {list.map((item) => {
          return (
            <Fact key={item.id} fact={item} categories={categories}/>
          );
        })}
      </ul>
    </section>
  );
}
