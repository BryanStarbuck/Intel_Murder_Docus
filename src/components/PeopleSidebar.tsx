import React from "react";
import sidebarPeople from "../data/sidebarPeople";

export default function PeopleSidebar(): React.ReactElement {
  return (
    <div className="people-sidebar">
      <div className="people-sidebar__title">The Dead</div>
      <ul className="people-sidebar__list">
        {sidebarPeople.map((person) => (
          <li key={person.name} className="people-sidebar__item">
            <a href={person.url} className="people-sidebar__name">
              {person.name}
            </a>
            <p className="people-sidebar__blurb">{person.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
