import './App.css';
import Message from './components/Message';

function App() {
  const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure repudiandae aliquid quisquam, consectetur harum inventore, iusto ex, soluta eum dolorem quasi libero nostrum pariatur id delectus accusamus assumenda!';

  return (
    <div className="app">
      <header className="app__header">
       <h3>My First React App</h3>
      </header>
      <main className="container">
        <Message text={text} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App