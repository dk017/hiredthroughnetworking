// app/error.tsx
export const runtime = 'experimental-edge';

const ErrorPage = () => {
    return (
        <div>
            <h1>Something went wrong!</h1>
            <p>Please try again later.</p>
        </div>
    );
};

export default ErrorPage;