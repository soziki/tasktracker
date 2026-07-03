import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased font-sans selection:bg-emerald-500 selection:text-slate-950">
      <KanbanBoard />
    </div>
  );
}

export default App;