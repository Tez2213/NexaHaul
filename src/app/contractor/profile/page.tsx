import Link from 'next/link';

export default function Profile() {
    return (
        <div>
            <h1>Welcome to Contractor Profile </h1>
            <Link href="/contractor">
                <h1>--Go to Home</h1>
            </Link>
        </div>
    );
}