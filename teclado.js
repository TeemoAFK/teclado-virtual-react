import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-theme-ios",
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "q w e r t y u i o p {bksp}",
      "a s d f g h j k l {enter}",
      "{shift} z x c v b n m , . {shift}",
      "{alt} {space} {altright} {downkeyboard}"
    ],
    shift: [
      "1 2 3 4 5 6 9 0",
      "Q W E R T Y U I O P {bksp}",
      "A S D F G H J K L {enter}",
      "{shiftactivated} Z X C V B N M , . {shiftactivated}",
      "{alt} {space} {altright} {downkeyboard}"
    ],
    alt: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
      `@ # $ & * ( ) ' " {enter}`,
      "{shift} % - + = / ; : ! ? {shift}",
      "{default} {space} {back} {downkeyboard}"
    ]
  },
  display: {
    "{alt}": ".?123",
    "{shift}": "⇧",
    "{shiftactivated}": "⇧",
    "{enter}": "return",
    "{bksp}": "⌫",
    "{altright}": ".?123",
    "{downkeyboard}": "🞃",
    "{space}": " ",
    "{default}": "ABC",
    "{back}": "⇦"
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * Handle toggles
   */
  if (button.includes("{") && button.includes("}")) {
    handleLayoutChange(button);
  }
}

function handleLayoutChange(button) {
  let currentLayout = keyboard.options.layoutName;
  let layoutName;

  switch (button) {
    case "{shift}":
    case "{shiftactivated}":
    case "{default}":
      layoutName = currentLayout === "default" ? "shift" : "default";
      break;

    case "{alt}":
    case "{altright}":
      layoutName = currentLayout === "alt" ? "default" : "alt";
      break;

    

    default:
      break;
  }

  if (layoutName) {
    keyboard.setOptions({
      layoutName: layoutName
    });
  }
}
