import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeRecords } from '../utils/api';

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadTeams() {
            try {
                const apiUrl = `${API_BASE_URL}/api/teams/`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Unable to load teams (${response.status})`);
                }

                const payload = await response.json();

                if (isMounted) {
                    setTeams(normalizeRecords(payload));
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError.message || 'Unable to load teams.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadTeams();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading teams…</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Teams</h2>
                    <span className="badge bg-success rounded-pill">{teams.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Team</th>
                                <th>Members</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team._id || team.name}>
                                    <td>{team.name || 'Unnamed team'}</td>
                                    <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                                    <td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
