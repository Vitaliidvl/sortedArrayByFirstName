import React from "react";
import PropTypes from "prop-types";
import { Employee } from "./Employee";

export const EmployeesList = ({ employees, addSelectedEmployee, removeSelectedEmployee }) => {
  return (
    <section className="employees">
      <h2 className="employees-title">Employees</h2>
      <div className="employees-wrapper">
        {Object.entries(employees).map((employee, idx) => {
          const [letter, items] = employee;
          return (
            <div key={idx} className="employee-wrapper">
              <h3>{letter}</h3>
              {items.length > 0
                ? items.map((item) => (
                    <Employee
                      key={item.id}
                      employee={item}
                      addEmployee={addSelectedEmployee}
                      removeEmployee={removeSelectedEmployee}
                    />
                  ))
                : "No Employees"}
            </div>
          );
        })}
      </div>
    </section>
  );
};

EmployeesList.propTypes = {
  employees: PropTypes.object.isRequired,
  addSelectedEmployee: PropTypes.func.isRequired,
  removeSelectedEmployee: PropTypes.func.isRequired
};
