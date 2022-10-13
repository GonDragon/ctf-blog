import classNames from 'classnames';
// import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className="relative pb-24 overflow-hidden bg-gradient-to-br from-slate-500 to-slate-800">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
