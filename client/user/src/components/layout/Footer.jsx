const Footer = () => {
  return (
    <footer className="bg-base-200 py-4 text-center">
      <p>&copy; {new Date().getFullYear()} BOOK'N'PLAY. All rights reserved.</p>
      <p>
        {" "}
        <a
          href="https://github.com/Prm290803"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Param Choksi | Harshil Patel
        </a>
      </p>
    </footer>
  );
};

export default Footer;
