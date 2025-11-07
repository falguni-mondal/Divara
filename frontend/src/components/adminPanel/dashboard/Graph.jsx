import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, } from 'recharts';

const Graph = () => {
    const data = [
        {
            month: 'Jun',
            users: 2390,
        },
        {
            month: 'Jul',
            users: 2967,
        },
        {
            month: 'Aug',
            users: 865,
        },
        {
            month: 'Sep',
            users: 1023,
        },
        {
            month: 'Oct',
            users: 1839,
        },
        {
            month: 'Nov',
            users: 1645,
        },
    ];

    return (
        <AreaChart
            className='w-full max-w-[1200px] max-h-[70vh] aspect-[1.618] outline-none focus:outline-none [&_*]:outline-none'
            responsive
            data={data}
            margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid  strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" className='text-xs' stroke="#1a1a1a" tick={{ fill: '#1a1a1a' }} tickLine={{ stroke: '#000000' }} axisLine={{ stroke: '#000000' }}/>
            <Tooltip />
            <Area type="natural" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.65}/>
        </AreaChart>
    );
}

export default Graph
