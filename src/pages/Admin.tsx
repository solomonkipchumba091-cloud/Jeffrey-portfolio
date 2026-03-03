import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, RefreshCw, ArrowUpDown, Mail, Clock, CheckCircle, Eye, ChevronDown, X, Terminal, User, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string | null;
  message: string;
  status: 'new' | 'reviewed' | 'responded';
  created_at: string;
}

type SortField = 'created_at' | 'name' | 'status' | 'project_type';
type SortDir = 'asc' | 'desc';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Mail },
  reviewed: { label: 'Reviewed', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Eye },
  responded: { label: 'Responded', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle },
};

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123qwe!@#QWE';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem('admin_auth') === 'true';
  });

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSubmissions(data as Submission[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchSubmissions();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      window.sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
      setPassword('');
      return;
    }
    setAuthError('Invalid username or password.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.sessionStorage.removeItem('admin_auth');
    setUsername('');
    setPassword('');
    setSubmissions([]);
    setSelectedSubmission(null);
    setAuthError('');
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus as Submission['status'] } : s))
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus as Submission['status'] });
      }
    }
    setUpdatingId(null);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = useMemo(() => {
    let filtered = filterStatus === 'all' ? submissions : submissions.filter((s) => s.status === filterStatus);
    return [...filtered].sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [submissions, sortField, sortDir, filterStatus]);

  const counts = useMemo(() => ({
    all: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    reviewed: submissions.filter((s) => s.status === 'reviewed').length,
    responded: submissions.filter((s) => s.status === 'responded').length,
  }), [submissions]);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button onClick={() => toggleSort(field)} className="flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors">
      {children}
      <ArrowUpDown className={`w-3 h-3 ${sortField === field ? 'text-blue-400' : ''}`} />
    </button>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(220,20%,4%)] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-strong rounded-2xl border border-white/10 p-6 sm:p-8">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Login</h1>
              <p className="text-sm text-gray-400">Sign in to view submissions</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Username</span>
              <div className="mt-1.5 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3">
                <User className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Password</span>
              <div className="mt-1.5 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3">
                <Lock className="w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            {authError && (
              <p className="text-sm text-red-400">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(220,20%,4%)] text-white">
      {/* Header */}
      <header className="border-b border-white/5 glass-strong sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Portfolio</span>
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchSubmissions} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-400 hover:text-white transition-colors border border-white/10">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-400 hover:text-white transition-colors border border-white/10">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all', label: 'Total', count: counts.all, color: 'from-gray-500 to-gray-600', icon: Mail },
            { key: 'new', label: 'New', count: counts.new, color: 'from-blue-500 to-cyan-500', icon: Mail },
            { key: 'reviewed', label: 'Reviewed', count: counts.reviewed, color: 'from-yellow-500 to-orange-500', icon: Eye },
            { key: 'responded', label: 'Responded', count: counts.responded, color: 'from-emerald-500 to-teal-500', icon: CheckCircle },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setFilterStatus(s.key)}
              className={`glass rounded-xl p-5 text-left transition-all duration-300 card-glow ${filterStatus === s.key ? 'ring-1 ring-blue-500/30' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <s.icon className="w-5 h-5 text-gray-400" />
                <span className={`text-2xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.count}</span>
              </div>
              <div className="text-sm text-gray-400 font-medium">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden border border-white/5">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-400">Loading submissions...</span>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">No submissions yet</p>
              <p className="text-gray-500 text-sm mt-1">Contact form submissions will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left"><SortHeader field="created_at">Date</SortHeader></th>
                    <th className="px-6 py-4 text-left"><SortHeader field="name">Name</SortHeader></th>
                    <th className="px-6 py-4 text-left hidden md:table-cell">Email</th>
                    <th className="px-6 py-4 text-left hidden lg:table-cell"><SortHeader field="project_type">Project</SortHeader></th>
                    <th className="px-6 py-4 text-left hidden lg:table-cell">Budget</th>
                    <th className="px-6 py-4 text-left"><SortHeader field="status">Status</SortHeader></th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((sub) => {
                    const sc = statusConfig[sub.status];
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(sub.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-white">{sub.name}</div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <a href={`mailto:${sub.email}`} onClick={(e) => e.stopPropagation()} className="text-sm text-blue-400 hover:underline">{sub.email}</a>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-300">{sub.project_type}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-400">{sub.budget || '—'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={sub.status}
                              onChange={(e) => updateStatus(sub.id, e.target.value)}
                              disabled={updatingId === sub.id}
                              className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none focus:border-blue-500/50 cursor-pointer pr-7"
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="responded">Responded</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedSubmission(null)}>
          <div className="glass-strong rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Submission Details</h3>
              <button onClick={() => setSelectedSubmission(null)} className="p-1.5 glass rounded-lg text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Name</div>
                <div className="text-white font-semibold">{selectedSubmission.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</div>
                <a href={`mailto:${selectedSubmission.email}`} className="text-blue-400 hover:underline">{selectedSubmission.email}</a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Project Type</div>
                  <div className="text-gray-300">{selectedSubmission.project_type}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Budget</div>
                  <div className="text-gray-300">{selectedSubmission.budget || 'Not specified'}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</div>
                <div className="text-gray-300 leading-relaxed bg-white/5 rounded-xl p-4 text-sm">{selectedSubmission.message}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Submitted</div>
                  <div className="text-gray-400 text-sm">{formatDate(selectedSubmission.created_at)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => updateStatus(selectedSubmission.id, e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none focus:border-blue-500/50 cursor-pointer w-full"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.project_type} Project&body=Hi ${selectedSubmission.name},%0D%0A%0D%0AThank you for reaching out about your ${selectedSubmission.project_type} project.%0D%0A%0D%0ABest regards,%0D%0AJeffrey`}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm"
                  onClick={() => updateStatus(selectedSubmission.id, 'responded')}
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
