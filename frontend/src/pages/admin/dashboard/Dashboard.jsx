import DashboardHeader from '../../../components/adminPanel/dashboard/DashboardHeader'
import Graph from '../../../components/adminPanel/dashboard/Graph'
import StatsCards from '../../../components/adminPanel/dashboard/StatsCards'

const Dashboard = () => {
  return (
    <div className='w-full'>
      <DashboardHeader />
      <section className='w-full' id="dashboard-analysis-section">
        <div className="stats-cards-container w-full mb-10">
          <h2 className='font-semibold mb-2'>Monthly Statistics</h2>
          <StatsCards />
        </div>
        <div className="dashboard-graph-container w-full">
          <h2 className='font-semibold mb-2'>Monthly Revenue</h2>
          <Graph />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
