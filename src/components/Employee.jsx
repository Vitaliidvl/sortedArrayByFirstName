import React from "react";
import PropTypes from "prop-types";

import { getItemsFromLocalStorage } from "../services/utils";

export const Employee = ({ employee, addEmployee, removeEmployee }) => {
  const [active, setActive] = React.useState(getItemsFromLocalStorage(employee.id, false));

  React.useEffect(() => {
    if (active) {
      localStorage.setItem(employee.id, true);
    } else {
      localStorage.removeItem(employee.id);
    }
  }, [active, employee.id]);

  return (
    <div className="employee-content">
      <h4 className={`employee-name ${active ? "active" : ""}`}>
        {employee.firstName} {employee.lastName}
      </h4>
      <div className="btn-group">
        <div className="not-active-wrapper">
          <input
            type="radio"
            name={employee.firstName}
            id={`${employee.id}-not-active`}
            value={false}
            checked={!active}
            onChange={() => {
              setActive(false);
              removeEmployee(employee);
            }}
          />
          <label htmlFor={`${employee.id}-not-active`}>not active</label>
        </div>
        <div className="active-wrapper">
          <input
            type="radio"
            name={employee.firstName}
            id={`${employee.id}-active`}
            value={true}
            checked={active}
            onChange={() => {
              setActive(true);
              addEmployee(employee);
            }}
          />
          <label htmlFor={`${employee.id}-active`}>active</label>
        </div>
      </div>
    </div>
  );
};

Employee.propTypes = {
  employee: PropTypes.object.isRequired,
  addEmployee: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired
};
