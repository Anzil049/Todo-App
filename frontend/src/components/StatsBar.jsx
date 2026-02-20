const StatsBar = ({ todos }) => {
  const total     = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const percent   = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-bar">
      <div className="stats-text">
        <span>{completed} of {total} tasks completed</span>
        <span className="percent">{percent}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default StatsBar;
