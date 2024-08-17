import { useState, useEffect } from "react";
import cat from "../../public/cat.png"
import dog from "../../public/dog.png"


function Pets() {
  const clientId = import.meta.env.VITE_CLIENTID;
  const secret = import.meta.env.VITE_SECRET;
  const URL = "https://api.petfinder.com/v2/oauth2/token";

  const [token, setToken] = useState("");
  const [pet, setPet] = useState([]);
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });
      result.json().then((json) => {
        setToken(json.access_token);
        console.log(token);
      });
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetch(
      `https://api.petfinder.com/v2/animals/?special_needs=1&gender=${gender}&type=${species}&size=${size}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    result.json().then((json) => {
      console.log(json.animals);
      setPet(json.animals);
    });
  };

  function handleGender(e) {
    setGender(e.target.value);
  }

  function handleSpecies(species) {
    setSpecies(species);
  }

  function handleSize(e) {
    const { value, checked } = e.target;

    setSize((prevValue) => {
      if (checked) {
        return [...prevValue, value];
      } else {
        return prevValue.filter((size) => size !== value);
      }
    });
  }

  console.log(size);

  return (
    <main>
      <div className="search-form">
        <div className="selection">
          <button
            value="male"
            onClick={handleGender}
            className={gender === "male" ? "active" : ""}
          >
            BOY
          </button>
          <button
            value="female"
            onClick={handleGender}
            className={gender === "female" ? "active" : ""}
          >
            GIRL
          </button>
        </div>

        <div className="selection">
          <img
            src={cat}
            alt="Cat"
            onClick={() => handleSpecies("cat")}
            className={species === "cat" ? "active" : ""}
          />
             <img
            src={dog}
            alt="Dog"
            onClick={() => handleSpecies("dog")}
            className={species === "dog" ? "active" : ""}
          /> 
        </div>

        <div><h3>Pet Size</h3></div>

        <div className = "selection">
        <label>
          <input type="checkbox" value={"small"} onChange={handleSize} />
          Small
        </label>
        <label>
          <input type="checkbox" value={"medium"} onChange={handleSize} />
          Medium
        </label>
        <label>
          <input type="checkbox" value={"large"} onChange={handleSize} />
          Large
        </label>
        <label>
          <input type="checkbox" value={"xlarge"} onChange={handleSize} />
          Whoo Lordy!
        </label>
        </div>

        <div className="selection">
        <button className = "search" onClick={() => fetchData()}>SEARCH</button>
        </div>
      </div>

      <div className="pet-container">
        {pet.map((pet) => {
          if (pet.primary_photo_cropped !== null)
            return (
              <section className="card" key = {pet.id}>
                {pet.primary_photo_cropped && (
                  <img src={pet.primary_photo_cropped.full} alt={pet.name} />
                )}
                <div className="pet-description">
                  <h2>{pet.name}</h2>
                  <h3>{pet.description}</h3>

                  <a href={pet.url}>Learn More</a>
                </div>
              </section>
            );
        })}
      </div>
    </main>
  );
}

export default Pets;
