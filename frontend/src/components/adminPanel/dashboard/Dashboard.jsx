import DashboardHeader from './DashboardHeader'
import Graph from './Graph'
import StatsCards from './StatsCards'

const Dashboard = () => {
  return (
    <div className='w-full'>
      <DashboardHeader />
      <section className='w-full' id="dashboard-analysis-section">
        <div className="stats-cards-container w-full mb-10">
          <h2 className='font-semibold mb-2'>Stats Analysis</h2>
          <StatsCards />
        </div>
        <div className="dashboard-graph-container w-full">
          <h2 className='font-semibold mb-2'>Profit Analysis</h2>
          <Graph />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
