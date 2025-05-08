import Link from 'next/link';

export default function Createdbid() { 
    return (
        <div>
            <h1>Welcome to Shipper createdbids !! </h1>
            <p>Here you can view and manage your created bids and get the options like active bids, dreft bids, completed bids, and option from creating the new</p>
            <Link href="/shipper/createdbids/form">
                -- Create NewBid
            </Link>
        </div>
    );
}