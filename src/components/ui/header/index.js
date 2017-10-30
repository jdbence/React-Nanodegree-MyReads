import React from 'react';
import classNames from 'classnames';

export const HeaderTitle = (props) => {
  const { children } = props;
  return (
    <h3 className="header-title">{children}</h3>
  );
};

export const HeaderContent = (props) => {
  const { children } = props;
  return (
    <div className="header-content">{children}</div>
  );
};

export const Header = (props) => {
  const { children, fixed, column, headerInner } = props;
  const headerClass = classNames(
    'header',
    {
      'header-fixed': fixed
    }
  );
  const headerInnerClass = classNames(
    'header-inner',
    {
      'header-inner-column': column,
      'header-inner-row': !column
    },
    headerInner || ''
  );
  return (
    <header className={headerClass}>
      <div className={headerInnerClass}>
        {children}
      </div>
    </header>
  );
};

Header.defaultProps = {
  fixed: false
};

export default Header;