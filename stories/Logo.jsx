import React from "react";
import PropTypes from "prop-types";
import "./logo.css";

/**
 * Primary UI Logo component
 */
export const Logo = ({ primary, size, ...props }) => {
  const mode = primary ? 'storybook-logo--primary' : 'storybook-logo--secondary';
  return (
    <logo {...props}
    type="logo"
    className={['storybook-logo', `storybook-logo--${size}`, mode].join(' ')}>
      <div className="logo">
        <img
          src="https://www.totalwine.com/global-static-resources/@totalwinelabs/twc-icon/3.13.0/twm-logo-color.svg#twm-logo-color"
          alt="Total Wine & More"
        ></img>
      </div>
    </logo>
  );
};

Logo.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
   primary: PropTypes.bool,
  /**
   * What size to use
   */
   size: PropTypes.oneOf(['small', 'large']),
};

Logo.defaultProps = {
  primary: false,
  size: 'small',
};
