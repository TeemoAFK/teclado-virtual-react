import React, { Component, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
function App() {
    const [inputs, setInputs] = useState({});
    const [layoutName, setLayoutName] = useState("default");
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();
  
    const onChangeAll = inputs => {
      /**
       * Here we spread the inputs into a new object
       * If we modify the same object, react will not trigger a re-render
       */
      setInputs({ ...inputs });
      console.log("Inputs changed", inputs);
    };
  
    const handleShift = () => {
      const newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    };
  
    const onKeyPress = button => {
      console.log("Button pressed", button);
  
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") handleShift();
    };
  
    const onChangeInput = event => {
      const inputVal = event.target.value;
  
      setInputs({
        ...inputs,
        [inputName]: inputVal
      });
  
      keyboard.current.setInput(inputVal);
    };
  
    const getInputValue = inputName => {
      return inputs[inputName] || "";
    };
  
    return (
      <div className="App">
        <input
          id="firstName"
          value={getInputValue("firstName")}
          onFocus={() => setInputName("firstName")}
          placeholder={""}
          onChange={onChangeInput}
        />
        <input
          id="lastName"
          value={getInputValue("lastName")}
          onFocus={() => setInputName("lastName")}
          placeholder={""}
          onChange={onChangeInput}
        />
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          layout={{
            default: [ "1 2 3 4 5 6 7 8 9 0 {bksp}", 
                       "Q W E R T Y U I O P", 
                       "A S D F G H J K L {enter}",
                        "Z X C V B N M",
                        "{space}"]
             }}
             display={{
                "{bksp}": "Borrar",
                "{space}": "Espacio",
                "{enter}": "Enter"
              }}
        />
      </div>
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

class Configuracion extends Component {
    render() {
        return (
            <React.Fragment>
                
            </React.Fragment>
        );
    }
}

export default Configuracion;