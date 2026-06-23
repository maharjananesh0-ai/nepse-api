const express=require('express');
const axios=require('axios');
const cors=require('cors');
const cheerio=require('cheerio');

const app=express();

app.use(cors());
app.use(express.json());

const PORT=3000;

async function getStocks(){

const response=await axios.get(
'https://www.merolagani.com/LatestMarket.aspx',
{
headers:{
'User-Agent':'Mozilla/5.0'
}
}
);

const $=cheerio.load(response.data);

let stocks=[];

$('table tbody tr').each((i,element)=>{

const cols=$(element).find('td');

if(cols.length>5){

stocks.push({

symbol:$(cols[0]).text().trim(),
ltp:$(cols[1]).text().trim(),
change:$(cols[2]).text().trim()

});

}

});

return stocks;

}

app.get("/",(req,res)=>{

res.json({
status:"API Running"
});

});

app.get("/stocks",async(req,res)=>{

try{

const stocks=await getStocks();

res.json(stocks);

}

catch(error){

res.status(500).json({
error:error.message
});

}

});

app.get("/live-price/:symbol",async(req,res)=>{

try{

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

}

catch(error){

res.status(500).json({
error:error.message
});

}

});

app.listen(PORT,()=>{

console.log(
`Server running at http://localhost:${PORT}`
);

});
