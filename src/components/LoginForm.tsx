import React from 'react';

export default function LoginForm({ ...props }) {
  const [username, setUsername] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || username.length === 0) {
      setError("Please enter student name");
      return;
    }
    props.onSubmit({ studentName: username });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  return (
    <div className='form-control'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='username'>Student name: </label>
          <input name='username' value={username} onChange={handleInputChange} />
        </div>
        {!!error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
        <button disabled={username.length === 0} type='submit'>Login</button>
      </form>
    </div>
  );
}