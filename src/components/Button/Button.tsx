import styles from './Button.module.css';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  purpose: string;
}

const Button: React.FC<IButton> = ({
  children,
  onClick,
  purpose = 'primary',
}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[purpose]}`}>
      {children}
    </button>
  );
};

export default Button;
