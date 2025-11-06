import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Graph = () => {
    const data = [
        {
            name: 'Jan',
            uv: 1256,
        },
        {
            name: 'Feb',
            uv: 865,
        },
        {
            name: 'Mar',
            uv: 1023,
        },
        {
            name: 'Apr',
            uv: 1839,
        },
        {
            name: 'May',
            uv: 1645,
        },
        {
            name: 'Jun',
            uv: 2390,
        },
        {
            name: 'Jul',
            uv: 2967,
        },
        {
            name: 'Aug',
            uv: 865,
        },
        {
            name: 'Sep',
            uv: 1023,
        },
        {
            name: 'Oct',
            uv: 1839,
        },
        {
            name: 'Nov',
            uv: 1645,
        },
        {
            name: 'Dec',
            uv: 2390,
        },
    ];

    return (
        <AreaChart
            className='w-full max-w-[1200px] max-h-[70vh] aspect-[1.618] outline-none focus:outline-none [&_*]:outline-none'
            responsive
            data={data}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className='text-xs'/>
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#660B05" fill="#8C1007" />
        </AreaChart>
    );
}

export default Graph
