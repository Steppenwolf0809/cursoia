import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

const LivePoll = ({ question: defaultQuestion, options: defaultOptions }) => {
    const [poll, setPoll] = useState({ id: null, question: defaultQuestion, options: defaultOptions });
    const [loading, setLoading] = useState(true);

    // Initialize votes and hasVoted state
    const [votes, setVotes] = useState(() => {
        // Initial state logic (could be improved to wait for poll data)
        return new Array(defaultOptions.length).fill(0);
    });

    const [hasVoted, setHasVoted] = useState(false);

    // Fetch active poll from server
    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/polls/active');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.active) {
                        setPoll(prev => {
                            // Only update if ID changed to avoid unnecessary re-renders or loops, 
                            // though we need to update votes every time.
                            // We'll update votes separately.
                            if (prev.id !== data.id) {
                                return {
                                    id: data.id,
                                    question: data.question,
                                    options: data.options
                                };
                            }
                            return prev;
                        });

                        // Calculate votes from backend responses
                        if (data.responses && Array.isArray(data.responses)) {
                            const newVotes = new Array(data.options.length).fill(0);
                            data.responses.forEach(resp => {
                                const idx = data.options.indexOf(resp.answer);
                                if (idx !== -1) newVotes[idx]++;
                            });
                            setVotes(newVotes);
                        } else if (data.id) {
                            // If online but no responses, set to 0
                            setVotes(new Array(data.options.length).fill(0));
                        }
                    }
                }
            } catch (error) {
                // If backend fails, we might just keep local state driven by user interaction
                // console.error("Backend poll failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
        const interval = setInterval(fetchPoll, 2000); // Poll every 2 seconds for live updates
        return () => clearInterval(interval);
    }, []);

    // Load hasVoted state from local storage (and votes ONLY if offline)
    useEffect(() => {
        const savedHasVoted = localStorage.getItem(`poll-voted-${poll.question}`);

        if (savedHasVoted) {
            setHasVoted(true);
        } else {
            setHasVoted(false);
        }

        // Only load local votes if we are NOT connected to a poll ID (offline mode)
        if (!poll.id) {
            const savedVotes = localStorage.getItem(`poll-${poll.question}`);
            if (savedVotes) {
                setVotes(JSON.parse(savedVotes));
            }
        }
    }, [poll.question, poll.id]);

    const totalVotes = votes.reduce((a, b) => a + b, 0);

    const handleVote = async (index) => {
        if (hasVoted) return;

        // Optimistic update (Local)
        const newVotes = [...votes];
        newVotes[index] += 1;
        setVotes(newVotes);
        setHasVoted(true);

        localStorage.setItem(`poll-${poll.question}`, JSON.stringify(newVotes));
        localStorage.setItem(`poll-voted-${poll.question}`, 'true');

        // Backend update
        if (poll.id) {
            try {
                await fetch(`http://localhost:3001/api/polls/${poll.id}/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answer: poll.options[index] })
                });
            } catch (error) {
                console.error("Failed to send vote to backend:", error);
            }
        }
    };

    if (loading && !poll.question) return <div className="p-6 text-center text-slate-400">Cargando encuesta...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-6 text-secondary">
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider">Encuesta en vivo {poll.id ? '(Online)' : '(Local)'}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-6 leading-tight">{poll.question}</h3>

            <div className="space-y-3">
                {poll.options.map((option, index) => {
                    const percentage = totalVotes === 0 ? 0 : Math.round((votes[index] / totalVotes) * 100);

                    return (
                        <div key={index} className="relative group">
                            <button
                                onClick={() => handleVote(index)}
                                disabled={hasVoted}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all relative z-10 overflow-hidden
                  ${hasVoted
                                        ? 'border-transparent cursor-default'
                                        : 'border-slate-200 hover:border-secondary hover:bg-slate-50'}`}
                            >
                                <div className="relative z-10 flex justify-between items-center font-medium text-slate-700">
                                    <span className={hasVoted && index === votes.indexOf(Math.max(...votes)) ? "font-bold text-slate-900" : ""}>{option}</span>
                                    {hasVoted && (
                                        <span className={`text-sm font-bold ${percentage > 50 ? 'text-secondary' : 'text-slate-500'}`}>
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </button>

                            {hasVoted && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-100 rounded-lg transition-all duration-1000 ease-out z-0 opacity-60"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {hasVoted && (
                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-400">Gracias por tu voto • {totalVotes} votos totales</p>
                </div>
            )}
        </div>
    );
};

export default LivePoll;
