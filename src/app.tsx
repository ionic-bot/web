import { Link, Outlet } from 'react-router-dom';
import ionic from './assets/ionic.png';

export function App() {
  return (
    <>
      <nav>
        <div class="logoContainer">
          <Link to="/"><img src={ionic} alt="Ionic's logo" class="logo" /></Link>
          <div class="textContainer">
            <h1>Ionic</h1>
            <h3>Revolutionize Your Discord Experience</h3>
          </div>
        </div>
        <div class="border"></div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
