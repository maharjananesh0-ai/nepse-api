const express=require('express');
const axios=require('axios');
const cors=require('cors');
const cheerio=require('cheerio');

const app=express();

app.use(cors());
app.use(express.json());

const PORT=3000;

// Temporary data source function
async function getStocks(){

return [

{
id:"NABIL",
symbol:"NABIL",
company_name:"Nabil Bank Limited",
ltp:"529"
},

{
id:"NICA",
symbol:"NICA",
company_name:"NIC Asia Bank",
ltp:"643"
},

{
id:"SBI",
symbol:"SBI",
company_name:"SBI Bank",
ltp:"409"
}

];

}

// Home
app.get("/",(req,res)=>{

res.json({
status:"API Running"
});

});

// All stocks
app.get("/stocks",async(req,res)=>{

const stocks=await getStocks();

res.json(stocks);

});

// Single stock
app.get("/live-price/:symbol",async(req,res)=>{

const stocks=await getStocks();

const stock=stocks.find(
s=>s.symbol===req.params.symbol.toUpperCase()
);

if(!stock){

return res.status(404).json({
message:"Stock not found"
});

}

res.json(stock);

});

app.listen(PORT,()=>{

console.log(
`Server running at http://localhost:${PORT}`
);

});
