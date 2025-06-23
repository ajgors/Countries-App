type Size = 'sm' | 'md' | 'lr';

interface Props {
    text: string;
    size: Size;
    onClick?: () => void;
}

const sizeStyles: Record<Size, React.CSSProperties> = {
    sm: {
        fontSize: '14px',
        padding: '6px 12px'
    },
    md: {
        fontSize: '16px',
        padding: '10px 20px'
    },
    lr: {
        fontSize: '20px',
        padding: '14px 28px'
    }
};

export default function Button({ text, size, onClick }: Props) {
    return (
        <button
            style={{
                background: 'linear-gradient(135deg, #4fc3f7, #0288d1)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                ...sizeStyles[size]
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
