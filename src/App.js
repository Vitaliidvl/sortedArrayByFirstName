import React, { useEffect, useState } from "react";
import { getEmployees } from "./services/api";
import { BirthdayList } from "./components/BirthdayList";
import { EmployeesList } from "./components/EmployeesList";
import {
  alphabet,
  firstNameSort,
  getItemsFromLocalStorage,
  removeEmptyKeys
} from "./services/utils";

export const App = () => {
  const [employees, setEmployees] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState(
    getItemsFromLocalStorage("selectedEmployees")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getEmployees()
      .then(({ data }) => {
        const employeesArr = data.reduce((acc, item) => {
          const firstLetter = item.firstName.slice(0, 1);
          if (acc[firstLetter]) {
            acc[firstLetter].push(item);
          } else {
            acc[firstLetter] = [item];
          }
          return acc;
        }, {});
        setEmployees(getSortedEmployees(employeesArr));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const getSortedEmployees = (employees) => {
    const orderedValues = Object.entries(employees).reduce((acc, item) => {
      const values = item[1];
      values.sort(firstNameSort);
      return acc;
    }, employees);

    const result = alphabet.sort().reduce((acc, item) => {
      acc[item] = orderedValues[item] || [];
      return acc;
    }, {});

    return result;
  };

  const sortSelectedEmployees = (arr, employee) => {
    const newArr = [...arr, employee];
    return newArr.sort(firstNameSort);
  };

  const addSelectedEmployee = (employee) => {
    const month = new Date(employee.dob).getMonth();
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    if (selectedEmployees[month]) {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [month]: sortSelectedEmployees(selectedEmployees[month], employee)
        })
      );
    } else {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [month]: [employee]
        })
      );
    }
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  };

  const removeSelectedEmployee = (employee) => {
    const month = new Date(employee.dob).getMonth();
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    const updatedEmployees = {
      ...selectedEmployees,
      [month]: selectedEmployees[month].filter((item) => item.id !== employee.id)
    };
    localStorage.setItem("selectedEmployees", JSON.stringify(removeEmptyKeys(updatedEmployees)));
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  };
  if (error) {
    return <h1>Failed to fetch data</h1>;
  }

  return (
    <div className="app">
      {loading && <h3>Loading...</h3>}
      {!loading && (
        <>
          <EmployeesList
            employees={employees}
            addSelectedEmployee={addSelectedEmployee}
            removeSelectedEmployee={removeSelectedEmployee}
          />
          <BirthdayList selectedEmployees={selectedEmployees} />
        </>
      )}
    </div>
  );
};
