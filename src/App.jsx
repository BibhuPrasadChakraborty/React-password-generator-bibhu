import React, { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

// here we will create a random password generator by using react.
function App() {
  const [length, setLength] = useState(6);
  const [character, setCharacter] = useState(true);
  const [number, setNumber] = useState(true);

  const [symbol, setSymbol] = useState(true);
  const [password, setPassword] = useState("");

  const [color, setColor] = useState("white");

  // for taking the reference of the object or other element. basically when 2 elements are not connected with each other, for relating those elements we use useRef.
  const passwordRef = useRef(null);
  const generator = useCallback(() => {
    let string = "";

    if (number) string += "0123456789";
    if (character)
      string += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (symbol) string += "$%^&*();{}";

    // if (setCharacter === "") {
    //   setCharacter("Please enter password");
    //   return;
    // }

    // string value at this line = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$%^&*();{}"
    // console.log(string);

    let password = "";

    for (let i = 0; i <= length; i++) {
      const random = Math.floor(Math.random() * string.length);

      password += string.charAt(random);
    }

    setPassword(password);
  }, [length, character, number, symbol]);

  useEffect(() => {
    generator();
  }, [generator]);

  // Function for copying the password
  const copyPasswordClipboard = useCallback(() => {
    // if i want the password to be selected on selecting the copy button.
    passwordRef.current?.select()
    // if i need to select the password at a particular range.
    // passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const handleClick = () => {
    setColor(color === "white" ? "rgb(255, 140, 0)" : "white");
  };
  return (
    <>
      <div className="main_container">
        <h1>Password Generator</h1>

        <div id="password_copy">
          <input
            type="text"
            placeholder="Generate Password"
            readOnly
            id="password_display"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          />
          <button
            id="copy_btn"
            onClick={() => {
              copyPasswordClipboard();
              handleClick();
            }}
            style={{ backgroundColor: color }}
          >
            Copy
          </button>
        </div>

        <div className="customise">
          <div className="length">
            <div className="length_circle">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="length_input"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length : {length}</label>
            </div>
          </div>

          <div className="number_check ">
            <input
              type="checkbox"
              id="number"
              defaultChecked={number}
              onChange={() => {
                setNumber((previousNumber) => !previousNumber);
              }}
            />
            <label htmlFor="number">Include Numbers</label>
          </div>

          <div className="number_check ">
            <input
              type="checkbox"
              id="number"
              defaultChecked={character}
              onChange={() => {
                setCharacter((previousCharacter) => !previousCharacter);
              }}
            />
            <label htmlFor="number">Include Characters</label>
          </div>
        </div>

        <button id="generate_password" onClick={generator}>
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
