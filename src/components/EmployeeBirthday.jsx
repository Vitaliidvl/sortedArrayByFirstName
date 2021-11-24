import React from "react";
import PropTypes from "prop-types";

export const EmployeeBirthday = ({ employee }) => {
  const birthday = new Date(employee.dob);
  const birthdayString = `${birthday.getDate()} ${birthday.toLocaleString("en-GB", {
    month: "long"
  })}, ${birthday.getFullYear()} year`;

  return (
    <li className="employees-birthday__list-item">
      {employee.lastName} {employee.firstName} - {birthdayString}
    </li>
  );
};

EmployeeBirthday.propTypes = {
  employee: PropTypes.object.isRequired
};
