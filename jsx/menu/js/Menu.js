'use strict';

const createList = items => {
  return (
    <ul>
      {items.map(el => (
        <li>
          <a href={el.href}>{el.title}</a>
        </li>
      ))}
    </ul>
  );
};

const Menu = menu => {
  return menu.opened ? (
    <div className="menu menu-open">
      <div className="menu-toggle">
        <span />
      </div>
      <nav>{createList(menu.items)}</nav>
    </div>
  ) : (
    <div className="menu">
      <div className="menu-toggle">
        <span />
      </div>
    </div>
  );
};
