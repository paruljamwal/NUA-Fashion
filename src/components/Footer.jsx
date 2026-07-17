function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} NUA Fashion. All rights reserved.
        </p>

        <ul className="footer__social">
          <li>
            <a href="#" className="footer__social-link">
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className="footer__social-link">
              Pinterest
            </a>
          </li>
          <li>
            <a href="#" className="footer__social-link">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
