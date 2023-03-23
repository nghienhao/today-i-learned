export default function Categories({CATEGORIES, setCategory}) {


  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories" onClick={e => setCategory('')}>All</button>
        </li>
        {CATEGORIES.map(cat => {
        return <li className="category" key={cat.name}>
        <button
          onClick={e => setCategory(cat.name)}
          className="btn btn-category"
          style={{ backgroundColor: cat.color }}
        >
          {cat.name}
          
        </button>
      </li>
        })}
      </ul>
    </aside>
  );
}
