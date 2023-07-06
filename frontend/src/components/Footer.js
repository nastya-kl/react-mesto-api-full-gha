import React from 'react';

function Footer() {
  const newYear = new Date();
  const currentYear = newYear.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {currentYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;