import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../utils/api';

export default function Workouts() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadWorkouts() {
            try {
                const response = await fetch(buildApiUrl('workouts'));

                if (!response.ok) {
                    throw new Error(`Unable to load workouts (${response.status})`);
                }

                const payload = await response.json();

                if (isMounted) {
                    setWorkouts(normalizeRecords(payload));
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError.message || 'Unable to load workouts.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadWorkouts();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading workouts…</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <section className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">Workout Plan</h2>
                    <span className="badge bg-secondary rounded-pill">{workouts.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Workout</th>
                                <th>Difficulty</th>
                                <th>Duration</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workouts.map((workout) => (
                                <tr key={workout._id || workout.name}>
                                    <td>{workout.name || 'Unnamed workout'}</td>
                                    <td>{workout.difficulty || '—'}</td>
                                    <td>{workout.duration ?? 0} min</td>
                                    <td>{workout.description || 'No details provided.'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
