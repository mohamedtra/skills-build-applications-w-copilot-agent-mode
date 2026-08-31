import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeRecords } from '../utils/api';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadUsers() {
            try {
                const apiUrl = `${API_BASE_URL}/api/users/`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Unable to load users (${response.status})`);
                }

                const payload = await response.json();

                if (isMounted) {
                    setUsers(normalizeRecords(payload));
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError.message || 'Unable to load users.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading users…</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Users</h2>
                    <span className="badge bg-primary rounded-pill">{users.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id || user.email || user.username}>
                                    <td>{user.name || 'Unknown athlete'}</td>
                                    <td>{user.username || '—'}</td>
                                    <td>{user.email || '—'}</td>
                                    <td>{user.points ?? 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
