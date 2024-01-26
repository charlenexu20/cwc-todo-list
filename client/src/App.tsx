import './App.css';
import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <ChakraProvider>
      <Router>
          <Navigation />
        <Routes>
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
