//last update
import { useState } from "react";
import { Link } from "react-router-dom";
// import "../DynamicGuide/DynamicGuide.css";
import "./DynamicGuide.css";

import hello from "./images/hello.jpg";
import no from "./images/no.jpg";
import please from "./images/please.jpg";
import Thankyou from "./images/Thankyou .jpg";
import yes from "./images/yes.jpg";

// Alphabet data with image imports
const DynamicData = [
  { id: 1, name: "yes", src: yes, description: "Sign for yes" },
  { id: 2, name: "no", src: no, description: "Sign for no" },
  { id: 3, name: "please", src: please, description: "Sign for please" },
  { id: 4, name: "hello", src: hello, description: "Sign for hello" },
  { id: 5, name: "Thankyou", src: Thankyou, description: "Sign for Thankyou" },
];

function DynamicGuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(DynamicData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(DynamicData);
    } else {
      const filtered = DynamicData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="container">
      <h2 className="textDes">Dynamic Guide (Gestures Tutorials)</h2>

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
          ⬅ Back to Guide Selection
        </Link>
      </div>
    </div>
  );
}
export default DynamicGuidePage;

// // export default DynamicGuidePage;
// DynamicGuidePage.jsx
// // import { Link } from "react-router-dom";

// // // Assuming your images are stored in the `images` folder
// // const images = [
// //   { name: "Hello", src: "/images/hello.jpg" },
// //   { name: "Yes", src: "/images/yes.jpg" },
// //   { name: "No", src: "/images/no.jpg" },
// //   { name: "Please", src: "/images/please.jpg" },
// //   { name: "Thank You", src: "/images/thankyou.jpg" },
// // ];

// // function DynamicGuidePage() {
// //   return (
// //     <div>
// //       <h2>🎥 Dynamic Guide (Image Tutorials)</h2>
// //       <div
// //         style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
// //       >
// //         {images.map((image, index) => (
// //           <div key={index} style={{ margin: "10px", textAlign: "center" }}>
// //             <h3>{image.name}</h3>
// //             <img
// //               src={image.src}
// //               alt={image.name}
// //               style={{ width: "300px", height: "200px", objectFit: "cover" }}
// //             />
// //           </div>
// //         ))}
// //       </div>
// //       <br />
// //       <Link
// //         to="/guide-selection"
// //         style={{ fontSize: "18px", color: "blue", textDecoration: "underline" }}
// //       >
// //         ⬅ Back to Guide Selection
// //       </Link>
// //     </div>
// //   );
// // }

// // export default DynamicGuidePage;
// import { Link } from "react-router-dom";
// import "./Styles.css";

// // Assuming your images are stored in the `images` folder
// const images = [
//   { name: "Hello", src: "./images/hello.jpg" },
//   { name: "Yes", src: "./images/yes.jpg" },
//   { name: "No", src: "./images/no.jpg" },
//   { name: "Please", src: "./images/please.jpg" },
//   { name: "Thank You", src: "./images/Thankyou.jpg" },
// ];

// function DynamicGuidePage() {
//   return (
//     <div className="container">
//       <h2 className="textDes">Dynamic Guide (Image Tutorials)</h2>
//       <div className="GridContainer">
//         {images.map((image, index) => (
//           <div key={index} className="imageContainer">
//             <img src={image.src} alt={image.name} className="Image" />
//             <h3 className="textDes">{image.name}</h3>
//           </div>
//         ))}
//       </div>
//       <br />
//       <div className="BLText">
//         <Link to="/guide-selection" className="BackLink">
//           ⬅ Back to Guide Selection
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default DynamicGuidePage;
