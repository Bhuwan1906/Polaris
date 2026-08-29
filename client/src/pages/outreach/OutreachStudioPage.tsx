import { useState } from 'react';
import { BookOpen, Send, FileText, Newspaper, Image, Share2, ArrowRight, Check, Clock, Eye, Edit3 } from 'lucide-react';
import { useExpeditions, usePublications, useDatasets } from '@/hooks/useApi';
import api from '@/lib/api';
import { toast } from 'sonner';

const templates = [
  { type: 'SOCIAL_POST', label: 'Social Media Post', icon: Share2, color: 'from-blue-500 to-blue-600' },
  { type: 'WEBSITE_ARTICLE', label: 'Website Article', icon: FileText, color: 'from-green-500 to-green-600' },
  { type: 'FACT_CARD', label: 'Fact Card', icon: Image, color: 'from-amber-500 to-amber-600' },
  { type: 'NEWSLETTER', label: 'Newsletter', icon: Newspaper, color: 'from-purple-500 to-purple-600' },
];

const statusSteps = ['DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED'];

export default function OutreachStudioPage() {
  const [step, setStep] = useState(1);
  const [resourceType, setResourceType] = useState('expedition');
  const [resourceId, setResourceId] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [generated, setGenerated] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { data: expeditions } = useExpeditions({ limit: 50 });
  const { data: publications } = usePublications({ limit: 50 });

  const handleGenerate = async () => {
    if (!resourceId || !templateType) {
      toast.error('Select a resource and template');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/outreach/generate', {
        resourceId,
        resourceType,
        templateType,
        customNotes: customNotes || undefined,
      });
      setGenerated(data.data);
      setStep(3);
      toast.success('Content generated!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!generated) return;
    try {
      const { data } = await api.put(`/outreach/${generated.id}/status`, { status });
      setGenerated(data.data);
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  };

  const handleEdit = async () => {
    if (!generated) return;
    try {
      const { data } = await api.put(`/outreach/${generated.id}`, { content: generated.content });
      setGenerated(data.data);
      toast.success('Content saved');
    } catch (err: any) {
      toast.error('Save failed');
    }
  };

  return (
    <div className="py-12">
      <div className="container-wide max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
            <BookOpen className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Outreach Studio</h1>
            <p className="text-surface-400">Generate verified content for websites and social media</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex items-center gap-2">
          {['Select Resource', 'Choose Template', 'Preview & Edit', 'Publish'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step > i + 1 ? 'bg-aurora-500 text-polar-900' :
                step === i + 1 ? 'bg-polar-500 text-white' :
                'bg-surface-800 text-surface-400'
              }`}>
                {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-sm sm:inline ${step === i + 1 ? 'text-white' : 'text-surface-400'}`}>{s}</span>
              {i < 3 && <div className="mx-2 h-px w-8 bg-surface-700" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Resource */}
        {step === 1 && (
          <div className="mt-8 card p-6">
            <h2 className="text-lg font-semibold text-white">Select a Resource</h2>
            <div className="mt-4 flex gap-3">
              {['expedition', 'publication', 'dataset'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setResourceType(t); setResourceId(''); }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    resourceType === t ? 'bg-polar-500 text-white' : 'border border-surface-700 text-surface-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <select value={resourceId} onChange={(e) => setResourceId(e.target.value)} className="input">
                <option value="">Select a {resourceType}...</option>
                {resourceType === 'expedition' && expeditions?.data?.map((e: any) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
                {resourceType === 'publication' && publications?.data?.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => resourceId && setStep(2)}
              disabled={!resourceId}
              className="btn-primary mt-4 disabled:opacity-50"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2: Choose Template */}
        {step === 2 && (
          <div className="mt-8 card p-6">
            <h2 className="text-lg font-semibold text-white">Choose Content Template</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {templates.map((t) => (
                <button
                  key={t.type}
                  onClick={() => setTemplateType(t.type)}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    templateType === t.type
                      ? 'border-polar-500 bg-polar-500/10'
                      : 'border-surface-700 hover:border-surface-600'
                  }`}
                >
                  <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${t.color} text-white`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-white">{t.label}</p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm text-surface-400 mb-1">Custom Notes (optional)</label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="input min-h-[80px]"
                placeholder="Add specific instructions or context..."
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button onClick={handleGenerate} disabled={!templateType || loading} className="btn-primary disabled:opacity-50">
                {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Generate Content'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Edit */}
        {step === 3 && generated && (
          <div className="mt-8 card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Generated Content</h2>
              <div className="flex items-center gap-2">
                <span className={`badge ${
                  generated.status === 'DRAFT' ? 'bg-surface-500/10 text-surface-400' :
                  generated.status === 'REVIEW' ? 'bg-amber-500/10 text-amber-400' :
                  generated.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                  'bg-polar-500/10 text-polar-400'
                }`}>
                  {generated.status}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-surface-400 mb-1">Title</label>
              <input
                value={generated.title}
                onChange={(e) => setGenerated({ ...generated, title: e.target.value })}
                className="input"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-surface-400 mb-1">Content</label>
              <textarea
                value={generated.content}
                onChange={(e) => setGenerated({ ...generated, content: e.target.value })}
                className="input min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={handleEdit} className="btn-secondary">
                <Edit3 className="h-4 w-4" /> Save Edits
              </button>
              {generated.status === 'DRAFT' && (
                <button onClick={() => handleStatusUpdate('REVIEW')} className="btn-primary">
                  <Send className="h-4 w-4" /> Submit for Review
                </button>
              )}
              {generated.status === 'REVIEW' && (
                <button onClick={() => handleStatusUpdate('APPROVED')} className="btn-primary bg-green-600 hover:bg-green-500">
                  <Check className="h-4 w-4" /> Approve
                </button>
              )}
              {generated.status === 'APPROVED' && (
                <button onClick={() => handleStatusUpdate('PUBLISHED')} className="btn-aurora">
                  <Send className="h-4 w-4" /> Publish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
