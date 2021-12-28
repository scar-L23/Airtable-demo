interface IHeaderProps {
  isLoggedIn: boolean;
  logout: Function;
};

export default function Header(props: IHeaderProps) {
  const handleLogout = () => {
    props.logout();
  };

  return (
    <div className="header">
      {props.isLoggedIn && (
        <button type='button' onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};
