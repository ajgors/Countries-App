import { Link, NavLink } from 'react-router';
import styles from './NavBar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">🌍 Countries App</Link>
            </div>

            <ul className={styles['nav-links']}>
                <li>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Dashboard
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
