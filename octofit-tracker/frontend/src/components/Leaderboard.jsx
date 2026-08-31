import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeRecords } from '../utils/api';

export default function Leaderboard() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadLeaderboard() {
            try {
                const apiUrl = `${API_BASE_URL}/api/leaderboard/`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Unable to load leaderboard (${response.status})`);
                }

                const payload = await response.json();

                if (isMounted) {
                    setRows(normalizeRecords(payload));
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError.message || 'Unable to load leaderboard.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadLeaderboard();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading leaderboard…</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Leaderboard</h2>
                    <span className="badge bg-warning text-dark rounded-pill">{rows.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Rank</th>
                                <th>Athlete</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((entry, index) => (
                                <tr key={entry.user?._id || entry.username || `${entry.name}-${index}`}>
                                    <td>#{index + 1}</td>
                                    <td>{entry.user?.name || entry.name || entry.username || 'Unknown athlete'}</td>
                                    <td>{entry.points ?? 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
