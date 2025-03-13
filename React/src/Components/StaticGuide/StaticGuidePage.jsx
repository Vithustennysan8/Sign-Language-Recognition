import { useState } from "react";
import { Link } from "react-router-dom";
import "./StaticGuide.css";
import A from "./assets/A.jpg";
import B from "./assets/B.jpg";
import C from "./assets/C.jpg";
import D from "./assets/D.jpg";
import E from "./assets/E.jpg";
import F from "./assets/F.jpg";
import G from "./assets/G.jpg";
import H from "./assets/H.jpg";
import I from "./assets/I.jpg";
import J from "./assets/J.jpg";
import K from "./assets/K.jpg";
import L from "./assets/L.jpg";
import M from "./assets/M.jpg";
import N from "./assets/N.jpg";
import O from "./assets/O.jpg";
import P from "./assets/P.jpg";
import Q from "./assets/Q.jpg";
import R from "./assets/R.jpg";
import S from "./assets/S.jpg";
import T from "./assets/T.jpg";
import U from "./assets/U.jpg";
import V from "./assets/V.jpg";
import W from "./assets/W.jpg";
import X from "./assets/X.jpg";
import Y from "./assets/Y.jpg";
import Z from "./assets/Z.jpg";

// Alphabet data with image imports
const alphabetData = [
  { id: 1, name: "A", src: A, description: "Sign for A" },
  { id: 2, name: "B", src: B, description: "Sign for B" },
  { id: 3, name: "C", src: C, description: "Sign for C" },
  { id: 4, name: "D", src: D, description: "Sign for D" },
  { id: 5, name: "E", src: E, description: "Sign for E" },
  { id: 6, name: "F", src: F, description: "Sign for F" },
  { id: 7, name: "G", src: G, description: "Sign for G" },
  { id: 8, name: "H", src: H, description: "Sign for H" },
  { id: 9, name: "I", src: I, description: "Sign for I" },
  { id: 10, name: "J", src: J, description: "Sign for J" },
  { id: 11, name: "K", src: K, description: "Sign for K" },
  { id: 12, name: "L", src: L, description: "Sign for L" },
  { id: 13, name: "M", src: M, description: "Sign for M" },
  { id: 14, name: "N", src: N, description: "Sign for N" },
  { id: 15, name: "O", src: O, description: "Sign for O" },
  { id: 16, name: "P", src: P, description: "Sign for P" },
  { id: 17, name: "Q", src: Q, description: "Sign for Q" },
  { id: 18, name: "R", src: R, description: "Sign for R" },
  { id: 19, name: "S", src: S, description: "Sign for S" },
  { id: 20, name: "T", src: T, description: "Sign for T" },
  { id: 21, name: "U", src: U, description: "Sign for U" },
  { id: 22, name: "V", src: V, description: "Sign for V" },
  { id: 23, name: "W", src: W, description: "Sign for W" },
  { id: 24, name: "X", src: X, description: "Sign for X" },
  { id: 25, name: "Y", src: Y, description: "Sign for Y" },
  { id: 26, name: "Z", src: Z, description: "Sign for Z" },
];

function StaticGuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(alphabetData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(alphabetData); // Reset to all alphabets if search is empty
    } else {
      const filtered = alphabetData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered); // Filter based on search query
    }
  };

  return (
    <div className="container">
      <h2 className="textDes">Alphabet Guide (Image Tutorials)</h2>

      {/* Search Bar */}
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search Alphabet..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="searchBar"
        />
      </div>

      {/* Alphabet Grid */}
      <div className="GridContainer">
        {filteredData.map((item) => (
          <div key={item.id} className="imageContainer">
            <img src={item.src} alt={item.name} className="Image" />

            <h3 className="textDes">{item.name}</h3>
            <p className="textDes">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Back Link */}
      <div className="BLText">
        <Link to="/guide-selection" className="BackLink">
          ⬅ Back to Guidance
        </Link>
      </div>
    </div>
  );
}

export default StaticGuidePage;
