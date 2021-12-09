import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UidContext } from "../../components/AppContext";
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Notifications from '../../pages/Notifications';
import Post from '../../pages/Post';
import Profil from '../../pages/Profil';
import Subscriptions from '../../pages/Subscriptions';
import EditProfil from '../../pages/EditProfil';
import Register from '../../pages/Register';
import Messages from '../../pages/Messages';
import NewPost from '../../pages/NewPost';


const Index = () => {
  const uid = useContext(UidContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={uid ? (<Home />) : (<Login />)} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/profil/:userId" element={<Profil />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/edit-profil" element={<EditProfil />} />
      </Routes>
    </Router>
  );
};

export default Index;