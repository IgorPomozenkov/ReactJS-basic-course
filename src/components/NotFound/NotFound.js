import React, { useEffect } from "react";
import './NotFound.css';

export default function NotFound() {

  useEffect(() => {
    document.querySelector('.heading').textContent = '404';
  }, []);

  return (
    <div className="notFoundPage pageContent">
      <h1>404 - Страница не найдена</h1>
    </div>
  );
};
