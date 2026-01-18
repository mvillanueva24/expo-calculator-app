import { useEffect, useRef, useState } from "react";

enum Operator {
  none = "",
  add = "+",
  subtract = "-",
  multiply = "x",
  divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("0");

  const [number, setNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("0");

  const lastOperation = useRef<Operator>(Operator.none);

  useEffect(() => {
    if (lastOperation.current !== Operator.none) {
      const firstFormulaPart = formula.split(" ").at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subresult = calculateSubResult();
    setPrevNumber(subresult.toString());
    // setPrevNumber(number);
  }, [formula]);

  const clean = () => {
    setNumber("0");
    setPrevNumber("0");
    setFormula("0");
    lastOperation.current = Operator.none;
  };

  const toggleSign = () => {
    if (!number.startsWith("-")) {
      return setNumber("-" + number);
    }
    setNumber(number.replace("-", ""));
  };

  const deleteLast = () => {
    if ((number.includes("-") && number.length == 2) || number.length == 1) {
      return setNumber("0");
    }
    // if (number.length == 1) {
    //   return setNumber("0");
    // }
    return setNumber(number.slice(0, -1));
  };

  const setLastNumber = () => {
    // TODO: Calcular resultado

    calculateResult();

    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1));
    }

    setPrevNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateSubResult = () => {
    const [firstValue, operation, secondValue] = formula.split(" ");

    const num1 = Number(firstValue);
    const num2 = Number(secondValue); // NaN

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        return num1 / num2;
      default:
        throw new Error(`Operación (${operation}) no válida`);
    }
  };

  const calculateResult = () => {
    setFormula(calculateSubResult().toString());
    setPrevNumber("0");
    lastOperation.current = Operator.none;
  };

  const buildNumber = (numberString: string) => {
    // Verificar si ya existe el punto decimal
    if (number.includes(".") && numberString === ".") return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }
      // Eval otro 0 y no punto
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      // Eval si es diferente de cero, no hay punto y es el primer número
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      //Evitar muchos 00000
      if (numberString === "0" && !number.includes(".")) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  return {
    // Props
    formula,
    prevNumber,

    // Methods
    buildNumber,
    clean,
    toggleSign,
    deleteLast,

    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,

    calculateSubResult,
    calculateResult,
  };
};
