import Sidebar from "./adminHeader";
import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import { PieChart } from "@mui/x-charts/PieChart";
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { BarChart } from "@mui/x-charts/BarChart";
import { Chart } from "react-google-charts";



import axios from "axios";

export default function Analytics() {
  const [value0, setValue0] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [incomeLap,setIncomeLap]=useState(0);
  const [incomeSmart,setIncomeSmart]=useState(0);
  const [incomeTab,setIncomeTab]=useState(0);
  const [incomeTel,setIncomeTel]=useState(0);
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [total,setTotal]=useState("");
  const [top,setTop]=useState([]);
  const [amount1,setAmount1]=useState(0);
  const [amount2,setAmount2]=useState(0);
  const [amount3,setAmount3]=useState(0);
  const [amount4,setAmount4]=useState(0);
  const [name1,setName1]=useState("");
  const [name2,setName2]=useState("");
  const [name3,setName3]=useState("");
  const [name4,setName4]=useState("");


////////////////////////////////////////
  useEffect(() => {
    axios.get("http://localhost:3000/categoryChart").then((res) => {
      setValue0(res.data.val0);
      setValue1(res.data.val1);

      setValue2(res.data.val2);

      setValue3(res.data.val3);
    });
  }, []);
///////////////////////////////////
  useEffect(()=>{
    axios.get("http://localhost:3000/incomeBars").then((res)=>{
      setIncomeLap(res.data.lapIncome);
      setIncomeSmart(res.data.smartIncome);
      setIncomeTab(res.data.tabIncome);
      setIncomeTel(res.data.telIncome);
    })
  },[])
  ////////////////////
  useEffect(()=>{
    axios.get("http://localhost:3000/userOfTheMounth").then((res)=>{
      setUsername(res.data.username);
      setEmail(res.data.email);
      setTotal(res.data.total);
    })
  },[])
  ////////////////////////////////////////////////
  useEffect(()=>{
    axios.get("http://localhost:3000/rankProducts").then((res)=>{
      const tops=res.data;
      setAmount1(tops[0].amount);
      setAmount2(tops[1].amount);
      setAmount3(tops[2].amount);
      setAmount4(tops[3].amount);
      setName1(tops[0].name);
      setName2(tops[1].name);
      setName3(tops[2].name);
      setName4(tops[3].name);


    })
    },[])
  








  ////////////////////////////
  const uData = [incomeLap, incomeSmart, incomeTab, incomeTel];
const xLabels = [
  'Laptops',
  'Smartphones',
  'Tablets',
  'Televisions',
];

const options = {
  title: "Top 4 Most Selled Products ",
  width: 600,
  height: 400,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

  return (
    <div className={`w-screen h-screen flex items-center  relative`}>
      <Sidebar />
      <div className="w-5/6 h-full flex flex-wrap  absolute top-0 right-6 ">
      <div className="w-1/2 h-1/2  flex flex-col justify-center items-center">
        
        <PieChart 
          title="Partition Of Products By Category In Our Stock"
          
          series={[
            {
              data: [
                { id: 0, value: value0, label: "Laptops" },
                { id: 1, value: value1, label: "Smartphones" },
                { id: 2, value: value2, label: "Televisions" },
                { id: 3, value: value3, label: "Tablets" },
              ],
            },
          ]}
          width={600}
          height={400}
        />
        <h1 className="text-lg text-blue-950 font-bold">Partition Of Products By Category In Our Stock</h1>
        </div>
      <div className="w-1/2 h-1/2 flex flex-col justify-center items-center">
           <BarChart
      width={600}
      height={400}
      series={[

        { data: uData, label: 'Annual Income', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
      <h1 className="text-lg text-blue-950 font-bold">Annual Income For Each Category</h1>

    </div>
    <div className="w-1/2 h-1/2 flex flex-col justify-center items-center ">
      <h1 className="text-4xl text-blue-950 font-bold">User Of The Year</h1>
      <h1 className="text-sm font-bold">{username}</h1>
      <h1 className="text-sm font-bold">{email}</h1>
      <h1 className="text-sm font-bold">{total} TND</h1>
      

    </div >
    <div  className="w-1/2 h-1/2 flex flex-col justify-center items-center  ">
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={[
        [
          "Element",
          "Amount TND",
          { role: "style" },
          {
            role: "annotation",
            type: "string",
          },
        ],
        ["4", amount4, "#b87333", name4],
        ["3", amount3, "silver", name3],
        ["2", amount2, "gold", name2],
        ["1", amount1, "color: #e5e4e2", name1],
      ]}
      options={options}
    />
<h1 className="text-lg text-blue-950 font-bold">Top 4 Most Selled Products</h1>    
      


    </div>


      </div>
    </div>
  );
}
