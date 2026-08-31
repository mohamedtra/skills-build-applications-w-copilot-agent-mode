import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeRecords } from '../utils/api';

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadActivities() {
            try {
                const apiUrl = `${API_BASE_URL}/api/activities/`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Unable to load activities (${response.status})`);
                }

                const payload = await response.json();

                if (isMounted) {
                    setActivities(normalizeRecords(payload));
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError.message || 'Unable to load activities.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadActivities();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading activities…</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Activities</h2>
                    <span className="badge bg-info text-dark rounded-pill">{activities.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Type</th>
                                <th>Duration</th>
                                <th>Points</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity) => (
                                <tr key={activity._id || `${activity.type}-${activity.completedAt}`}>
                                    <td>{activity.type || 'Workout'}</td>
                                    <td>{activity.duration ?? 0} min</td>
                                    <td>{activity.points ?? 0}</td>
                                    <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
