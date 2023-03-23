import { useState } from "react";

export default function Header({setOpen, open}) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large btn-open" onClick={() => setOpen(!open)}>Share a fact</button>
    </header>
  );
}
