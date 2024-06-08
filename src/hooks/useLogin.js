import { useState } from 'react';
// import { useAuthContext} from "../context/useAuthContext";
// import config from "../config";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  // const { dispatch } = useAuthContext()

  const login = async (values) => {
    setIsLoading(true);
    setError(null);

    // const response = await fetch(config.apiUrl+'api/login', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(values)
    // })
    // const json = await response.json()

    // if (!response.ok) {
    //   setIsLoading(false)
    //   setError(json.error)
    //   console.log(json.error)
    // }
    // if (response.ok) {
    //   // save the user to local storage
    //   localStorage.setItem('user', JSON.stringify(json))

    //   // update the auth context
    //   dispatch({type: 'LOGIN', payload: json})

    //   // update loading state
    //   setIsLoading(false)
    // }

    // implement hard coded admin and user logins here
    // define admin user and user with emai, password, role, name
    const users = [
      { email: 'admin@gmail.com', password: 'admin', role: 'admin', name: 'Admin' },
      { email: 'isurika@gmail.com', password: 'isurika', role: 'user', name: 'Isurika' }
    ];

    // implement hard coded admin and user logins here
    if (users.find((user) => user.email === values.email && user.password === values.password)) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(users.find((user) => user.email === values.email && user.password === values.password)));

      // navigate to dashboard
      navigate('/app/dashboard');
      // update the auth context
      dispatch({ type: 'LOGIN', payload: users.find((user) => user.email === values.email && user.password === values.password) });

      // update loading state
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('Incorrect email or password');
    }
  };

  return { login, isLoading, error };
};
