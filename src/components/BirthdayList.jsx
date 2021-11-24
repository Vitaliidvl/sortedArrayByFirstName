import React from "react";
import PropTypes from "prop-types";
import { EmployeeBirthday } from "./EmployeeBirthday";
import { sortByMonth } from "../services/utils";

export const BirthdayList = ({ selectedEmployees }) => {
  const sortedSelectedEmployees = sortByMonth(selectedEmployees);
  return (
    <section className="employees-birthday">
      <h2 className="employees-birthday__title">Employees birthday</h2>
      <div className="employees-birthday__wrapper">
        {Object.keys(sortedSelectedEmployees).length > 0 ? (
          Object.entries(sortedSelectedEmployees).map((employee, idx) => {
            const [month, items] = employee;
            return (
              <section key={idx}>
                {sortedSelectedEmployees[month].length > 0 && <h4>{month}</h4>}
                <ul className="employees-birthday__list">
                  {items && items.map((item) => <EmployeeBirthday key={item.id} employee={item} />)}
                </ul>
              </section>
            );
          })
        ) : (
          <h3>Employees List is empty</h3>
        )}
      </div>
    </section>
  );
};

BirthdayList.propTypes = {
  selectedEmployees: PropTypes.object.isRequired
};
